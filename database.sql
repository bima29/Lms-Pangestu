-- ============================================
-- LMS PANGESTU DATABASE SCHEMA
-- Learning Management System Database
-- Created: 2025-01-08
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS lms_pangestu;
USE lms_pangestu;

-- ============================================
-- 1. USERS & AUTHENTICATION TABLES
-- ============================================

-- Main users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    role ENUM('super_admin', 'school_admin', 'teacher', 'student', 'parent') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Teachers profile table
CREATE TABLE teachers (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    employee_id VARCHAR(50) UNIQUE,
    specialization VARCHAR(255),
    hire_date DATE,
    salary DECIMAL(12,2),
    status ENUM('active', 'inactive', 'terminated') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id)
);

-- Students profile table
CREATE TABLE students (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    student_id VARCHAR(50) UNIQUE,
    class_id VARCHAR(36),
    parent_id VARCHAR(36),
    enrollment_date DATE,
    graduation_date DATE,
    status ENUM('active', 'graduated', 'dropped', 'transferred') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES users(id),
    INDEX idx_student_id (student_id),
    INDEX idx_class_id (class_id)
);

-- Parents profile table
CREATE TABLE parents (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    occupation VARCHAR(255),
    address TEXT,
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 2. ACADEMIC MANAGEMENT TABLES
-- ============================================
-- Schools table (macro LMS)
CREATE TABLE schools (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_school_name (name)
);

-- Attach schools to core entities (added via ALTER to keep backward compat)
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS school_id VARCHAR(36) NULL AFTER role,
    ADD CONSTRAINT fk_users_school FOREIGN KEY (school_id) REFERENCES schools(id);

ALTER TABLE classes
    ADD COLUMN IF NOT EXISTS school_id VARCHAR(36) NULL AFTER id,
    ADD CONSTRAINT fk_classes_school FOREIGN KEY (school_id) REFERENCES schools(id);

ALTER TABLE subjects
    ADD COLUMN IF NOT EXISTS school_id VARCHAR(36) NULL AFTER id,
    ADD CONSTRAINT fk_subjects_school FOREIGN KEY (school_id) REFERENCES schools(id);

-- Majors/Programs table
CREATE TABLE majors (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    school_id VARCHAR(36),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id),
    INDEX idx_code (code),
    INDEX idx_school_active (school_id, is_active)
);

-- Classes table
CREATE TABLE classes (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    major_id VARCHAR(36),
    grade_level INT NOT NULL, -- 10, 11, 12
    academic_year VARCHAR(9) NOT NULL, -- 2024/2025
    homeroom_teacher_id VARCHAR(36),
    max_students INT DEFAULT 40,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (major_id) REFERENCES majors(id),
    FOREIGN KEY (homeroom_teacher_id) REFERENCES teachers(id),
    INDEX idx_academic_year (academic_year),
    INDEX idx_grade_level (grade_level)
);

-- Subjects table
CREATE TABLE subjects (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    credit_hours INT DEFAULT 2,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code (code)
);

-- Class-Subject-Teacher relationship (many-to-many)
CREATE TABLE class_subjects (
    id VARCHAR(36) PRIMARY KEY,
    class_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    semester ENUM('1', '2') NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_class_subject_semester (class_id, subject_id, semester, academic_year),
    INDEX idx_class_subject (class_id, subject_id),
    INDEX idx_teacher_subject (teacher_id, subject_id)
);

-- ============================================
-- Bridging tables for macro LMS relationships
-- ============================================

-- Many-to-many student to classes (historic membership)
CREATE TABLE IF NOT EXISTS student_classes (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_class_year (student_id, class_id, academic_year),
    INDEX idx_class_active (class_id, is_active)
);

