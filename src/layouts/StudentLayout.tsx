import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard,
  GraduationCap,
  FileText, 
  Trophy,
  BookOpen,
  Calendar,
  ClipboardList,
  MessageSquare,
  UserCheck,
  MessageCircle,
  FileBarChart
} from 'lucide-react';
import Header from '../components/ui/Header';
import HierarchicalSidebar from '../components/ui/HierarchicalSidebar';

const StudentLayout: React.FC = () => {
  const sidebarGroups = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Pembelajaran',
      items: [
        { name: 'Kelas Saya', path: '/student/classes', icon: GraduationCap },
        { name: 'Materi Pelajaran', path: '/student/materials', icon: BookOpen },
        { name: 'Tugas & PR', path: '/student/assignments', icon: ClipboardList },
        { name: 'Jadwal Pelajaran', path: '/student/schedule', icon: Calendar }
      ]
    },
    {
      title: 'Penilaian',
      items: [
        { name: 'CBT/Ujian', path: '/student/cbt', icon: FileText },
        { name: 'Absensi Saya', path: '/student/attendance', icon: UserCheck },
        { name: 'Laporan Nilai', path: '/student/grades', icon: Trophy },
        { name: 'Rapor', path: '/student/report', icon: FileBarChart }
      ]
    },
    {
      title: 'Komunikasi',
      items: [
        { name: 'Forum Siswa', path: '/student/forum', icon: MessageSquare },
        { name: 'Chat', path: '/student/chat', icon: MessageCircle }
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

export default StudentLayout;