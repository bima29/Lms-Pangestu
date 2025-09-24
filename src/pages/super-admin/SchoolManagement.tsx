import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  X, 
  Save,
  MapPin,
  Phone,
  Mail,
  Globe,
  Eye,
  Filter,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { mockSchools, mockUsers } from '../../data/mockData';
import { School, User } from '../../types';

interface ExtendedSchool extends School {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalAdmins: number;
  status: 'active' | 'inactive';
  phone?: string;
  email?: string;
  website?: string;
  principal?: string;
  established_year?: number;
  accreditation?: 'A' | 'B' | 'C';
}

interface SchoolFormData {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  principal?: string;
  established_year?: number;
  accreditation?: 'A' | 'B' | 'C';
  status: 'active' | 'inactive';
}

interface SchoolStats {
  totalSchools: number;
  activeSchools: number;
  totalUsers: number;
  averageUsersPerSchool: number;
  newSchoolsThisMonth: number;
}

const SchoolManagement: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [accreditationFilter, setAccreditationFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedSchools, setSelectedSchools] = useState<Set<string>>(new Set());
  
  // Form state
  const [formData, setFormData] = useState<SchoolFormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    principal: '',
    established_year: new Date().getFullYear(),
    accreditation: 'A',
    status: 'active' as 'active' | 'inactive'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Data states
  const [schools, setSchools] = useState<ExtendedSchool[]>([]);
  const [stats, setStats] = useState<SchoolStats>({
    totalSchools: 0,
    activeSchools: 0,
    totalUsers: 0,
    averageUsersPerSchool: 0,
    newSchoolsThisMonth: 0
  });

  useEffect(() => {
    loadSchools();
    calculateStats();
  }, []);

  const loadSchools = () => {
    // Transform mock schools with additional data
    const extendedSchools: ExtendedSchool[] = mockSchools.map(school => {
      const schoolUsers = mockUsers.filter(u => u.school_id === school.id);
      return {
        ...school,
        totalUsers: schoolUsers.length,
        totalStudents: schoolUsers.filter(u => u.role === 'student').length,
        totalTeachers: schoolUsers.filter(u => u.role === 'teacher').length,
        totalAdmins: schoolUsers.filter(u => u.role === 'school_admin').length,
        status: 'active' as 'active' | 'inactive',
        phone: '+62 21 1234567',
        email: `info@${school.name.toLowerCase().replace(/\s+/g, '')}.sch.id`,
        website: `www.${school.name.toLowerCase().replace(/\s+/g, '')}.sch.id`,
        principal: 'Dr. Ahmad Susanto, M.Pd',
        established_year: 1995,
        accreditation: 'A' as 'A'
      };
    });
    setSchools(extendedSchools);
  };

  const calculateStats = () => {
    const totalSchools = mockSchools.length;
    const activeSchools = totalSchools; // Assume all active for now
    const totalUsers = mockUsers.length;
    const averageUsersPerSchool = totalSchools > 0 ? Math.round(totalUsers / totalSchools) : 0;
    const newSchoolsThisMonth = Math.floor(totalSchools * 0.1); // Simulate 10% growth

    setStats({
      totalSchools,
      activeSchools,
      totalUsers,
      averageUsersPerSchool,
      newSchoolsThisMonth
    });
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Nama sekolah wajib diisi';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Nama sekolah minimal 3 karakter';
    }

    if (!formData.address.trim()) {
      errors.address = 'Alamat wajib diisi';
    } else if (formData.address.trim().length < 10) {
      errors.address = 'Alamat minimal 10 karakter';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (formData.phone && !/^[\d\-\+\(\)\s]+$/.test(formData.phone)) {
      errors.phone = 'Format nomor telepon tidak valid';
    }

    if (formData.website && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) {
      errors.website = 'Format website tidak valid';
    }

    // Check for duplicate school name
    const isDuplicate = schools.some(school => 
      school.name.toLowerCase() === formData.name.trim().toLowerCase() && 
      (!selectedSchool || school.id !== selectedSchool.id)
    );
    if (isDuplicate) {
      errors.name = 'Nama sekolah sudah ada';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Filter and sort schools
  const getFilteredSchools = () => {
    let filtered = [...schools];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(searchLower) ||
        school.address.toLowerCase().includes(searchLower) ||
        (school.principal && school.principal.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(school => school.status === statusFilter);
    }

    // Apply accreditation filter
    if (accreditationFilter) {
      filtered = filtered.filter(school => school.accreditation === accreditationFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof ExtendedSchool];
      let bValue: any = b[sortBy as keyof ExtendedSchool];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  };

  // Modal handlers
  const openAddModal = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      principal: '',
      established_year: new Date().getFullYear(),
      accreditation: 'A',
      status: 'active'
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  const openEditModal = (school: ExtendedSchool) => {
    setSelectedSchool(school);
    setFormData({
      name: school.name,
      address: school.address || '',
      phone: school.phone || '',
      email: school.email || '',
      website: school.website || '',
      principal: school.principal || '',
      established_year: school.established_year || new Date().getFullYear(),
      accreditation: school.accreditation || 'A',
      status: school.status
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  const openDetailModal = (school: ExtendedSchool) => {
    setSelectedSchool(school);
    setShowDetailModal(true);
  };

  const openDeleteModal = (school: ExtendedSchool) => {
    setSelectedSchool(school);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowDetailModal(false);
    setShowBulkModal(false);
    setSelectedSchool(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      principal: '',
      established_year: new Date().getFullYear(),
      accreditation: 'A',
      status: 'active'
    });
    setFormErrors({});
  };

  // CRUD operations
  const handleAddSchool = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const newSchool: ExtendedSchool = {
        id: `sch-${Date.now()}`,
        name: formData.name.trim(),
        address: formData.address.trim(),
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        principal: formData.principal,
        established_year: formData.established_year,
        accreditation: formData.accreditation,
        status: formData.status,
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalAdmins: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSchools([newSchool, ...schools]);
      calculateStats();
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedSchools = schools.map(school =>
        school.id === selectedSchool.id
          ? { 
              ...school, 
              ...formData,
              name: formData.name.trim(),
              address: formData.address.trim(),
              updated_at: new Date().toISOString()
            }
          : school
      );
      setSchools(updatedSchools);
      calculateStats();
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
      
      const updatedSchools = schools.filter(school => school.id !== selectedSchool.id);
      setSchools(updatedSchools);
      calculateStats();
      closeModals();
    } catch (error) {
      console.error('Error deleting school:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSchools.size === 0) return;

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSchools = schools.filter(school => !selectedSchools.has(school.id));
      setSchools(updatedSchools);
      setSelectedSchools(new Set());
      calculateStats();
      closeModals();
    } catch (error) {
      console.error('Error bulk deleting schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSchoolSelection = (schoolId: string) => {
    const newSelected = new Set(selectedSchools);
    if (newSelected.has(schoolId)) {
      newSelected.delete(schoolId);
    } else {
      newSelected.add(schoolId);
    }
    setSelectedSchools(newSelected);
  };

  const toggleAllSchools = () => {
    const filteredSchools = getFilteredSchools();
    if (selectedSchools.size === filteredSchools.length) {
      setSelectedSchools(new Set());
    } else {
      setSelectedSchools(new Set(filteredSchools.map(s => s.id)));
    }
  };

  // Export functionality
  const exportSchools = (format: 'csv' | 'excel') => {
    const exportData = schools.map(school => ({
      ID: school.id,
      Name: school.name,
      Address: school.address,
      Phone: school.phone || '',
      Email: school.email || '',
      Website: school.website || '',
      Principal: school.principal || '',
      'Established Year': school.established_year || '',
      Accreditation: school.accreditation || '',
      'Total Users': school.totalUsers,
      'Total Students': school.totalStudents,
      'Total Teachers': school.totalTeachers,
      Status: school.status,
      'Created At': new Date(school.created_at).toLocaleDateString('id-ID')
    }));

    const filename = `schools_export_${new Date().toISOString().split('T')[0]}.${format}`;
    const csvContent = format === 'csv' 
      ? [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row => Object.values(row).join(','))
        ].join('\n')
      : JSON.stringify(exportData, null, 2);
    
    const blob = new Blob([csvContent], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredSchools = getFilteredSchools();

  return (
    <div className="space-y-6">
      {/* Header */}
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
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manajemen Sekolah</h1>
          <p className="text-gray-600 mt-1">Kelola semua sekolah yang terdaftar di platform</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => exportSchools('csv')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button 
            onClick={openAddModal}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Sekolah
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sekolah</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalSchools}</p>
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
              <p className="text-2xl font-bold text-green-600">{stats.activeSchools}</p>
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
              <p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata User</p>
              <p className="text-2xl font-bold text-orange-600">{stats.averageUsersPerSchool}</p>
              <p className="text-xs text-gray-500">per sekolah</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sekolah Baru</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.newSchoolsThisMonth}</p>
              <p className="text-xs text-gray-500">bulan ini</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari sekolah berdasarkan nama, alamat, atau kepala sekolah..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Akreditasi</label>
              <select
                value={accreditationFilter}
                onChange={(e) => setAccreditationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Semua Akreditasi</option>
                <option value="A">A (Sangat Baik)</option>
                <option value="B">B (Baik)</option>
                <option value="C">C (Cukup)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urutkan</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="name">Nama</option>
                <option value="totalUsers">Total Pengguna</option>
                <option value="totalStudents">Total Siswa</option>
                <option value="created_at">Tanggal Dibuat</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="asc">A-Z / Terkecil</option>
                <option value="desc">Z-A / Terbesar</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setAccreditationFilter('');
                  setSortBy('name');
                  setSortOrder('asc');
                }}
                className="w-full"
              >
                Reset Filter
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedSchools.size > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedSchools.size} sekolah dipilih
                </span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedSchools(new Set())}
                  >
                    Batal Pilih
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => setShowBulkModal(true)}
                  >
                    Hapus Terpilih
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <Card key={school.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedSchools.has(school.id)}
                    onChange={() => toggleSchoolSelection(school.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">{school.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        school.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {school.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                      {school.accreditation && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
                          Akreditasi {school.accreditation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* School Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">{school.address}</p>
                </div>
                {school.principal && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{school.principal}</p>
                  </div>
                )}
                {school.established_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-600">Didirikan {school.established_year}</p>
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-semibold text-blue-900">{school.totalStudents}</p>
                  <p className="text-xs text-blue-600">Siswa</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-lg font-semibold text-green-900">{school.totalTeachers}</p>
                  <p className="text-xs text-green-600">Guru</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-lg font-semibold text-purple-900">{school.totalAdmins}</p>
                  <p className="text-xs text-purple-600">Admin</p>
                </div>
              </div>

              {/* Contact Info */}
              {(school.phone || school.email || school.website) && (
                <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                  {school.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{school.phone}</span>
                    </div>
                  )}
                  {school.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{school.email}</span>
                    </div>
                  )}
                  {school.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{school.website}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  size="sm"
                  variant="secondary"
                  onClick={() => openDetailModal(school)}
                  className="flex-1 flex items-center justify-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  Detail
                </Button>
                <Button 
                  size="sm"
                  variant="secondary"
                  onClick={() => openEditModal(school)}
                  className="flex-1 flex items-center justify-center gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  size="sm"
                  variant="danger"
                  onClick={() => openDeleteModal(school)}
                  className="flex-1 flex items-center justify-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  Hapus
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada sekolah ditemukan</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter || accreditationFilter
              ? 'Coba ubah filter pencarian Anda.'
              : 'Mulai dengan menambahkan sekolah baru.'}
          </p>
        </div>
      )}

      {/* Add School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Sekolah Baru</h3>
              <button onClick={closeModals}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddSchool(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nama sekolah"
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat *</label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan alamat lengkap sekolah"
                />
                {formErrors.address && <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kepala Sekolah</label>
                  <input
                    type="text"
                    value={formData.principal}
                    onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nama kepala sekolah"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                  <input
                    type="number"
                    value={formData.established_year}
                    onChange={(e) => setFormData({ ...formData, established_year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+62 21 1234567"
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="info@sekolah.sch.id"
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Akreditasi</label>
                  <select
                    value={formData.accreditation}
                    onChange={(e) => setFormData({ ...formData, accreditation: e.target.value as 'A' | 'B' | 'C' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="A">A (Sangat Baik)</option>
                    <option value="B">B (Baik)</option>
                    <option value="C">C (Cukup)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.website ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="www.sekolah.sch.id"
                />
                {formErrors.website && <p className="mt-1 text-sm text-red-600">{formErrors.website}</p>}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModals}>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Sekolah</h3>
              <button onClick={closeModals}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleEditSchool(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nama sekolah"
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat *</label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan alamat lengkap sekolah"
                />
                {formErrors.address && <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kepala Sekolah</label>
                  <input
                    type="text"
                    value={formData.principal}
                    onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nama kepala sekolah"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                  <input
                    type="number"
                    value={formData.established_year}
                    onChange={(e) => setFormData({ ...formData, established_year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+62 21 1234567"
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="info@sekolah.sch.id"
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Akreditasi</label>
                  <select
                    value={formData.accreditation}
                    onChange={(e) => setFormData({ ...formData, accreditation: e.target.value as 'A' | 'B' | 'C' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="A">A (Sangat Baik)</option>
                    <option value="B">B (Baik)</option>
                    <option value="C">C (Cukup)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
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
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.website ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="www.sekolah.sch.id"
                />
                {formErrors.website && <p className="mt-1 text-sm text-red-600">{formErrors.website}</p>}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModals}>
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">Detail Sekolah</h3>
              <button onClick={closeModals}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Informasi Dasar</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Sekolah</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Alamat</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.address}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        (selectedSchool as ExtendedSchool).status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {(selectedSchool as ExtendedSchool).status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Statistik</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{(selectedSchool as ExtendedSchool).totalStudents}</p>
                      <p className="text-xs text-blue-600">Siswa</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{(selectedSchool as ExtendedSchool).totalTeachers}</p>
                      <p className="text-xs text-green-600">Guru</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{(selectedSchool as ExtendedSchool).totalAdmins}</p>
                      <p className="text-xs text-purple-600">Admin</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{(selectedSchool as ExtendedSchool).totalUsers}</p>
                      <p className="text-xs text-orange-600">Total User</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact & Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Kontak</h4>
                  <div className="space-y-3">
                    {(selectedSchool as ExtendedSchool).phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{(selectedSchool as ExtendedSchool).phone}</span>
                      </div>
                    )}
                    {(selectedSchool as ExtendedSchool).email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{(selectedSchool as ExtendedSchool).email}</span>
                      </div>
                    )}
                    {(selectedSchool as ExtendedSchool).website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{(selectedSchool as ExtendedSchool).website}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Informasi Tambahan</h4>
                  <div className="space-y-3">
                    {(selectedSchool as ExtendedSchool).principal && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Kepala Sekolah</label>
                        <p className="mt-1 text-sm text-gray-900">{(selectedSchool as ExtendedSchool).principal}</p>
                      </div>
                    )}
                    {(selectedSchool as ExtendedSchool).established_year && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tahun Berdiri</label>
                        <p className="mt-1 text-sm text-gray-900">{(selectedSchool as ExtendedSchool).established_year}</p>
                      </div>
                    )}
                    {(selectedSchool as ExtendedSchool).accreditation && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Akreditasi</label>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                          {(selectedSchool as ExtendedSchool).accreditation} 
                          {(selectedSchool as ExtendedSchool).accreditation === 'A' && ' (Sangat Baik)'}
                          {(selectedSchool as ExtendedSchool).accreditation === 'B' && ' (Baik)'}
                          {(selectedSchool as ExtendedSchool).accreditation === 'C' && ' (Cukup)'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* System Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Informasi Sistem</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tanggal Bergabung</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedSchool.created_at).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Terakhir Diperbarui</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedSchool.updated_at ? new Date(selectedSchool.updated_at).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="outline" onClick={closeModals}>
                Tutup
              </Button>
              <Button onClick={() => {
                closeModals();
                openEditModal(selectedSchool as ExtendedSchool);
              }}>
                Edit Sekolah
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Konfirmasi Hapus</h3>
              <button onClick={closeModals}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menghapus sekolah <strong>{selectedSchool.name}</strong>?
              </p>
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium">Peringatan:</p>
                <ul className="text-sm text-red-700 mt-1 space-y-1">
                  <li>• Semua data pengguna sekolah akan dihapus</li>
                  <li>• Semua data akademik akan hilang</li>
                  <li>• Tindakan ini tidak dapat dibatalkan</li>
                </ul>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={closeModals} className="flex-1">
                Batal
              </Button>
              <Button variant="danger" onClick={handleDeleteSchool} disabled={loading} className="flex-1">
                {loading ? 'Menghapus...' : 'Hapus Sekolah'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Konfirmasi Hapus Massal</h3>
              <button onClick={closeModals}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menghapus <strong>{selectedSchools.size}</strong> sekolah yang dipilih?
              </p>
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium">Peringatan:</p>
                <ul className="text-sm text-red-700 mt-1 space-y-1">
                  <li>• Semua data pengguna dari sekolah-sekolah ini akan dihapus</li>
                  <li>• Semua data akademik akan hilang</li>
                  <li>• Tindakan ini tidak dapat dibatalkan</li>
                </ul>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={closeModals} className="flex-1">
                Batal
              </Button>
              <Button variant="danger" onClick={handleBulkDelete} disabled={loading} className="flex-1">
                {loading ? 'Menghapus...' : `Hapus ${selectedSchools.size} Sekolah`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;
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
