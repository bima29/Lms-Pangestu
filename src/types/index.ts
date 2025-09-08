// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  employee_id?: string;
  specialization?: string;
  hire_date?: string;
  salary?: number;
  status: 'active' | 'inactive' | 'terminated';
  created_at: string;
  user?: User;
}

export interface Student {
  id: string;
  user_id: string;
  student_id?: string;
  class_id?: string;
  parent_id?: string;
  enrollment_date?: string;
  graduation_date?: string;
  status: 'active' | 'graduated' | 'dropped' | 'transferred';
  created_at: string;
  user?: User;
  class?: Class;
  parent?: User;
  grades?: Grade[];
}

export interface Parent {
  id: string;
  user_id: string;
  occupation?: string;
  address?: string;
  emergency_contact?: string;
  created_at: string;
  user?: User;
  children?: Student[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// ============================================
// ACADEMIC MANAGEMENT TYPES
// ============================================

export interface Major {
  id: string;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Class {
  id: string;
  name: string;
  major_id?: string;
  grade_level: number; // 10, 11, 12
  academic_year: string; // 2024/2025
  homeroom_teacher_id?: string;
  max_students: number;
  is_active: boolean;
  created_at: string;
  major?: Major;
  homeroom_teacher?: Teacher;
  students?: Student[];
  subjects?: ClassSubject[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credit_hours: number;
  is_active: boolean;
  created_at: string;
}

export interface ClassSubject {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  semester: '1' | '2';
  academic_year: string;
  created_at: string;
  class?: Class;
  subject?: Subject;
  teacher?: Teacher;
}

// ============================================
// CBT SYSTEM TYPES
// ============================================

export type MediaType = 'multiple_choice' | 'text' | 'image' | 'audio' | 'video';

export interface CBTQuestion {
  id: string;
  question: string;
  question_type: MediaType;
  subject_id: string;
  teacher_id: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  points: number;
  media_url?: string;
  media_type?: string;
  explanation?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  subject?: Subject;
  teacher?: Teacher;
  options?: CBTQuestionOption[];
}

export interface CBTQuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  option_order: number;
  created_at: string;
}

export interface CBTSession {
  id: string;
  title: string;
  description?: string;
  subject_id: string;
  class_id: string;
  teacher_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  total_questions: number;
  passing_score: number;
  shuffle_questions: boolean;
  show_results: boolean;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  subject?: Subject;
  class?: Class;
  teacher?: Teacher;
  questions?: CBTSessionQuestion[];
  attempts?: CBTAttempt[];
}

export interface CBTSessionQuestion {
  id: string;
  session_id: string;
  question_id: string;
  question_order: number;
  points: number;
  question?: CBTQuestion;
}

export interface CBTAttempt {
  id: string;
  session_id: string;
  student_id: string;
  start_time: string;
  end_time?: string;
  total_score: number;
  max_score: number;
  percentage: number;
  status: 'in_progress' | 'completed' | 'timeout' | 'cancelled';
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  session?: CBTSession;
  student?: Student;
  answers?: CBTAnswer[];
}

export interface CBTAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option_id?: string;
  text_answer?: string;
  is_correct?: boolean;
  points_earned: number;
  answered_at: string;
  question?: CBTQuestion;
  selected_option?: CBTQuestionOption;
}

// ============================================
// LEARNING & ASSESSMENT TYPES
// ============================================

export interface LearningMaterial {
  id: string;
  title: string;
  description?: string;
  content?: string;
  subject_id: string;
  teacher_id: string;
  class_id?: string;
  file_url?: string;
  file_type?: string;
  file_size?: number;
  material_type: 'document' | 'video' | 'audio' | 'presentation' | 'link';
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  subject?: Subject;
  teacher?: Teacher;
  class?: Class;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  instructions?: string;
  subject_id: string;
  class_id: string;
  teacher_id: string;
  due_date: string;
  max_score: number;
  assignment_type: 'homework' | 'project' | 'quiz' | 'essay';
  submission_type: 'text' | 'file' | 'both';
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  subject?: Subject;
  class?: Class;
  teacher?: Teacher;
  submissions?: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  submission_text?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  submitted_at: string;
  score?: number;
  feedback?: string;
  graded_at?: string;
  graded_by?: string;
  status: 'submitted' | 'graded' | 'late' | 'missing';
  assignment?: Assignment;
  student?: Student;
  grader?: Teacher;
}

export interface Grade {
  id: string;
  student_id: string;
  subject_id: string;
  class_id: string;
  assessment_type: 'quiz' | 'assignment' | 'midterm' | 'final' | 'project' | 'cbt';
  assessment_id?: string;
  score: number;
  max_score: number;
  percentage: number;
  semester: '1' | '2';
  academic_year: string;
  graded_by: string;
  graded_at: string;
  notes?: string;
  student?: Student;
  subject?: Subject;
  class?: Class;
  grader?: Teacher;
}

// ============================================
// ATTENDANCE & SCHEDULE TYPES
// ============================================

export interface Schedule {
  id: string;
  class_subject_id: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  start_time: string;
  end_time: string;
  room?: string;
  is_active: boolean;
  created_at: string;
  class_subject?: ClassSubject;
}

export interface Attendance {
  id: string;
  class_subject_id: string;
  date: string;
  teacher_id: string;
  topic?: string;
  notes?: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  class_subject?: ClassSubject;
  teacher?: Teacher;
  records?: AttendanceRecord[];
}

export interface AttendanceRecord {
  id: string;
  attendance_id: string;
  student_id: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'sick';
  notes?: string;
  recorded_at: string;
  recorded_by?: string;
  attendance?: Attendance;
  student?: Student;
  recorder?: Teacher;
}

// ============================================
// COMMUNICATION TYPES
// ============================================

export interface Announcement {
  id: string;
  title: string;
  content: string;
  announcement_type: 'general' | 'important' | 'urgent' | 'event';
  target_role: 'all' | 'student' | 'teacher' | 'parent' | 'admin';
  target_class_id?: string;
  target_subject_id?: string;
  created_by: string;
  is_published: boolean;
  published_at?: string;
  expires_at?: string;
  priority: number;
  created_at: string;
  updated_at: string;
  target_class?: Class;
  target_subject?: Subject;
  creator?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: 'info' | 'warning' | 'success' | 'error';
  is_read: boolean;
  related_id?: string;
  related_type?: string;
  action_url?: string;
  created_at: string;
  read_at?: string;
  user?: User;
}

// ============================================
// SYSTEM TYPES
// ============================================

export interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value?: string;
  setting_type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  is_public: boolean;
  updated_by?: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  user?: User;
}

// ============================================
// UTILITY TYPES
// ============================================

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}