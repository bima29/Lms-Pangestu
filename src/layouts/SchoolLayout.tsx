import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  FileText, 
  BarChart3,
  Layers,
  BookOpen,
  Settings,
  UserCheck,
  Bell,
  ClipboardList,
  Building,
  CalendarDays,
  MessageSquare
} from 'lucide-react';
import Header from '../components/ui/Header';
import HierarchicalSidebar from '../components/ui/HierarchicalSidebar';

const SchoolLayout: React.FC = () => {
  const sidebarGroups = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Dashboard', path: '/school/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Profil Sekolah',
      items: [
        { name: 'Profil Sekolah', path: '/school/profile', icon: Building },
        { name: 'Tahun Akademik', path: '/school/academic-year', icon: CalendarDays }
      ]
    },
    {
      title: 'Manajemen Pengguna',
      items: [
        { name: 'Pengguna', path: '/school/users', icon: Users }
      ]
    },
    {
      title: 'Manajemen Akademik',
      items: [
        { name: 'Jurusan', path: '/school/majors', icon: GraduationCap },
        { name: 'Kelas', path: '/school/classes', icon: GraduationCap },
        { name: 'Mata Pelajaran', path: '/school/subjects', icon: BookOpen },
        { name: 'Kelas & Mapel', path: '/school/class-subjects', icon: Layers },
        { name: 'Jadwal Pelajaran', path: '/school/schedules', icon: Calendar }
      ]
    },
    {
      title: 'Pembelajaran',
      items: [
        { name: 'Materi', path: '/school/materials', icon: BookOpen },
        { name: 'Tugas', path: '/school/assignments', icon: ClipboardList }
      ]
    },
    {
      title: 'Penilaian',
      items: [
        { name: 'CBT/Ujian', path: '/school/cbt', icon: FileText },
        { name: 'Absensi', path: '/school/attendance', icon: UserCheck },
        { name: 'Nilai', path: '/school/grades', icon: BarChart3 }
      ]
    },
    {
      title: 'Komunikasi',
      items: [
        { name: 'Pengumuman', path: '/school/announcements', icon: Bell },
        { name: 'Notifikasi', path: '/school/notifications', icon: Bell },
        { name: 'Forum Diskusi', path: '/school/forum', icon: MessageSquare }
      ]
    },
    {
      title: 'Laporan & Pengaturan',
      items: [
        { name: 'Laporan', path: '/school/reports', icon: BarChart3 },
        { name: 'Pengaturan', path: '/school/settings', icon: Settings }
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

export default SchoolLayout;