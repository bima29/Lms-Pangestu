import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users, 
  Trophy, 
  Bell
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const ParentLayout: React.FC = () => {
  const sidebarItems = [
    { name: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
    { name: 'Data Anak', path: '/parent/children', icon: Users },
    { name: 'Nilai Anak', path: '/parent/grades', icon: Trophy },
    { name: 'Notifikasi', path: '/parent/notifications', icon: Bell },
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

export default ParentLayout;