-- Many-to-many parents to students (allow multiple guardians)
CREATE TABLE IF NOT EXISTS parents_students (
    parent_user_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    relation VARCHAR(50) DEFAULT 'parent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (parent_user_id, student_id),
    FOREIGN KEY (parent_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Seed bridging tables from existing one-to-many fields (if data exists)
INSERT INTO student_classes (id, student_id, class_id, academic_year, is_active)
SELECT CONCAT('sc-', s.id), s.id, s.class_id, COALESCE((SELECT setting_value FROM system_settings WHERE setting_key='academic_year' LIMIT 1), '2024/2025'), TRUE
FROM students s
WHERE s.class_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM student_classes sc WHERE sc.student_id = s.id AND sc.class_id = s.class_id
  );

INSERT INTO parents_students (parent_user_id, student_id, relation)
SELECT s.parent_id, s.id, 'parent'
FROM students s
WHERE s.parent_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM parents_students ps WHERE ps.parent_user_id = s.parent_id AND ps.student_id = s.id
  );

-- ============================================
-- 3. CBT (COMPUTER BASED TEST) TABLES
-- ============================================

-- CBT Questions table
CREATE TABLE cbt_questions (
    id VARCHAR(36) PRIMARY KEY,
    question TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'text', 'image', 'audio', 'video') NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    difficulty_level ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    points INT DEFAULT 1,
    media_url VARCHAR(500),
    media_type VARCHAR(50),
    explanation TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_subject_type (subject_id, question_type),
    INDEX idx_teacher_subject (teacher_id, subject_id)
);

-- CBT Question Options table
CREATE TABLE cbt_question_options (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    option_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES cbt_questions(id) ON DELETE CASCADE,
    INDEX idx_question_order (question_id, option_order)
);

-- CBT Sessions table
CREATE TABLE cbt_sessions (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    duration_minutes INT NOT NULL,
    total_questions INT NOT NULL,
    passing_score DECIMAL(5,2) DEFAULT 70.00,
    shuffle_questions BOOLEAN DEFAULT TRUE,
    show_results BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_class_subject (class_id, subject_id),
    INDEX idx_start_time (start_time)
);

-- CBT Session Questions relationship
CREATE TABLE cbt_session_questions (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    question_id VARCHAR(36) NOT NULL,
    question_order INT NOT NULL,
    points INT DEFAULT 1,
    FOREIGN KEY (session_id) REFERENCES cbt_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES cbt_questions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_session_question (session_id, question_id),
    INDEX idx_session_order (session_id, question_order)
);

-- CBT Attempts table
CREATE TABLE cbt_attempts (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    total_score DECIMAL(5,2) DEFAULT 0,
    max_score DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) DEFAULT 0,
    status ENUM('in_progress', 'completed', 'timeout', 'cancelled') DEFAULT 'in_progress',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES cbt_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_session (student_id, session_id),
    INDEX idx_session_status (session_id, status)
);

-- CBT Answers table
CREATE TABLE cbt_answers (
    id VARCHAR(36) PRIMARY KEY,
    attempt_id VARCHAR(36) NOT NULL,
    question_id VARCHAR(36) NOT NULL,
    selected_option_id VARCHAR(36),
    text_answer TEXT,
    is_correct BOOLEAN,
    points_earned DECIMAL(5,2) DEFAULT 0,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attempt_id) REFERENCES cbt_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES cbt_questions(id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES cbt_question_options(id),
    UNIQUE KEY unique_attempt_question (attempt_id, question_id),
    INDEX idx_attempt_question (attempt_id, question_id)
);

-- ============================================
-- 4. LEARNING MATERIALS & ASSIGNMENTS
-- ============================================

-- Learning Materials table
CREATE TABLE learning_materials (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36),
    file_url VARCHAR(500),
    file_type VARCHAR(50),
    file_size BIGINT,
    material_type ENUM('document', 'video', 'audio', 'presentation', 'link') DEFAULT 'document',
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
    INDEX idx_subject_published (subject_id, is_published),
    INDEX idx_teacher_class (teacher_id, class_id)
);

