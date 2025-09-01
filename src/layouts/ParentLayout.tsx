import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Users, 
  Trophy, 
  Bell 
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const ParentLayout: React.FC = () => {
  const sidebarItems = [
    { name: 'Children', path: '/parent/children', icon: Users },
    { name: 'Grades', path: '/parent/grades', icon: Trophy },
    { name: 'Notifications', path: '/parent/notifications', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;