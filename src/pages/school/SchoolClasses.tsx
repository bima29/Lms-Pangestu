import { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, X, Users, GraduationCap } from 'lucide-react';
import { schoolService } from '../../services/schoolService';
import type { Class, PaginationParams, PaginationResult, Major, Teacher } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect, { Option } from '../../components/ui/SearchSelect';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolClasses() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [result, setResult] = useState<PaginationResult<Class>>({ data: [], total: 0, page: 1, limit: 10, total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Class | null>(null);
  const [form, setForm] = useState<Partial<Class>>({ is_active: true, grade_level: 10, max_students: 36, academic_year: '2024/2025' });

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // lookup data
  const [majors, setMajors] = useState<Major[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const load = () => {
    setLoading(true);
    const res = schoolService.listClasses(pagination);
    setResult(res);
    setLoading(false);
  };

  const loadLookups = () => {
    setMajors(schoolService.listMajors());
    setTeachers(schoolService.listTeachers());
  };

  useEffect(() => { loadLookups(); }, []);
  useEffect(() => { load(); }, [pagination.page, pagination.limit, pagination.search]);

  const isValid = useMemo(() => {
    return !!form.name && !!form.academic_year && typeof form.grade_level === 'number' && typeof form.max_students === 'number';
  }, [form]);

  const resetForm = () => {
    setEditing(null);
    setForm({ is_active: true, grade_level: 10, max_students: 36, academic_year: '2024/2025' });
  };

  // Modal handlers
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (classItem: Class) => {
    setEditing(classItem);
    setSelectedClass(classItem);
    setForm({
      name: classItem.name,
      major_id: classItem.major_id,
      grade_level: classItem.grade_level,
      academic_year: classItem.academic_year,
      homeroom_teacher_id: classItem.homeroom_teacher_id,
      max_students: classItem.max_students,
      is_active: classItem.is_active
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (classItem: Class) => {
    setSelectedClass(classItem);
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
    setSelectedClass(null);
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
      schoolService.updateClass(editing.id, {
        name: form.name!,
        major_id: form.major_id,
        grade_level: form.grade_level!,
        academic_year: form.academic_year!,
        homeroom_teacher_id: form.homeroom_teacher_id,
        max_students: form.max_students!,
        is_active: !!form.is_active
      });
      closeEditModal();
    } else {
      const now = new Date().toISOString();
      const payload: Class = {
        id: `cls-${Date.now()}`,
        school_id: undefined,
        name: form.name!,
        major_id: form.major_id,
        grade_level: form.grade_level!,
        academic_year: form.academic_year!,
        homeroom_teacher_id: form.homeroom_teacher_id,
        max_students: form.max_students || 36,
        is_active: form.is_active ?? true,
        created_at: now
      };
      schoolService.createClass(payload);
      closeAddModal();
    }
    load();
  };

  const handleDelete = () => {
    if (!selectedClass) return;
    schoolService.deleteClass(selectedClass.id);
    closeDeleteModal();
    load();
  };

  const onEdit = (c: Class) => {
    setEditing(c);
    setForm({
      name: c.name,
      major_id: c.major_id,
      grade_level: c.grade_level,
      academic_year: c.academic_year,
      homeroom_teacher_id: c.homeroom_teacher_id,
      max_students: c.max_students,
      is_active: c.is_active
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus kelas ini?')) return;
    schoolService.deleteClass(id);
    load();
  };

  const majorOptions: Option<string>[] = majors.map(m => ({ value: m.id, label: `${m.code} — ${m.name}` }));
  const teacherOptions: Option<string>[] = teachers.map(t => ({ value: t.id, label: `${t.user?.name ?? t.id}` }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manajemen Kelas</h1>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Kelas
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
                placeholder="Cari kelas..."
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
            Menampilkan {((result.page - 1) * result.limit) + 1} - {Math.min(result.page * result.limit, result.total)} dari {result.total} kelas
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Ajaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tingkat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wali Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maks Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.data.length > 0 ? (
                result.data.map((classItem) => (
                  <tr key={classItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classItem.academic_year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classItem.grade_level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{majors.find(m => m.id === classItem.major_id)?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{teachers.find(t => t.id === classItem.homeroom_teacher_id)?.user?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classItem.max_students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        classItem.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {classItem.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(classItem)}
                          className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(classItem)}
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
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <div className="text-lg font-medium">Tidak ada data kelas</div>
                      <div className="text-sm">Belum ada kelas yang ditambahkan</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
              <h3 className="text-lg font-medium text-gray-900">Tambah Kelas Baru</h3>
              <button onClick={closeAddModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Nama Kelas</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.name ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Contoh: XII IPA 1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.academic_year ?? '2024/2025'}
                  onChange={(e) => setForm(f => ({ ...f, academic_year: e.target.value }))}
                  placeholder="2024/2025"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tingkat</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.grade_level ?? 10}
                  onChange={(e) => setForm(f => ({ ...f, grade_level: Number(e.target.value) }))}
                  min={10}
                  max={12}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jurusan</label>
                <SearchSelect
                  options={majorOptions}
                  value={form.major_id ?? ''}
                  onChange={(val) => setForm(f => ({ ...f, major_id: String(val) }))}
                  placeholder={majorOptions.length ? 'Pilih Jurusan' : 'Belum ada data jurusan'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Wali Kelas</label>
                <SearchSelect
                  options={teacherOptions}
                  value={form.homeroom_teacher_id ?? ''}
                  onChange={(val) => setForm(f => ({ ...f, homeroom_teacher_id: String(val) }))}
                  placeholder={teacherOptions.length ? 'Pilih Wali Kelas' : 'Belum ada data guru'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Maks Siswa</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.max_students ?? 36}
                  onChange={(e) => setForm(f => ({ ...f, max_students: Number(e.target.value) }))}
                  min={1}
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
              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={closeAddModal}>
                  Batal
                </Button>
                <Button type="submit" disabled={!isValid}>
                  Tambah Kelas
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
              <h3 className="text-lg font-medium text-gray-900">Edit Kelas</h3>
              <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Nama Kelas</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.name ?? ''}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Contoh: XII IPA 1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.academic_year ?? '2024/2025'}
                  onChange={(e) => setForm(f => ({ ...f, academic_year: e.target.value }))}
                  placeholder="2024/2025"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tingkat</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.grade_level ?? 10}
                  onChange={(e) => setForm(f => ({ ...f, grade_level: Number(e.target.value) }))}
                  min={10}
                  max={12}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jurusan</label>
                <SearchSelect
                  options={majorOptions}
                  value={form.major_id ?? ''}
                  onChange={(val) => setForm(f => ({ ...f, major_id: String(val) }))}
                  placeholder={majorOptions.length ? 'Pilih Jurusan' : 'Belum ada data jurusan'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Wali Kelas</label>
                <SearchSelect
                  options={teacherOptions}
                  value={form.homeroom_teacher_id ?? ''}
                  onChange={(val) => setForm(f => ({ ...f, homeroom_teacher_id: String(val) }))}
                  placeholder={teacherOptions.length ? 'Pilih Wali Kelas' : 'Belum ada data guru'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Maks Siswa</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={form.max_students ?? 36}
                  onChange={(e) => setForm(f => ({ ...f, max_students: Number(e.target.value) }))}
                  min={1}
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
              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={closeEditModal}>
                  Batal
                </Button>
                <Button type="submit" disabled={!isValid}>
                  Update Kelas
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedClass && (
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
                Apakah Anda yakin ingin menghapus kelas <strong>{selectedClass.name}</strong>?
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
                Hapus Kelas
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
