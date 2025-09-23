import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Award, Save, X, BookOpen, Target, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface CompetencyStandard {
  id: string;
  code: string;
  title: string;
  description: string;
  subject_id: string;
  subject_name: string;
  grade_level: string;
  category: 'knowledge' | 'skill' | 'attitude';
  is_active: boolean;
  schools_count: number;
  created_at: string;
}

export default function CompetencyStandards() {
  const [standards, setStandards] = useState<CompetencyStandard[]>([
    { 
      id: '1', 
      code: 'MTK.10.1.1', 
      title: 'Memahami konsep bilangan real', 
      description: 'Siswa mampu memahami dan mengaplikasikan konsep bilangan real dalam kehidupan sehari-hari', 
      subject_id: '1', 
      subject_name: 'Matematika', 
      grade_level: '10', 
      category: 'knowledge', 
      is_active: true, 
      schools_count: 15, 
      created_at: '2024-01-15' 
    },
    { 
      id: '2', 
      code: 'MTK.10.1.2', 
      title: 'Menyelesaikan persamaan linear', 
      description: 'Siswa mampu menyelesaikan berbagai bentuk persamaan linear satu variabel', 
      subject_id: '1', 
      subject_name: 'Matematika', 
      grade_level: '10', 
      category: 'skill', 
      is_active: true, 
      schools_count: 15, 
      created_at: '2024-01-15' 
    },
    { 
      id: '3', 
      code: 'BID.10.1.1', 
      title: 'Menganalisis teks laporan hasil observasi', 
      description: 'Siswa mampu menganalisis struktur dan kebahasaan teks laporan hasil observasi', 
      subject_id: '2', 
      subject_name: 'Bahasa Indonesia', 
      grade_level: '10', 
      category: 'knowledge', 
      is_active: true, 
      schools_count: 15, 
      created_at: '2024-01-15' 
    },
    { 
      id: '4', 
      code: 'BID.10.1.2', 
      title: 'Menulis teks laporan hasil observasi', 
      description: 'Siswa mampu menulis teks laporan hasil observasi dengan struktur yang tepat', 
      subject_id: '2', 
      subject_name: 'Bahasa Indonesia', 
      grade_level: '10', 
      category: 'skill', 
      is_active: true, 
      schools_count: 15, 
      created_at: '2024-01-15' 
    },
    { 
      id: '5', 
      code: 'FIS.10.1.1', 
      title: 'Memahami besaran dan satuan', 
      description: 'Siswa mampu memahami konsep besaran pokok, besaran turunan, dan sistem satuan', 
      subject_id: '4', 
      subject_name: 'Fisika', 
      grade_level: '10', 
      category: 'knowledge', 
      is_active: true, 
      schools_count: 8, 
      created_at: '2024-01-15' 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<CompetencyStandard | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    subject_id: '',
    grade_level: '10',
    category: 'knowledge' as 'knowledge' | 'skill' | 'attitude',
    is_active: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subjects = [
    { id: '1', name: 'Matematika' },
    { id: '2', name: 'Bahasa Indonesia' },
    { id: '3', name: 'Bahasa Inggris' },
    { id: '4', name: 'Fisika' },
    { id: '5', name: 'Kimia' },
    { id: '6', name: 'Biologi' }
  ];

  const filteredStandards = standards.filter(standard => {
    const matchesSearch = standard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         standard.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         standard.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || standard.subject_id === subjectFilter;
    const matchesCategory = categoryFilter === 'all' || standard.category === categoryFilter;
    const matchesGrade = gradeFilter === 'all' || standard.grade_level === gradeFilter;
    
    return matchesSearch && matchesSubject && matchesCategory && matchesGrade;
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Kode kompetensi wajib diisi';
    } else if (standards.some(s => s.code === formData.code && s.id !== selectedStandard?.id)) {
      newErrors.code = 'Kode kompetensi sudah digunakan';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Judul kompetensi wajib diisi';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi kompetensi wajib diisi';
    }

    if (!formData.subject_id) {
      newErrors.subject_id = 'Mata pelajaran wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddModal = () => {
    setFormData({
      code: '',
      title: '',
      description: '',
      subject_id: '',
      grade_level: '10',
      category: 'knowledge',
      is_active: true
    });
    setErrors({});
    setShowAddModal(true);
  };

  const openEditModal = (standard: CompetencyStandard) => {
    setSelectedStandard(standard);
    setFormData({
      code: standard.code,
      title: standard.title,
      description: standard.description,
      subject_id: standard.subject_id,
      grade_level: standard.grade_level,
      category: standard.category,
      is_active: standard.is_active
    });
    setErrors({});
    setShowEditModal(true);
  };

  const openDeleteModal = (standard: CompetencyStandard) => {
    setSelectedStandard(standard);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedStandard(null);
    setFormData({
      code: '',
      title: '',
      description: '',
      subject_id: '',
      grade_level: '10',
      category: 'knowledge',
      is_active: true
    });
    setErrors({});
  };

  const handleAddStandard = () => {
    if (!validateForm()) return;

    const selectedSubject = subjects.find(s => s.id === formData.subject_id);
    const newStandard: CompetencyStandard = {
      id: Date.now().toString(),
      code: formData.code,
      title: formData.title,
      description: formData.description,
      subject_id: formData.subject_id,
      subject_name: selectedSubject?.name || '',
      grade_level: formData.grade_level,
      category: formData.category,
      is_active: formData.is_active,
      schools_count: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setStandards([...standards, newStandard]);
    closeModals();
  };

  const handleEditStandard = () => {
    if (!validateForm() || !selectedStandard) return;

    const selectedSubject = subjects.find(s => s.id === formData.subject_id);
    setStandards(standards.map(standard =>
      standard.id === selectedStandard.id
        ? {
            ...standard,
            code: formData.code,
            title: formData.title,
            description: formData.description,
            subject_id: formData.subject_id,
            subject_name: selectedSubject?.name || '',
            grade_level: formData.grade_level,
            category: formData.category,
            is_active: formData.is_active
          }
        : standard
    ));
    closeModals();
  };

  const handleDeleteStandard = () => {
    if (!selectedStandard) return;
    setStandards(standards.filter(standard => standard.id !== selectedStandard.id));
    closeModals();
  };

  const toggleStandardStatus = (standard: CompetencyStandard) => {
    setStandards(standards.map(s =>
      s.id === standard.id ? { ...s, is_active: !s.is_active } : s
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'knowledge': return <BookOpen className="h-4 w-4" />;
      case 'skill': return <Target className="h-4 w-4" />;
      case 'attitude': return <Users className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'knowledge': return 'Pengetahuan';
      case 'skill': return 'Keterampilan';
      case 'attitude': return 'Sikap';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'knowledge': return 'bg-blue-100 text-blue-800';
      case 'skill': return 'bg-green-100 text-green-800';
      case 'attitude': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Standar Kompetensi</h1>
          <p className="text-gray-600 mt-1">Kelola standar kompetensi untuk semua mata pelajaran</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Standar Kompetensi
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Standar</p>
              <p className="text-2xl font-bold text-blue-600">{standards.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pengetahuan</p>
              <p className="text-2xl font-bold text-green-600">{standards.filter(s => s.category === 'knowledge').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Keterampilan</p>
              <p className="text-2xl font-bold text-purple-600">{standards.filter(s => s.category === 'skill').length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sikap</p>
              <p className="text-2xl font-bold text-orange-600">{standards.filter(s => s.category === 'attitude').length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari standar kompetensi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Mata Pelajaran</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Kategori</option>
              <option value="knowledge">Pengetahuan</option>
              <option value="skill">Keterampilan</option>
              <option value="attitude">Sikap</option>
            </select>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Kelas</option>
              <option value="10">Kelas 10</option>
              <option value="11">Kelas 11</option>
              <option value="12">Kelas 12</option>
            </select>
          </div>

          {/* Standards Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standar Kompetensi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStandards.map((standard) => (
                  <tr key={standard.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {standard.code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{standard.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{standard.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{standard.subject_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kelas {standard.grade_level}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1 ${getCategoryColor(standard.category)}`}>
                        {getCategoryIcon(standard.category)}
                        {getCategoryLabel(standard.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{standard.schools_count} sekolah</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStandardStatus(standard)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          standard.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {standard.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(standard)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(standard)}
                          className="text-red-600 hover:text-red-900"
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

      {/* Add Standard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Standar Kompetensi</h3>
              <button onClick={closeModals}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Kompetensi *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.code ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Contoh: MTK.10.1.1"
                  />
                  {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
                  <select
                    value={formData.subject_id}
                    onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.subject_id ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Mata Pelajaran</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                  {errors.subject_id && <p className="mt-1 text-sm text-red-600">{errors.subject_id}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kompetensi *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan judul standar kompetensi"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Deskripsi detail standar kompetensi"
                  rows={4}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                  <select
                    value={formData.grade_level}
                    onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'knowledge' | 'skill' | 'attitude' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="knowledge">Pengetahuan</option>
                    <option value="skill">Keterampilan</option>
                    <option value="attitude">Sikap</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Standar Kompetensi Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-6">
              <button
                onClick={closeModals}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddStandard}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit and Delete modals would be similar to Add modal */}
    </div>
  );
}
