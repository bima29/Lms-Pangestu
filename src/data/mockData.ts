import { User, Student, Grade, CBTQuestion } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'super@lms.com',
    name: 'Super Administrator',
    role: 'super_admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    email: 'admin@school.com',
    name: 'Admin Sekolah',
    role: 'school_admin',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '3',
    email: 'guru@school.com',
    name: 'Pak Budi Santoso',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '4',
    email: 'siswa@school.com',
    name: 'Andi Pratama',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '5',
    email: 'ortu@school.com',
    name: 'Ibu Siti Nurhaliza',
    role: 'parent',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Andi Pratama',
    class: 'XII IPA 1',
    email: 'andi@school.com',
    avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    grades: [
      { subject: 'Matematika', score: 85, maxScore: 100, date: '2025-01-10' },
      { subject: 'Fisika', score: 78, maxScore: 100, date: '2025-01-09' },
      { subject: 'Kimia', score: 92, maxScore: 100, date: '2025-01-08' },
    ]
  },
  {
    id: '2',
    name: 'Sari Wulandari',
    class: 'XII IPA 1',
    email: 'sari@school.com',
    avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    grades: [
      { subject: 'Matematika', score: 90, maxScore: 100, date: '2025-01-10' },
      { subject: 'Fisika', score: 85, maxScore: 100, date: '2025-01-09' },
      { subject: 'Kimia', score: 88, maxScore: 100, date: '2025-01-08' },
    ]
  }
];

export const mockCBTQuestions: CBTQuestion[] = [
  {
    id: '1',
    question: 'Manakah dari berikut ini yang merupakan rumus luas lingkaran?',
    options: ['πr²', '2πr', 'πd', '4πr²'],
    correctAnswer: 0
  },
  {
    id: '2',
    question: 'Hasil dari 15 + 25 × 2 adalah?',
    options: ['80', '65', '55', '70'],
    correctAnswer: 1
  },
  {
    id: '3',
    question: 'Siapakah proklamator kemerdekaan Indonesia?',
    options: ['Soekarno dan Mohammad Hatta', 'Soekarno dan Soeharto', 'Mohammad Hatta dan Soeharto', 'Soekarno dan Sjahrir'],
    correctAnswer: 0
  },
  {
    id: '4',
    question: 'Berapakah nilai dari sin 90°?',
    options: ['0', '1', '√2/2', '√3/2'],
    correctAnswer: 1
  },
  {
    id: '5',
    question: 'Apa ibu kota provinsi Jawa Tengah?',
    options: ['Yogyakarta', 'Surakarta', 'Semarang', 'Magelang'],
    correctAnswer: 2
  }
];