-- Assignments table
CREATE TABLE assignments (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    subject_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    due_date DATETIME NOT NULL,
    max_score DECIMAL(5,2) DEFAULT 100,
    assignment_type ENUM('homework', 'project', 'quiz', 'essay') DEFAULT 'homework',
    submission_type ENUM('text', 'file', 'both') DEFAULT 'text',
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_class_due (class_id, due_date),
    INDEX idx_subject_published (subject_id, is_published)
);

-- Assignment Submissions table
CREATE TABLE assignment_submissions (
    id VARCHAR(36) PRIMARY KEY,
    assignment_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    submission_text TEXT,
    file_url VARCHAR(500),
    file_name VARCHAR(255),
    file_size BIGINT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score DECIMAL(5,2),
    feedback TEXT,
    graded_at TIMESTAMP NULL,
    graded_by VARCHAR(36),
    status ENUM('submitted', 'graded', 'late', 'missing') DEFAULT 'submitted',
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES teachers(id),
    UNIQUE KEY unique_assignment_student (assignment_id, student_id),
    INDEX idx_assignment_status (assignment_id, status),
    INDEX idx_student_submitted (student_id, submitted_at)
);

-- ============================================
-- 5. ATTENDANCE & SCHEDULE TABLES
-- ============================================

-- Schedules table
CREATE TABLE schedules (
    id VARCHAR(36) PRIMARY KEY,
    class_subject_id VARCHAR(36) NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_subject_id) REFERENCES class_subjects(id) ON DELETE CASCADE,
    INDEX idx_day_time (day_of_week, start_time),
    INDEX idx_class_subject_day (class_subject_id, day_of_week)
);

-- Attendance Sessions table
CREATE TABLE attendances (
    id VARCHAR(36) PRIMARY KEY,
    class_subject_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    topic VARCHAR(255),
    notes TEXT,
    status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_subject_id) REFERENCES class_subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_class_subject_date (class_subject_id, date),
    INDEX idx_date_status (date, status)
);

-- Attendance Records table
CREATE TABLE attendance_records (
    id VARCHAR(36) PRIMARY KEY,
    attendance_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    status ENUM('present', 'absent', 'late', 'excused', 'sick') NOT NULL,
    notes TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recorded_by VARCHAR(36),
    FOREIGN KEY (attendance_id) REFERENCES attendances(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES teachers(id),
    UNIQUE KEY unique_attendance_student (attendance_id, student_id),
    INDEX idx_student_status (student_id, status),
    INDEX idx_attendance_status (attendance_id, status)
);

-- ============================================
-- 6. GRADES & ASSESSMENTS
-- ============================================

-- Grades table
CREATE TABLE grades (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    assessment_type ENUM('quiz', 'assignment', 'midterm', 'final', 'project', 'cbt') NOT NULL,
    assessment_id VARCHAR(36), -- Reference to specific assessment (assignment_id, cbt_session_id, etc)
    score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS ((score / max_score) * 100) STORED,
    semester ENUM('1', '2') NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    graded_by VARCHAR(36) NOT NULL,
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_student_subject_semester (student_id, subject_id, semester, academic_year),
    INDEX idx_class_subject_type (class_id, subject_id, assessment_type)
);

-- ============================================
-- 7. COMMUNICATION & NOTIFICATIONS
-- ============================================

-- Announcements table
CREATE TABLE announcements (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    announcement_type ENUM('general', 'important', 'urgent', 'event') DEFAULT 'general',
    target_role ENUM('all', 'student', 'teacher', 'parent', 'admin') DEFAULT 'all',
    target_class_id VARCHAR(36),
    target_subject_id VARCHAR(36),
    created_by VARCHAR(36) NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    priority INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (target_class_id) REFERENCES classes(id) ON DELETE SET NULL,
    FOREIGN KEY (target_subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_published_expires (is_published, expires_at),
    INDEX idx_target_role_type (target_role, announcement_type)
);

-- Notifications table
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    related_id VARCHAR(36), -- ID from related table
    related_type VARCHAR(50), -- 'assignment', 'cbt_session', 'grade', 'announcement', etc
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read),
    INDEX idx_user_created (user_id, created_at DESC),
    INDEX idx_related (related_type, related_id)
);

