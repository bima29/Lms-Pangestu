import { PaginationParams, PaginationResult, User, Teacher, Student, Parent } from '../types';

let users: User[] = [
  {
    id: '2', email: 'admin@school.com', name: 'Admin Sekolah', role: 'school_admin',
    phone: '081234567891', is_active: true, school_id: 'sch-1', created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '3', email: 'guru@school.com', name: 'Pak Budi Santoso', role: 'teacher',
    phone: '081234567892', is_active: true, school_id: 'sch-1', created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '4', email: 'siswa@school.com', name: 'Andi Pratama', role: 'student',
    phone: '081234567893', is_active: true, school_id: 'sch-1', created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  },
  {
    id: '5', email: 'ortu@school.com', name: 'Ibu Siti Nurhaliza', role: 'parent',
    phone: '081234567894', is_active: true, school_id: 'sch-1', created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  }
];

let teachers: Teacher[] = [
  { id: 'tea-1', user_id: '3', employee_id: 'EMP001', specialization: 'Matematika', hire_date: '2020-07-01', status: 'active', created_at: new Date().toISOString() }
];

let students: Student[] = [
  { id: 'stu-1', user_id: '4', student_id: 'STU001', class_id: 'cls-1', parent_id: '5', status: 'active', created_at: new Date().toISOString() }
];

let parents: Parent[] = [
  { id: 'par-1', user_id: '5', occupation: 'Wiraswasta', address: 'Jl. Merdeka 123', created_at: new Date().toISOString() }
];

function paginateAndSearch<T extends Record<string, any>>(items: T[], params?: PaginationParams): PaginationResult<T> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const search = (params?.search ?? '').toLowerCase();
  const filtered = search ? items.filter((it) => Object.values(it).some(v => typeof v === 'string' && v.toLowerCase().includes(search))) : items;
  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  return { data, total, page, limit, total_pages: Math.ceil(total / limit) };
}

export const adminService = {
  // Users
  listUsers(params?: PaginationParams) {
    return paginateAndSearch(users, params);
  },
  createUser(payload: User) {
    users.unshift(payload);
    return payload;
  },
  updateUser(id: string, patch: Partial<User>) {
    const idx = users.findIndex(u => u.id === id);
    if (idx >= 0) { users[idx] = { ...users[idx], ...patch } as User; return users[idx]; }
    return null;
  },
  deleteUser(id: string) {
    users = users.filter(u => u.id !== id);
    teachers = teachers.filter(t => t.user_id !== id);
    students = students.filter(s => s.user_id !== id);
    parents = parents.filter(p => p.user_id !== id);
    return true;
  },

  // Teachers
  listTeachers(): Teacher[] { return teachers; },
  upsertTeacher(payload: Teacher) {
    const idx = teachers.findIndex(t => t.id === payload.id);
    if (idx >= 0) teachers[idx] = payload; else teachers.unshift(payload);
    return payload;
  },

  // Students
  listStudents(): Student[] { return students; },
  upsertStudent(payload: Student) {
    const idx = students.findIndex(s => s.id === payload.id);
    if (idx >= 0) students[idx] = payload; else students.unshift(payload);
    return payload;
  },

  // Parents
  listParents(): Parent[] { return parents; },
  upsertParent(payload: Parent) {
    const idx = parents.findIndex(p => p.id === payload.id);
    if (idx >= 0) parents[idx] = payload; else parents.unshift(payload);
    return payload;
  }
};
