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
  Edit
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const TeacherLayout: React.FC = () => {
  const sidebarItems = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'Kelas Saya', path: '/teacher/classes', icon: GraduationCap },
    { name: 'Materi Pembelajaran', path: '/teacher/materials', icon: BookOpen },
    { name: 'Tugas & Penugasan', path: '/teacher/assignments', icon: ClipboardList },
    { name: 'CBT/Ujian', path: '/teacher/cbt', icon: FileText },
    { name: 'Bank Soal', path: '/teacher/manage-questions', icon: HelpCircle },
    { name: 'Peserta CBT', path: '/teacher/cbt-participants', icon: Eye },
    { name: 'Jawaban Siswa', path: '/teacher/view-student-answers', icon: Eye },
    { name: 'Koreksi Manual', path: '/teacher/manual-correction', icon: Edit },
    { name: 'Absensi Siswa', path: '/teacher/attendance', icon: UserCheck },
    { name: 'Buku Nilai', path: '/teacher/gradebook', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-shrink-0">
        <Sidebar items={sidebarItems} />
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