-- ============================================
-- 8. SYSTEM TABLES
-- ============================================

-- System Settings table
CREATE TABLE system_settings (
    id VARCHAR(36) PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by VARCHAR(36),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id),
    INDEX idx_key_public (setting_key, is_public)
);

-- Activity Logs table
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id VARCHAR(36),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_action (user_id, action),
    INDEX idx_table_record (table_name, record_id),
    INDEX idx_created_at (created_at DESC)
);

-- ============================================
-- 9. INSERT SAMPLE DATA
-- ============================================

-- Insert sample school
INSERT INTO schools (id, name, address) VALUES
('sch-1', 'SMA Pangestu', 'Jl. Merdeka No. 123, Jakarta')
ON DUPLICATE KEY UPDATE name=VALUES(name), address=VALUES(address);

-- Insert sample users
INSERT INTO users (id, email, password_hash, name, role, phone) VALUES
('1', 'super@lms.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Administrator', 'super_admin', '081234567890'),
('2', 'admin@school.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin Sekolah', 'school_admin', '081234567891'),
('3', 'guru@school.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Pak Budi Santoso', 'teacher', '081234567892'),
('4', 'siswa@school.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Andi Pratama', 'student', '081234567893'),
('5', 'ortu@school.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ibu Siti Nurhaliza', 'parent', '081234567894');

-- Insert sample majors
INSERT INTO majors (id, name, code, description, school_id) VALUES
('maj-1', 'Ilmu Pengetahuan Alam', 'IPA', 'Program studi IPA untuk siswa yang tertarik dengan sains', 'sch-1'),
('maj-2', 'Ilmu Pengetahuan Sosial', 'IPS', 'Program studi IPS untuk siswa yang tertarik dengan sosial', 'sch-1'),
('maj-3', 'Bahasa', 'BHS', 'Program studi Bahasa untuk siswa yang tertarik dengan linguistik', 'sch-1');

-- Insert sample subjects
INSERT INTO subjects (id, name, code, description, credit_hours) VALUES
('sub-1', 'Matematika', 'MTK', 'Mata pelajaran Matematika', 4),
('sub-2', 'Fisika', 'FIS', 'Mata pelajaran Fisika', 3),
('sub-3', 'Kimia', 'KIM', 'Mata pelajaran Kimia', 3),
('sub-4', 'Biologi', 'BIO', 'Mata pelajaran Biologi', 3),
('sub-5', 'Bahasa Indonesia', 'BIN', 'Mata pelajaran Bahasa Indonesia', 4),
('sub-6', 'Bahasa Inggris', 'BIG', 'Mata pelajaran Bahasa Inggris', 3);

-- Insert sample teachers
INSERT INTO teachers (id, user_id, employee_id, specialization, hire_date) VALUES
('tea-1', '3', 'EMP001', 'Matematika', '2020-07-01');

-- Insert sample classes
INSERT INTO classes (id, name, major_id, grade_level, academic_year, homeroom_teacher_id, max_students) VALUES
('cls-1', 'XII IPA 1', 'maj-1', 12, '2024/2025', 'tea-1', 36),
('cls-2', 'XII IPA 2', 'maj-1', 12, '2024/2025', 'tea-1', 36);

-- Insert sample students
INSERT INTO students (id, user_id, student_id, class_id, parent_id, enrollment_date) VALUES
('stu-1', '4', 'STU001', 'cls-1', '5', '2022-07-01');

-- Insert sample parents
INSERT INTO parents (id, user_id, occupation, address) VALUES
('par-1', '5', 'Wiraswasta', 'Jl. Merdeka No. 123, Jakarta');

-- Insert sample class subjects
INSERT INTO class_subjects (id, class_id, subject_id, teacher_id, semester, academic_year) VALUES
('cs-1', 'cls-1', 'sub-1', 'tea-1', '1', '2024/2025'),
('cs-2', 'cls-1', 'sub-2', 'tea-1', '1', '2024/2025');

