
import React, { useState } from 'react';
import { GraduationCap, Plus, Users, BookOpen, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
// import Select from 'react-select'; // Not used, so commented out

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

// Dummy classes (from SchoolClasses)
const initialClasses = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Kelas ${i + 1}`,
  teacher: `Guru ${i + 1}`,
  students: allStudents.slice(i * 4, i * 4 + 4),
  subjects: allSubjects.slice(i, i + 5)
}));

const TeacherClasses: React.FC = () => {
  const [classes] = useState<typeof initialClasses>(initialClasses);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(classes[0]?.id || null);
  const [isAddAssignmentModalOpen, setIsAddAssignmentModalOpen] = useState(false);
  const [isEditAssignmentModalOpen, setIsEditAssignmentModalOpen] = useState(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDue, setNewAssignmentDue] = useState('');
  const [editAssignment, setEditAssignment] = useState<any>(null);
  const [editAssignmentTitle, setEditAssignmentTitle] = useState('');
  const [editAssignmentDue, setEditAssignmentDue] = useState('');
  const [assignments, setAssignments] = useState<any[]>([]);

  const selectedClass = classes.find((c: typeof initialClasses[0]) => c.id === selectedClassId);
  const classAssignments = assignments.filter((a: any) => a.classId === selectedClassId);

  // Add Assignment
  const handleAddAssignment = () => {
    if (newAssignmentTitle.trim() && newAssignmentDue.trim() && selectedClassId) {
      setAssignments([
        ...assignments,
        {
          id: Date.now().toString(),
          classId: selectedClassId,
          title: newAssignmentTitle,
          due: newAssignmentDue,
          submitted: 0,
          total: selectedClass?.students.length || 0
        }
      ]);
      setNewAssignmentTitle('');
      setNewAssignmentDue('');
      setIsAddAssignmentModalOpen(false);
    }
  };

  // Edit Assignment
  const openEditAssignmentModal = (assignment: any) => {
    setEditAssignment(assignment);
    setEditAssignmentTitle(assignment.title);
    setEditAssignmentDue(assignment.due);
    setIsEditAssignmentModalOpen(true);
  };
  const handleEditAssignment = () => {
    if (!editAssignment) return;
      setAssignments(assignments.map((a: any) =>
        a.id === editAssignment.id
          ? { ...a, title: editAssignmentTitle, due: editAssignmentDue }
          : a
      ));
    setIsEditAssignmentModalOpen(false);
    setEditAssignment(null);
  };

  // Delete Assignment
  const handleDeleteAssignment = (id: string) => {
  setAssignments(assignments.filter((a: any) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">My Classes</h1>
          <p className="text-gray-600 mt-2">Kelola kelas dan pantau progress siswa</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Kelas Saya</h3>
            <div className="space-y-2">
              {classes.map((classItem: typeof initialClasses[0]) => (
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
                    {selectedClass.subjects.map((subject: string, index: number) => (
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
                </div>
                <div className="grid gap-3">
                  {selectedClass.students.length === 0 ? (
                    <div className="text-gray-400 text-sm">Belum ada siswa di kelas ini.</div>
                  ) : (
                    selectedClass.students.map((student: typeof allStudents[0]) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-primary-900">Assignments</h3>
                  <Button variant="outline" size="sm" onClick={() => setIsAddAssignmentModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Assignment
                  </Button>
                </div>
                <div className="grid gap-3">
                  {classAssignments.length === 0 ? (
                    <div className="text-gray-400 text-sm">Belum ada tugas untuk kelas ini.</div>
                  ) : (
                    classAssignments.map((assignment: any) => (
                      <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{assignment.title}</p>
                          <p className="text-sm text-gray-500">Due: {assignment.due}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditAssignmentModal(assignment)} className="text-blue-600 hover:bg-blue-50 rounded-full"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteAssignment(assignment.id)} className="text-red-600 hover:bg-red-50 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                        </div>
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

      {/* Modal Add Assignment */}
      <Modal isOpen={isAddAssignmentModalOpen} onClose={() => setIsAddAssignmentModalOpen(false)} title="Tambah Tugas" size="md">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Tugas</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={newAssignmentTitle}
            onChange={e => setNewAssignmentTitle(e.target.value)}
            placeholder="Masukkan judul tugas..."
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Deadline</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={newAssignmentDue}
            onChange={e => setNewAssignmentDue(e.target.value)}
          />
          <Button onClick={handleAddAssignment} className="w-full bg-primary-600 hover:bg-primary-700 text-white">Simpan</Button>
        </div>
      </Modal>

      {/* Modal Edit Assignment */}
      <Modal isOpen={isEditAssignmentModalOpen} onClose={() => setIsEditAssignmentModalOpen(false)} title="Edit Tugas" size="md">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Tugas</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={editAssignmentTitle}
            onChange={e => setEditAssignmentTitle(e.target.value)}
            placeholder="Masukkan judul tugas..."
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Deadline</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={editAssignmentDue}
            onChange={e => setEditAssignmentDue(e.target.value)}
          />
          <Button onClick={handleEditAssignment} className="w-full bg-primary-600 hover:bg-primary-700 text-white">Simpan Perubahan</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherClasses;