import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';

const initialClasses = [
  { id: 1, name: 'X IPA 1' },
  { id: 2, name: 'XI IPS 2' },
  { id: 3, name: 'XII TKJ 1' }
];

const SchoolClassManagement = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editClass, setEditClass] = useState<{ id: number; name: string } | null>(null);
  const [className, setClassName] = useState('');
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
  const filteredClasses = classes.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Add Class
  const handleAddClass = () => {
    if (className.trim()) {
      setClasses([...classes, { id: Date.now(), name: className }]);
      setClassName('');
      setIsAddModalOpen(false);
    }
  };

  // Edit Class
  const openEditModal = (cls: { id: number; name: string }) => {
    setEditClass(cls);
    setClassName(cls.name);
    setIsEditModalOpen(true);
  };
  
  const handleEditClass = () => {
    if (className.trim() && editClass) {
      setClasses(classes.map(c => c.id === editClass.id ? { ...c, name: className } : c));
      setEditClass(null);
      setClassName('');
      setIsEditModalOpen(false);
    }
  };

  // Delete Class
  const handleDeleteClass = (id: number) => {
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
                  { key: 'actions', header: 'Aksi' }
                ]}
                data={paginatedClasses.map(cls => ({
                  ...cls,
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
                disabled={!className.trim()}
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
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditClass(null);
                  setClassName('');
                }} 
                className="flex-1 rounded-xl"
              >
                Batal
              </Button>
              <Button 
                onClick={handleEditClass} 
                disabled={!className.trim() || className === editClass?.name}
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