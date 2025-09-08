import React from 'react';
import { Users, GraduationCap, FileText, Award } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import { Student } from '../../types';

// Activity interface for dashboard activities
interface Activity {
  id: string;
  title: string;
  type: 'cbt' | 'material' | 'attendance' | 'announcement';
  description?: string;
  created_at: string;
  created_by: string;
  creator?: {
    id: string;
    name: string;
    role: string;
  };
}

// Dashboard statistics interface
interface DashboardStats {
  total_students: number;
  total_teachers: number;
  active_cbt_sessions: number;
  average_grade: number;
  student_growth: number;
  teacher_growth: number;
  grade_improvement: number;
}

const SchoolDashboard: React.FC = () => {
  const recentActivities: Activity[] = [
    {
      id: 'a1',
      title: 'Ujian Matematika XII IPA 1',
      type: 'cbt',
      description: 'CBT Matematika untuk kelas XII IPA 1',
      created_at: '2025-01-10T14:50:00Z',
      created_by: 'teacher1',
      creator: {
        id: 'teacher1',
        name: 'Budi Santoso',
        role: 'teacher'
      }
    },
    {
      id: 'a2',
      title: 'Upload Materi Fisika',
      type: 'material',
      description: 'Materi pembelajaran Fisika bab Gelombang',
      created_at: '2025-01-10T14:35:00Z',
      created_by: 'teacher2',
      creator: {
        id: 'teacher2',
        name: 'Sari Dewi',
        role: 'teacher'
      }
    },
    {
      id: 'a3',
      title: 'Absensi Kelas XI IPS 2',
      type: 'attendance',
      description: 'Pencatatan kehadiran siswa kelas XI IPS 2',
      created_at: '2025-01-10T13:00:00Z',
      created_by: 'teacher3',
      creator: {
        id: 'teacher3',
        name: 'Ahmad Rizki',
        role: 'teacher'
      }
    },
    {
      id: 'a4',
      title: 'Pengumuman Libur Semester',
      type: 'announcement',
      description: 'Pengumuman jadwal libur semester genap',
      created_at: '2025-01-10T12:00:00Z',
      created_by: 'admin1',
      creator: {
        id: 'admin1',
        name: 'Admin Sekolah',
        role: 'school_admin'
      }
    }
  ];

  // Mock students data with proper interface
  const mockStudents: Student[] = [
    {
      id: 'st1',
      student_id: 'SIS001',
      user_id: 'u1',
      class_id: 'c1',
      parent_id: 'p1',
      enrollment_date: '2024-07-15',
      status: 'active',
      created_at: '2024-07-15T00:00:00Z',
      user: {
        id: 'u1',
        name: 'Ahmad Fauzi',
        email: 'ahmad.fauzi@student.sch.id',
        role: 'student',
        is_active: true,
        created_at: '2024-07-15T00:00:00Z',
        updated_at: '2024-07-15T00:00:00Z'
      },
      class: {
        id: 'c1',
        name: 'XII IPA 1',
        grade_level: 12,
        academic_year: '2024/2025',
        max_students: 36,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      }
    },
    {
      id: 'st2',
      student_id: 'SIS002',
      user_id: 'u2',
      class_id: 'c2',
      parent_id: 'p2',
      enrollment_date: '2024-07-15',
      status: 'active',
      created_at: '2024-07-15T00:00:00Z',
      user: {
        id: 'u2',
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@student.sch.id',
        role: 'student',
        is_active: true,
        created_at: '2024-07-15T00:00:00Z',
        updated_at: '2024-07-15T00:00:00Z'
      },
      class: {
        id: 'c2',
        name: 'XI IPS 2',
        grade_level: 11,
        academic_year: '2024/2025',
        max_students: 36,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      }
    },
    {
      id: 'st3',
      student_id: 'SIS003',
      user_id: 'u3',
      class_id: 'c3',
      parent_id: 'p3',
      enrollment_date: '2024-07-15',
      status: 'active',
      created_at: '2024-07-15T00:00:00Z',
      user: {
        id: 'u3',
        name: 'Budi Santoso',
        email: 'budi.santoso@student.sch.id',
        role: 'student',
        is_active: true,
        created_at: '2024-07-15T00:00:00Z',
        updated_at: '2024-07-15T00:00:00Z'
      },
      class: {
        id: 'c3',
        name: 'X MIPA 1',
        grade_level: 10,
        academic_year: '2024/2025',
        max_students: 36,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      }
    }
  ];

  const columns = [
    { key: 'name', header: 'Nama' },
    { key: 'class', header: 'Kelas' },
    { key: 'email', header: 'Email' },
  ];

  // Transform student data for table display
  const studentTableData = mockStudents.map(student => ({
    name: student.user?.name || '',
    class: student.class?.name || '',
    email: student.user?.email || ''
  }));

  // Dashboard statistics
  const dashboardStats: DashboardStats = {
    total_students: 1248,
    total_teachers: 89,
    active_cbt_sessions: 15,
    average_grade: 82.5,
    student_growth: 5,
    teacher_growth: 2,
    grade_improvement: 3
  };

  // Helper function to format time ago
  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit lalu`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} jam lalu`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} hari lalu`;
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-900 tracking-tight">
          Dashboard Sekolah
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Selamat datang di sistem manajemen pembelajaran sekolah
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Siswa"
          value={dashboardStats.total_students}
          icon={Users}
          color="blue"
          trend={{ value: dashboardStats.student_growth, isPositive: true }}
        />
        <StatCard
          title="Total Guru"
          value={dashboardStats.total_teachers}
          icon={GraduationCap}
          color="green"
          trend={{ value: dashboardStats.teacher_growth, isPositive: true }}
        />
        <StatCard
          title="CBT Aktif"
          value={dashboardStats.active_cbt_sessions}
          icon={FileText}
          color="yellow"
        />
        <StatCard
          title="Rata-rata Nilai"
          value={dashboardStats.average_grade}
          icon={Award}
          color="green"
          trend={{ value: dashboardStats.grade_improvement, isPositive: true }}
        />
      </div>

      {/* Konten utama */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tabel siswa */}
        <div className="lg:col-span-2">
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-primary-900 mb-4">
              Siswa Terbaru
            </h3>
            <div className="overflow-x-auto">
              <Table columns={columns} data={studentTableData} />
            </div>
          </Card>
        </div>

        {/* Sidebar kanan */}
        <div className="space-y-6">
          {/* Aktivitas */}
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-primary-900 mb-4">
              Aktivitas Terkini
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-start bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • 
                      {activity.creator?.name}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {getTimeAgo(activity.created_at)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Distribusi kelas */}
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-primary-900 mb-4">
              Distribusi Kelas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">Kelas X</span>
                <span className="font-medium text-sm md:text-base">385 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">Kelas XI</span>
                <span className="font-medium text-sm md:text-base">412 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">Kelas XII</span>
                <span className="font-medium text-sm md:text-base">451 siswa</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
