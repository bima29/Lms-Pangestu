import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect, { Option } from '../../components/ui/SearchSelect';
import type { PaginationParams, PaginationResult, User, Teacher, Student, Parent } from '../../types';
import { adminService } from '../../services/adminService';

type TabKey = 'users' | 'teachers' | 'students' | 'parents';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolUsersPage() {
  const [active, setActive] = useState<TabKey>('users');

  // Users state
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [result, setResult] = useState<PaginationResult<User>>({ data: [], total: 0, page: 1, limit: 10, total_pages: 0 });
  const [editing, setEditing] = useState<User | null>(null);
  const [userForm, setUserForm] = useState<Partial<User>>({ role: 'teacher', is_active: true });

  // Profiles
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);

  const loadUsers = () => {
    const res = adminService.listUsers(pagination);
    setResult(res);
  };

  const loadProfiles = () => {
    setTeachers(adminService.listTeachers());
    setStudents(adminService.listStudents());
    setParents(adminService.listParents());
  };

  useEffect(() => { loadProfiles(); }, []);
  useEffect(() => { loadUsers(); }, [pagination.page, pagination.limit, pagination.search]);

  const isUserValid = useMemo(() => {
    return !!userForm.email && !!userForm.name && !!userForm.role;
  }, [userForm]);

  const resetUserForm = () => {
    setEditing(null);
    setUserForm({ role: 'teacher', is_active: true });
  };

  const onSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUserValid) return;
    if (editing) {
      adminService.updateUser(editing.id, {
        name: userForm.name!,
        email: userForm.email!,
        phone: userForm.phone,
        role: userForm.role!,
        is_active: userForm.is_active ?? true,
      });
    } else {
      const now = new Date().toISOString();
      const payload: User = {
        id: `usr-${Date.now()}`,
        email: userForm.email!,
        name: userForm.name!,
        phone: userForm.phone,
        role: userForm.role as User['role'],
        is_active: userForm.is_active ?? true,
        created_at: now,
        updated_at: now,
        school_id: 'sch-1'
      };
      adminService.createUser(payload);
    }
    resetUserForm();
    loadUsers();
  };

  const onEditUser = (u: User) => {
    setEditing(u);
    setUserForm({
      email: u.email,
      name: u.name,
      phone: u.phone,
      role: u.role,
      is_active: u.is_active,
    });
  };

  const onDeleteUser = (id: string) => {
    if (!confirm('Hapus pengguna ini?')) return;
    adminService.deleteUser(id);
    loadUsers();
    loadProfiles();
  };

  const roleOptions: Option<User['role']>[] = [
    { value: 'school_admin', label: 'School Admin' },
    { value: 'teacher', label: 'Guru' },
    { value: 'student', label: 'Siswa' },
    { value: 'parent', label: 'Orang Tua' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Kelola Pengguna</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['users','teachers','students','parents'] as TabKey[]).map(tab => (
          <Button
            key={tab}
            variant={active === tab ? 'primary' : 'outline'}
            onClick={() => setActive(tab)}
          >{tab.toUpperCase()}</Button>
        ))}
      </div>

      {active === 'users' && (
        <>
          <Card>
            <form onSubmit={onSubmitUser} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={userForm.name ?? ''} onChange={(e)=>setUserForm(f=>({...f,name:e.target.value}))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-lg" value={userForm.email ?? ''} onChange={(e)=>setUserForm(f=>({...f,email:e.target.value}))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telepon</label>
                <input className="w-full px-3 py-2 border rounded-lg" value={userForm.phone ?? ''} onChange={(e)=>setUserForm(f=>({...f,phone:e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <SearchSelect options={roleOptions} value={userForm.role ?? 'teacher'} onChange={(v)=>setUserForm(f=>({...f,role:v as User['role']}))} />
              </div>
              <div className="flex items-center gap-2">
                <input id="u_active" type="checkbox" checked={userForm.is_active ?? true} onChange={(e)=>setUserForm(f=>({...f,is_active:e.target.checked}))} />
                <label htmlFor="u_active">Aktif</label>
              </div>
              <div className="flex items-end gap-2">
                <Button type="submit" disabled={!isUserValid}>{editing?'Update':'Tambah'}</Button>
                {editing && <Button type="button" variant="secondary" onClick={resetUserForm}>Batal</Button>}
              </div>
            </form>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <input className="w-full max-w-xs px-3 py-2 border rounded-lg" placeholder="Cari pengguna..." value={pagination.search ?? ''} onChange={(e)=>setPagination(p=>({...p,search:e.target.value,page:1}))} />
              <span className="text-sm text-gray-500">Total: {result.total}</span>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-3 py-2">Nama</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.map((u)=> (
                    <tr key={u.id} className="border-t">
                      <td className="px-3 py-2">{u.name}</td>
                      <td className="px-3 py-2">{u.email}</td>
                      <td className="px-3 py-2">{u.role}</td>
                      <td className="px-3 py-2"><span className={`px-2 py-1 rounded text-xs ${u.is_active?'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>{u.is_active?'Aktif':'Nonaktif'}</span></td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" onClick={()=>onEditUser(u)}>Edit</Button>
                          <Button size="sm" variant="danger" onClick={()=>onDeleteUser(u.id)}>Hapus</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">Halaman {result.page} dari {Math.max(1, result.total_pages)}</div>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={result.page<=1} onClick={()=>setPagination(p=>({...p,page:Math.max(1,(p.page??1)-1)}))}>Prev</Button>
                <Button variant="secondary" disabled={result.page>=result.total_pages} onClick={()=>setPagination(p=>({...p,page:Math.min(result.total_pages,(p.page??1)+1)}))}>Next</Button>
              </div>
            </div>
          </Card>
        </>
      )}

      {active === 'teachers' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Guru</h2>
          <ul className="list-disc list-inside space-y-1">
            {teachers.map(t=> (
              <li key={t.id}>{t.employee_id} — {t.specialization} — <span className="text-gray-600">{t.status}</span></li>
            ))}
            {teachers.length===0 && <li className="text-gray-500">Belum ada data guru.</li>}
          </ul>
        </Card>
      )}

      {active === 'students' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Siswa</h2>
          <ul className="list-disc list-inside space-y-1">
            {students.map(s=> (
              <li key={s.id}>{s.student_id ?? s.id} — Kelas: {s.class_id ?? '-'} — <span className="text-gray-600">{s.status}</span></li>
            ))}
            {students.length===0 && <li className="text-gray-500">Belum ada data siswa.</li>}
          </ul>
        </Card>
      )}

      {active === 'parents' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Orang Tua</h2>
          <ul className="list-disc list-inside space-y-1">
            {parents.map(p=> (
              <li key={p.id}>{p.occupation ?? '—'} — {p.address ?? '—'}</li>
            ))}
            {parents.length===0 && <li className="text-gray-500">Belum ada data orang tua.</li>}
          </ul>
        </Card>
      )}
    </div>
  );
}
