import React, { useState } from 'react';
import { GraduationCap, Plus, Users, BookOpen, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Select from 'react-select';
import { Class, Student, Teacher, Major, Subject } from '../../types';

// Mock data using proper interfaces
const mockSubjects: Subject[] = [
  { id: 's1', name: 'Matematika', code: 'MAT', credit_hours: 4, is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 's2', name: 'Fisika', code: 'FIS', credit_hours: 3, is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 's3', name: 'Kimia', code: 'KIM', credit_hours: 3, is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 's4', name: 'Biologi', code: 'BIO', credit_hours: 3, is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 's5', name: 'Bahasa Indonesia', code: 'BIN', credit_hours: 4, is_active: true, created_at: '2024-01-01T00:00:00Z' }
];

const mockStudents: Student[] = Array.from({ length: 40 }, (_, i) => ({
  id: `st${i + 1}`,
  user_id: `u${i + 1}`,
  student_id: `STD${String(i + 1).padStart(3, '0')}`,
  class_id: `c${Math.floor(i / 4) + 1}`,
  status: 'active' as const,
  created_at: '2024-01-01T00:00:00Z',
  user: {
    id: `u${i + 1}`,
    email: `siswa${i + 1}@school.com`,
    name: `Siswa ${i + 1}`,
    role: 'student' as const,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    avatar_url: `https://i.pravatar.cc/40?img=${i + 1}`
  }
}));

const mockTeachers: Teacher[] = Array.from({ length: 10 }, (_, i) => ({
  id: `t${i + 1}`,
  user_id: `ut${i + 1}`,
  employee_id: `EMP${String(i + 1).padStart(3, '0')}`,
  specialization: mockSubjects[i % mockSubjects.length].name,
  status: 'active' as const,
  created_at: '2024-01-01T00:00:00Z',
  user: {
    id: `ut${i + 1}`,
    email: `guru${i + 1}@school.com`,
    name: `Guru ${i + 1}`,
    role: 'teacher' as const,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
}));

const mockMajors: Major[] = [
  { id: 'm1', name: 'IPA', code: 'IPA', description: 'Ilmu Pengetahuan Alam', is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 'm2', name: 'IPS', code: 'IPS', description: 'Ilmu Pengetahuan Sosial', is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 'm3', name: 'RPL', code: 'RPL', description: 'Rekayasa Perangkat Lunak', is_active: true, created_at: '2024-01-01T00:00:00Z' }
];

const initialClasses: Class[] = Array.from({ length: 10 }, (_, i) => ({
  id: `c${i + 1}`,
  name: `Kelas ${i + 1}`,
  major_id: mockMajors[i % mockMajors.length].id,
  grade_level: (10 + (i % 3)) as 10 | 11 | 12,
  academic_year: '2024/2025',
  homeroom_teacher_id: mockTeachers[i].id,
  max_students: 30,
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
  major: mockMajors[i % mockMajors.length],
  homeroom_teacher: mockTeachers[i],
  students: mockStudents.slice(i * 4, i * 4 + 4)
}));

const SchoolClasses: React.FC = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(classes[0]?.id || null);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [selectedNewClassName, setSelectedNewClassName] = useState<{ value: string; label: string } | null>(null);
  const [newClassMajor, setNewClassMajor] = useState<{ value: string; label: string } | null>(null);
  const [newClassGradeLevel, setNewClassGradeLevel] = useState<number>(10);
  const [newClassTeacher, setNewClassTeacher] = useState<{ value: string; label: string } | null>(null);
  const [newClassMaxStudents, setNewClassMaxStudents] = useState<number>(30);
  const [editClass, setEditClass] = useState<Class | null>(null);
  const [editClassName, setEditClassName] = useState('');
  const [selectedEditClassName, setSelectedEditClassName] = useState<{ value: string; label: string } | null>(null);
  const [editClassMajor, setEditClassMajor] = useState<{ value: string; label: string } | null>(null);
  const [editClassGradeLevel, setEditClassGradeLevel] = useState<number>(10);
  const [editClassTeacher, setEditClassTeacher] = useState<{ value: string; label: string } | null>(null);
  const [editClassMaxStudents, setEditClassMaxStudents] = useState<number>(30);
  const [editClassStudents, setEditClassStudents] = useState<Student[]>([]);
  const [studentToAdd, setStudentToAdd] = useState<Student | null>(null);

  const selectedClass = classes.find(c => c.id === selectedClassId);

  // Class name options for searchable select
  const classNameOptions = [
    // Kelas 10
    { value: 'X IPA 1', label: 'X IPA 1' },
    { value: 'X IPA 2', label: 'X IPA 2' },
    { value: 'X IPA 3', label: 'X IPA 3' },
    { value: 'X IPS 1', label: 'X IPS 1' },
    { value: 'X IPS 2', label: 'X IPS 2' },
    { value: 'X RPL 1', label: 'X RPL 1' },
    { value: 'X RPL 2', label: 'X RPL 2' },
    { value: 'X RPL 3', label: 'X RPL 3' },
    // Kelas 11
    { value: 'XI IPA 1', label: 'XI IPA 1' },
    { value: 'XI IPA 2', label: 'XI IPA 2' },
    { value: 'XI IPA 3', label: 'XI IPA 3' },
    { value: 'XI IPS 1', label: 'XI IPS 1' },
    { value: 'XI IPS 2', label: 'XI IPS 2' },
    { value: 'XI RPL 1', label: 'XI RPL 1' },
    { value: 'XI RPL 2', label: 'XI RPL 2' },
    { value: 'XI RPL 3', label: 'XI RPL 3' },
    // Kelas 12
    { value: 'XII IPA 1', label: 'XII IPA 1' },
    { value: 'XII IPA 2', label: 'XII IPA 2' },
    { value: 'XII IPA 3', label: 'XII IPA 3' },
    { value: 'XII IPS 1', label: 'XII IPS 1' },
    { value: 'XII IPS 2', label: 'XII IPS 2' },
    { value: 'XII RPL 1', label: 'XII RPL 1' },
    { value: 'XII RPL 2', label: 'XII RPL 2' },
    { value: 'XII RPL 3', label: 'XII RPL 3' }
  ];

  // Add Class
  const handleAddClass = () => {
    if ((selectedNewClassName?.value || newClassName.trim()) && newClassTeacher && newClassMajor) {
      const selectedTeacher = mockTeachers.find(t => t.id === newClassTeacher.value);
      const selectedMajor = mockMajors.find(m => m.id === newClassMajor.value);
      
      const newClass: Class = {
        id: Date.now().toString(),
        name: selectedNewClassName?.value || newClassName,
        major_id: newClassMajor.value,
        grade_level: newClassGradeLevel,
        academic_year: '2024/2025',
        homeroom_teacher_id: newClassTeacher.value,
        max_students: newClassMaxStudents,
        is_active: true,
        created_at: new Date().toISOString(),
        major: selectedMajor,
        homeroom_teacher: selectedTeacher,
        students: []
      };
      
      setClasses([...classes, newClass]);
      setNewClassName('');
      setSelectedNewClassName(null);
      setNewClassMajor(null);
      setNewClassGradeLevel(10);
      setNewClassTeacher(null);
      setNewClassMaxStudents(30);
      setIsAddClassModalOpen(false);
    }
  };

  // Edit Class
  const openEditClassModal = (cls: Class) => {
    setEditClass(cls);
    setEditClassName(cls.name);
    setSelectedEditClassName(classNameOptions.find(opt => opt.value === cls.name) || null);
    setEditClassMajor(cls.major ? { value: cls.major.id, label: cls.major.name } : null);
    setEditClassGradeLevel(cls.grade_level);
    setEditClassTeacher(cls.homeroom_teacher ? { value: cls.homeroom_teacher.id, label: cls.homeroom_teacher.user?.name || '' } : null);
    setEditClassMaxStudents(cls.max_students);
    setEditClassStudents(cls.students || []);
    setIsEditClassModalOpen(true);
  };
  
  const handleEditClass = () => {
    if (!editClass || !editClassTeacher || !editClassMajor) return;
    
    const selectedTeacher = mockTeachers.find(t => t.id === editClassTeacher.value);
    const selectedMajor = mockMajors.find(m => m.id === editClassMajor.value);
    
    const updatedClass: Class = {
      ...editClass,
      name: selectedEditClassName?.value || editClassName,
      major_id: editClassMajor.value,
      grade_level: editClassGradeLevel,
      homeroom_teacher_id: editClassTeacher.value,
      max_students: editClassMaxStudents,
      major: selectedMajor,
      homeroom_teacher: selectedTeacher,
      students: editClassStudents
    };
    
    setClasses(classes.map(cls => cls.id === editClass.id ? updatedClass : cls));
    setIsEditClassModalOpen(false);
    setEditClass(null);
    setEditClassName('');
    setSelectedEditClassName(null);
  };

  // Delete Class
  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(cls => cls.id !== id));
    if (selectedClassId === id) setSelectedClassId(classes[0]?.id || null);
  };

  // Add Student to Class
  const openAddStudentModal = (cls: Class) => {
    setEditClass(cls);
    setIsAddStudentModalOpen(true);
    setStudentToAdd(null);
  };
  
  const handleAddStudent = () => {
    if (studentToAdd && editClass) {
      const updatedStudent = { ...studentToAdd, class_id: editClass.id };
      setClasses(classes.map(cls =>
        cls.id === editClass.id
          ? { ...cls, students: [...(cls.students || []), updatedStudent] }
          : cls
      ));
      setIsAddStudentModalOpen(false);
      setStudentToAdd(null);
      setEditClass(null);
    }
  };

  // Remove Student from Class
  const handleRemoveStudent = (studentId: string) => {
    setEditClassStudents(editClassStudents.filter(s => s.id !== studentId));
    if (!editClass) return;
    setClasses(classes.map(cls =>
      cls.id === editClass.id
        ? { ...cls, students: (cls.students || []).filter(s => s.id !== studentId) }
        : cls
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Class Management</h1>
          <p className="text-gray-600 mt-2">Kelola kelas dan distribusi siswa</p>
        </div>
        <Button onClick={() => setIsAddClassModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Class
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Daftar Kelas</h3>
            <div className="space-y-2">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedClassId === classItem.id 
                      ? 'bg-primary-50 border-2 border-primary-500' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => setSelectedClassId(classItem.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                      <p className="text-sm text-gray-500">{(classItem.students?.length || 0)} siswa • Grade {classItem.grade_level}</p>
                    </div>
                    <GraduationCap className={`h-5 w-5 ${selectedClassId === classItem.id ? 'text-primary-600' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); openEditClassModal(classItem); }} className="text-blue-600 hover:bg-blue-50 rounded-full"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); handleDeleteClass(classItem.id); }} className="text-red-600 hover:bg-red-50 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedClass ? (
            <div className="space-y-6">
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary-900">{selectedClass.name}</h3>
                    <p className="text-gray-600">Wali Kelas: {selectedClass.homeroom_teacher?.user?.name || 'Belum ditentukan'}</p>
                    <p className="text-gray-600">Jurusan: {selectedClass.major?.name || 'Belum ditentukan'}</p>
                    <p className="text-gray-600">Tingkat: Kelas {selectedClass.grade_level}</p>
                  </div>
                  <Badge variant="success">{(selectedClass.students?.length || 0)}/{selectedClass.max_students} Siswa</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg">
                    <Users className="h-8 w-8 text-primary-600" />
                    <div>
                      <p className="font-medium text-primary-900">Total Siswa</p>
                      <p className="text-2xl font-bold text-primary-700">{(selectedClass.students?.length || 0)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-accent-50 rounded-lg">
                    <BookOpen className="h-8 w-8 text-accent-600" />
                    <div>
                      <p className="font-medium text-accent-900">Mata Pelajaran</p>
                      <p className="text-2xl font-bold text-accent-700">0</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary-900 mb-3">Informasi Kelas</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Tahun Akademik:</span>
                      <p className="text-gray-900">{selectedClass.academic_year}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Kapasitas Maksimal:</span>
                      <p className="text-gray-900">{selectedClass.max_students} siswa</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-primary-900">Daftar Siswa</h3>
                  <Button variant="outline" size="sm" onClick={() => openAddStudentModal(selectedClass)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
                <div className="grid gap-3">
                  {!selectedClass.students || selectedClass.students.length === 0 ? (
                    <div className="text-gray-400 text-sm">Belum ada siswa di kelas ini.</div>
                  ) : (
                    selectedClass.students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img 
                            src={student.user?.avatar_url || `https://i.pravatar.cc/40?u=${student.id}`} 
                            alt={student.user?.name || 'Student'} 
                            className="w-10 h-10 rounded-full object-cover" 
                          />
                          <div>
                            <p className="font-medium text-gray-900">{student.user?.name || 'Unknown Student'}</p>
                            <p className="text-sm text-gray-500">{student.user?.email || 'No email'}</p>
                            <p className="text-xs text-gray-400">ID: {student.student_id}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Hapus siswa"
                          onClick={() => {
                            setClasses(classes => classes.map(cls =>
                              cls.id === selectedClass.id
                                ? { ...cls, students: (cls.students || []).filter(s => s.id !== student.id) }
                                : cls
                            ));
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <Card>
              <div className="text-center text-gray-500 py-12">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Pilih kelas untuk melihat detail</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modal Add Class */}
      <Modal isOpen={isAddClassModalOpen} onClose={() => setIsAddClassModalOpen(false)} title="Tambah Kelas" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kelas</label>
            <Select
              options={classNameOptions}
              value={selectedNewClassName}
              onChange={(option) => {
                setSelectedNewClassName(option);
                setNewClassName(option?.value || '');
              }}
              isClearable
              isSearchable
              placeholder="Pilih atau ketik nama kelas..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jurusan</label>
            <Select
              options={mockMajors.map(m => ({ value: m.id, label: m.name }))}
              value={newClassMajor}
              onChange={setNewClassMajor}
              isClearable
              isSearchable
              placeholder="Pilih jurusan..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat Kelas</label>
            <Select
              options={[10, 11, 12].map(level => ({ value: level, label: `Kelas ${level}` }))}
              value={{ value: newClassGradeLevel, label: `Kelas ${newClassGradeLevel}` }}
              onChange={(opt) => setNewClassGradeLevel(opt?.value || 10)}
              placeholder="Pilih tingkat kelas..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wali Kelas</label>
            <Select
              options={mockTeachers.map(t => ({ value: t.id, label: t.user?.name || 'Unknown Teacher' }))}
              value={newClassTeacher}
              onChange={setNewClassTeacher}
              isClearable
              isSearchable
              placeholder="Pilih wali kelas..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas Maksimal</label>
            <input
              type="number"
              value={newClassMaxStudents}
              onChange={(e) => setNewClassMaxStudents(parseInt(e.target.value) || 30)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="30"
              min="1"
              max="50"
            />
          </div>
          
          <Button onClick={handleAddClass} className="w-full bg-primary-600 hover:bg-primary-700 text-white">Simpan</Button>
        </div>
      </Modal>

      {/* Modal Edit Class */}
      <Modal isOpen={isEditClassModalOpen} onClose={() => setIsEditClassModalOpen(false)} title="Edit Kelas" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kelas</label>
            <Select
              options={classNameOptions}
              value={selectedEditClassName}
              onChange={(option) => {
                setSelectedEditClassName(option);
                setEditClassName(option?.value || '');
              }}
              isClearable
              isSearchable
              placeholder="Pilih atau ketik nama kelas..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jurusan</label>
            <Select
              options={mockMajors.map(m => ({ value: m.id, label: m.name }))}
              value={editClassMajor}
              onChange={setEditClassMajor}
              isClearable
              isSearchable
              placeholder="Pilih jurusan..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat Kelas</label>
            <Select
              options={[10, 11, 12].map(level => ({ value: level, label: `Kelas ${level}` }))}
              value={{ value: editClassGradeLevel, label: `Kelas ${editClassGradeLevel}` }}
              onChange={(opt) => setEditClassGradeLevel(opt?.value || 10)}
              placeholder="Pilih tingkat kelas..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wali Kelas</label>
            <Select
              options={mockTeachers.map(t => ({ value: t.id, label: t.user?.name || 'Unknown Teacher' }))}
              value={editClassTeacher}
              onChange={setEditClassTeacher}
              isClearable
              isSearchable
              placeholder="Pilih wali kelas..."
              classNamePrefix="react-select"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas Maksimal</label>
            <input
              type="number"
              value={editClassMaxStudents}
              onChange={(e) => setEditClassMaxStudents(parseInt(e.target.value) || 30)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="30"
              min="1"
              max="50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daftar Siswa</label>
            <div className="max-h-48 overflow-y-auto border rounded-lg p-2 bg-gray-50">
              {editClassStudents.length === 0 ? (
                <div className="text-gray-400 text-sm">Belum ada siswa di kelas ini.</div>
              ) : (
                editClassStudents.map(s => (
                  <div key={s.id} className="flex justify-between items-center py-1 px-2 rounded hover:bg-gray-100">
                    <span>{s.user?.name || 'Unknown Student'}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveStudent(s.id)} className="text-red-600 hover:bg-red-50 rounded-full">Hapus</Button>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <Button onClick={handleEditClass} className="w-full bg-primary-600 hover:bg-primary-700 text-white mt-2">Simpan Perubahan</Button>
        </div>
      </Modal>

      {/* Modal Add Student */}
      <Modal isOpen={isAddStudentModalOpen} onClose={() => setIsAddStudentModalOpen(false)} title="Tambah Siswa ke Kelas" size="sm">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Siswa</label>
          <Select
            options={mockStudents.filter(s => !editClass?.students?.some(st => st.id === s.id)).map(s => ({ value: s, label: s.user?.name || 'Unknown Student' }))}
            value={studentToAdd ? { value: studentToAdd, label: studentToAdd.user?.name || 'Unknown Student' } : null}
            onChange={opt => setStudentToAdd(opt?.value ?? null)}
            classNamePrefix="react-select"
            placeholder="Pilih siswa..."
          />
          <Button onClick={handleAddStudent} className="w-full bg-primary-600 hover:bg-primary-700 text-white">Tambah</Button>
        </div>
      </Modal>
    </div>
  );
};

export default SchoolClasses;