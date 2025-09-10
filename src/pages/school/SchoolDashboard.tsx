import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';
import Card from '../../components/ui/Card';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  activeCBTSessions: number;
  completedAssignments: number;
  averageAttendance: number;
  upcomingEvents: number;
}

interface RecentActivity {
  id: string;
  type: 'cbt' | 'assignment' | 'attendance' | 'announcement';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

export default function SchoolDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSubjects: 0,
    activeCBTSessions: 0,
    completedAssignments: 0,
    averageAttendance: 0,
    upcomingEvents: 0
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setStats({
        totalStudents: 1247,
        totalTeachers: 89,
        totalClasses: 42,
        totalSubjects: 15,
        activeCBTSessions: 3,
        completedAssignments: 156,
        averageAttendance: 94.5,
        upcomingEvents: 8
      });

      setRecentActivities([
        {
          id: '1',
          type: 'cbt',
          title: 'CBT Matematika Kelas XII',
          description: '45 siswa telah menyelesaikan ujian',
          timestamp: '2024-03-15T10:30:00Z',
          status: 'success'
        },
        {
          id: '2',
          type: 'assignment',
          title: 'Tugas Fisika Bab 5',
          description: 'Deadline dalam 2 hari',
          timestamp: '2024-03-15T09:15:00Z',
          status: 'warning'
        },
        {
          id: '3',
          type: 'attendance',
          title: 'Absensi Kelas XI IPA 2',
          description: 'Tingkat kehadiran 98%',
          timestamp: '2024-03-15T08:00:00Z',
          status: 'success'
        },
        {
          id: '4',
          type: 'announcement',
          title: 'Pengumuman Ujian Akhir',
          description: 'Jadwal ujian akhir semester telah dirilis',
          timestamp: '2024-03-14T16:45:00Z',
          status: 'info'
        }
      ]);

      setLoading(false);
    }, 1000);
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'cbt': return <BookOpen className="h-4 w-4" />;
      case 'assignment': return <Award className="h-4 w-4" />;
      case 'attendance': return <Users className="h-4 w-4" />;
      case 'announcement': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Sekolah</h1>
        <p className="text-gray-600">Ringkasan aktivitas dan statistik sekolah</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Siswa</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Guru</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalTeachers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Kelas</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalClasses}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mata Pelajaran</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalSubjects}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CBT Aktif</p>
              <p className="text-xl font-semibold text-gray-900">{stats.activeCBTSessions}</p>
            </div>
            <div className="p-2 rounded-full bg-red-100">
              <Clock className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tugas Selesai</p>
              <p className="text-xl font-semibold text-gray-900">{stats.completedAssignments}</p>
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata Kehadiran</p>
              <p className="text-xl font-semibold text-gray-900">{stats.averageAttendance}%</p>
            </div>
            <div className="p-2 rounded-full bg-blue-100">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Event Mendatang</p>
              <p className="text-xl font-semibold text-gray-900">{stats.upcomingEvents}</p>
            </div>
            <div className="p-2 rounded-full bg-purple-100">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getActivityColor(activity.status)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.timestamp).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Hari Ini</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Kehadiran Siswa</span>
              </div>
              <span className="text-sm font-semibold text-green-900">96.2%</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">CBT Berlangsung</span>
              </div>
              <span className="text-sm font-semibold text-blue-900">3 Sesi</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Tugas Pending</span>
              </div>
              <span className="text-sm font-semibold text-yellow-900">12 Tugas</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Guru Aktif</span>
              </div>
              <span className="text-sm font-semibold text-purple-900">87 Guru</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-blue-900">Buat CBT</span>
          </button>
          <button className="p-4 text-center bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-900">Kelola Siswa</span>
          </button>
          <button className="p-4 text-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-purple-900">Jadwal</span>
          </button>
          <button className="p-4 text-center bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <Award className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-yellow-900">Laporan</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
