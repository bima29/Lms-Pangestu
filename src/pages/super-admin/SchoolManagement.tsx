import React, { useState } from 'react';
import { Building2, Plus, Search, Edit, Trash2, Users, Calendar } from 'lucide-react';

const SchoolManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const schools = [
    {
      id: '1',
      name: 'SMA Negeri 1 Jakarta',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat',
      totalUsers: 1250,
      totalStudents: 1000,
      totalTeachers: 45,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2', 
      name: 'SMA Negeri 2 Bandung',
      address: 'Jl. Asia Afrika No. 456, Bandung',
      totalUsers: 980,
      totalStudents: 800,
      totalTeachers: 38,
      status: 'active',
      createdAt: '2024-02-10'
    },
    {
      id: '3',
      name: 'SMA Swasta Harapan',
      address: 'Jl. Sudirman No. 789, Surabaya',
      totalUsers: 650,
      totalStudents: 500,
      totalTeachers: 25,
      status: 'inactive',
      createdAt: '2024-03-05'
    }
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Sekolah</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Tambah Sekolah</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari sekolah..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div key={school.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-500">{school.address}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  school.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {school.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Siswa</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{school.totalStudents}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Guru</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{school.totalTeachers}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Dibuat: {new Date(school.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1">
                  <Trash2 className="h-4 w-4" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada sekolah ditemukan</h3>
          <p className="mt-1 text-sm text-gray-500">Mulai dengan menambahkan sekolah baru.</p>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;
