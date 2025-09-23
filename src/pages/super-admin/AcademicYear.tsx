import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Save, X, School, Users, BookOpen, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface AcademicYear {
  id: string;
  year: string;
  semester: 1 | 2;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_current: boolean;
  schools_count: number;
  students_count: number;
  classes_count: number;
  created_at: string;
}

export default function AcademicYear() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([
    { 
      id: '1', 
      year: '2024/2025', 
      semester: 1, 
      start_date: '2024-07-15', 
      end_date: '2024-12-20', 
      is_active: true, 
      is_current: true, 
      schools_count: 15, 
      students_count: 2450, 
      classes_count: 98, 
      created_at: '2024-06-01' 
    },
    { 
      id: '2', 
      year: '2024/2025', 
      semester: 2, 
      start_date: '2025-01-06', 
      end_date: '2025-06-15', 
      is_active: true, 
      is_current: false, 
      schools_count: 15, 
      students_count: 2450, 
      classes_count: 98, 
      created_at: '2024-06-01' 
    },
    { 
      id: '3', 
      year: '2023/2024', 
      semester: 2, 
      start_date: '2024-01-08', 
      end_date: '2024-06-14', 
      is_active: false, 
      is_current: false, 
      schools_count: 15, 
      students_count: 2380, 
      classes_count: 95, 
      created_at: '2023-12-01' 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<AcademicYear | null>(null);
  const [formData, setFormData] = useState({
    year: '',
    semester: 1 as 1 | 2,
    start_date: '',
    end_date: '',
    is_active: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredAcademicYears = academicYears.filter(ay => {
    const matchesSearch = ay.year.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && ay.is_active) ||
      (statusFilter === 'inactive' && !ay.is_active) ||
      (statusFilter === 'current' && ay.is_current);
    
    return matchesSearch && matchesStatus;
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.year.trim()) {
      newErrors.year = 'Tahun akademik wajib diisi';
    } else if (!/^\d{4}\/\d{4}$/.test(formData.year)) {
      newErrors.year = 'Format tahun harus YYYY/YYYY (contoh: 2024/2025)';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Tanggal mulai wajib diisi';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'Tanggal selesai wajib diisi';
    }

    if (formData.start_date && formData.end_date && formData.start_date >= formData.end_date) {
      newErrors.end_date = 'Tanggal selesai harus setelah tanggal mulai';
    }

    const isDuplicate = academicYears.some(ay => 
      ay.year === formData.year && 
      ay.semester === formData.semester && 
      ay.id !== selectedAcademicYear?.id
    );
    
    if (isDuplicate) {
      newErrors.year = `Tahun akademik ${formData.year} semester ${formData.semester} sudah ada`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddModal = () => {
    const currentYear = new Date().getFullYear();
    setFormData({
      year: `${currentYear}/${currentYear + 1}`,
      semester: 1,
      start_date: '',
      end_date: '',
      is_active: true
    });
    setErrors({});
    setShowAddModal(true);
  };

  const openEditModal = (academicYear: AcademicYear) => {
    setSelectedAcademicYear(academicYear);
    setFormData({
      year: academicYear.year,
      semester: academicYear.semester,
      start_date: academicYear.start_date,
      end_date: academicYear.end_date,
      is_active: academicYear.is_active
    });
    setErrors({});
    setShowEditModal(true);
  };

  const openDeleteModal = (academicYear: AcademicYear) => {
    setSelectedAcademicYear(academicYear);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedAcademicYear(null);
    setFormData({
      year: '',
      semester: 1,
      start_date: '',
      end_date: '',
      is_active: true
    });
    setErrors({});
  };

  const handleAddAcademicYear = () => {
    if (!validateForm()) return;

    const newAcademicYear: AcademicYear = {
      id: Date.now().toString(),
      year: formData.year,
      semester: formData.semester,
      start_date: formData.start_date,
      end_date: formData.end_date,
      is_active: formData.is_active,
      is_current: false,
      schools_count: 0,
      students_count: 0,
      classes_count: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setAcademicYears([...academicYears, newAcademicYear]);
    closeModals();
  };

  const handleEditAcademicYear = () => {
    if (!validateForm() || !selectedAcademicYear) return;

    setAcademicYears(academicYears.map(ay =>
      ay.id === selectedAcademicYear.id
        ? {
            ...ay,
            year: formData.year,
            semester: formData.semester,
            start_date: formData.start_date,
            end_date: formData.end_date,
            is_active: formData.is_active
          }
        : ay
    ));
    closeModals();
  };

  const handleDeleteAcademicYear = () => {
    if (!selectedAcademicYear) return;
    setAcademicYears(academicYears.filter(ay => ay.id !== selectedAcademicYear.id));
    closeModals();
  };

  const setCurrentAcademicYear = (academicYear: AcademicYear) => {
    setAcademicYears(academicYears.map(ay => ({
      ...ay,
      is_current: ay.id === academicYear.id
    })));
  };

  const toggleAcademicYearStatus = (academicYear: AcademicYear) => {
    setAcademicYears(academicYears.map(ay =>
      ay.id === academicYear.id ? { ...ay, is_active: !ay.is_active } : ay
    ));
  };

  const currentAcademicYear = academicYears.find(ay => ay.is_current);
  const activeAcademicYears = academicYears.filter(ay => ay.is_active);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tahun Akademik</h1>
          <p className="text-gray-600 mt-1">Kelola tahun akademik dan semester untuk semua sekolah</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Tahun Akademik
        </Button>
      </div>

      {/* Current Academic Year Alert */}
      {currentAcademicYear && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">
                Tahun Akademik Aktif: {currentAcademicYear.year} - Semester {currentAcademicYear.semester}
              </p>
              <p className="text-sm text-blue-700">
                {new Date(currentAcademicYear.start_date).toLocaleDateString('id-ID')} - {new Date(currentAcademicYear.end_date).toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tahun Akademik</p>
              <p className="text-2xl font-bold text-blue-600">{academicYears.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tahun Akademik Aktif</p>
              <p className="text-2xl font-bold text-green-600">{activeAcademicYears.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Siswa Aktif</p>
              <p className="text-2xl font-bold text-purple-600">
                {currentAcademicYear?.students_count || 0}
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
              <p className="text-sm font-medium text-gray-600">Total Kelas Aktif</p>
              <p className="text-2xl font-bold text-orange-600">
                {currentAcademicYear?.classes_count || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari tahun akademik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="current">Sedang Berlangsung</option>
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </select>
            </div>
          </div>

          {/* Academic Years Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Akademik</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAcademicYears.map((academicYear) => (
                  <tr key={academicYear.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {academicYear.year} - Semester {academicYear.semester}
                            {academicYear.is_current && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Berlangsung
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>{new Date(academicYear.start_date).toLocaleDateString('id-ID')}</div>
                        <div className="text-xs text-gray-400">s/d {new Date(academicYear.end_date).toLocaleDateString('id-ID')}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <School className="h-4 w-4" />
                        {academicYear.schools_count}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {academicYear.students_count.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {academicYear.classes_count}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleAcademicYearStatus(academicYear)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          academicYear.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {academicYear.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {!academicYear.is_current && academicYear.is_active && (
                          <button
                            onClick={() => setCurrentAcademicYear(academicYear)}
                            className="text-green-600 hover:text-green-900 text-xs px-2 py-1 bg-green-50 rounded"
                          >
                            Set Aktif
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(academicYear)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(academicYear)}
                          className="text-red-600 hover:text-red-900"
                          disabled={academicYear.is_current}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Modals would be added here but truncated for space */}
    </div>
  );
}
