import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import type { Major, PaginationParams, PaginationResult } from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolMajorManagement() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [result, setResult] = useState<PaginationResult<Major>>({ data: [], total: 0, page: 1, limit: 10, total_pages: 0 });
  const [editing, setEditing] = useState<Major | null>(null);
  const [form, setForm] = useState<Partial<Major>>({ is_active: true });

  const load = () => {
    const res = schoolService.listMajorsPaged(pagination);
    setResult(res);
  };

  useEffect(() => { load(); }, [pagination.page, pagination.limit, pagination.search]);

  const isValid = useMemo(() => !!form.name && !!form.code, [form]);

  const resetForm = () => { setEditing(null); setForm({ is_active: true }); };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    if (editing) {
      schoolService.updateMajor(editing.id, {
        name: form.name!,
        code: form.code!,
        description: form.description,
        is_active: form.is_active ?? true,
      });
    } else {
      const now = new Date().toISOString();
      const payload: Major = {
        id: `maj-${Date.now()}`,
        name: form.name!,
        code: form.code!,
        description: form.description,
        is_active: form.is_active ?? true,
        created_at: now,
      };
      schoolService.createMajor(payload);
    }
    resetForm();
    load();
  };

  const onEdit = (m: Major) => {
    setEditing(m);
    setForm({ name: m.name, code: m.code, description: m.description, is_active: m.is_active });
  };
  const onDelete = (id: string) => { if (!confirm('Hapus jurusan ini?')) return; schoolService.deleteMajor(id); load(); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manajemen Jurusan</h1>

      <Card>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input className="w-full px-3 py-2 border rounded-lg" value={form.name ?? ''} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kode</label>
            <input className="w-full px-3 py-2 border rounded-lg" value={form.code ?? ''} onChange={(e)=>setForm(f=>({...f,code:e.target.value.toUpperCase()}))} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <input className="w-full px-3 py-2 border rounded-lg" value={form.description ?? ''} onChange={(e)=>setForm(f=>({...f,description:e.target.value}))} />
          </div>
          <div className="flex items-center gap-2">
            <input id="m_active" type="checkbox" checked={form.is_active ?? true} onChange={(e)=>setForm(f=>({...f,is_active:e.target.checked}))} />
            <label htmlFor="m_active">Aktif</label>
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" disabled={!isValid}>{editing?'Update':'Tambah'}</Button>
            {editing && <Button type="button" variant="secondary" onClick={resetForm}>Batal</Button>}
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <input className="w-full max-w-xs px-3 py-2 border rounded-lg" placeholder="Cari jurusan..." value={pagination.search ?? ''} onChange={(e)=>setPagination(p=>({...p,search:e.target.value,page:1}))} />
          <span className="text-sm text-gray-500">Total: {result.total}</span>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Kode</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map(m => (
                <tr key={m.id} className="border-t">
                  <td className="px-3 py-2">{m.name}</td>
                  <td className="px-3 py-2">{m.code}</td>
                  <td className="px-3 py-2"><span className={`px-2 py-1 rounded text-xs ${m.is_active?'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>{m.is_active?'Aktif':'Nonaktif'}</span></td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={()=>onEdit(m)}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={()=>onDelete(m.id)}>Hapus</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">Halaman {result.page} dari {Math.max(1,result.total_pages)}</div>
          <div className="flex gap-2">
            <Button variant="secondary" disabled={result.page<=1} onClick={()=>setPagination(p=>({...p,page:Math.max(1,(p.page??1)-1)}))}>Prev</Button>
            <Button variant="secondary" disabled={result.page>=result.total_pages} onClick={()=>setPagination(p=>({...p,page:Math.min(result.total_pages,(p.page??1)+1)}))}>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
