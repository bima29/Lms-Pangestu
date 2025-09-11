import { 
  User, Student, Teacher, Parent, Major, Class, Subject, ClassSubject,
  CBTQuestion, CBTSession, CBTAttempt, CBTAnswer, 
  AttendanceRecord, Grade, Assignment, LearningMaterial, School
} from '../types';

// ============================================
// USERS DATA
// ============================================

// ============================================
// SCHOOLS DATA
// ============================================

export const mockSchools: School[] = [
  {
    id: 'sch-1',
    name: 'SMA Pangestu Jakarta',
    address: 'Jl. Pangestu No. 123, Jakarta Selatan',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sch-2',
    name: 'SMA Pangestu Bandung',
    address: 'Jl. Merdeka No. 456, Bandung',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sch-3',
    name: 'SMA Pangestu Surabaya',
    address: 'Jl. Pemuda No. 789, Surabaya',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'super@lms.com',
    name: 'Super Administrator',
    role: 'super_admin',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567890',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'admin@school.com',
    name: 'Admin Sekolah Jakarta',
    role: 'school_admin',
    school_id: 'sch-1',
    avatar_url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567891',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'guru@school.com',
    name: 'Pak Budi Santoso',
    role: 'teacher',
    school_id: 'sch-1',
    avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567892',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    email: 'siswa@school.com',
    name: 'Andi Pratama',
    role: 'student',
    school_id: 'sch-1',
    avatar_url: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567893',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    email: 'ortu@school.com',
    name: 'Ibu Siti Nurhaliza',
    role: 'parent',
    school_id: 'sch-1',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567894',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    email: 'guru2@school.com',
    name: 'Ibu Sari Dewi',
    role: 'teacher',
    school_id: 'sch-2',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567895',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    email: 'siswa2@school.com',
    name: 'Sari Wulandari',
    role: 'student',
    school_id: 'sch-2',
    avatar_url: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567896',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    email: 'admin2@school.com',
    name: 'Admin Sekolah Bandung',
    role: 'school_admin',
    school_id: 'sch-2',
    avatar_url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567897',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    email: 'admin3@school.com',
    name: 'Admin Sekolah Surabaya',
    role: 'school_admin',
    school_id: 'sch-3',
    avatar_url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '081234567898',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// ============================================
// MAJORS DATA
// ============================================

export const mockMajors: Major[] = [
  {
    id: 'maj-1',
    name: 'Ilmu Pengetahuan Alam',
    code: 'IPA',
    description: 'Program studi IPA untuk siswa yang tertarik dengan sains',
    school_id: 'sch-1',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'maj-2',
    name: 'Ilmu Pengetahuan Sosial',
    code: 'IPS',
    description: 'Program studi IPS untuk siswa yang tertarik dengan sosial',
    school_id: 'sch-1',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'maj-3',
    name: 'Bahasa',
    code: 'BHS',
    description: 'Program studi Bahasa untuk siswa yang tertarik dengan linguistik',
    school_id: 'sch-1',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
];

// ============================================
// SUBJECTS DATA
// ============================================

export const mockSubjects: Subject[] = [
  {
    id: 'sub-1',
    name: 'Matematika',
    code: 'MTK',
    description: 'Mata pelajaran Matematika',
    credit_hours: 4,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sub-2',
    name: 'Fisika',
    code: 'FIS',
    description: 'Mata pelajaran Fisika',
    credit_hours: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sub-3',
    name: 'Kimia',
    code: 'KIM',
    description: 'Mata pelajaran Kimia',
    credit_hours: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sub-4',
    name: 'Biologi',
    code: 'BIO',
    description: 'Mata pelajaran Biologi',
    credit_hours: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sub-5',
    name: 'Bahasa Indonesia',
    code: 'BIN',
    description: 'Mata pelajaran Bahasa Indonesia',
    credit_hours: 4,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sub-6',
    name: 'Bahasa Inggris',
    code: 'BIG',
    description: 'Mata pelajaran Bahasa Inggris',
    credit_hours: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
];

// ============================================
// TEACHERS DATA
// ============================================

export const mockTeachers: Teacher[] = [
  {
    id: 'tea-1',
    user_id: '3',
    employee_id: 'EMP001',
    specialization: 'Matematika',
    hire_date: '2020-07-01',
    salary: 5000000,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    user: mockUsers.find(u => u.id === '3')
  },
  {
    id: 'tea-2',
    user_id: '6',
    employee_id: 'EMP002',
    specialization: 'Fisika',
    hire_date: '2021-08-01',
    salary: 4800000,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    user: mockUsers.find(u => u.id === '6')
  }
];

// ============================================
// CLASSES DATA
// ============================================

export const mockClasses: Class[] = [
  {
    id: 'cls-1',
    name: 'XII IPA 1',
    major_id: 'maj-1',
    grade_level: 12,
    academic_year: '2024/2025',
    homeroom_teacher_id: 'tea-1',
    max_students: 36,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    major: mockMajors.find(m => m.id === 'maj-1'),
    homeroom_teacher: mockTeachers.find(t => t.id === 'tea-1')
  },
  {
    id: 'cls-2',
    name: 'XII IPA 2',
    major_id: 'maj-1',
    grade_level: 12,
    academic_year: '2024/2025',
    homeroom_teacher_id: 'tea-2',
    max_students: 36,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    major: mockMajors.find(m => m.id === 'maj-1'),
    homeroom_teacher: mockTeachers.find(t => t.id === 'tea-2')
  },
  {
    id: 'cls-3',
    name: 'XI IPA 1',
    major_id: 'maj-1',
    grade_level: 11,
    academic_year: '2024/2025',
    homeroom_teacher_id: 'tea-1',
    max_students: 36,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    major: mockMajors.find(m => m.id === 'maj-1'),
    homeroom_teacher: mockTeachers.find(t => t.id === 'tea-1')
  }
];

// ============================================
// STUDENTS DATA
// ============================================

export const mockStudents: Student[] = [
  {
    id: 'stu-1',
    user_id: '4',
    student_id: 'STU001',
    class_id: 'cls-1',
    parent_id: '5',
    enrollment_date: '2022-07-01',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    user: mockUsers.find(u => u.id === '4'),
    class: mockClasses.find(c => c.id === 'cls-1'),
    parent: mockUsers.find(u => u.id === '5')
  },
  {
    id: 'stu-2',
    user_id: '7',
    student_id: 'STU002',
    class_id: 'cls-1',
    enrollment_date: '2022-07-01',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    user: mockUsers.find(u => u.id === '7'),
    class: mockClasses.find(c => c.id === 'cls-1')
  }
];

// ============================================
// PARENTS DATA
// ============================================

export const mockParents: Parent[] = [
  {
    id: 'par-1',
    user_id: '5',
    occupation: 'Wiraswasta',
    address: 'Jl. Merdeka No. 123, Jakarta',
    emergency_contact: '081234567894',
    created_at: '2024-01-01T00:00:00Z',
    user: mockUsers.find(u => u.id === '5'),
    children: [mockStudents.find(s => s.id === 'stu-1')].filter(Boolean) as Student[]
  }
];

// ============================================
// CLASS SUBJECTS DATA
// ============================================

export const mockClassSubjects: ClassSubject[] = [
  {
    id: 'cs-1',
    class_id: 'cls-1',
    subject_id: 'sub-1',
    teacher_id: 'tea-1',
    semester: '1',
    academic_year: '2024/2025',
    created_at: '2024-01-01T00:00:00Z',
    class: mockClasses.find(c => c.id === 'cls-1'),
    subject: mockSubjects.find(s => s.id === 'sub-1'),
    teacher: mockTeachers.find(t => t.id === 'tea-1')
  },
  {
    id: 'cs-2',
    class_id: 'cls-1',
    subject_id: 'sub-2',
    teacher_id: 'tea-2',
    semester: '1',
    academic_year: '2024/2025',
    created_at: '2024-01-01T00:00:00Z',
    class: mockClasses.find(c => c.id === 'cls-1'),
    subject: mockSubjects.find(s => s.id === 'sub-2'),
    teacher: mockTeachers.find(t => t.id === 'tea-2')
  }
];

// ============================================
// GRADES DATA
// ============================================

export const mockGrades: Grade[] = [
  {
    id: 'grd-1',
    student_id: 'stu-1',
    subject_id: 'sub-1',
    class_id: 'cls-1',
    assessment_type: 'quiz',
    score: 85,
    max_score: 100,
    percentage: 85,
    semester: '1',
    academic_year: '2024/2025',
    graded_by: 'tea-1',
    graded_at: '2025-01-10T00:00:00Z',
    student: mockStudents.find(s => s.id === 'stu-1'),
    subject: mockSubjects.find(s => s.id === 'sub-1'),
    class: mockClasses.find(c => c.id === 'cls-1'),
    grader: mockTeachers.find(t => t.id === 'tea-1')
  },
  {
    id: 'grd-2',
    student_id: 'stu-1',
    subject_id: 'sub-2',
    class_id: 'cls-1',
    assessment_type: 'assignment',
    score: 78,
    max_score: 100,
    percentage: 78,
    semester: '1',
    academic_year: '2024/2025',
    graded_by: 'tea-2',
    graded_at: '2025-01-09T00:00:00Z',
    student: mockStudents.find(s => s.id === 'stu-1'),
    subject: mockSubjects.find(s => s.id === 'sub-2'),
    class: mockClasses.find(c => c.id === 'cls-1'),
    grader: mockTeachers.find(t => t.id === 'tea-2')
  }
];

export const mockCBTQuestions: CBTQuestion[] = [
  // Soal dari ManageQuestions.tsx
  {
    id: '1',
    question: 'Apa hasil dari 2 + 2?',
    question_type: 'multiple_choice',
    subject_id: 'math-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'easy',
    points: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-1-1',
        question_id: '1',
        option_text: '2',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-1-2',
        question_id: '1',
        option_text: '3',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-1-3',
        question_id: '1',
        option_text: '4',
        is_correct: true,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-1-4',
        question_id: '1',
        option_text: '5',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '2',
    question: 'Identifikasi gambar berikut',
    question_type: 'image',
    subject_id: 'math-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 15,
    media_url: 'https://via.placeholder.com/150',
    media_type: 'image/png',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-2-1',
        question_id: '2',
        option_text: 'Gambar lingkaran',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-2-2',
        question_id: '2',
        option_text: 'Gambar persegi',
        is_correct: true,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-2-3',
        question_id: '2',
        option_text: 'Gambar segitiga',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-2-4',
        question_id: '2',
        option_text: 'Gambar trapesium',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '3',
    question: 'Dengarkan audio berikut dan jawab pertanyaannya',
    question_type: 'audio',
    subject_id: 'music-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 15,
    media_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    media_type: 'audio/mp3',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-3-1',
        question_id: '3',
        option_text: 'SoundHelix Song 1',
        is_correct: true,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-3-2',
        question_id: '3',
        option_text: 'SoundHelix Song 2',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-3-3',
        question_id: '3',
        option_text: 'SoundHelix Song 3',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-3-4',
        question_id: '3',
        option_text: 'SoundHelix Song 4',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '4',
    question: 'Tonton video berikut dan jawab pertanyaannya',
    question_type: 'video',
    subject_id: 'media-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 20,
    media_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    media_type: 'video/mp4',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-4-1',
        question_id: '4',
        option_text: 'Video tentang Big Buck Bunny',
        is_correct: true,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-4-2',
        question_id: '4',
        option_text: 'Video tentang Spongebob',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-4-3',
        question_id: '4',
        option_text: 'Video tentang Upin Ipin',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-4-4',
        question_id: '4',
        option_text: 'Video tentang Naruto',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '5',
    question: 'Manakah hasil dari 3 x 3?',
    question_type: 'multiple_choice',
    subject_id: 'math-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'easy',
    points: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-5-1',
        question_id: '5',
        option_text: '6',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-5-2',
        question_id: '5',
        option_text: '9',
        is_correct: true,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-5-3',
        question_id: '5',
        option_text: '12',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-5-4',
        question_id: '5',
        option_text: '3',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '6',
    question: 'Berapa hasil dari 7 x 8?',
    question_type: 'multiple_choice',
    subject_id: 'math-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-6-1',
        question_id: '6',
        option_text: '54',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-6-2',
        question_id: '6',
        option_text: '56',
        is_correct: true,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-6-3',
        question_id: '6',
        option_text: '58',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-6-4',
        question_id: '6',
        option_text: '60',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '7',
    question: 'Apa nama ibu kota Australia?',
    question_type: 'text',
    subject_id: 'geography-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 15,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-7-1',
        question_id: '7',
        option_text: 'Sydney',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-7-2',
        question_id: '7',
        option_text: 'Melbourne',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-7-3',
        question_id: '7',
        option_text: 'Canberra',
        is_correct: true,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-7-4',
        question_id: '7',
        option_text: 'Perth',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '8',
    question: 'Lihat gambar berikut dan tentukan jenis hewan.',
    question_type: 'image',
    subject_id: 'biology-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'easy',
    points: 10,
    media_url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=150',
    media_type: 'image/jpeg',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-8-1',
        question_id: '8',
        option_text: 'Kucing',
        is_correct: true,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-8-2',
        question_id: '8',
        option_text: 'Anjing',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-8-3',
        question_id: '8',
        option_text: 'Burung',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-8-4',
        question_id: '8',
        option_text: 'Ikan',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '9',
    question: 'Dengarkan audio berikut dan sebutkan instrumen utama.',
    question_type: 'audio',
    subject_id: 'music-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 15,
    media_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    media_type: 'audio/mp3',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-9-1',
        question_id: '9',
        option_text: 'Gitar',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-9-2',
        question_id: '9',
        option_text: 'Piano',
        is_correct: true,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-9-3',
        question_id: '9',
        option_text: 'Drum',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-9-4',
        question_id: '9',
        option_text: 'Saxophone',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '10',
    question: 'Tonton video berikut dan tentukan olahraga yang dimainkan.',
    question_type: 'video',
    subject_id: 'sports-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 20,
    media_url: 'https://www.w3schools.com/html/movie.mp4',
    media_type: 'video/mp4',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-10-1',
        question_id: '10',
        option_text: 'Sepak Bola',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-10-2',
        question_id: '10',
        option_text: 'Basket',
        is_correct: true,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-10-3',
        question_id: '10',
        option_text: 'Tenis',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-10-4',
        question_id: '10',
        option_text: 'Bulu Tangkis',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '11',
    question: 'Siapakah presiden pertama Indonesia?',
    question_type: 'text',
    subject_id: 'history-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'easy',
    points: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-11-1',
        question_id: '11',
        option_text: 'Soekarno',
        is_correct: true,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-11-2',
        question_id: '11',
        option_text: 'Soeharto',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-11-3',
        question_id: '11',
        option_text: 'Habibie',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-11-4',
        question_id: '11',
        option_text: 'Megawati',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '12',
    question: 'Pilih gambar yang menunjukkan bendera Indonesia.',
    question_type: 'image',
    subject_id: 'civics-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'easy',
    points: 10,
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg',
    media_type: 'image/svg+xml',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-12-1',
        question_id: '12',
        option_text: 'Bendera Merah Putih',
        is_correct: true,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-12-2',
        question_id: '12',
        option_text: 'Bendera Biru Putih',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-12-3',
        question_id: '12',
        option_text: 'Bendera Hijau Kuning',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-12-4',
        question_id: '12',
        option_text: 'Bendera Merah Kuning',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '13',
    question: 'Dengarkan audio berikut dan tentukan bahasa yang digunakan.',
    question_type: 'audio',
    subject_id: 'language-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'medium',
    points: 15,
    media_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    media_type: 'audio/mp3',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-13-1',
        question_id: '13',
        option_text: 'Indonesia',
        is_correct: true,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-13-2',
        question_id: '13',
        option_text: 'Inggris',
        is_correct: false,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-13-3',
        question_id: '13',
        option_text: 'Jepang',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-13-4',
        question_id: '13',
        option_text: 'Arab',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '14',
    question: 'Tonton video berikut dan tentukan nama tokoh kartun.',
    question_type: 'video',
    subject_id: 'media-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'easy',
    points: 10,
    media_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    media_type: 'video/mp4',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-14-1',
        question_id: '14',
        option_text: 'Naruto',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-14-2',
        question_id: '14',
        option_text: 'Spongebob',
        is_correct: true,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-14-3',
        question_id: '14',
        option_text: 'Doraemon',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-14-4',
        question_id: '14',
        option_text: 'Upin',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  {
    id: '15',
    question: 'Manakah hasil dari 12 / 4?',
    question_type: 'multiple_choice',
    subject_id: 'math-001',
    teacher_id: 'teacher-001',
    difficulty_level: 'easy',
    points: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    options: [
      {
        id: 'opt-15-1',
        question_id: '15',
        option_text: '2',
        is_correct: false,
        option_order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-15-2',
        question_id: '15',
        option_text: '3',
        is_correct: true,
        option_order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-15-3',
        question_id: '15',
        option_text: '4',
        is_correct: false,
        option_order: 3,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 'opt-15-4',
        question_id: '15',
        option_text: '6',
        is_correct: false,
        option_order: 4,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  }
];

// ============================================
// CBT SESSIONS DATA
// ============================================

export const mockCBTSessions: CBTSession[] = [
  {
    id: 'cbt-1',
    title: 'Ujian Tengah Semester - Matematika',
    description: 'Ujian tengah semester untuk mata pelajaran Matematika',
    subject_id: 'sub-1',
    class_id: 'cls-1',
    teacher_id: 'tea-1',
    start_time: '2025-01-15T08:00:00Z',
    end_time: '2025-01-15T10:00:00Z',
    duration_minutes: 120,
    total_questions: 25,
    passing_score: 75,
    shuffle_questions: true,
    show_results: true,
    is_active: true,
    created_at: '2025-01-10T08:00:00Z',
    updated_at: '2025-01-10T08:00:00Z'
  },
  {
    id: 'cbt-2',
    title: 'Quiz Integral',
    description: 'Quiz singkat tentang integral',
    subject_id: 'sub-1',
    class_id: 'cls-1',
    teacher_id: 'tea-1',
    start_time: '2025-01-10T09:00:00Z',
    end_time: '2025-01-10T09:30:00Z',
    duration_minutes: 30,
    total_questions: 10,
    passing_score: 70,
    shuffle_questions: false,
    show_results: true,
    is_active: false,
    created_at: '2025-01-05T08:00:00Z',
    updated_at: '2025-01-10T09:30:00Z'
  }
];

// ============================================
// CBT ATTEMPTS DATA
// ============================================

export const mockCBTAttempts: CBTAttempt[] = [
  {
    id: 'att-1',
    session_id: 'cbt-1',
    student_id: 'stu-1',
    start_time: '2025-01-15T09:00:00Z',
    end_time: '2025-01-15T10:30:00Z',
    total_score: 85,
    max_score: 100,
    percentage: 85,
    status: 'completed',
    created_at: '2025-01-15T09:00:00Z'
  },
  {
    id: 'att-2',
    session_id: 'cbt-1',
    student_id: 'stu-2',
    start_time: '2025-01-15T09:00:00Z',
    end_time: '2025-01-15T10:15:00Z',
    total_score: 92,
    max_score: 100,
    percentage: 92,
    status: 'completed',
    created_at: '2025-01-15T09:00:00Z'
  }
];

// ============================================
// CBT ANSWERS DATA
// ============================================

export const mockCBTAnswers: CBTAnswer[] = [
  {
    id: 'ans-1',
    attempt_id: 'att-1',
    question_id: 'q1',
    selected_option_id: 'opt-1-3',
    is_correct: true,
    points_earned: 10,
    answered_at: '2025-01-15T09:15:00Z'
  },
  {
    id: 'ans-2',
    attempt_id: 'att-1',
    question_id: 'q2',
    selected_option_id: 'opt-2-1',
    is_correct: false,
    points_earned: 0,
    answered_at: '2025-01-15T09:16:00Z'
  }
];

// ============================================
// ATTENDANCE RECORDS DATA
// ============================================

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'rec-1',
    attendance_id: 'att-1',
    student_id: 'stu-1',
    status: 'present',
    notes: '',
    recorded_at: '2025-01-15T07:30:00Z',
    recorded_by: 'tea-1',
    student: {
      id: 'stu-1',
      user_id: '4',
      student_id: 'STU001',
      class_id: 'cls-1',
      status: 'active',
      created_at: '2025-01-15T08:00:00Z',
      user: {
        id: '4',
        email: 'andi@school.com',
        name: 'Andi Pratama',
        role: 'student',
        is_active: true,
        created_at: '2025-01-15T08:00:00Z',
        updated_at: '2025-01-15T08:00:00Z'
      }
    }
  },
  {
    id: 'rec-2',
    attendance_id: 'att-1',
    student_id: 'stu-2',
    status: 'late',
    notes: 'Terlambat 15 menit',
    recorded_at: '2025-01-15T07:45:00Z',
    recorded_by: 'tea-1',
    student: {
      id: 'stu-2',
      user_id: '7',
      student_id: 'STU002',
      class_id: 'cls-1',
      status: 'active',
      created_at: '2025-01-15T08:00:00Z',
      user: {
        id: '7',
        email: 'sari@school.com',
        name: 'Sari Wulandari',
        role: 'student',
        is_active: true,
        created_at: '2025-01-15T08:00:00Z',
        updated_at: '2025-01-15T08:00:00Z'
      }
    }
  }
];

// ============================================
// ASSIGNMENTS DATA
// ============================================

export const mockAssignments: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Tugas Matematika - Integral',
    description: 'Kerjakan soal integral pada buku halaman 45-50',
    subject_id: 'sub-1',
    class_id: 'cls-1',
    teacher_id: 'tea-1',
    due_date: '2025-01-20T23:59:59Z',
    assignment_type: 'homework',
    submission_type: 'text',
    max_score: 100,
    is_published: true,
    created_at: '2025-01-15T08:00:00Z',
    updated_at: '2025-01-15T08:00:00Z'
  },
  {
    id: 'asg-2',
    title: 'Project Fisika - Gerak Parabola',
    description: 'Buat laporan percobaan gerak parabola',
    subject_id: 'sub-2',
    class_id: 'cls-1',
    teacher_id: 'tea-1',
    due_date: '2025-01-25T23:59:59Z',
    assignment_type: 'project',
    submission_type: 'file',
    max_score: 100,
    is_published: true,
    created_at: '2025-01-15T08:00:00Z',
    updated_at: '2025-01-15T08:00:00Z'
  }
];

// ============================================
// LEARNING MATERIALS DATA
// ============================================

export const mockLearningMaterials: LearningMaterial[] = [
  {
    id: 'mat-1',
    title: 'Integral Tak Tentu',
    description: 'Materi pembelajaran tentang integral tak tentu',
    subject_id: 'sub-1',
    class_id: 'cls-1',
    teacher_id: 'tea-1',
    material_type: 'document',
    file_url: '/materials/integral-tak-tentu.pdf',
    file_type: 'application/pdf',
    file_size: 2516582,
    is_published: true,
    published_at: '2025-01-08T08:00:00Z',
    created_at: '2025-01-08T08:00:00Z',
    updated_at: '2025-01-08T08:00:00Z'
  },
  {
    id: 'mat-2',
    title: 'Rumus Trigonometri',
    description: 'Kumpulan rumus trigonometri lengkap',
    subject_id: 'sub-1',
    class_id: 'cls-1',
    teacher_id: 'tea-1',
    material_type: 'document',
    file_url: '/materials/rumus-trigonometri.pdf',
    file_type: 'application/pdf',
    file_size: 1887437,
    is_published: true,
    published_at: '2025-01-05T08:00:00Z',
    created_at: '2025-01-05T08:00:00Z',
    updated_at: '2025-01-05T08:00:00Z'
  },
  {
    id: 'mat-3',
    title: 'Video Penjelasan Limit',
    description: 'Video pembelajaran tentang konsep limit',
    subject_id: 'sub-1',
    class_id: 'cls-1',
    teacher_id: 'tea-1',
    material_type: 'video',
    file_url: '/materials/video-limit.mp4',
    file_type: 'video/mp4',
    file_size: 47185920,
    is_published: true,
    published_at: '2025-01-03T08:00:00Z',
    created_at: '2025-01-03T08:00:00Z',
    updated_at: '2025-01-03T08:00:00Z'
  }
];