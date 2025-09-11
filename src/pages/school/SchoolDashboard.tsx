import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Activity,
  RefreshCw,
  Plus,
  FileText,
  BarChart3
} from 'lucide-react';
import Card from '../../components/ui/Card';
import { 
  Student, 
  Teacher, 
  Class, 
  Subject, 
  CBTSession, 
  Assignment
} from '../../types';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  activeCBTSessions: number;
  completedAssignments: number;
  averageAttendance: number;
  upcomingEvents: number;
  activeStudents: number;
  activeTeachers: number;
  pendingGrades: number;
  todayAttendanceRate: number;
}

interface RecentActivity {
  id: string;
  type: 'cbt' | 'assignment' | 'attendance' | 'announcement' | 'grade' | 'user';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info' | 'error';
  relatedId?: string;
  relatedType?: string;
}

interface TodaySummary {
  attendanceRate: number;
  activeCBTSessions: number;
  pendingAssignments: number;
  activeTeachers: number;
  newAnnouncements: number;
  completedGrades: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
  permission?: string;
}

export default function SchoolDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSubjects: 0,
    activeCBTSessions: 0,
    completedAssignments: 0,
    averageAttendance: 0,
    upcomingEvents: 0,
    activeStudents: 0,
    activeTeachers: 0,
    pendingGrades: 0,
    todayAttendanceRate: 0
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [todaySummary, setTodaySummary] = useState<TodaySummary>({
    attendanceRate: 0,
    activeCBTSessions: 0,
    pendingAssignments: 0,
    activeTeachers: 0,
    newAnnouncements: 0,
    completedGrades: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(() => {
      refreshDashboardData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Data fetching functions
  const fetchDashboardStats = async (): Promise<DashboardStats> => {
    try {
      // In a real implementation, these would be API calls
      // For now, using mock data that aligns with database schema
      
      const [students, teachers, classes, subjects, cbtSessions, assignments, attendance] = await Promise.all([
        fetchStudents(),
        fetchTeachers(), 
        fetchClasses(),
        fetchSubjects(),
        fetchActiveCBTSessions(),
        fetchCompletedAssignments(),
        fetchAttendanceData()
      ]);

      return {
        totalStudents: students.filter(s => s.status === 'active').length,
        totalTeachers: teachers.filter(t => t.status === 'active').length,
        totalClasses: classes.filter(c => c.is_active).length,
        totalSubjects: subjects.filter(s => s.is_active).length,
        activeCBTSessions: cbtSessions.length,
        completedAssignments: assignments.length,
        averageAttendance: attendance.averageRate,
        upcomingEvents: await fetchUpcomingEvents(),
        activeStudents: students.filter(s => s.status === 'active').length,
        activeTeachers: teachers.filter(t => t.status === 'active').length,
        pendingGrades: await fetchPendingGrades(),
        todayAttendanceRate: attendance.todayRate
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  };

  const fetchStudents = async (): Promise<Student[]> => {
    // Mock data aligned with Student interface
    return [
      {
        id: '1',
        user_id: 'user1',
        student_id: 'STD001',
        class_id: 'class1',
        status: 'active',
        enrollment_date: '2024-07-01',
        created_at: '2024-07-01T00:00:00Z'
      }
      // Add more mock students...
    ];
  };

  const fetchTeachers = async (): Promise<Teacher[]> => {
    // Mock data aligned with Teacher interface
    return [
      {
        id: '1',
        user_id: 'user_teacher1',
        employee_id: 'EMP001',
        specialization: 'Matematika',
        status: 'active',
        hire_date: '2020-01-01',
        created_at: '2020-01-01T00:00:00Z'
      }
      // Add more mock teachers...
    ];
  };

  const fetchClasses = async (): Promise<Class[]> => {
    return [
      {
        id: '1',
        name: 'XII IPA 1',
        grade_level: 12,
        academic_year: '2024/2025',
        max_students: 36,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      }
      // Add more mock classes...
    ];
  };

  const fetchSubjects = async (): Promise<Subject[]> => {
    return [
      {
        id: '1',
        name: 'Matematika',
        code: 'MTK',
        credit_hours: 4,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      }
      // Add more mock subjects...
    ];
  };

  const fetchActiveCBTSessions = async (): Promise<CBTSession[]> => {
    const now = new Date();
    return [
      {
        id: '1',
        title: 'CBT Matematika Kelas XII',
        subject_id: '1',
        class_id: '1', 
        teacher_id: '1',
        start_time: now.toISOString(),
        end_time: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        duration_minutes: 120,
        total_questions: 50,
        passing_score: 75,
        shuffle_questions: true,
        show_results: false,
        is_active: true,
        created_at: '2024-03-15T00:00:00Z'
      }
      // Add more active sessions...
    ];
  };

  const fetchCompletedAssignments = async (): Promise<Assignment[]> => {
    return [
      {
        id: '1',
        title: 'Tugas Matematika Bab 1',
        subject_id: '1',
        class_id: '1',
        teacher_id: '1',
        due_date: '2024-03-20T23:59:59Z',
        max_score: 100,
        assignment_type: 'homework',
        submission_type: 'file',
        is_published: true,
        created_at: '2024-03-10T00:00:00Z',
        updated_at: '2024-03-10T00:00:00Z'
      }
      // Add more assignments...
    ];
  };

  const fetchAttendanceData = async () => {
    // Calculate attendance rates
    return {
      averageRate: 94.5,
      todayRate: 96.2
    };
  };

  const fetchUpcomingEvents = async (): Promise<number> => {
    // Count upcoming events/announcements
    return 8;
  };

  const fetchPendingGrades = async (): Promise<number> => {
    // Count assignments/CBTs that need grading
    return 23;
  };

  const fetchRecentActivities = async (): Promise<RecentActivity[]> => {
    // Fetch recent system activities
    return [
      {
        id: '1',
        type: 'cbt',
        title: 'CBT Matematika Kelas XII',
        description: '45 siswa telah menyelesaikan ujian',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        relatedId: 'cbt_1',
        relatedType: 'cbt_session'
      },
      {
        id: '2',
        type: 'assignment',
        title: 'Tugas Fisika Bab 5',
        description: 'Deadline dalam 2 hari',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        status: 'warning',
        relatedId: 'assignment_1',
        relatedType: 'assignment'
      },
      {
        id: '3',
        type: 'attendance',
        title: 'Absensi Kelas XI IPA 2',
        description: 'Tingkat kehadiran 98%',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        relatedId: 'attendance_1',
        relatedType: 'attendance'
      },
      {
        id: '4',
        type: 'announcement',
        title: 'Pengumuman Ujian Akhir',
        description: 'Jadwal ujian akhir semester telah dirilis',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: 'info',
        relatedId: 'announcement_1',
        relatedType: 'announcement'
      },
      {
        id: '5',
        type: 'grade',
        title: 'Nilai CBT Kimia',
        description: '32 nilai telah diinput',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        relatedId: 'grade_batch_1',
        relatedType: 'grade'
      }
    ];
  };

  const fetchTodaySummary = async (): Promise<TodaySummary> => {
    return {
      attendanceRate: 96.2,
      activeCBTSessions: 3,
      pendingAssignments: 12,
      activeTeachers: 87,
      newAnnouncements: 2,
      completedGrades: 45
    };
  };

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsData, activitiesData, summaryData] = await Promise.all([
        fetchDashboardStats(),
        fetchRecentActivities(),
        fetchTodaySummary()
      ]);

      setStats(statsData);
      setRecentActivities(activitiesData);
      setTodaySummary(summaryData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Gagal memuat data dashboard. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboardData = async () => {
    setRefreshing(true);
    try {
      await loadDashboardData();
    } finally {
      setRefreshing(false);
    }
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'cbt': return <BookOpen className="h-4 w-4" />;
      case 'assignment': return <Award className="h-4 w-4" />;
      case 'attendance': return <Users className="h-4 w-4" />;
      case 'announcement': return <AlertCircle className="h-4 w-4" />;
      case 'grade': return <Award className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Navigation functions for quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'manage-users':
        navigate('/school/users');
        break;
      case 'manage-classes':
        navigate('/school/classes');
        break;
      case 'manage-majors':
        navigate('/school/majors');
        break;
      case 'manage-subjects':
        navigate('/school/subjects');
        break;
      case 'class-subjects':
        navigate('/school/class-subjects');
        break;
      case 'manage-schedules':
        navigate('/school/schedules');
        break;
      case 'manage-cbt':
        navigate('/school/cbt');
        break;
      case 'manage-assignments':
        navigate('/school/assignments');
        break;
      case 'manage-materials':
        navigate('/school/materials');
        break;
      case 'manage-attendance':
        navigate('/school/attendance');
        break;
      case 'manage-grades':
        navigate('/school/grades');
        break;
      case 'manage-announcements':
        navigate('/school/announcements');
        break;
      case 'view-reports':
        navigate('/school/reports');
        break;
      case 'notifications':
        navigate('/school/notifications');
        break;
      default:
        console.warn('Unknown quick action:', action);
    }
  };

  // Activity click handler
  const handleActivityClick = (activity: RecentActivity) => {
    if (activity.relatedId && activity.relatedType) {
      switch (activity.relatedType) {
        case 'cbt_session':
          navigate(`/school/cbt/${activity.relatedId}`);
          break;
        case 'assignment':
          navigate(`/school/assignments/${activity.relatedId}`);
          break;
        case 'attendance':
          navigate(`/school/attendance/${activity.relatedId}`);
          break;
        case 'announcement':
          navigate(`/school/announcements/${activity.relatedId}`);
          break;
        case 'grade':
          navigate(`/school/grades`);
          break;
        default:
          console.warn('Unknown activity type:', activity.relatedType);
      }
    }
  };

  // Format time helper
  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
    return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`;
  };

  // Get quick actions configuration based on actual school admin menu
  const getQuickActions = (): QuickAction[] => {
    return [
      {
        id: 'manage-users',
        title: 'Kelola User',
        description: 'Manajemen pengguna sekolah',
        icon: <Users className="h-6 w-6" />,
        color: 'blue',
        path: '/school/users'
      },
      {
        id: 'manage-classes',
        title: 'Kelola Kelas',
        description: 'Manajemen kelas',
        icon: <GraduationCap className="h-6 w-6" />,
        color: 'green',
        path: '/school/classes'
      },
      {
        id: 'manage-majors',
        title: 'Jurusan',
        description: 'Kelola jurusan sekolah',
        icon: <BookOpen className="h-6 w-6" />,
        color: 'purple',
        path: '/school/majors'
      },
      {
        id: 'manage-subjects',
        title: 'Mata Pelajaran',
        description: 'Kelola mata pelajaran',
        icon: <BookOpen className="h-6 w-6" />,
        color: 'yellow',
        path: '/school/subjects'
      },
      {
        id: 'class-subjects',
        title: 'Kelas & Mapel',
        description: 'Kelola kelas dan mata pelajaran',
        icon: <Calendar className="h-6 w-6" />,
        color: 'indigo',
        path: '/school/class-subjects'
      },
      {
        id: 'manage-schedules',
        title: 'Jadwal',
        description: 'Kelola jadwal pelajaran',
        icon: <Calendar className="h-6 w-6" />,
        color: 'pink',
        path: '/school/schedules'
      },
      {
        id: 'manage-cbt',
        title: 'CBT',
        description: 'Kelola Computer Based Test',
        icon: <FileText className="h-6 w-6" />,
        color: 'teal',
        path: '/school/cbt'
      },
      {
        id: 'manage-assignments',
        title: 'Tugas',
        description: 'Kelola tugas siswa',
        icon: <Award className="h-6 w-6" />,
        color: 'orange',
        path: '/school/assignments'
      },
      {
        id: 'manage-materials',
        title: 'Materi',
        description: 'Kelola materi pembelajaran',
        icon: <BookOpen className="h-6 w-6" />,
        color: 'red',
        path: '/school/materials'
      },
      {
        id: 'manage-attendance',
        title: 'Absensi',
        description: 'Kelola absensi siswa',
        icon: <CheckCircle className="h-6 w-6" />,
        color: 'emerald',
        path: '/school/attendance'
      },
      {
        id: 'manage-grades',
        title: 'Nilai',
        description: 'Kelola nilai siswa',
        icon: <TrendingUp className="h-6 w-6" />,
        color: 'cyan',
        path: '/school/grades'
      },
      {
        id: 'manage-announcements',
        title: 'Pengumuman',
        description: 'Kelola pengumuman sekolah',
        icon: <AlertCircle className="h-6 w-6" />,
        color: 'violet',
        path: '/school/announcements'
      },
      {
        id: 'view-reports',
        title: 'Laporan',
        description: 'Lihat laporan sekolah',
        icon: <BarChart3 className="h-6 w-6" />,
        color: 'amber',
        path: '/school/reports'
      },
      {
        id: 'notifications',
        title: 'Notifikasi',
        description: 'Kelola notifikasi',
        icon: <AlertCircle className="h-6 w-6" />,
        color: 'lime',
        path: '/school/notifications'
      }
    ];
  };

  // Export data functions
  const exportDashboardData = async (format: 'pdf' | 'excel') => {
    try {
      // Implementation for exporting dashboard data
      console.log(`Exporting dashboard data as ${format}`);
      // This would typically call an API endpoint
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  // Manual refresh handler
  const handleManualRefresh = () => {
    refreshDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full sm:w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-sm"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-sm"></div>
              <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="animate-bounce">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Terjadi Kesalahan</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
            <button
              onClick={handleManualRefresh}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Coba Lagi
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Sekolah
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">Ringkasan aktivitas dan statistik sekolah</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{refreshing ? 'Memuat...' : 'Refresh'}</span>
            </button>
            <button
              onClick={() => exportDashboardData('excel')}
              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-blue-700">Total Siswa</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalStudents.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-green-700">Total Guru</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalTeachers}</p>
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-purple-700">Total Kelas</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalClasses}</p>
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-amber-700">Mata Pelajaran</p>
                <p className="text-2xl font-bold text-amber-900">{stats.totalSubjects}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="group p-6 bg-gradient-to-br from-red-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">CBT Aktif</p>
                <p className="text-xl font-bold text-red-900">{stats.activeCBTSessions}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Tugas Selesai</p>
                <p className="text-xl font-bold text-emerald-900">{stats.completedAssignments}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-sky-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sky-700">Rata-rata Kehadiran</p>
                <p className="text-xl font-bold text-sky-900">{stats.averageAttendance}%</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-indigo-50 to-purple-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">Event Mendatang</p>
                <p className="text-xl font-bold text-indigo-900">{stats.upcomingEvents}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className={`p-2 rounded-xl ${getActivityColor(activity.status)} group-hover:shadow-md transition-all duration-300`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">{activity.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Ringkasan Hari Ini</h3>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-green-900">Kehadiran Siswa</span>
                </div>
                <span className="text-sm font-bold text-green-900 bg-green-100 px-3 py-1 rounded-full">{todaySummary.attendanceRate}%</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-blue-900">CBT Berlangsung</span>
                </div>
                <span className="text-sm font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full">{todaySummary.activeCBTSessions} Sesi</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500 rounded-lg">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-amber-900">Tugas Pending</span>
                </div>
                <span className="text-sm font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">{todaySummary.pendingAssignments} Tugas</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-purple-900">Guru Aktif</span>
                </div>
                <span className="text-sm font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full">{todaySummary.activeTeachers} Guru</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-indigo-900">Pengumuman Baru</span>
                </div>
                <span className="text-sm font-bold text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full">{todaySummary.newAnnouncements} Item</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-500 rounded-lg">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-teal-900">Nilai Selesai</span>
                </div>
                <span className="text-sm font-bold text-teal-900 bg-teal-100 px-3 py-1 rounded-full">{todaySummary.completedGrades} Nilai</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900">Aksi Cepat</h3>
            <button
              onClick={() => navigate('/school/settings')}
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-all duration-300"
            >
              ⚙️ Pengaturan
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {getQuickActions().slice(0, 12).map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="group p-4 text-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-lg border border-gray-200 hover:border-blue-200"
                title={action.description}
              >
                <div className="text-gray-600 group-hover:text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-all duration-300 flex justify-center items-center">
                  {action.icon}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-900 transition-colors leading-tight">
                  {action.title}
                </span>
              </button>
            ))}
          </div>
          
          {/* Additional Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => navigate('/school/announcements')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Buat </span>Pengumuman
              </button>
              <button
                onClick={() => navigate('/school/cbt')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl text-sm font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                CBT Baru
              </button>
              <button
                onClick={() => navigate('/school/users')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-violet-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Tambah </span>User
              </button>
              <button
                onClick={() => navigate('/school/classes')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Tambah </span>Kelas
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Export additional utility functions for testing or external use
export type {
  DashboardStats,
  RecentActivity,
  TodaySummary,
  QuickAction
};
