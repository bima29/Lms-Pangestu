import { useEffect, useMemo, useState } from 'react';
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

  const onSubmit = (e: React.FormEvent) => {
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
    }
    resetForm();
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
      <h1 className="text-2xl font-semibold">Kelas</h1>

      <Card>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Nama Kelas</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              value={form.name ?? ''}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Contoh: XII IPA 1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
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
              className="w-full px-3 py-2 border rounded-lg"
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
              className="w-full px-3 py-2 border rounded-lg"
              value={form.max_students ?? 36}
              onChange={(e) => setForm(f => ({ ...f, max_students: Number(e.target.value) }))}
              min={1}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              checked={form.is_active ?? true}
              onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
            />
            <label htmlFor="is_active">Aktif</label>
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" variant="primary" disabled={!isValid}>{editing ? 'Update' : 'Tambah'}</Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={resetForm}>Batal</Button>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <input
            className="w-full max-w-xs px-3 py-2 border rounded-lg"
            placeholder="Cari kelas..."
            value={pagination.search ?? ''}
            onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total: {result.total}</span>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Tahun</th>
                <th className="px-3 py-2">Tingkat</th>
                <th className="px-3 py-2">Jurusan</th>
                <th className="px-3 py-2">Wali Kelas</th>
                <th className="px-3 py-2">Maks</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2">{c.academic_year}</td>
                  <td className="px-3 py-2">{c.grade_level}</td>
                  <td className="px-3 py-2">{majors.find(m => m.id === c.major_id)?.name ?? '-'}</td>
                  <td className="px-3 py-2">{teachers.find(t => t.id === c.homeroom_teacher_id)?.user?.name ?? '-'}</td>
                  <td className="px-3 py-2">{c.max_students}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${c.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => onEdit(c)}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={() => onDelete(c.id)}>Hapus</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {result.data.length === 0 && !loading && (
                <tr>
                  <td className="px-3 py-6 text-center text-gray-500" colSpan={8}>Belum ada data.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Halaman {result.page} dari {Math.max(1, result.total_pages)}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={result.page <= 1}
              onClick={() => setPagination(p => ({ ...p, page: Math.max(1, (p.page ?? 1) - 1) }))}
            >Prev</Button>
            <Button
              variant="secondary"
              disabled={result.page >= result.total_pages}
              onClick={() => setPagination(p => ({ ...p, page: Math.min(result.total_pages, (p.page ?? 1) + 1) }))}
            >Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
