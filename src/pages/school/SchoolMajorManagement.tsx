import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import { Major } from '../../types';

// Mock data matching database schema
const initialMajors: Major[] = [
  { 
    id: 'maj-1', 
    name: 'Ilmu Pengetahuan Alam', 
    code: 'IPA',
    description: 'Program studi IPA untuk siswa yang tertarik dengan sains',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  { 
    id: 'maj-2', 
    name: 'Ilmu Pengetahuan Sosial', 
    code: 'IPS',
    description: 'Program studi IPS untuk siswa yang tertarik dengan sosial',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  { 
    id: 'maj-3', 
    name: 'Teknik Komputer dan Jaringan', 
    code: 'TKJ',
    description: 'Program studi TKJ untuk siswa yang tertarik dengan teknologi',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  { 
    id: 'maj-4', 
    name: 'Rekayasa Perangkat Lunak', 
    code: 'RPL',
    description: 'Program studi RPL untuk siswa yang tertarik dengan programming',
    is_active: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];


const SchoolMajorManagement = () => {
  const [majors, setMajors] = useState<Major[]>(initialMajors);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMajor, setEditMajor] = useState<Major | null>(null);
  const [majorName, setMajorName] = useState('');
  const [majorCode, setMajorCode] = useState('');
  const [majorDescription, setMajorDescription] = useState('');
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
  const filteredMajors = majors.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.description && m.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredMajors.length / itemsPerPage);
  const paginatedMajors = filteredMajors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Add Major
  const handleAddMajor = () => {
    if (majorName.trim() && majorCode.trim()) {
      const newMajor: Major = {
        id: `maj-${Date.now()}`,
        name: majorName,
        code: majorCode,
        description: majorDescription || undefined,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setMajors([...majors, newMajor]);
      setMajorName('');
      setMajorCode('');
      setMajorDescription('');
      setIsAddModalOpen(false);
    }
  };

  // Edit Major
  const openEditModal = (major: Major) => {
    setEditMajor(major);
    setMajorName(major.name);
    setMajorCode(major.code);
    setMajorDescription(major.description || '');
    setIsEditModalOpen(true);
  };
  
  const handleEditMajor = () => {
    if (majorName.trim() && majorCode.trim() && editMajor) {
      setMajors(majors.map(m => m.id === editMajor.id ? { 
        ...m, 
        name: majorName, 
        code: majorCode,
        description: majorDescription || undefined,
        updated_at: new Date().toISOString()
      } : m));
      setEditMajor(null);
      setMajorName('');
      setMajorCode('');
      setMajorDescription('');
      setIsEditModalOpen(false);
    }
  };

  // Delete Major
  const handleDeleteMajor = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jurusan ini?')) {
      setMajors(majors.filter(m => m.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4">
            <BookOpen className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Jurusan</h1>
          <p className="text-gray-600">Kelola data jurusan sekolah dengan mudah</p>
        </div>

        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden bg-white">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Daftar Jurusan</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredMajors.length} jurusan ditemukan
                </p>
              </div>
              <Button 
                onClick={() => setIsAddModalOpen(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" /> Tambah Jurusan
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
                  placeholder="Cari jurusan atau tipe..."
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
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="mt-3 text-gray-500">Memuat data jurusan...</p>
              </div>
            ) : filteredMajors.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">Tidak ada jurusan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Mulai dengan menambahkan jurusan pertama'}
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Tambah Jurusan
                  </Button>
                </div>
              </div>
            ) : (
              <Table
                columns={[
                  { key: 'name', header: 'Nama Jurusan', render: (m) => m.name },
                  { key: 'code', header: 'Kode', render: (m) => m.code },
                  { key: 'description', header: 'Deskripsi', render: (m) => m.description || '-' },
                  { 
                    key: 'status', 
                    header: 'Status',
                    render: (m) => (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        m.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {m.is_active ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    )
                  },
                  { key: 'actions', header: 'Aksi', render: (m) => (
                    <div className="flex gap-2 justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => openEditModal(m)} 
                        className="text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                        title="Edit jurusan"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteMajor(m.id)} 
                        className="text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Hapus jurusan"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) }
                ]}
                data={paginatedMajors}
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
                    {Math.min(currentPage * itemsPerPage, filteredMajors.length)}
                  </span>{' '}
                  dari <span className="font-medium">{filteredMajors.length}</span> jurusan
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

        {/* Modal Add Major */}
        <Modal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          title="Tambah Jurusan Baru" 
          size="md"
        >
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="majorName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Jurusan
              </label>
              <input
                type="text"
                id="majorName"
                value={majorName}
                onChange={e => setMajorName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Contoh: Ilmu Pengetahuan Alam"
                onKeyPress={e => e.key === 'Enter' && handleAddMajor()}
              />
            </div>
            
            <div>
              <label htmlFor="majorCode" className="block text-sm font-medium text-gray-700 mb-1">
                Kode Jurusan
              </label>
              <input
                type="text"
                id="majorCode"
                value={majorCode}
                onChange={e => setMajorCode(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Contoh: IPA"
                onKeyPress={e => e.key === 'Enter' && handleAddMajor()}
              />
            </div>

            <div>
              <label htmlFor="majorDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi (Opsional)
              </label>
              <textarea
                id="majorDescription"
                value={majorDescription}
                onChange={e => setMajorDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Deskripsi jurusan..."
                rows={3}
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
                onClick={handleAddMajor} 
                disabled={!majorName.trim() || !majorCode.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simpan
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal Edit Major */}
        <Modal 
          isOpen={isEditModalOpen} 
          onClose={() => {
            setIsEditModalOpen(false);
            setEditMajor(null);
            setMajorName('');
            setMajorCode('');
            setMajorDescription('');
          }} 
          title="Edit Jurusan" 
          size="md"
        >
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="editMajorName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Jurusan
              </label>
              <input
                type="text"
                id="editMajorName"
                value={majorName}
                onChange={e => setMajorName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Contoh: Ilmu Pengetahuan Alam"
                onKeyPress={e => e.key === 'Enter' && handleEditMajor()}
              />
            </div>
            
            <div>
              <label htmlFor="editMajorCode" className="block text-sm font-medium text-gray-700 mb-1">
                Kode Jurusan
              </label>
              <input
                type="text"
                id="editMajorCode"
                value={majorCode}
                onChange={e => setMajorCode(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Contoh: IPA"
                onKeyPress={e => e.key === 'Enter' && handleEditMajor()}
              />
            </div>

            <div>
              <label htmlFor="editMajorDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi (Opsional)
              </label>
              <textarea
                id="editMajorDescription"
                value={majorDescription}
                onChange={e => setMajorDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Deskripsi jurusan..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditMajor(null);
                  setMajorName('');
                  setMajorCode('');
                  setMajorDescription('');
                }} 
                className="flex-1 rounded-xl"
              >
                Batal
              </Button>
              <Button 
                onClick={handleEditMajor} 
                disabled={!majorName.trim() || !majorCode.trim()}
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

export default SchoolMajorManagement;