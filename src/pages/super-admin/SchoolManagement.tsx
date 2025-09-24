import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  MapPin, 
  Users, 
  Calendar,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { School } from '../../types';

interface SchoolFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  principal_name: string;
  npsn: string;
  accreditation: 'A' | 'B' | 'C';
  established_year: number;
  website: string;
  is_active: boolean;
}

interface SchoolStats {
  total_users: number;
  total_students: number;
  total_teachers: number;
  total_classes: number;
  last_activity: string;
}

const SchoolManagement: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<SchoolFormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    principal_name: '',
    npsn: '',
    accreditation: 'A',
    established_year: new Date().getFullYear(),
    website: '',
    is_active: true
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [schoolStats, setSchoolStats] = useState<Record<string, SchoolStats>>({});

  // Load initial data
  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSchools: School[] = [
        {
          id: 'sch-1',
          name: 'SMA Pangestu Jakarta',
          address: 'Jl. Pangestu No. 123, Jakarta Selatan',
          phone: '021-12345678',
          email: 'info@smapangestu-jkt.sch.id',
          principal_name: 'Dr. Ahmad Susanto, M.Pd',
          npsn: '20104001',
          accreditation: 'A',
          established_year: 1985,
          website: 'www.smapangestu-jakarta.sch.id',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 'sch-2',
          name: 'SMA Pangestu Bandung',
          address: 'Jl. Merdeka No. 456, Bandung',
          phone: '022-87654321',
          email: 'info@smapangestu-bdg.sch.id',
          principal_name: 'Prof. Dr. Siti Nurhaliza, M.Pd',
          npsn: '20104002',
          accreditation: 'A',
          established_year: 1990,
          website: 'www.smapangestu-bandung.sch.id',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 'sch-3',
          name: 'SMA Pangestu Surabaya',
          address: 'Jl. Pemuda No. 789, Surabaya',
          phone: '031-11223344',
          email: 'info@smapangestu-sby.sch.id',
          principal_name: 'Drs. Budi Santoso, M.M',
          npsn: '20104003',
          accreditation: 'B',
          established_year: 1995,
          website: 'www.smapangestu-surabaya.sch.id',
          is_active: false,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ];
      
      setSchools(mockSchools);
      
      // Load stats for each school
      const stats: Record<string, SchoolStats> = {};
      mockSchools.forEach(school => {
        stats[school.id] = {
          total_users: Math.floor(Math.random() * 500) + 100,
          total_students: Math.floor(Math.random() * 400) + 80,
          total_teachers: Math.floor(Math.random() * 50) + 20,
          total_classes: Math.floor(Math.random() * 20) + 5,
          last_activity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        };
      });
      setSchoolStats(stats);
      
    } catch (error) {
      console.error('Error loading schools:', error);
    } finally {
      setLoading(false);
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama sekolah wajib diisi';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Alamat sekolah wajib diisi';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9\-\+\(\)\s]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email sekolah wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.principal_name.trim()) {
      newErrors.principal_name = 'Nama kepala sekolah wajib diisi';
    }

    if (!formData.npsn.trim()) {
      newErrors.npsn = 'NPSN wajib diisi';
    } else if (!/^\d{8}$/.test(formData.npsn)) {
      newErrors.npsn = 'NPSN harus 8 digit angka';
    }

    if (formData.established_year < 1900 || formData.established_year > new Date().getFullYear()) {
      newErrors.established_year = 'Tahun berdiri tidak valid';
    }

    // Check for duplicate NPSN
    const existingSchool = schools.find(s => 
      s.npsn === formData.npsn && s.id !== selectedSchool?.id
    );
    if (existingSchool) {
      newErrors.npsn = 'NPSN sudah digunakan oleh sekolah lain';
    }

    // Check for duplicate email
    const existingEmail = schools.find(s => 
      s.email === formData.email && s.id !== selectedSchool?.id
    );
    if (existingEmail) {
      newErrors.email = 'Email sudah digunakan oleh sekolah lain';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Modal handlers
  const openAddModal = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      principal_name: '',
      npsn: '',
      accreditation: 'A',
      established_year: new Date().getFullYear(),
      website: '',
      is_active: true
    });
    setErrors({});
    setShowAddModal(true);
  };

  const openEditModal = (school: School) => {
    setSelectedSchool(school);
    setFormData({
      name: school.name,
      address: school.address || '',
      phone: school.phone || '',
      email: school.email || '',
      principal_name: school.principal_name || '',
      npsn: school.npsn || '',
      accreditation: school.accreditation || 'A',
      established_year: school.established_year || new Date().getFullYear(),
      website: school.website || '',
      is_active: school.is_active ?? true
    });
    setErrors({});
    setShowEditModal(true);
  };

  const openDeleteModal = (school: School) => {
    setSelectedSchool(school);
    setShowDeleteModal(true);
  };

  const openDetailModal = (school: School) => {
    setSelectedSchool(school);
    setShowDetailModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowDetailModal(false);
    setSelectedSchool(null);
    setErrors({});
  };

  // CRUD operations
  const handleAddSchool = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const newSchool: School = {
        id: `sch-${Date.now()}`,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        principal_name: formData.principal_name,
        npsn: formData.npsn,
        accreditation: formData.accreditation,
        established_year: formData.established_year,
        website: formData.website,
        is_active: formData.is_active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSchools(prev => [newSchool, ...prev]);
      
      // Initialize stats for new school
      setSchoolStats(prev => ({
        ...prev,
        [newSchool.id]: {
          total_users: 0,
          total_students: 0,
          total_teachers: 0,
          total_classes: 0,
          last_activity: new Date().toISOString()
        }
      }));
      
      closeModals();
    } catch (error) {
      console.error('Error adding school:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSchool = async () => {
    if (!validateForm() || !selectedSchool) return;

    try {
      setLoading(true);
      
      const updatedSchool: School = {
        ...selectedSchool,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        principal_name: formData.principal_name,
        npsn: formData.npsn,
        accreditation: formData.accreditation,
        established_year: formData.established_year,
        website: formData.website,
        is_active: formData.is_active,
        updated_at: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSchools(prev => prev.map(school => 
        school.id === selectedSchool.id ? updatedSchool : school
      ));
      
      closeModals();
    } catch (error) {
      console.error('Error updating school:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchool = async () => {
    if (!selectedSchool) return;

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSchools(prev => prev.filter(school => school.id !== selectedSchool.id));
      setSchoolStats(prev => {
        const newStats = { ...prev };
        delete newStats[selectedSchool.id];
        return newStats;
      });
      
      closeModals();
    } catch (error) {
      console.error('Error deleting school:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSchoolStatus = async (school: School) => {
    try {
      const updatedSchool = {
        ...school,
        is_active: !school.is_active,
        updated_at: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSchools(prev => prev.map(s => 
        s.id === school.id ? updatedSchool : s
      ));
    } catch (error) {
      console.error('Error toggling school status:', error);
    }
  };

  // Filtering and pagination
  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.npsn?.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchools = filteredSchools.slice(startIndex, startIndex + itemsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    return `${Math.floor(diffInHours / 24)} hari yang lalu`;
  };

  if (loading && schools.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Memuat data sekolah...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Sekolah</h1>
          <p className="text-gray-600 mt-1">Kelola semua sekolah yang terdaftar dalam platform</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Sekolah
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sekolah</p>
              <p className="text-2xl font-bold text-blue-600">{schools.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sekolah Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {schools.filter(s => s.is_active).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
              <p className="text-2xl font-bold text-purple-600">
                {Object.values(schoolStats).reduce((sum, stat) => sum + stat.total_users, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Akreditasi A</p>
              <p className="text-2xl font-bold text-orange-600">
                {schools.filter(s => s.accreditation === 'A').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari sekolah..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5 per halaman</option>
              <option value={10}>10 per halaman</option>
              <option value={25}>25 per halaman</option>
              <option value={50}>50 per halaman</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredSchools.length)} dari {filteredSchools.length} sekolah
          </div>
        </div>

        {/* Schools Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kepala Sekolah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akreditasi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statistik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSchools.map((school) => {
                const stats = schoolStats[school.id];
                return (
                  <tr key={school.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{school.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {school.address}
                          </div>
                          <div className="text-xs text-gray-400">NPSN: {school.npsn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{school.phone}</div>
                      <div className="text-sm text-gray-500">{school.email}</div>
                      {school.website && (
                        <div className="text-xs text-blue-600">{school.website}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{school.principal_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        school.accreditation === 'A' ? 'bg-green-100 text-green-800' :
                        school.accreditation === 'B' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Akreditasi {school.accreditation}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {stats && (
                        <div className="text-xs text-gray-500">
                          <div>{stats.total_users} pengguna</div>
                          <div>{stats.total_students} siswa</div>
                          <div>{stats.total_teachers} guru</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleSchoolStatus(school)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                          school.is_active 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {school.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetailModal(school)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          title="Lihat Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(school)}
                          className="text-green-600 hover:text-green-900 flex items-center gap-1"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(school)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Halaman {currentPage} dari {totalPages}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' ? setCurrentPage(page) : undefined}
                  disabled={page === '...'}
                  className={`px-3 py-1 text-sm rounded-md ${
                    page === currentPage
                      ? 'bg-primary-600 text-white'
                      : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Add School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Sekolah Baru</h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddSchool(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Contoh: SMA Negeri 1 Jakarta"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NPSN *</label>
                  <input
                    type="text"
                    value={formData.npsn}
                    onChange={(e) => setFormData(prev => ({ ...prev, npsn: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.npsn ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="8 digit angka"
                    maxLength={8}
                  />
                  {errors.npsn && <p className="mt-1 text-sm text-red-600">{errors.npsn}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Alamat lengkap sekolah"
                  rows={3}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="021-12345678"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="info@sekolah.sch.id"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah *</label>
                <input
                  type="text"
                  value={formData.principal_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, principal_name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.principal_name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Dr. Ahmad Susanto, M.Pd"
                />
                {errors.principal_name && <p className="mt-1 text-sm text-red-600">{errors.principal_name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Akreditasi</label>
                  <select
                    value={formData.accreditation}
                    onChange={(e) => setFormData(prev => ({ ...prev, accreditation: e.target.value as 'A' | 'B' | 'C' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="A">A (Sangat Baik)</option>
                    <option value="B">B (Baik)</option>
                    <option value="C">C (Cukup)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                  <input
                    type="number"
                    value={formData.established_year}
                    onChange={(e) => setFormData(prev => ({ ...prev, established_year: Number(e.target.value) }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.established_year ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                  {errors.established_year && <p className="mt-1 text-sm text-red-600">{errors.established_year}</p>}
                </div>
                
                <div className="flex items-center">
                  <input
                    id="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Status Aktif
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website (Opsional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="www.sekolah.sch.id"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={closeModals}>
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Tambah Sekolah'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit School Modal */}
      {showEditModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Sekolah</h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleEditSchool(); }} className="space-y-4">
              {/* Same form fields as Add Modal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Contoh: SMA Negeri 1 Jakarta"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NPSN *</label>
                  <input
                    type="text"
                    value={formData.npsn}
                    onChange={(e) => setFormData(prev => ({ ...prev, npsn: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.npsn ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="8 digit angka"
                    maxLength={8}
                  />
                  {errors.npsn && <p className="mt-1 text-sm text-red-600">{errors.npsn}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Alamat lengkap sekolah"
                  rows={3}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="021-12345678"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="info@sekolah.sch.id"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah *</label>
                <input
                  type="text"
                  value={formData.principal_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, principal_name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.principal_name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Dr. Ahmad Susanto, M.Pd"
                />
                {errors.principal_name && <p className="mt-1 text-sm text-red-600">{errors.principal_name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Akreditasi</label>
                  <select
                    value={formData.accreditation}
                    onChange={(e) => setFormData(prev => ({ ...prev, accreditation: e.target.value as 'A' | 'B' | 'C' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="A">A (Sangat Baik)</option>
                    <option value="B">B (Baik)</option>
                    <option value="C">C (Cukup)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                  <input
                    type="number"
                    value={formData.established_year}
                    onChange={(e) => setFormData(prev => ({ ...prev, established_year: Number(e.target.value) }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.established_year ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                  {errors.established_year && <p className="mt-1 text-sm text-red-600">{errors.established_year}</p>}
                </div>
                
                <div className="flex items-center">
                  <input
                    id="edit_is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="edit_is_active" className="ml-2 block text-sm text-gray-900">
                    Status Aktif
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website (Opsional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="www.sekolah.sch.id"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={closeModals}>
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Update Sekolah'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Konfirmasi Hapus</h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Hapus Sekolah</h4>
                  <p className="text-sm text-gray-600">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menghapus sekolah <strong>{selectedSchool.name}</strong>?
              </p>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Peringatan:</strong> Menghapus sekolah akan menghapus semua data terkait termasuk pengguna, kelas, dan materi pembelajaran.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={closeModals}>
                Batal
              </Button>
              <Button 
                type="button" 
                variant="danger" 
                onClick={handleDeleteSchool}
                disabled={loading}
              >
                {loading ? 'Menghapus...' : 'Hapus Sekolah'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* School Detail Modal */}
      {showDetailModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">Detail Sekolah</h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* School Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedSchool.name}</h4>
                    <p className="text-sm text-gray-600">NPSN: {selectedSchool.npsn}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Alamat</label>
                    <p className="text-sm text-gray-900">{selectedSchool.address}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Telepon</label>
                      <p className="text-sm text-gray-900">{selectedSchool.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedSchool.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Kepala Sekolah</label>
                    <p className="text-sm text-gray-900">{selectedSchool.principal_name}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Akreditasi</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedSchool.accreditation === 'A' ? 'bg-green-100 text-green-800' :
                        selectedSchool.accreditation === 'B' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedSchool.accreditation}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tahun Berdiri</label>
                      <p className="text-sm text-gray-900">{selectedSchool.established_year}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedSchool.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedSchool.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                  </div>
                  
                  {selectedSchool.website && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Website</label>
                      <a 
                        href={`https://${selectedSchool.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {selectedSchool.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* School Statistics */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Statistik Sekolah</h4>
                
                {schoolStats[selectedSchool.id] && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Total Pengguna</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        {schoolStats[selectedSchool.id].total_users}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Total Siswa</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 mt-2">
                        {schoolStats[selectedSchool.id].total_students}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Total Guru</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 mt-2">
                        {schoolStats[selectedSchool.id].total_teachers}
                      </p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">Total Kelas</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600 mt-2">
                        {schoolStats[selectedSchool.id].total_classes}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Informasi Tambahan</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Terdaftar:</span>
                      <span className="text-gray-900">{formatDate(selectedSchool.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Terakhir Diperbarui:</span>
                      <span className="text-gray-900">{formatDate(selectedSchool.updated_at || selectedSchool.created_at)}</span>
                    </div>
                    {schoolStats[selectedSchool.id] && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aktivitas Terakhir:</span>
                        <span className="text-gray-900">{formatTimeAgo(schoolStats[selectedSchool.id].last_activity)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6">
              <Button type="button" variant="secondary" onClick={closeModals}>
                Tutup
              </Button>
              <Button type="button" onClick={() => {
                closeModals();
                openEditModal(selectedSchool);
              }}>
                Edit Sekolah
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;