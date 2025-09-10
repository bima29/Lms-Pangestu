import { useEffect, useMemo, useState } from 'react';
import { schoolService } from '../../services/schoolService';
import type { Subject, PaginationParams, PaginationResult } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SubjectsPage() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [result, setResult] = useState<PaginationResult<Subject>>({ data: [], total: 0, page: 1, limit: 10, total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [form, setForm] = useState<Partial<Subject>>({ is_active: true, credit_hours: 2 });

  const load = () => {
    setLoading(true);
    const res = schoolService.listSubjects(pagination);
    setResult(res);
    setLoading(false);
  };

  useEffect(() => { load(); }, [pagination.page, pagination.limit, pagination.search]);

  const isValid = useMemo(() => {
    return !!form.name && !!form.code && typeof form.credit_hours === 'number';
  }, [form]);

  const resetForm = () => {
    setEditing(null);
    setForm({ is_active: true, credit_hours: 2 });
  };

  const onSubmit = (e: React.FormEvent) => {
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
    } else {
      const now = new Date().toISOString();
      const payload: Subject = {
        id: `sub-${Date.now()}`,
        school_id: undefined,
        name: form.name!,
        code: form.code!,
        description: form.description,
        credit_hours: form.credit_hours || 2,
        is_active: form.is_active ?? true,
        created_at: now
      };
      schoolService.createSubject(payload);
    }
    resetForm();
    load();
  };

  const onEdit = (s: Subject) => {
    setEditing(s);
    setForm({
      name: s.name,
      code: s.code,
      description: s.description,
      credit_hours: s.credit_hours,
      is_active: s.is_active
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus mata pelajaran ini?')) return;
    schoolService.deleteSubject(id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mata Pelajaran</h1>

      <Card>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              value={form.name ?? ''}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Contoh: Matematika"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kode</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              value={form.code ?? ''}
              onChange={(e) => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
              placeholder="Contoh: MTK"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKS/Jam</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              value={form.credit_hours ?? 2}
              onChange={(e) => setForm(f => ({ ...f, credit_hours: Number(e.target.value) }))}
              min={1}
              required
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              value={form.description ?? ''}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Deskripsi singkat"
              rows={3}
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
            placeholder="Cari mata pelajaran..."
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
                <th className="px-3 py-2">Kode</th>
                <th className="px-3 py-2">SKS/Jam</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-3 py-2">{s.name}</td>
                  <td className="px-3 py-2">{s.code}</td>
                  <td className="px-3 py-2">{s.credit_hours}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {s.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => onEdit(s)}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={() => onDelete(s.id)}>Hapus</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {result.data.length === 0 && !loading && (
                <tr>
                  <td className="px-3 py-6 text-center text-gray-500" colSpan={5}>Belum ada data.</td>
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
