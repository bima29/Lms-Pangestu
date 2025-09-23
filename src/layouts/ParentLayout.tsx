import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users, 
  Trophy, 
  Bell,
  Calendar,
  ClipboardList,
  UserCheck,
  MessageCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import Header from '../components/ui/Header';
import HierarchicalSidebar from '../components/ui/HierarchicalSidebar';

const ParentLayout: React.FC = () => {
  const sidebarGroups = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Data Anak',
      items: [
        { name: 'Profil Anak', path: '/parent/children', icon: Users }
      ]
    },
    {
      title: 'Akademik',
      items: [
        { name: 'Jadwal Anak', path: '/parent/schedule', icon: Calendar },
        { name: 'Tugas Anak', path: '/parent/assignments', icon: ClipboardList },
        { name: 'Nilai Anak', path: '/parent/grades', icon: Trophy }
      ]
    },
    {
      title: 'Kehadiran',
      items: [
        { name: 'Absensi Anak', path: '/parent/attendance', icon: UserCheck },
        { name: 'Ringkasan Absensi', path: '/parent/attendance-summary', icon: BarChart3 }
      ]
    },
    {
      title: 'Laporan & Komunikasi',
      items: [
        { name: 'Laporan Perkembangan', path: '/parent/progress', icon: TrendingUp },
        { name: 'Chat dengan Guru', path: '/parent/chat', icon: MessageCircle },
        { name: 'Notifikasi', path: '/parent/notifications', icon: Bell }
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

export default ParentLayout;