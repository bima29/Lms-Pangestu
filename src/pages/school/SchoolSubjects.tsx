
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import { Subject } from '../../types';

const initialSubjects: Subject[] = [
  { 
    id: '1', 
    name: 'Matematika', 
    code: 'MAT', 
    description: 'Mata pelajaran matematika untuk semua jurusan',
    credit_hours: 4,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  { 
    id: '2', 
    name: 'Fisika', 
    code: 'FIS', 
    description: 'Mata pelajaran fisika untuk jurusan IPA',
    credit_hours: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  { 
    id: '3', 
    name: 'Ekonomi', 
    code: 'EKO', 
    description: 'Mata pelajaran ekonomi untuk jurusan IPS',
    credit_hours: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
];


const SchoolSubjects: React.FC = () => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSubject, setEditSubject] = useState<Subject | null>(null);
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCreditHours, setFormCreditHours] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Search & Pagination
  const filteredSubjects = subjects.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const paginatedSubjects = filteredSubjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openAddModal = () => {
    setEditSubject(null);
    setFormName('');
    setFormCode('');
    setFormDescription('');
    setFormCreditHours(3);
    setIsModalOpen(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditSubject(subject);
    setFormName(subject.name);
    setFormCode(subject.code);
    setFormDescription(subject.description || '');
    setFormCreditHours(subject.credit_hours);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editSubject) {
      setSubjects(subjects.map(s => s.id === editSubject.id ? { 
        ...s, 
        name: formName, 
        code: formCode, 
        description: formDescription,
        credit_hours: formCreditHours
      } : s));
    } else {
      setSubjects([
        ...subjects,
        { 
          id: Date.now().toString(), 
          name: formName, 
          code: formCode, 
          description: formDescription,
          credit_hours: formCreditHours,
          is_active: true,
          created_at: new Date().toISOString()
        }
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (subject: Subject) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
      setSubjects(subjects.filter(s => s.id !== subject.id));
    }
  };

  const columns = [
    { key: 'name', header: 'Nama Mapel', render: (s: Subject) => s.name },
    { key: 'code', header: 'Kode', render: (s: Subject) => s.code },
    { key: 'description', header: 'Deskripsi', render: (s: Subject) => s.description || '-' },
    { key: 'credit_hours', header: 'SKS', render: (s: Subject) => s.credit_hours },
    {
      key: 'actions',
      header: 'Aksi',
      render: (subject: Subject) => (
        <div className="flex gap-2 justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => openEditModal(subject)} 
            className="text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            title="Edit mata pelajaran"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleDelete(subject)} 
            className="text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Hapus mata pelajaran"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4">
            <BookOpen className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Mata Pelajaran</h1>
          <p className="text-gray-600">Kelola data mata pelajaran sekolah dengan mudah</p>
        </div>

        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden bg-white">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Daftar Mata Pelajaran</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredSubjects.length} mata pelajaran ditemukan
                </p>
              </div>
              <Button 
                onClick={openAddModal} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="h-4 w-4" /> Tambah Mapel
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
                  placeholder="Cari mapel, kode, atau jurusan..."
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
                <p className="mt-3 text-gray-500">Memuat data mata pelajaran...</p>
              </div>
            ) : filteredSubjects.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">Tidak ada mata pelajaran</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Mulai dengan menambahkan mata pelajaran pertama'}
                </p>
                <div className="mt-6">
                  <Button
                    onClick={openAddModal}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Tambah Mapel
                  </Button>
                </div>
              </div>
            ) : (
              <Table
                columns={columns}
                data={paginatedSubjects}
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
                    {Math.min(currentPage * itemsPerPage, filteredSubjects.length)}
                  </span>{' '}
                  dari <span className="font-medium">{filteredSubjects.length}</span> mata pelajaran
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

        {/* Modal Add/Edit Subject */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editSubject ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'} size="md">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Contoh: Matematika"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode</label>
                <input
                  type="text"
                  value={formCode}
                  onChange={e => setFormCode(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Contoh: MAT"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Deskripsi mata pelajaran (opsional)"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKS (Satuan Kredit Semester)</label>
                <input
                  type="number"
                  value={formCreditHours}
                  onChange={e => setFormCreditHours(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Contoh: 3"
                  min="1"
                  max="6"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 rounded-xl"
                  type="button"
                >
                  Batal
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formName.trim() || !formCode.trim() || formCreditHours < 1}
                >
                  {editSubject ? 'Simpan Perubahan' : 'Simpan'}
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default SchoolSubjects;
