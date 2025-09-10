import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect, { Option } from '../../components/ui/SearchSelect';
import type { PaginationParams, PaginationResult, ClassSubject, Class, Subject, Teacher } from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function ClassSubjectsPage() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [result, setResult] = useState<PaginationResult<ClassSubject>>({ data: [], total: 0, page: 1, limit: 10, total_pages: 0 });
  const [editing, setEditing] = useState<ClassSubject | null>(null);
  const [form, setForm] = useState<Partial<ClassSubject>>({ semester: 1, academic_year: '2024/2025' });

  // lookups
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const load = () => {
    const res = schoolService.listClassSubjects(pagination);
    setResult(res);
  };
  const loadLookups = () => {
    setClasses(schoolService.listClassesRaw());
    setSubjects(schoolService.listSubjectsRaw());
    setTeachers(schoolService.listTeachers());
  };

  useEffect(() => { loadLookups(); }, []);
  useEffect(() => { load(); }, [pagination.page, pagination.limit, pagination.search]);

  const isValid = useMemo(() => !!form.class_id && !!form.subject_id && !!form.teacher_id && !!form.academic_year && typeof form.semester === 'number', [form]);

  const resetForm = () => { setEditing(null); setForm({ semester: 1, academic_year: '2024/2025' }); };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    if (editing) {
      schoolService.updateClassSubject(editing.id, {
        class_id: form.class_id!,
        subject_id: form.subject_id!,
        teacher_id: form.teacher_id!,
        academic_year: form.academic_year!,
        semester: form.semester!,
      });
    } else {
      const payload: ClassSubject = {
        id: `cs-${Date.now()}`,
        class_id: form.class_id!,
        subject_id: form.subject_id!,
        teacher_id: form.teacher_id!,
        academic_year: form.academic_year!,
        semester: form.semester ?? 1,
        created_at: new Date().toISOString(),
      };
      schoolService.createClassSubject(payload);
    }
    resetForm();
    load();
  };

  const onEdit = (cs: ClassSubject) => {
    setEditing(cs);
    setForm({
      class_id: cs.class_id,
      subject_id: cs.subject_id,
      teacher_id: cs.teacher_id,
      academic_year: cs.academic_year,
      semester: cs.semester,
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus pengampu (class-subject) ini?')) return;
    schoolService.deleteClassSubject(id);
    load();
  };

  const classOptions: Option<string>[] = classes.map(c => ({ value: c.id, label: `${c.name} (${c.academic_year})` }));
  const subjectOptions: Option<string>[] = subjects.map(s => ({ value: s.id, label: `${s.code} — ${s.name}` }));
  const teacherOptions: Option<string>[] = teachers.map(t => ({ value: t.id, label: t.user?.name ?? t.id }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mapel Per Kelas (Class-Subjects)</h1>

      <Card>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kelas</label>
            <SearchSelect options={classOptions} value={form.class_id ?? ''} onChange={(v)=>setForm(f=>({...f,class_id:String(v)}))} placeholder={classOptions.length? 'Pilih Kelas':'Belum ada kelas'} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mata Pelajaran</label>
            <SearchSelect options={subjectOptions} value={form.subject_id ?? ''} onChange={(v)=>setForm(f=>({...f,subject_id:String(v)}))} placeholder={subjectOptions.length? 'Pilih Mapel':'Belum ada mapel'} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Guru Pengampu</label>
            <SearchSelect options={teacherOptions} value={form.teacher_id ?? ''} onChange={(v)=>setForm(f=>({...f,teacher_id:String(v)}))} placeholder={teacherOptions.length? 'Pilih Guru':'Belum ada guru'} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
            <input className="w-full px-3 py-2 border rounded-lg" value={form.academic_year ?? '2024/2025'} onChange={(e)=>setForm(f=>({...f,academic_year:e.target.value}))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <input type="number" min={1} max={2} className="w-full px-3 py-2 border rounded-lg" value={form.semester ?? 1} onChange={(e)=>setForm(f=>({...f,semester:Number(e.target.value)}))} required />
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" variant="primary" disabled={!isValid}>{editing? 'Update':'Tambah'}</Button>
            {editing && <Button type="button" variant="secondary" onClick={resetForm}>Batal</Button>}
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <input className="w-full max-w-xs px-3 py-2 border rounded-lg" placeholder="Cari pengampu..." value={pagination.search ?? ''} onChange={(e)=>setPagination(p=>({...p,search:e.target.value,page:1}))} />
          <span className="text-sm text-gray-500">Total: {result.total}</span>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2">Kelas</th>
                <th className="px-3 py-2">Mapel</th>
                <th className="px-3 py-2">Guru</th>
                <th className="px-3 py-2">Tahun</th>
                <th className="px-3 py-2">Smt</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map(cs => (
                <tr key={cs.id} className="border-t">
                  <td className="px-3 py-2">{classes.find(c=>c.id===cs.class_id)?.name ?? cs.class_id}</td>
                  <td className="px-3 py-2">{subjects.find(s=>s.id===cs.subject_id)?.name ?? cs.subject_id}</td>
                  <td className="px-3 py-2">{teachers.find(t=>t.id===cs.teacher_id)?.user?.name ?? cs.teacher_id}</td>
                  <td className="px-3 py-2">{cs.academic_year}</td>
                  <td className="px-3 py-2">{cs.semester}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={()=>onEdit(cs)}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={()=>onDelete(cs.id)}>Hapus</Button>
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
