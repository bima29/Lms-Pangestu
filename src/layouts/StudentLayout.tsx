import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Trophy 
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const StudentLayout: React.FC = () => {
  const sidebarItems = [
    { name: 'Home', path: '/student/home', icon: Home },
    { name: 'CBT', path: '/student/cbt', icon: FileText },
    { name: 'Grades', path: '/student/grades', icon: Trophy },
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

export default StudentLayout;