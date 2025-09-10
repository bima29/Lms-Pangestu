import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  School, 
  TrendingUp, 
  Download, 
  Calendar,
  FileText,
  Activity,
  Database,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface ReportData {
  userStats: {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    usersByRole: {
      super_admin: number;
      school_admin: number;
      teacher: number;
      student: number;
      parent: number;
    };
  };
  schoolStats: {
    totalSchools: number;
    activeSchools: number;
    totalClasses: number;
    totalStudents: number;
    averageClassSize: number;
  };
  systemStats: {
    totalLogins: number;
    failedLogins: number;
    systemUptime: string;
    databaseSize: string;
    storageUsed: string;
  };
  activityStats: {
    cbtSessions: number;
    completedAssignments: number;
    documentsUploaded: number;
    reportsGenerated: number;
  };
}

const SuperAdminReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData>({
    userStats: {
      totalUsers: 1247,
      activeUsers: 1089,
      newUsersThisMonth: 156,
      usersByRole: {
        super_admin: 3,
        school_admin: 25,
        teacher: 324,
        student: 789,
        parent: 106
      }
    },
    schoolStats: {
      totalSchools: 25,
      activeSchools: 23,
      totalClasses: 156,
      totalStudents: 789,
      averageClassSize: 28.5
    },
    systemStats: {
      totalLogins: 15678,
      failedLogins: 234,
      systemUptime: '99.8%',
      databaseSize: '2.3 GB',
      storageUsed: '45.2 GB'
    },
    activityStats: {
      cbtSessions: 456,
      completedAssignments: 1234,
      documentsUploaded: 789,
      reportsGenerated: 156
    }
  });

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: BarChart3 },
    { id: 'users', label: 'Pengguna', icon: Users },
    { id: 'schools', label: 'Sekolah', icon: School },
    { id: 'system', label: 'Sistem', icon: Database },
    { id: 'activity', label: 'Aktivitas', icon: Activity }
  ];

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate fetching updated data
    setReportData({
      userStats: {
        totalUsers: 1247 + Math.floor(Math.random() * 50),
        activeUsers: 1089 + Math.floor(Math.random() * 30),
        newUsersThisMonth: 156 + Math.floor(Math.random() * 20),
        usersByRole: {
          super_admin: 3,
          school_admin: 25 + Math.floor(Math.random() * 5),
          teacher: 324 + Math.floor(Math.random() * 20),
          student: 789 + Math.floor(Math.random() * 50),
          parent: 106 + Math.floor(Math.random() * 10)
        }
      },
      schoolStats: {
        totalSchools: 25 + Math.floor(Math.random() * 3),
        activeSchools: 23 + Math.floor(Math.random() * 2),
        totalClasses: 156 + Math.floor(Math.random() * 10),
        totalStudents: 789 + Math.floor(Math.random() * 50),
        averageClassSize: 28.5 + Math.random() * 2
      },
      systemStats: {
        totalLogins: 15678 + Math.floor(Math.random() * 500),
        failedLogins: 234 + Math.floor(Math.random() * 20),
        systemUptime: '99.8%',
        databaseSize: '2.3 GB',
        storageUsed: '45.2 GB'
      },
      activityStats: {
        cbtSessions: 456 + Math.floor(Math.random() * 50),
        completedAssignments: 1234 + Math.floor(Math.random() * 100),
        documentsUploaded: 789 + Math.floor(Math.random() * 50),
        reportsGenerated: 156 + Math.floor(Math.random() * 20)
      }
    });
    
    setLoading(false);
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simulate export functionality
    const filename = `laporan_${activeTab}_${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Exporting ${filename}`);
    
    // Create mock download
    const element = document.createElement('a');
    const file = new Blob(['Mock report data'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Sistem</h1>
          <p className="text-gray-600">Analisis dan statistik komprehensif sistem LMS</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Memuat...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Periode:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 Hari Terakhir</option>
              <option value="30">30 Hari Terakhir</option>
              <option value="90">3 Bulan Terakhir</option>
              <option value="365">1 Tahun Terakhir</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => exportReport('pdf')}
              className="flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Download className="h-3 w-3 mr-1" />
              PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="h-3 w-3 mr-1" />
              Excel
            </button>
            <button
              onClick={() => exportReport('csv')}
              className="flex items-center px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <Download className="h-3 w-3 mr-1" />
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">Total Pengguna</p>
                      <p className="text-2xl font-bold text-blue-900">{reportData.userStats.totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <School className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">Total Sekolah</p>
                      <p className="text-2xl font-bold text-green-900">{reportData.schoolStats.totalSchools}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-yellow-600">Sesi CBT</p>
                      <p className="text-2xl font-bold text-yellow-900">{reportData.activityStats.cbtSessions}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">Uptime Sistem</p>
                      <p className="text-2xl font-bold text-purple-900">{reportData.systemStats.systemUptime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Pengguna per Role</h3>
                  <div className="space-y-3">
                    {Object.entries(reportData.userStats.usersByRole).map(([role, count]) => (
                      <div key={role} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{role.replace('_', ' ')}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(count / reportData.userStats.totalUsers) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Sistem</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Login Berhasil</span>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm font-medium">{reportData.systemStats.totalLogins}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Login Gagal</span>
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm font-medium">{reportData.systemStats.failedLogins}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ukuran Database</span>
                      <span className="text-sm font-medium">{reportData.systemStats.databaseSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Storage Terpakai</span>
                      <span className="text-sm font-medium">{reportData.systemStats.storageUsed}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Pengguna</h3>
                  <p className="text-3xl font-bold text-blue-600">{reportData.userStats.totalUsers}</p>
                  <p className="text-sm text-blue-600 mt-1">Semua role</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Pengguna Aktif</h3>
                  <p className="text-3xl font-bold text-green-600">{reportData.userStats.activeUsers}</p>
                  <p className="text-sm text-green-600 mt-1">Login 30 hari terakhir</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Pengguna Baru</h3>
                  <p className="text-3xl font-bold text-purple-600">{reportData.userStats.newUsersThisMonth}</p>
                  <p className="text-sm text-purple-600 mt-1">Bulan ini</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Pengguna per Role</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktif</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(reportData.userStats.usersByRole).map(([role, count]) => (
                        <tr key={role}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {role.replace('_', ' ')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.floor(count * 0.87)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {((count / reportData.userStats.totalUsers) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Schools Tab */}
          {activeTab === 'schools' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Sekolah</h3>
                  <p className="text-3xl font-bold text-blue-600">{reportData.schoolStats.totalSchools}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Sekolah Aktif</h3>
                  <p className="text-3xl font-bold text-green-600">{reportData.schoolStats.activeSchools}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Total Kelas</h3>
                  <p className="text-3xl font-bold text-yellow-600">{reportData.schoolStats.totalClasses}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Rata-rata Siswa/Kelas</h3>
                  <p className="text-3xl font-bold text-purple-600">{reportData.schoolStats.averageClassSize}</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performa Sekolah</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">SMK Negeri 1 Jakarta</h4>
                      <p className="text-sm text-gray-500">1,234 siswa • 45 kelas • 89 guru</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">98.5% Kehadiran</p>
                      <p className="text-sm text-gray-500">456 CBT Selesai</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">SMA Negeri 2 Bandung</h4>
                      <p className="text-sm text-gray-500">987 siswa • 32 kelas • 67 guru</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">96.2% Kehadiran</p>
                      <p className="text-sm text-gray-500">321 CBT Selesai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">System Uptime</h3>
                  <p className="text-3xl font-bold text-green-600">{reportData.systemStats.systemUptime}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Login</h3>
                  <p className="text-3xl font-bold text-blue-600">{reportData.systemStats.totalLogins}</p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Login Gagal</h3>
                  <p className="text-3xl font-bold text-red-600">{reportData.systemStats.failedLogins}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Database Size</h3>
                  <p className="text-3xl font-bold text-purple-600">{reportData.systemStats.databaseSize}</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Sistem Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm font-medium">Database Server</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm font-medium">Web Server</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm font-medium">Email Service</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CPU Usage</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Memory Usage</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Disk Usage</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Network I/O</span>
                      <span className="text-sm font-medium">12 MB/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Sesi CBT</h3>
                  <p className="text-3xl font-bold text-blue-600">{reportData.activityStats.cbtSessions}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Tugas Selesai</h3>
                  <p className="text-3xl font-bold text-green-600">{reportData.activityStats.completedAssignments}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Dokumen Upload</h3>
                  <p className="text-3xl font-bold text-yellow-600">{reportData.activityStats.documentsUploaded}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Laporan Dibuat</h3>
                  <p className="text-3xl font-bold text-purple-600">{reportData.activityStats.reportsGenerated}</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-500 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">CBT Matematika Kelas XII</p>
                      <p className="text-sm text-gray-500">45 siswa berpartisipasi • 2 jam yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-green-500 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Upload Materi Fisika</p>
                      <p className="text-sm text-gray-500">Guru Ahmad • 3 jam yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-purple-500 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Registrasi Siswa Baru</p>
                      <p className="text-sm text-gray-500">15 siswa terdaftar • 5 jam yang lalu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminReports;
