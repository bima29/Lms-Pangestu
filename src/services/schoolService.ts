import { PaginationParams, PaginationResult, Subject, Class, Major, Teacher, ClassSubject, Schedule } from '../types';

// Temporary in-memory stores (swap to real API later)
let subjects: Subject[] = [
  { id: 'sub-1', school_id: 'school-1', name: 'Matematika', code: 'MTK', description: 'Mata pelajaran Matematika', credit_hours: 4, is_active: true, created_at: new Date().toISOString() },
  { id: 'sub-2', school_id: 'school-1', name: 'Fisika', code: 'FIS', description: 'Mata pelajaran Fisika', credit_hours: 3, is_active: true, created_at: new Date().toISOString() },
  { id: 'sub-3', school_id: 'school-1', name: 'Kimia', code: 'KIM', description: 'Mata pelajaran Kimia', credit_hours: 3, is_active: true, created_at: new Date().toISOString() },
  { id: 'sub-4', school_id: 'school-1', name: 'Biologi', code: 'BIO', description: 'Mata pelajaran Biologi', credit_hours: 3, is_active: true, created_at: new Date().toISOString() },
  { id: 'sub-5', school_id: 'school-1', name: 'Bahasa Indonesia', code: 'BIN', description: 'Mata pelajaran Bahasa Indonesia', credit_hours: 4, is_active: true, created_at: new Date().toISOString() },
  { id: 'sub-6', school_id: 'school-1', name: 'Bahasa Inggris', code: 'BIG', description: 'Mata pelajaran Bahasa Inggris', credit_hours: 3, is_active: true, created_at: new Date().toISOString() },
];
let classesStore: Class[] = [];
let classSubjectsStore: ClassSubject[] = [];
let schedulesStore: Schedule[] = [];
let majors: Major[] = [
  { id: 'maj-1', name: 'Ilmu Pengetahuan Alam', code: 'IPA', description: 'Program studi IPA', school_id: 'school-1', is_active: true, created_at: new Date().toISOString() },
  { id: 'maj-2', name: 'Ilmu Pengetahuan Sosial', code: 'IPS', description: 'Program studi IPS', school_id: 'school-1', is_active: true, created_at: new Date().toISOString() },
  { id: 'maj-3', name: 'Bahasa', code: 'BHS', description: 'Program studi Bahasa', school_id: 'school-1', is_active: true, created_at: new Date().toISOString() }
];
let teachers: Teacher[] = [
  {
    id: 'tea-1',
    user_id: '3',
    employee_id: 'EMP001',
    specialization: 'Matematika',
    hire_date: '2020-07-01',
    status: 'active',
    created_at: new Date().toISOString(),
    user: {
      id: '3',
      email: 'guru@school.com',
      name: 'Pak Budi Santoso',
      role: 'teacher',
      school_id: 'school-1',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: 'tea-2',
    user_id: '4',
    employee_id: 'EMP002',
    specialization: 'Fisika',
    hire_date: '2021-08-15',
    status: 'active',
    created_at: new Date().toISOString(),
    user: {
      id: '4',
      email: 'fisika@school.com',
      name: 'Ibu Sari Dewi',
      role: 'teacher',
      school_id: 'school-1',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];

function paginateAndSearch<T extends Record<string, any>>(items: T[], params?: PaginationParams): PaginationResult<T> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const search = (params?.search ?? '').toLowerCase();
  const filtered = search
    ? items.filter((it) => Object.values(it).some(v => typeof v === 'string' && v.toLowerCase().includes(search)))
    : items;
  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  return { data, total, page, limit, total_pages: Math.ceil(total / limit) };
}

export const schoolService = {
  // Subjects
  listSubjects(params?: PaginationParams) {
    return paginateAndSearch(subjects, params);
  },
  createSubject(payload: Subject) {
    subjects.unshift(payload);
    return payload;
  },
  updateSubject(id: string, patch: Partial<Subject>) {
    const idx = subjects.findIndex(s => s.id === id);
    if (idx >= 0) {
      subjects[idx] = { ...subjects[idx], ...patch } as Subject;
      return subjects[idx];
    }
    return null;
  },
  deleteSubject(id: string) {
    subjects = subjects.filter(s => s.id !== id);
    return true;
  },

  // Majors
  listMajorsPaged(params?: PaginationParams) {
    return paginateAndSearch(majors as any, params) as unknown as PaginationResult<Major>;
  },
  createMajor(payload: Major) {
    majors.unshift(payload);
    return payload;
  },
  updateMajor(id: string, patch: Partial<Major>) {
    const idx = majors.findIndex(m => m.id === id);
    if (idx >= 0) {
      majors[idx] = { ...majors[idx], ...patch } as Major;
      return majors[idx];
    }
    return null;
  },
  deleteMajor(id: string) {
    majors = majors.filter(m => m.id !== id);
    // Unlink from classes if any
    classesStore = classesStore.map(c => (c.major_id === id ? { ...c, major_id: undefined } : c));
    return true;
  },

  // Classes
  listClasses(params?: PaginationParams) {
    return paginateAndSearch(classesStore, params);
  },
  createClass(payload: Class) {
    classesStore.unshift(payload);
    return payload;
  },
  updateClass(id: string, patch: Partial<Class>) {
    const idx = classesStore.findIndex(c => c.id === id);
    if (idx >= 0) {
      classesStore[idx] = { ...classesStore[idx], ...patch } as Class;
      return classesStore[idx];
    }
    return null;
  },
  deleteClass(id: string) {
    classesStore = classesStore.filter(c => c.id !== id);
    return true;
  },

  // Lookup data
  listMajors(): Major[] {
    return majors;
  },
  listTeachers(): Teacher[] {
    return teachers;
  },
  listClassesRaw(): Class[] { return classesStore; },
  listSubjectsRaw(): Subject[] { return subjects; },
  listClassSubjectsRaw(): ClassSubject[] { return classSubjectsStore; },

  resetAll() {
    subjects = [];
    classesStore = [];
  },

  // Seeders (optional for initial testing)
  seed({ initialMajors, initialTeachers, initialSubjects }: { initialMajors?: Major[]; initialTeachers?: Teacher[]; initialSubjects?: Subject[] }) {
    if (initialMajors) majors = [...initialMajors];
    if (initialTeachers) teachers = [...initialTeachers];
    if (initialSubjects) subjects = [...initialSubjects];
  },

  // ClassSubjects (many-to-many Class-Subject-Teacher)
  listClassSubjects(params?: PaginationParams) {
    return paginateAndSearch(classSubjectsStore as any, params) as unknown as PaginationResult<ClassSubject>;
  },
  createClassSubject(payload: ClassSubject) {
    classSubjectsStore.unshift(payload);
    return payload;
  },
  updateClassSubject(id: string, patch: Partial<ClassSubject>) {
    const idx = classSubjectsStore.findIndex(cs => cs.id === id);
    if (idx >= 0) {
      classSubjectsStore[idx] = { ...classSubjectsStore[idx], ...patch } as ClassSubject;
      return classSubjectsStore[idx];
    }
    return null;
  },
  deleteClassSubject(id: string) {
    classSubjectsStore = classSubjectsStore.filter(cs => cs.id !== id);
    schedulesStore = schedulesStore.filter(sc => sc.class_subject_id !== id);
    return true;
  },

  // Schedules
  listSchedules(params?: PaginationParams) {
    return paginateAndSearch(schedulesStore as any, params) as unknown as PaginationResult<Schedule>;
  },
  createSchedule(payload: Schedule) {
    schedulesStore.unshift(payload);
    return payload;
  },
  updateSchedule(id: string, patch: Partial<Schedule>) {
    const idx = schedulesStore.findIndex(s => s.id === id);
    if (idx >= 0) {
      schedulesStore[idx] = { ...schedulesStore[idx], ...patch } as Schedule;
      return schedulesStore[idx];
    }
    return null;
  },
  deleteSchedule(id: string) {
    schedulesStore = schedulesStore.filter(s => s.id !== id);
    return true;
  }
};

export const lookup = {
  subjects: schoolService.listSubjectsRaw,
  classes: schoolService.listClassesRaw,
  teachers: schoolService.listTeachers,
  classSubjects: schoolService.listClassSubjectsRaw,
};
