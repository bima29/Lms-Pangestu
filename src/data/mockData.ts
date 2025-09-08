import { User, Student, CBTQuestion } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'super@lms.com',
    name: 'Super Administrator',
    role: 'super_admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: ''
  },
  {
    id: '2',
    email: 'admin@school.com',
    name: 'Admin Sekolah',
    role: 'school_admin',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: ''
  },
  {
    id: '3',
    email: 'guru@school.com',
    name: 'Pak Budi Santoso',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: ''
  },
  {
    id: '4',
    email: 'siswa@school.com',
    name: 'Andi Pratama',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: ''
  },
  {
    id: '5',
    email: 'ortu@school.com',
    name: 'Ibu Siti Nurhaliza',
    role: 'parent',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: ''
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
  // Soal dari ManageQuestions.tsx
  {
    id: '1',
    question: 'Apa hasil dari 2 + 2?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    type: 'multiple_choice'
  },
  {
    id: '2',
    question: 'Identifikasi gambar berikut',
    options: ['Gambar lingkaran', 'Gambar persegi', 'Gambar segitiga', 'Gambar trapesium'],
    correctAnswer: 1,
    type: 'image',
    mediaUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    question: 'Dengarkan audio berikut dan jawab pertanyaannya',
    options: ['SoundHelix Song 1', 'SoundHelix Song 2', 'SoundHelix Song 3', 'SoundHelix Song 4'],
    correctAnswer: 0,
    type: 'audio',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '4',
    question: 'Tonton video berikut dan jawab pertanyaannya',
    options: ['Video tentang Big Buck Bunny', 'Video tentang Spongebob', 'Video tentang Upin Ipin', 'Video tentang Naruto'],
    correctAnswer: 0,
    type: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '5',
    question: 'Manakah hasil dari 3 x 3?',
    options: ['6', '9', '12', '3'],
    correctAnswer: 1,
    type: 'multiple_choice'
  },
    {
      id: '6',
      question: 'Berapa hasil dari 7 x 8?',
      options: ['54', '56', '58', '60'],
      correctAnswer: 1,
      type: 'multiple_choice'
    },
    {
      id: '7',
      question: 'Apa nama ibu kota Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      correctAnswer: 2,
      type: 'text'
    },
    {
      id: '8',
      question: 'Lihat gambar berikut dan tentukan jenis hewan.',
      options: ['Kucing', 'Anjing', 'Burung', 'Ikan'],
      correctAnswer: 0,
      type: 'image',
      mediaUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=150'
    },
    {
      id: '9',
      question: 'Dengarkan audio berikut dan sebutkan instrumen utama.',
      options: ['Gitar', 'Piano', 'Drum', 'Saxophone'],
      correctAnswer: 1,
      type: 'audio',
      mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      id: '10',
      question: 'Tonton video berikut dan tentukan olahraga yang dimainkan.',
      options: ['Sepak Bola', 'Basket', 'Tenis', 'Bulu Tangkis'],
      correctAnswer: 1,
      type: 'video',
      mediaUrl: 'https://www.w3schools.com/html/movie.mp4'
    },
    {
      id: '11',
      question: 'Siapakah presiden pertama Indonesia?',
      options: ['Soekarno', 'Soeharto', 'Habibie', 'Megawati'],
      correctAnswer: 0,
      type: 'text'
    },
    {
      id: '12',
      question: 'Pilih gambar yang menunjukkan bendera Indonesia.',
      options: ['Bendera Merah Putih', 'Bendera Biru Putih', 'Bendera Hijau Kuning', 'Bendera Merah Kuning'],
      correctAnswer: 0,
      type: 'image',
      mediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg'
    },
    {
      id: '13',
      question: 'Dengarkan audio berikut dan tentukan bahasa yang digunakan.',
      options: ['Indonesia', 'Inggris', 'Jepang', 'Arab'],
      correctAnswer: 0,
      type: 'audio',
      mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      id: '14',
      question: 'Tonton video berikut dan tentukan nama tokoh kartun.',
      options: ['Naruto', 'Spongebob', 'Doraemon', 'Upin'],
      correctAnswer: 1,
      type: 'video',
      mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: '15',
      question: 'Manakah hasil dari 12 / 4?',
      options: ['2', '3', '4', '6'],
      correctAnswer: 1,
      type: 'multiple_choice'
    },
 
];