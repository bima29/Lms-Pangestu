import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect, { Option } from '../../components/ui/SearchSelect';
import type { PaginationParams, PaginationResult, Schedule, ClassSubject } from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };
const dayOptions: Option<string>[] = [
  { value: 'Senin', label: 'Senin' },
  { value: 'Selasa', label: 'Selasa' },
  { value: 'Rabu', label: 'Rabu' },
  { value: 'Kamis', label: 'Kamis' },
  { value: 'Jumat', label: 'Jumat' },
  { value: 'Sabtu', label: 'Sabtu' }
];

export default function SchoolSchedules() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [result, setResult] = useState<PaginationResult<Schedule>>({ data: [], total: 0, page: 1, limit: 10, total_pages: 0 });
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [form, setForm] = useState<Partial<Schedule>>({ day_of_week: 'Senin' });

  // lookups
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);

  const load = () => {
    const res = schoolService.listSchedules(pagination);
    setResult(res);
  };
  const loadLookups = () => {
    setClassSubjects(schoolService.listClassSubjectsRaw());
  };

  useEffect(() => { loadLookups(); }, []);
  useEffect(() => { load(); }, [pagination.page, pagination.limit, pagination.search]);

  const isValid = useMemo(() => !!form.class_subject_id && !!form.day_of_week && !!form.start_time && !!form.end_time, [form]);

  const resetForm = () => { setEditing(null); setForm({ day_of_week: 'Senin' }); };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    if (editing) {
      schoolService.updateSchedule(editing.id, {
        class_subject_id: form.class_subject_id!,
        day_of_week: form.day_of_week!,
        start_time: form.start_time!,
        end_time: form.end_time!,
        room: form.room,
      });
    } else {
      const payload: Schedule = {
        id: `sch-${Date.now()}`,
        class_subject_id: form.class_subject_id!,
        day_of_week: form.day_of_week!,
        start_time: form.start_time!,
        end_time: form.end_time!,
        room: form.room,
        created_at: new Date().toISOString(),
      };
      schoolService.createSchedule(payload);
    }
    resetForm();
    load();
  };

  const onEdit = (s: Schedule) => {
    setEditing(s);
    setForm({
      class_subject_id: s.class_subject_id,
      day_of_week: s.day_of_week,
      start_time: s.start_time,
      end_time: s.end_time,
      room: s.room,
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus jadwal ini?')) return;
    schoolService.deleteSchedule(id);
    load();
  };

  const csOptions: Option<string>[] = classSubjects.map(cs => {
    const cls = schoolService.listClassesRaw().find(c => c.id === cs.class_id);
    const sub = schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id);
    return { value: cs.id, label: `${cls?.name ?? cs.class_id} — ${sub?.name ?? cs.subject_id} (${cs.academic_year} Smt ${cs.semester})` };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Jadwal</h1>

      <Card>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Kelas & Mapel</label>
            <SearchSelect options={csOptions} value={form.class_subject_id ?? ''} onChange={(v)=>setForm(f=>({...f,class_subject_id:String(v)}))} placeholder={csOptions.length?'Pilih pengampu':'Buat pengampu dulu'} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hari</label>
            <SearchSelect options={dayOptions} value={form.day_of_week ?? 'Senin'} onChange={(v)=>setForm(f=>({...f,day_of_week:String(v)}))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mulai</label>
            <input type="time" className="w-full px-3 py-2 border rounded-lg" value={form.start_time ?? ''} onChange={(e)=>setForm(f=>({...f,start_time:e.target.value}))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Selesai</label>
            <input type="time" className="w-full px-3 py-2 border rounded-lg" value={form.end_time ?? ''} onChange={(e)=>setForm(f=>({...f,end_time:e.target.value}))} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Ruang</label>
            <input className="w-full px-3 py-2 border rounded-lg" placeholder="Lab 1 / R. 203" value={form.room ?? ''} onChange={(e)=>setForm(f=>({...f,room:e.target.value}))} />
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" variant="primary" disabled={!isValid}>{editing? 'Update':'Tambah'}</Button>
            {editing && <Button type="button" variant="secondary" onClick={resetForm}>Batal</Button>}
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <input className="w-full max-w-xs px-3 py-2 border rounded-lg" placeholder="Cari jadwal..." value={pagination.search ?? ''} onChange={(e)=>setPagination(p=>({...p,search:e.target.value,page:1}))} />
          <span className="text-sm text-gray-500">Total: {result.total}</span>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2">Kelas & Mapel</th>
                <th className="px-3 py-2">Hari</th>
                <th className="px-3 py-2">Mulai</th>
                <th className="px-3 py-2">Selesai</th>
                <th className="px-3 py-2">Ruang</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map(s => {
                const cs = classSubjects.find(x => x.id === s.class_subject_id);
                const cls = cs ? schoolService.listClassesRaw().find(c => c.id === cs.class_id) : undefined;
                const sub = cs ? schoolService.listSubjectsRaw().find(x => x.id === cs.subject_id) : undefined;
                return (
                  <tr key={s.id} className="border-t">
                    <td className="px-3 py-2">{cls?.name ?? cs?.class_id} — {sub?.name ?? cs?.subject_id}</td>
                    <td className="px-3 py-2">{s.day_of_week}</td>
                    <td className="px-3 py-2">{s.start_time}</td>
                    <td className="px-3 py-2">{s.end_time}</td>
                    <td className="px-3 py-2">{s.room ?? '-'}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={()=>onEdit(s)}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={()=>onDelete(s.id)}>Hapus</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
