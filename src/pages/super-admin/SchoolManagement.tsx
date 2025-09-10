import React, { useState } from 'react';
import { Building2, Plus, Search, Edit, Trash2, Users, Calendar, X, Save } from 'lucide-react';

interface School {
  id: string;
  name: string;
  address: string;
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const SchoolManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    status: 'active' as 'active' | 'inactive'
  });
  const [errors, setErrors] = useState({
    name: '',
    address: ''
  });
  
  const [schools, setSchools] = useState<School[]>([
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
  ]);

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || school.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const validateForm = () => {
    const newErrors = { name: '', address: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Nama sekolah wajib diisi';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nama sekolah minimal 3 karakter';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Alamat wajib diisi';
      isValid = false;
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Alamat minimal 10 karakter';
      isValid = false;
    }

    // Check for duplicate school name
    const isDuplicate = schools.some(school => 
      school.name.toLowerCase() === formData.name.trim().toLowerCase() && 
      (!selectedSchool || school.id !== selectedSchool.id)
    );
    if (isDuplicate) {
      newErrors.name = 'Nama sekolah sudah ada';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddSchool = () => {
    if (validateForm()) {
      const newSchool: School = {
        id: (Date.now()).toString(),
        name: formData.name.trim(),
        address: formData.address.trim(),
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSchools([...schools, newSchool]);
      resetForm();
      setShowAddModal(false);
    }
  };

  const handleEditSchool = () => {
    if (validateForm()) {
      const updatedSchools = schools.map(school =>
        school.id === selectedSchool!.id
          ? { ...school, name: formData.name.trim(), address: formData.address.trim(), status: formData.status }
          : school
      );
      setSchools(updatedSchools);
      resetForm();
      setSelectedSchool(null);
      setShowEditModal(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', address: '', status: 'active' });
    setErrors({ name: '', address: '' });
  };

  const handleDeleteSchool = () => {
    if (selectedSchool) {
      const updatedSchools = schools.filter(school => school.id !== selectedSchool.id);
      setSchools(updatedSchools);
      setSelectedSchool(null);
      setShowDeleteModal(false);
    }
  };

  const openEditModal = (school: School) => {
    setSelectedSchool(school);
    setFormData({
      name: school.name,
      address: school.address,
      status: school.status
    });
    setErrors({ name: '', address: '' });
    setShowEditModal(true);
  };

  const closeAddModal = () => {
    resetForm();
    setShowAddModal(false);
  };

  const closeEditModal = () => {
    resetForm();
    setSelectedSchool(null);
    setShowEditModal(false);
  };

  const openDeleteModal = (school: School) => {
    setSelectedSchool(school);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Sekolah</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
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
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
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
                <button 
                  onClick={() => openEditModal(school)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => openDeleteModal(school)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1"
                >
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

      {/* Add School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{marginTop: 'unset'}}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" style={{marginTop: 'unset'}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Sekolah Baru</h3>
              <button onClick={closeAddModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama sekolah"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan alamat sekolah"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={closeAddModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddSchool}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit School Modal */}
      {showEditModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{marginTop: 'unset'}}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" style={{marginTop: 'unset'}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Sekolah</h3>
              <button onClick={closeEditModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama sekolah"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan alamat sekolah"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={closeEditModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleEditSchool}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{marginTop: 'unset'}}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" style={{marginTop: 'unset'}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Konfirmasi Hapus</h3>
              <button onClick={() => setShowDeleteModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menghapus sekolah <strong>{selectedSchool.name}</strong>?
              </p>
              <p className="text-sm text-red-600 mt-2">
                Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteSchool}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;
