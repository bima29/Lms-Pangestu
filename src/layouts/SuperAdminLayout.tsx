import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings,
  BarChart3,
  Shield
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const SuperAdminLayout: React.FC = () => {
  const sidebarItems = [
    // Dashboard
    { name: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
    // School Management
    { name: 'Manajemen Sekolah', path: '/super-admin/schools', icon: Building2 },
    // User Management
    { name: 'Manajemen Pengguna', path: '/super-admin/users', icon: Users },
    // System Settings
    { name: 'Pengaturan Sistem', path: '/super-admin/system-settings', icon: Settings },
    // Reports
    { name: 'Laporan Sistem', path: '/super-admin/reports', icon: BarChart3 },
    // Security
    { name: 'Keamanan', path: '/super-admin/security', icon: Shield },
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

export default SuperAdminLayout;
