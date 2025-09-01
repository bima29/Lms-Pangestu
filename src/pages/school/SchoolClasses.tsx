import React, { useState } from 'react';
import { GraduationCap, Plus, Users, BookOpen, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Select from 'react-select';

// Dummy subjects
const allSubjects = [
  'Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 'Bahasa Inggris',
  'Sejarah', 'Geografi', 'Ekonomi', 'Sosiologi', 'Seni Budaya', 'PJOK', 'Prakarya', 'Informatika',
  'Agama', 'PKN', 'Teknologi', 'Kewirausahaan', 'Multimedia', 'TKJ', 'RPL', 'Akuntansi', 'Bahasa Jepang', 'Bahasa Arab'
];

// Dummy students
const allStudents = Array.from({ length: 40 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Siswa ${i + 1}`,
  email: `siswa${i + 1}@school.com`,
  avatar: `https://i.pravatar.cc/40?img=${i + 1}`
}));

// Dummy classes
const initialClasses = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Kelas ${i + 1}`,
  teacher: `Guru ${i + 1}`,
  students: allStudents.slice(i * 4, i * 4 + 4),
  subjects: allSubjects.slice(i, i + 5)
}));

const SchoolClasses: React.FC = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(classes[0]?.id || null);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassTeacher, setNewClassTeacher] = useState('');
  const [newClassSubjects, setNewClassSubjects] = useState<{ value: string; label: string }[]>([]);
  type ClassType = typeof initialClasses[0] | null;
  const [editClass, setEditClass] = useState<ClassType>(null);
  const [editClassName, setEditClassName] = useState('');
  const [editClassTeacher, setEditClassTeacher] = useState('');
  const [editClassSubjects, setEditClassSubjects] = useState<{ value: string; label: string }[]>([]);
  const [editClassStudents, setEditClassStudents] = useState<{ id: string; name: string; email: string; avatar: string }[]>([]);
  const [studentToAdd, setStudentToAdd] = useState<{ id: string; name: string; email: string; avatar: string } | null>(null);

  const selectedClass = classes.find(c => c.id === selectedClassId);

  // Add Class
  const handleAddClass = () => {
    if (newClassName.trim() && newClassTeacher.trim()) {
      setClasses([
        ...classes,
        {
          id: Date.now().toString(),
          name: newClassName,
          teacher: newClassTeacher,
          students: [],
          subjects: newClassSubjects.map(s => s.value)
        }
      ]);
      setNewClassName('');
      setNewClassTeacher('');
      setNewClassSubjects([]);
      setIsAddClassModalOpen(false);
    }
  };

  // Edit Class
  const openEditClassModal = (cls: typeof initialClasses[0]) => {
    setEditClass(cls);
    setEditClassName(cls.name);
    setEditClassTeacher(cls.teacher);
    setEditClassSubjects(cls.subjects.map(s => ({ value: s, label: s })));
    setEditClassStudents(cls.students);
    setIsEditClassModalOpen(true);
  };
  const handleEditClass = () => {
    if (!editClass) return;
    if (!editClass) return;
    setClasses(classes.map(cls =>
      cls.id === editClass.id
        ? { ...cls, name: editClassName, teacher: editClassTeacher, subjects: editClassSubjects.map(s => s.value), students: editClassStudents }
        : cls
    ));
    setIsEditClassModalOpen(false);
    setEditClass(null);
  };

  // Delete Class
  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(cls => cls.id !== id));
    if (selectedClassId === id) setSelectedClassId(classes[0]?.id || null);
  };

  // Add Student to Class
  const openAddStudentModal = (cls: React.SetStateAction<{ id: string; name: string; teacher: string; students: { id: string; name: string; email: string; avatar: string; }[]; subjects: string[]; } | null>) => {
    setEditClass(cls);
    setIsAddStudentModalOpen(true);
    setStudentToAdd(null);
  };
  const handleAddStudent = () => {
    if (studentToAdd) {
      if (!editClass) return;
      setClasses(classes.map(cls =>
        cls.id === editClass.id
          ? { ...cls, students: [...cls.students, studentToAdd] }
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
        ? { ...cls, students: cls.students.filter(s => s.id !== studentId) }
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
                      <p className="text-sm text-gray-500">{classItem.students.length} siswa</p>
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
                    <p className="text-gray-600">Wali Kelas: {selectedClass.teacher}</p>
                  </div>
                  <Badge variant="success">{selectedClass.students.length} Siswa</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg">
                    <Users className="h-8 w-8 text-primary-600" />
                    <div>
                      <p className="font-medium text-primary-900">Total Siswa</p>
                      <p className="text-2xl font-bold text-primary-700">{selectedClass.students.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-accent-50 rounded-lg">
                    <BookOpen className="h-8 w-8 text-accent-600" />
                    <div>
                      <p className="font-medium text-accent-900">Mata Pelajaran</p>
                      <p className="text-2xl font-bold text-accent-700">{selectedClass.subjects.length}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary-900 mb-3">Mata Pelajaran</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClass.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
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
                  {selectedClass.students.length === 0 ? (
                    <div className="text-gray-400 text-sm">Belum ada siswa di kelas ini.</div>
                  ) : (
                    selectedClass.students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Hapus siswa"
                          onClick={() => {
                            setClasses(classes => classes.map(cls =>
                              cls.id === selectedClass.id
                                ? { ...cls, students: cls.students.filter(s => s.id !== student.id) }
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kelas</label>
          <Select
            options={Array.from(new Set(classes.map(c => c.name))).map(n => ({ value: n, label: n }))}
            value={newClassName ? { value: newClassName, label: newClassName } : null}
            onChange={opt => setNewClassName(opt ? opt.value : '')}
            isClearable
            isSearchable
            placeholder="Pilih atau cari nama kelas..."
            classNamePrefix="react-select"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Wali Kelas</label>
          <Select
            options={Array.from(new Set(classes.map(c => c.teacher))).map(n => ({ value: n, label: n }))}
            value={newClassTeacher ? { value: newClassTeacher, label: newClassTeacher } : null}
            onChange={opt => setNewClassTeacher(opt ? opt.value : '')}
            isClearable
            isSearchable
            placeholder="Pilih atau cari wali kelas..."
            classNamePrefix="react-select"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
          <Select
            isMulti
            options={allSubjects.map(s => ({ value: s, label: s }))}
            value={newClassSubjects}
            onChange={value => setNewClassSubjects(Array.isArray(value) ? [...value] : [])}
            classNamePrefix="react-select"
            placeholder="Pilih mata pelajaran..."
          />
          <Button onClick={handleAddClass} className="w-full bg-primary-600 hover:bg-primary-700 text-white">Simpan</Button>
        </div>
      </Modal>

      {/* Modal Edit Class */}
      <Modal isOpen={isEditClassModalOpen} onClose={() => setIsEditClassModalOpen(false)} title="Edit Kelas" size="md">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kelas</label>
          <Select
            options={Array.from(new Set(classes.map(c => c.name))).map(n => ({ value: n, label: n }))}
            value={editClassName ? { value: editClassName, label: editClassName } : null}
            onChange={opt => setEditClassName(opt ? opt.value : '')}
            isClearable
            isSearchable
            placeholder="Pilih atau cari nama kelas..."
            classNamePrefix="react-select"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Wali Kelas</label>
          <Select
            options={Array.from(new Set(classes.map(c => c.teacher))).map(n => ({ value: n, label: n }))}
            value={editClassTeacher ? { value: editClassTeacher, label: editClassTeacher } : null}
            onChange={opt => setEditClassTeacher(opt ? opt.value : '')}
            isClearable
            isSearchable
            placeholder="Pilih atau cari wali kelas..."
            classNamePrefix="react-select"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
          <Select
            isMulti
            options={allSubjects.map(s => ({ value: s, label: s }))}
            value={editClassSubjects}
            onChange={value => setEditClassSubjects(Array.isArray(value) ? [...value] : [])}
            classNamePrefix="react-select"
            placeholder="Pilih mata pelajaran..."
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Daftar Siswa</label>
          <div className="max-h-48 overflow-y-auto border rounded-lg p-2 bg-gray-50">
            {editClassStudents.length === 0 ? (
              <div className="text-gray-400 text-sm">Belum ada siswa di kelas ini.</div>
            ) : (
              editClassStudents.map(s => (
                <div key={s.id} className="flex justify-between items-center py-1 px-2 rounded hover:bg-gray-100">
                  <span>{s.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveStudent(s.id)} className="text-red-600 hover:bg-red-50 rounded-full">Hapus</Button>
                </div>
              ))
            )}
          </div>
          <Button onClick={handleEditClass} className="w-full bg-primary-600 hover:bg-primary-700 text-white mt-2">Simpan Perubahan</Button>
        </div>
      </Modal>

      {/* Modal Add Student */}
      <Modal isOpen={isAddStudentModalOpen} onClose={() => setIsAddStudentModalOpen(false)} title="Tambah Siswa ke Kelas" size="sm">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Siswa</label>
          <Select<{ value: { id: string; name: string; email: string; avatar: string }; label: string }>
            options={allStudents.filter(s => !editClass?.students.some(st => st.id === s.id)).map(s => ({ value: s, label: s.name }))}
            value={studentToAdd ? { value: studentToAdd, label: studentToAdd.name } : null}
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