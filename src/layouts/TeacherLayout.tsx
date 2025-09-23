import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard,
  GraduationCap, 
  BookOpen, 
  FileText, 
  UserCheck,
  BarChart3,
  ClipboardList,
  HelpCircle,
  Eye,
  Edit,
  Users,
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import Header from '../components/ui/Header';
import HierarchicalSidebar from '../components/ui/HierarchicalSidebar';

const TeacherLayout: React.FC = () => {
  const sidebarGroups = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Manajemen Kelas',
      items: [
        { name: 'Kelas Saya', path: '/teacher/classes', icon: GraduationCap },
        { name: 'Daftar Siswa', path: '/teacher/students', icon: Users }
      ]
    },
    {
      title: 'Pembelajaran',
      items: [
        { name: 'Materi', path: '/teacher/materials', icon: BookOpen },
        { name: 'Tugas', path: '/teacher/assignments', icon: ClipboardList }
      ]
    },
    {
      title: 'Penilaian',
      items: [
        { 
          name: 'CBT/Ujian', 
          path: '/teacher/cbt', 
          icon: FileText,
          children: [
            { name: 'Bank Soal', path: '/teacher/manage-questions', icon: HelpCircle },
            { name: 'Peserta CBT', path: '/teacher/cbt-participants', icon: Eye },
            { name: 'Jawaban Siswa', path: '/teacher/view-student-answers', icon: Eye },
            { name: 'Koreksi Manual', path: '/teacher/manual-correction', icon: Edit }
          ]
        },
        { name: 'Absensi', path: '/teacher/attendance', icon: UserCheck },
        { name: 'Buku Nilai', path: '/teacher/gradebook', icon: BarChart3 }
      ]
    },
    {
      title: 'Komunikasi',
      items: [
        { name: 'Forum Guru', path: '/teacher/forum', icon: MessageSquare },
        { name: 'Chat', path: '/teacher/chat', icon: MessageCircle }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-shrink-0">
        <HierarchicalSidebar groups={sidebarGroups} />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 custom-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;