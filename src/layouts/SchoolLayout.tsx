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
  ClipboardList
} from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

const SchoolLayout: React.FC = () => {
  const sidebarItems = [
    // Dashboard
    { name: 'Dashboard', path: '/school/dashboard', icon: LayoutDashboard },
    
    // User Management
    { name: 'Manajemen Pengguna', path: '/school/users', icon: Users },
    
    // Academic Management
    { name: 'Manajemen Jurusan', path: '/school/majors', icon: GraduationCap },
    { name: 'Manajemen Kelas', path: '/school/classes', icon: GraduationCap },
    { name: 'Mata Pelajaran', path: '/school/subjects', icon: BookOpen },
    { name: 'Kelas & Mapel', path: '/school/class-subjects', icon: Layers },
    { name: 'Jadwal Pelajaran', path: '/school/schedules', icon: Calendar },
    
    // Learning Management
    { name: 'Materi Pembelajaran', path: '/school/materials', icon: BookOpen },
    { name: 'Tugas & Penugasan', path: '/school/assignments', icon: ClipboardList },
    
    // Assessment Management
    { name: 'CBT/Ujian', path: '/school/cbt', icon: FileText },
    { name: 'Absensi', path: '/school/attendance', icon: UserCheck },
    { name: 'Nilai & Penilaian', path: '/school/grades', icon: BarChart3 },
    
    // Communication
    { name: 'Pengumuman', path: '/school/announcements', icon: Bell },
    { name: 'Notifikasi', path: '/school/notifications', icon: Bell },
    
    // Reports & Settings
    { name: 'Laporan', path: '/school/reports', icon: BarChart3 },
    { name: 'Pengaturan Sekolah', path: '/school/settings', icon: Settings },
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

export default SchoolLayout;