-- Insert sample system settings
INSERT INTO system_settings (id, setting_key, setting_value, setting_type, description, is_public) VALUES
('set-1', 'school_name', 'SMA Pangestu', 'string', 'Nama sekolah', TRUE),
('set-2', 'academic_year', '2024/2025', 'string', 'Tahun ajaran aktif', TRUE),
('set-3', 'semester', '1', 'string', 'Semester aktif', TRUE),
('set-4', 'max_file_size', '10485760', 'number', 'Maksimal ukuran file upload (bytes)', FALSE);

-- Attach inserted data to school
UPDATE users SET school_id = 'sch-1' WHERE id IN ('2','3','4','5');
UPDATE classes SET school_id = 'sch-1' WHERE id IN ('cls-1','cls-2');
UPDATE subjects SET school_id = 'sch-1' WHERE id IN ('sub-1','sub-2','sub-3','sub-4','sub-5','sub-6');

-- ============================================
-- 10. CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Additional performance indexes
CREATE INDEX idx_users_role_active ON users(role, is_active);
CREATE INDEX idx_students_class_status ON students(class_id, status);
CREATE INDEX idx_grades_student_semester ON grades(student_id, semester, academic_year);
CREATE INDEX idx_cbt_attempts_student_session ON cbt_attempts(student_id, session_id, status);
CREATE INDEX idx_assignments_class_due ON assignments(class_id, due_date, is_published);
CREATE INDEX idx_attendances_date_class ON attendances(date, class_subject_id);

-- ============================================
-- 11. MACRO LMS COMPATIBILITY VIEWS
-- Map existing CBT entities to generic Exams/Questions/Results
-- ============================================

-- Exams view (generic)
DROP VIEW IF EXISTS exams;
CREATE VIEW exams AS
SELECT 
  id,
  title,
  description,
  subject_id,
  class_id,
  teacher_id,
  start_time,
  end_time,
  duration_minutes AS duration,
  total_questions,
  passing_score,
  is_active
FROM cbt_sessions;

-- Questions view (generic)
DROP VIEW IF EXISTS questions;
CREATE VIEW questions AS
SELECT 
  q.id,
  q.question AS text,
  q.question_type,
  q.subject_id,
  q.teacher_id,
  q.difficulty_level,
  q.points,
  q.media_url,
  q.media_type,
  q.is_active
FROM cbt_questions q;

-- Exam Results view (generic)
DROP VIEW IF EXISTS exam_results;
CREATE VIEW exam_results AS
SELECT 
  a.id,
  a.session_id AS exam_id,
  a.student_id,
  a.total_score,
  a.max_score,
  a.percentage,
  a.status,
  a.start_time,
  a.end_time
FROM cbt_attempts a;

-- Materials view (generic)
DROP VIEW IF EXISTS materials;
CREATE VIEW materials AS
SELECT 
  id,
  title,
  description,
  content,
  subject_id,
  teacher_id,
  class_id,
  file_url,
  file_type,
  material_type,
  is_published,
  published_at,
  created_at
FROM learning_materials;

-- Submissions view (generic)
DROP VIEW IF EXISTS submissions;
CREATE VIEW submissions AS
SELECT 
  id,
  assignment_id,
  student_id,
  submission_text,
  file_url,
  file_name,
  file_size,
  submitted_at,
  score,
  feedback,
  graded_at,
  graded_by,
  status
FROM assignment_submissions;

-- Attendance view (flattened per student per date)
DROP VIEW IF EXISTS attendance;
CREATE VIEW attendance AS
SELECT 
  ar.id,
  a.class_subject_id,
  a.date,
  a.teacher_id,
  ar.student_id,
  ar.status,
  ar.notes,
  ar.recorded_at
FROM attendance_records ar
JOIN attendances a ON a.id = ar.attendance_id;

-- ============================================
-- END OF DATABASE SCHEMA
-- ============================================
