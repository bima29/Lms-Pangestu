import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings,
  BarChart3,
  GraduationCap,
  MessageSquare,
  HardDrive} from 'lucide-react';
import Header from '../components/ui/Header';
import HierarchicalSidebar from '../components/ui/HierarchicalSidebar';

const SuperAdminLayout: React.FC = () => {
  const sidebarGroups = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Manajemen Sekolah',
      items: [
        { name: 'Sekolah', path: '/super-admin/schools', icon: Building2 },
        { name: 'Pengguna', path: '/super-admin/users', icon: Users }
      ]
    },
    {
      title: 'Akademik Global',
      items: [
        { 
          name: 'Manajemen Akademik', 
          path: '/super-admin/academic-global', 
          icon: GraduationCap
        }
      ]
    },
    {
      title: 'Komunikasi',
      items: [
        { 
          name: 'Pusat Komunikasi', 
          path: '/super-admin/communication', 
          icon: MessageSquare
        }
      ]
    },
    {
      title: 'Sistem',
      items: [
        { name: 'Pengaturan Sistem', path: '/super-admin/system-settings', icon: Settings },
        { name: 'Backup & Restore', path: '/super-admin/backup', icon: HardDrive },
        { name: 'Laporan Sistem', path: '/super-admin/reports', icon: BarChart3 }
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

export default SuperAdminLayout;
