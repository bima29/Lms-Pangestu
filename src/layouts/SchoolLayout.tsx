import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Folder, 
  BarChart3,
  Layers,
  BookOpen
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const SchoolLayout: React.FC = () => {
  const sidebarItems = [
    { name: 'Dashboard', path: '/school/dashboard', icon: LayoutDashboard },
    { name: 'Manajemen Kelas', path: '/school/class-management', icon: Layers },
    { name: 'Manajemen Jurusan', path: '/school/major-management', icon: BookOpen },
    { name: 'Manajemen Mata Pelajaran', path: '/school/subjects', icon: BookOpen },
    { name: 'Users', path: '/school/users', icon: Users },
    { name: 'Classes', path: '/school/classes', icon: GraduationCap },
    { name: 'Schedules', path: '/school/schedules', icon: Calendar },
    { name: 'CBT', path: '/school/cbt', icon: FileText },
    { name: 'Documents', path: '/school/documents', icon: Folder },

    { name: 'Reports', path: '/school/reports', icon: BarChart3 },
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

export default SchoolLayout;