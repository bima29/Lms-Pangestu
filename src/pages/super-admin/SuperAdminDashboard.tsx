import React from 'react';
import { Building2, Users, Shield, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Sekolah', value: '12', icon: Building2, color: 'bg-blue-500' },
    { title: 'Total Pengguna', value: '2,847', icon: Users, color: 'bg-green-500' },
    { title: 'Sistem Aktif', value: '98.5%', icon: CheckCircle, color: 'bg-emerald-500' },
    { title: 'Peringatan Keamanan', value: '3', icon: AlertTriangle, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
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
