import { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import { schoolService } from '../../services/schoolService';
import type { Subject, PaginationParams, PaginationResult } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SubjectsPage() {
  const { user } = useAuth();
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [result, setResult] = useState<PaginationResult<Subject>>({ data: [], total: 0, page: 1, limit: 10, total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [form, setForm] = useState<Partial<Subject>>({ is_active: true, credit_hours: 2 });

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const load = () => {
    setLoading(true);
    try {
      const res = schoolService.listSubjects(pagination);
      // Filter subjects by school for school admins
      const filteredData = user?.role === 'school_admin' 
        ? { ...res, data: res.data.filter(s => s.school_id === user.school_id) }
        : res;
      setResult(filteredData);
    } catch (error) {
      console.error('Error loading subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pagination.page, pagination.limit, pagination.search]);

  const isValid = useMemo(() => {
    return !!form.name && !!form.code && typeof form.credit_hours === 'number';
  }, [form]);

  const resetForm = () => {
    setEditing(null);
    setForm({ is_active: true, credit_hours: 2 });
  };

  // Modal handlers
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditing(subject);
    setSelectedSubject(subject);
    setForm({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      credit_hours: subject.credit_hours,
      is_active: subject.is_active
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowDeleteModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    resetForm();
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedSubject(null);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setPagination(p => ({ ...p, page }));
  };

  const handleItemsPerPageChange = (limit: number) => {
    setPagination(p => ({ ...p, limit, page: 1 }));
  };

  const handleSearch = (search: string) => {
    setPagination(p => ({ ...p, search, page: 1 }));
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const totalPages = result.total_pages;
    const currentPage = result.page;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    if (editing) {
      schoolService.updateSubject(editing.id, {
        name: form.name!,
        code: form.code!,
        description: form.description,
        credit_hours: form.credit_hours!,
        is_active: !!form.is_active
      });
      closeEditModal();
    } else {
      const now = new Date().toISOString();
      const payload: Subject = {
        id: `sub-${Date.now()}`,
        school_id: user?.school_id || 'school-1',
        name: form.name!,
        code: form.code!,
        description: form.description,
        credit_hours: form.credit_hours || 2,
        is_active: form.is_active ?? true,
        created_at: now
      };
      schoolService.createSubject(payload);
      closeAddModal();
    }
    load();
  };

  const handleDelete = () => {
    if (!selectedSubject) return;
    schoolService.deleteSubject(selectedSubject.id);
    closeDeleteModal();
    load();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manajemen Mata Pelajaran</h1>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Mata Pelajaran
        </Button>
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
                placeholder="Cari mata pelajaran..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={pagination.search ?? ''}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={pagination.limit}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            >
              <option value={5}>5 per halaman</option>
              <option value={10}>10 per halaman</option>
              <option value={25}>25 per halaman</option>
              <option value={50}>50 per halaman</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Menampilkan {((result.page - 1) * result.limit) + 1} - {Math.min(result.page * result.limit, result.total)} dari {result.total} mata pelajaran
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-2 text-gray-600">Memuat data...</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Pelajaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.data.length > 0 ? (
                  result.data.map((subject) => (
                    <tr key={subject.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">{subject.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{subject.credit_hours} jam/minggu</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {subject.description || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subject.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(subject)}
                            className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(subject)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="text-lg font-medium">Tidak ada data mata pelajaran</div>
                        <div className="text-sm">Belum ada mata pelajaran yang ditambahkan</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Enhanced Pagination */}
        {result.total > 0 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Halaman {result.page} dari {result.total_pages}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(result.page - 1)}
                disabled={result.page <= 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' ? handlePageChange(page) : undefined}
                  disabled={page === '...'}
                  className={`px-3 py-1 text-sm rounded-md ${
                    page === result.page
                      ? 'bg-primary-600 text-white'
                      : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(result.page + 1)}
                disabled={result.page >= result.total_pages}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </Card>
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4" style={{ alignItems: 'flex-start', marginTop: 'auto' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Mata Pelajaran Baru</h3>
              <button onClick={closeAddModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Mata Pelajaran</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.name ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Contoh: Matematika"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kode Mata Pelajaran</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.code ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="Contoh: MTK"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jam Pelajaran per Minggu</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.credit_hours ?? 2}
                  onChange={(e) => setForm(f => ({ ...f, credit_hours: Number(e.target.value) }))}
                  min={1}
                  max={8}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="add_active"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={form.is_active ?? true}
                  onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
                />
                <label htmlFor="add_active" className="block text-sm text-gray-900">
                  Status Aktif
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.description ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Deskripsi singkat mata pelajaran"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={closeAddModal}>
                  Batal
                </Button>
                <Button type="submit" disabled={!isValid}>
                  Tambah Mata Pelajaran
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4" style={{ alignItems: 'flex-start', marginTop: 'auto' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Mata Pelajaran</h3>
              <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Mata Pelajaran</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.name ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Contoh: Matematika"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kode Mata Pelajaran</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.code ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="Contoh: MTK"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jam Pelajaran per Minggu</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.credit_hours ?? 2}
                  onChange={(e) => setForm(f => ({ ...f, credit_hours: Number(e.target.value) }))}
                  min={1}
                  max={8}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="edit_active"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={form.is_active ?? true}
                  onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
                />
                <label htmlFor="edit_active" className="block text-sm text-gray-900">
                  Status Aktif
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.description ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Deskripsi singkat mata pelajaran"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={closeEditModal}>
                  Batal
                </Button>
                <Button type="submit" disabled={!isValid}>
                  Update Mata Pelajaran
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4" style={{ alignItems: 'flex-start', marginTop: 'auto' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Konfirmasi Hapus</h3>
              <button onClick={closeDeleteModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menghapus mata pelajaran <strong>{selectedSubject.name}</strong> ({selectedSubject.code})?
              </p>
              <p className="text-sm text-red-600 mt-2">
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={closeDeleteModal}>
                Batal
              </Button>
              <Button type="button" variant="danger" onClick={handleDelete}>
                Hapus Mata Pelajaran
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
