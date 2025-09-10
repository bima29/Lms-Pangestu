import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, TrendingUp, Users, Building2, BookOpen } from 'lucide-react';

const SchoolReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedSchool, setSelectedSchool] = useState('all');

  const reportData = {
    totalSchools: 12,
    totalUsers: 2847,
    totalStudents: 2340,
    totalTeachers: 287,
    activeSchools: 11,
    systemUptime: '99.8%'
  };

  const schoolPerformance = [
    { name: 'SMA Negeri 1 Jakarta', students: 1000, teachers: 45, activeUsers: 950, performance: 95 },
    { name: 'SMA Negeri 2 Bandung', students: 800, teachers: 38, activeUsers: 780, performance: 92 },
    { name: 'SMA Swasta Harapan', students: 500, teachers: 25, activeUsers: 450, performance: 88 },
    { name: 'SMA Negeri 3 Surabaya', students: 600, teachers: 32, activeUsers: 580, performance: 90 }
  ];

  const monthlyStats = [
    { month: 'Jan', schools: 8, users: 2100 },
    { month: 'Feb', schools: 9, users: 2300 },
    { month: 'Mar', schools: 10, users: 2500 },
    { month: 'Apr', schools: 11, users: 2650 },
    { month: 'May', schools: 12, users: 2847 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Laporan Sistem</h1>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode Laporan
            </label>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Harian</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
              <option value="yearly">Tahunan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sekolah
            </label>
            <select 
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Sekolah</option>
              <option value="1">SMA Negeri 1 Jakarta</option>
              <option value="2">SMA Negeri 2 Bandung</option>
              <option value="3">SMA Swasta Harapan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rentang Tanggal
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sekolah</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.totalSchools}</p>
              <p className="text-xs text-green-600">+1 dari bulan lalu</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+197 dari bulan lalu</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sekolah Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.activeSchools}</p>
              <p className="text-xs text-gray-500">dari {reportData.totalSchools} sekolah</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.systemUptime}</p>
              <p className="text-xs text-green-600">Sangat Baik</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Pertumbuhan Bulanan</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{stat.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{stat.schools} Sekolah</p>
                      <p className="text-xs text-gray-500">{stat.users.toLocaleString()} Users</p>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(stat.schools / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* School Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Performa Sekolah</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {schoolPerformance.map((school, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{school.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      school.performance >= 95 ? 'bg-green-100 text-green-800' :
                      school.performance >= 90 ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {school.performance}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block text-xs">Siswa</span>
                      <span className="font-medium">{school.students}</span>
                    </div>
                    <div>
                      <span className="block text-xs">Guru</span>
                      <span className="font-medium">{school.teachers}</span>
                    </div>
                    <div>
                      <span className="block text-xs">Aktif</span>
                      <span className="font-medium">{school.activeUsers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Laporan Detail Aktivitas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sekolah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Login Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schoolPerformance.map((school, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{school.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{school.students + school.teachers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{school.activeUsers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{school.performance}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolReports;
