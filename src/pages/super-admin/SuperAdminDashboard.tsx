import React from 'react';
import { 
  Building2, 
  Users, 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Database,
  Activity,
  RefreshCw,
  Download,
  Calendar,
  Globe,
  Server,
  HardDrive
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { mockUsers, mockSchools } from '../../data/mockData';

interface DashboardStats {
  totalSchools: number;
  totalUsers: number;
  activeUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalAdmins: number;
  systemUptime: string;
  storageUsed: string;
  monthlyGrowth: number;
  securityAlerts: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'school' | 'system' | 'security';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface SystemHealth {
  database: 'healthy' | 'warning' | 'error';
  server: 'healthy' | 'warning' | 'error';
  storage: 'healthy' | 'warning' | 'error';
  backup: 'healthy' | 'warning' | 'error';
}

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalSchools: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalAdmins: 0,
    systemUptime: '99.8%',
    storageUsed: '45.2 GB',
    monthlyGrowth: 12.5,
    securityAlerts: 2
  });
  
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    database: 'healthy',
    server: 'healthy',
    storage: 'warning',
    backup: 'healthy'
  });

  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      refreshDashboardData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate stats from mock data
      const totalUsers = mockUsers.length;
      const activeUsers = mockUsers.filter(u => u.is_active).length;
      const totalStudents = mockUsers.filter(u => u.role === 'student').length;
      const totalTeachers = mockUsers.filter(u => u.role === 'teacher').length;
      const totalAdmins = mockUsers.filter(u => u.role === 'school_admin' || u.role === 'super_admin').length;
      
      setStats({
        totalSchools: mockSchools.length,
        totalUsers,
        activeUsers,
        totalStudents,
        totalTeachers,
        totalAdmins,
        systemUptime: '99.8%',
        storageUsed: '45.2 GB',
        monthlyGrowth: 12.5,
        securityAlerts: 2
      });
      
      // Load recent activities
      setRecentActivities([
        {
          id: '1',
          type: 'school',
          title: 'Sekolah Baru Terdaftar',
          description: 'SMA Negeri 5 Jakarta berhasil bergabung dengan platform',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'success'
        },
        {
          id: '2',
          type: 'user',
          title: 'Pengguna Baru',
          description: '25 pengguna baru terdaftar hari ini',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          status: 'info'
        },
        {
          id: '3',
          type: 'system',
          title: 'Backup Otomatis',
          description: 'Backup database berhasil dilakukan',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          status: 'success'
        },
        {
          id: '4',
          type: 'security',
          title: 'Peringatan Keamanan',
          description: 'Terdeteksi 5 percobaan login gagal dari IP mencurigakan',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          status: 'warning'
        },
        {
          id: '5',
          type: 'system',
          title: 'Update Sistem',
          description: 'Sistem berhasil diperbarui ke versi 2.1.0',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: 'success'
        }
      ]);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'school': return <Building2 className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      case 'system': return <Server className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
    return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`;
  };

  const exportDashboardReport = () => {
    const reportData = {
      generated_at: new Date().toISOString(),
      statistics: stats,
      system_health: systemHealth,
      recent_activities: recentActivities,
      user_distribution: {
        by_role: mockUsers.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        by_school: mockUsers.reduce((acc, user) => {
          if (user.school_id) {
            const school = mockSchools.find(s => s.id === user.school_id);
            const schoolName = school?.name || 'Unknown';
            acc[schoolName] = (acc[schoolName] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>)
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Super Admin
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">Monitoring dan kontrol platform LMS secara global</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={refreshDashboardData}
              disabled={refreshing}
              className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{refreshing ? 'Memuat...' : 'Refresh'}</span>
            </button>
            <button
              onClick={exportDashboardReport}
              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-blue-700">Total Sekolah</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalSchools}</p>
                <p className="text-xs text-blue-600">+2 bulan ini</p>
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-green-700">Total Pengguna</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">{stats.activeUsers} aktif</p>
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-purple-700">System Uptime</p>
                <p className="text-2xl font-bold text-purple-900">{stats.systemUptime}</p>
                <p className="text-xs text-purple-600">Sangat stabil</p>
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-amber-700">Peringatan</p>
                <p className="text-2xl font-bold text-amber-900">{stats.securityAlerts}</p>
                <p className="text-xs text-amber-600">Perlu perhatian</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="group p-6 bg-gradient-to-br from-indigo-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">Total Siswa</p>
                <p className="text-xl font-bold text-indigo-900">{stats.totalStudents}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Total Guru</p>
                <p className="text-xl font-bold text-emerald-900">{stats.totalTeachers}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-rose-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-rose-700">Pertumbuhan</p>
                <p className="text-xl font-bold text-rose-900">+{stats.monthlyGrowth}%</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="group p-6 bg-gradient-to-br from-cyan-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-700">Storage</p>
                <p className="text-xl font-bold text-cyan-900">{stats.storageUsed}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <HardDrive className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Activities */}
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

          {/* System Health */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Status Sistem</h3>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Real-time
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.database)}`}>
                    {getHealthIcon(systemHealth.database)}
                  </div>
                  <span className="text-sm font-semibold text-green-900">Database</span>
                </div>
                <span className="text-sm font-bold text-green-900 bg-green-100 px-3 py-1 rounded-full">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.server)}`}>
                    {getHealthIcon(systemHealth.server)}
                  </div>
                  <span className="text-sm font-semibold text-blue-900">Web Server</span>
                </div>
                <span className="text-sm font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.storage)}`}>
                    {getHealthIcon(systemHealth.storage)}
                  </div>
                  <span className="text-sm font-semibold text-yellow-900">Storage</span>
                </div>
                <span className="text-sm font-bold text-yellow-900 bg-yellow-100 px-3 py-1 rounded-full">75% Used</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.backup)}`}>
                    {getHealthIcon(systemHealth.backup)}
                  </div>
                  <span className="text-sm font-semibold text-green-900">Backup</span>
                </div>
                <span className="text-sm font-bold text-green-900 bg-green-100 px-3 py-1 rounded-full">Updated</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900">Aksi Cepat</h3>
            <button
              onClick={() => navigate('/super-admin/system-settings')}
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-all duration-300"
            >
              ⚙️ Pengaturan Sistem
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {[
              { title: 'Kelola Sekolah', icon: <Building2 className="h-6 w-6" />, path: '/super-admin/schools', color: 'blue' },
              { title: 'Kelola Pengguna', icon: <Users className="h-6 w-6" />, path: '/super-admin/users', color: 'green' },
              { title: 'Akademik Global', icon: <Globe className="h-6 w-6" />, path: '/super-admin/academic-global', color: 'purple' },
              { title: 'Tahun Akademik', icon: <Calendar className="h-6 w-6" />, path: '/super-admin/academic-year', color: 'yellow' },
              { title: 'Standar Kompetensi', icon: <BarChart3 className="h-6 w-6" />, path: '/super-admin/competency-standards', color: 'indigo' },
              { title: 'Komunikasi', icon: <Activity className="h-6 w-6" />, path: '/super-admin/communication', color: 'pink' },
              { title: 'Pengaturan', icon: <Shield className="h-6 w-6" />, path: '/super-admin/system-settings', color: 'teal' },
              { title: 'Backup', icon: <Database className="h-6 w-6" />, path: '/super-admin/backup', color: 'orange' },
              { title: 'Laporan', icon: <BarChart3 className="h-6 w-6" />, path: '/super-admin/reports', color: 'red' }
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="group p-4 text-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-lg border border-gray-200 hover:border-blue-200"
                title={action.title}
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
        </Card>

        {/* User Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Distribusi Pengguna</h3>
            <div className="space-y-3">
              {Object.entries(mockUsers.reduce((acc, user) => {
                acc[user.role] = (acc[user.role] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(role)}`}>
                      {getRoleLabel(role)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Distribusi Sekolah</h3>
            <div className="space-y-3">
              {mockSchools.map((school) => {
                const userCount = mockUsers.filter(u => u.school_id === school.id).length;
                return (
                  <div key={school.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">{school.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">{userCount}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(userCount / stats.totalUsers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Super Admin</h1>
        <div className="text-sm text-gray-500">
          Terakhir diperbarui: {new Date().toLocaleString('id-ID')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Aktivitas Sistem Terbaru</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Sekolah SMA Negeri 1 Jakarta berhasil terdaftar</p>
                  <p className="text-xs text-gray-500">2 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Update sistem keamanan berhasil diterapkan</p>
                  <p className="text-xs text-gray-500">5 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Peringatan: Server backup memerlukan perhatian</p>
                  <p className="text-xs text-gray-500">1 hari yang lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Status Sistem</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database Server</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Web Server</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Backup System</span>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Warning</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Security System</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
