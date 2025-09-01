import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  UserCheck 
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const TeacherLayout: React.FC = () => {
  const sidebarItems = [
    { name: 'Classes', path: '/teacher/classes', icon: GraduationCap },
    { name: 'Materials', path: '/teacher/materials', icon: BookOpen },
    { name: 'CBT', path: '/teacher/cbt', icon: FileText },
    { name: 'Attendance', path: '/teacher/attendance', icon: UserCheck },
  ];

  // Patch Sidebar to treat /teacher/cbt and /teacher/CBTViewParticipants as active for CBT
  const patchSidebarItems = sidebarItems.map(item =>
    item.name === 'CBT'
      ? { ...item, path: [
          '/teacher/cbt',
          '/teacher/CBTViewParticipants',
          '/teacher/manage-questions',
          '/teacher/materials/manage-questions',
          '/teacher/view-student-answers',
          '/teacher/manual-correction'
        ] }
      : item
  );

  return (
    <div className="flex h-screen bg-gray-50">
  <Sidebar items={patchSidebarItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;