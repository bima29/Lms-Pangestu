import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import Select from 'react-select';
import { Class } from '../../types';

const initialClasses: Class[] = [
  {
    id: '1',
    name: 'X IPA 1',
    major_id: 'major-1',
    grade_level: 10,
    academic_year: '2024/2025',
    homeroom_teacher_id: 'teacher-1',
    max_students: 36,
    is_active: true,
    created_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'XI IPS 2',
    major_id: 'major-2',
    grade_level: 11,
    academic_year: '2024/2025',
    homeroom_teacher_id: 'teacher-2',
    max_students: 32,
    is_active: true,
    created_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '3',
    name: 'XII TKJ 1',
    major_id: 'major-3',
    grade_level: 12,
    academic_year: '2024/2025',
    homeroom_teacher_id: 'teacher-3',
    max_students: 30,
    is_active: true,
    created_at: '2024-01-15T08:00:00Z'
  }
];

const SchoolClassManagement = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editClass, setEditClass] = useState<Class | null>(null);
  const [className, setClassName] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<{value: string; label: string} | null>(null);
  const [gradeLevel, setGradeLevel] = useState(10);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<{value: number; label: string} | null>(null);
  const [academicYear, setAcademicYear] = useState('2024/2025');
  const [selectedTeacher, setSelectedTeacher] = useState<{value: string; label: string} | null>(null);
  const [maxStudents, setMaxStudents] = useState(36);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Search & Pagination
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.academic_year.includes(searchTerm) ||
    c.grade_level.toString().includes(searchTerm)
  );
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Mock data for select options
  const majorOptions = [
    { value: 'major-1', label: 'IPA (Ilmu Pengetahuan Alam)' },
    { value: 'major-2', label: 'IPS (Ilmu Pengetahuan Sosial)' },
    { value: 'major-3', label: 'TKJ (Teknik Komputer dan Jaringan)' },
    { value: 'major-4', label: 'RPL (Rekayasa Perangkat Lunak)' },
    { value: 'major-5', label: 'MM (Multimedia)' },
    { value: 'major-6', label: 'AKL (Akuntansi dan Keuangan Lembaga)' }
  ];

  const teacherOptions = [
    { value: 'teacher-1', label: 'Budi Santoso, S.Pd' },
    { value: 'teacher-2', label: 'Sari Dewi, S.Pd' },
    { value: 'teacher-3', label: 'Ahmad Rahman, S.Kom' },
    { value: 'teacher-4', label: 'Rina Kurnia, S.Si' },
    { value: 'teacher-5', label: 'Dian Permata, S.Sos' },
    { value: 'teacher-6', label: 'Fajar Hidayat, S.Pd' }
  ];

  const gradeLevelOptions = [
    { value: 10, label: 'Kelas 10' },
    { value: 11, label: 'Kelas 11' },
    { value: 12, label: 'Kelas 12' }
  ];

  // Add Class
  const handleAddClass = () => {
    if (className.trim() && selectedMajor && selectedTeacher) {
      const newClass = {
        id: Date.now().toString(),
        name: className,
        major_id: selectedMajor.value,
        grade_level: selectedGradeLevel?.value || gradeLevel,
        academic_year: academicYear,
        homeroom_teacher_id: selectedTeacher.value,
        max_students: maxStudents,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setClasses([...classes, newClass]);
      setClassName('');
      setSelectedMajor(null);
      setGradeLevel(10);
      setSelectedGradeLevel(null);
      setAcademicYear('2024/2025');
      setSelectedTeacher(null);
      setMaxStudents(36);
      setIsAddModalOpen(false);
    }
  };

  // Edit Class
  const openEditModal = (cls: any) => {
    setEditClass(cls);
    setClassName(cls.name);
    setSelectedMajor(majorOptions.find(opt => opt.value === cls.major_id) || null);
    setGradeLevel(cls.grade_level);
    setSelectedGradeLevel(gradeLevelOptions.find(opt => opt.value === cls.grade_level) || null);
    setAcademicYear(cls.academic_year);
    setSelectedTeacher(teacherOptions.find(opt => opt.value === cls.homeroom_teacher_id) || null);
    setMaxStudents(cls.max_students);
    setIsEditModalOpen(true);
  };
  
  const handleEditClass = () => {
    if (className.trim() && selectedMajor && selectedTeacher && editClass) {
      setClasses(classes.map(c => c.id === editClass.id ? {
        ...c,
        name: className,
        major_id: selectedMajor.value,
        grade_level: selectedGradeLevel?.value || gradeLevel,
        academic_year: academicYear,
        homeroom_teacher_id: selectedTeacher.value,
        max_students: maxStudents,
        updated_at: new Date().toISOString()
      } : c));
      setEditClass(null);
      setClassName('');
      setSelectedMajor(null);
      setGradeLevel(10);
      setSelectedGradeLevel(null);
      setAcademicYear('2024/2025');
      setSelectedTeacher(null);
      setMaxStudents(36);
      setIsEditModalOpen(false);
    }
  };

  // Delete Class
  const handleDeleteClass = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4">
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Kelas</h1>
          <p className="text-gray-600">Kelola data kelas sekolah dengan mudah</p>
        </div>

        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden bg-white">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Daftar Kelas</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredClasses.length} kelas ditemukan
                </p>
              </div>
              <Button 
                onClick={() => setIsAddModalOpen(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" /> Tambah Kelas
              </Button>
            </div>
            
            {/* Search and Filter */}
            <div className="mt-6 flex flex-col md:flex-row gap-3 items-start md:items-center">
              <div className="relative w-full md:w-auto flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Cari kelas..."
                />
              </div>
              <select
                value={itemsPerPage}
                onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                style={{ minWidth: '120px' }}
              >
                {[5, 10, 20, 50, 100].map(n => (
                  <option key={n} value={n}>{n} / halaman</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto rounded-lg">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 animate-pulse">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="mt-3 text-gray-500">Memuat data kelas...</p>
              </div>
            ) : filteredClasses.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">Tidak ada kelas</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Mulai dengan menambahkan kelas pertama'}
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Tambah Kelas
                  </Button>
                </div>
              </div>
            ) : (
              <Table
                columns={[
                  { key: 'name', header: 'Nama Kelas' },
                  { key: 'grade_level', header: 'Tingkat' },
                  { key: 'academic_year', header: 'Tahun Ajaran' },
                  { key: 'max_students', header: 'Kapasitas' },
                  { key: 'actions', header: 'Aksi' }
                ]}
                data={paginatedClasses.map(cls => ({
                  ...cls,
                  grade_level: `Kelas ${cls.grade_level}`,
                  max_students: `${cls.max_students} siswa`,
                  actions: (
                    <div className="flex gap-2 justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => openEditModal(cls)} 
                        className="text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                        title="Edit kelas"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteClass(cls.id)} 
                        className="text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Hapus kelas"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                }))}
              />
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-700">
                  Menampilkan <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredClasses.length)}
                  </span>{' '}
                  dari <span className="font-medium">{filteredClasses.length}</span> kelas
                </p>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                    className="rounded-lg"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors duration-150 ${
                          currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                    className="rounded-lg"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Modal Add Class */}
        <Modal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          title="Tambah Kelas Baru" 
          size="md"
        >
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kelas
              </label>
              <input
                type="text"
                id="className"
                value={className}
                onChange={e => setClassName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Contoh: X IPA 1"
                onKeyPress={e => e.key === 'Enter' && handleAddClass()}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkat Kelas
                </label>
                <Select
                  options={gradeLevelOptions}
                  value={selectedGradeLevel}
                  onChange={(option) => {
                    setSelectedGradeLevel(option);
                    setGradeLevel(option?.value || 10);
                  }}
                  isSearchable={true}
                  placeholder="Pilih tingkat kelas..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable
                />
              </div>
              <div>
                <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700 mb-1">
                  Kapasitas Siswa
                </label>
                <input
                  type="number"
                  id="maxStudents"
                  value={maxStudents}
                  onChange={e => setMaxStudents(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="36"
                  min="1"
                  max="50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                Tahun Ajaran
              </label>
              <input
                type="text"
                id="academicYear"
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="2024/2025"
              />
            </div>
            <div>
              <label htmlFor="majorId" className="block text-sm font-medium text-gray-700 mb-1">
                Jurusan
              </label>
              <Select
                options={majorOptions}
                value={selectedMajor}
                onChange={(option) => {
                  setSelectedMajor(option);
                }}
                isSearchable={true}
                placeholder="Pilih atau cari jurusan..."
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
            <div>
              <label htmlFor="homeroomTeacherId" className="block text-sm font-medium text-gray-700 mb-1">
                Wali Kelas
              </label>
              <Select
                options={teacherOptions}
                value={selectedTeacher}
                onChange={(option) => {
                  setSelectedTeacher(option);
                }}
                isSearchable={true}
                placeholder="Pilih atau cari wali kelas..."
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsAddModalOpen(false)} 
                className="flex-1 rounded-xl"
              >
                Batal
              </Button>
              <Button 
                onClick={handleAddClass} 
                disabled={!className.trim() || !selectedMajor || !selectedTeacher}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simpan
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal Edit Class */}
        <Modal 
          isOpen={isEditModalOpen} 
          onClose={() => {
            setIsEditModalOpen(false);
            setEditClass(null);
            setClassName('');
            setGradeLevel(10);
            setAcademicYear('2024/2025');
            setMaxStudents(36);
          }} 
          title="Edit Kelas" 
          size="md"
        >
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="editClassName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kelas
              </label>
              <input
                type="text"
                id="editClassName"
                value={className}
                onChange={e => setClassName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Contoh: X IPA 1"
                onKeyPress={e => e.key === 'Enter' && handleEditClass()}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="editGradeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkat Kelas
                </label>
                <Select
                  options={gradeLevelOptions}
                  value={selectedGradeLevel}
                  onChange={(option) => {
                    setSelectedGradeLevel(option);
                    setGradeLevel(option?.value || 10);
                  }}
                  isSearchable={true}
                  placeholder="Pilih atau cari tingkat kelas..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isClearable
                />
              </div>
              
              <div>
                <label htmlFor="editMaxStudents" className="block text-sm font-medium text-gray-700 mb-1">
                  Kapasitas Siswa
                </label>
                <input
                  type="number"
                  id="editMaxStudents"
                  value={maxStudents}
                  onChange={e => setMaxStudents(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="36"
                  min="1"
                  max="50"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="editAcademicYear" className="block text-sm font-medium text-gray-700 mb-1">
                Tahun Ajaran
              </label>
              <input
                type="text"
                id="editAcademicYear"
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="2024/2025"
              />
            </div>
            
            <div>
              <label htmlFor="editMajorId" className="block text-sm font-medium text-gray-700 mb-1">
                Jurusan
              </label>
              <Select
                options={majorOptions}
                value={selectedMajor}
                onChange={(option) => {
                  setSelectedMajor(option);
                }}
                isSearchable={true}
                placeholder="Pilih atau cari jurusan..."
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
            
            <div>
              <label htmlFor="editHomeroomTeacherId" className="block text-sm font-medium text-gray-700 mb-1">
                Wali Kelas
              </label>
              <Select
                options={teacherOptions}
                value={selectedTeacher}
                onChange={(option) => {
                  setSelectedTeacher(option);
                }}
                isSearchable={true}
                placeholder="Pilih atau cari wali kelas..."
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditClass(null);
                  setClassName('');
                  setSelectedMajor(null);
                  setGradeLevel(10);
                  setSelectedGradeLevel(null);
                  setAcademicYear('2024/2025');
                  setSelectedTeacher(null);
                  setMaxStudents(36);
                }} 
                className="flex-1 rounded-xl"
              >
                Batal
              </Button>
              <Button 
                onClick={handleEditClass} 
                disabled={!className.trim() || !selectedMajor || !selectedTeacher}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SchoolClassManagement;