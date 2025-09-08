import React, { useState } from 'react';
import Select from 'react-select';
import { FileText, Plus, Eye, Users, Clock, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import { CBTSession } from '../../types';

const SchoolCBT: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSession, setEditSession] = useState<CBTSession | null>(null);
  const [viewSession, setViewSession] = useState<CBTSession | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formTeacher, setFormTeacher] = useState<{ value: string; label: string } | null>(null);
  const [formClass, setFormClass] = useState<{ value: string; label: string } | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formDuration, setFormDuration] = useState('');
  // Add more form fields as needed

  const teacherOptions = [
    { value: 'Budi Santoso', label: 'Budi Santoso' },
    { value: 'Siti Rahayu', label: 'Siti Rahayu' },
    { value: 'Ahmad Wijaya', label: 'Ahmad Wijaya' },
    { value: 'Dewi Lestari', label: 'Dewi Lestari' },
  ];

  const classOptions = [
    { value: 'XII IPA 1', label: 'XII IPA 1' },
    { value: 'XII IPA 2', label: 'XII IPA 2' },
    { value: 'XI IPA 1', label: 'XI IPA 1' },
    { value: 'XI IPA 2', label: 'XI IPA 2' },
  ];

  const [cbtSessions, setCbtSessions] = useState<CBTSession[]>([
    {
      id: '1',
      title: 'Ujian Tengah Semester - Matematika',
      description: 'Ujian tengah semester untuk mata pelajaran Matematika',
      subject_id: 'subject-1',
      class_id: 'class-1',
      teacher_id: 'teacher-1',
      start_time: '2025-01-15T08:00:00Z',
      end_time: '2025-01-15T09:30:00Z',
      duration_minutes: 90,
      total_questions: 25,
      passing_score: 70,
      shuffle_questions: true,
      show_results: true,
      is_active: true,
      created_at: '2025-01-10T00:00:00Z',
      updated_at: '2025-01-10T00:00:00Z',
      teacher: {
        id: 'teacher-1',
        employee_id: 'EMP001',
        user_id: 'user-1',
        specialization: 'Matematika',
        hire_date: '2020-07-01',
        salary: 5000000,
        status: 'active',
        created_at: '2020-07-01T00:00:00Z',
        user: {
          id: 'user-1',
          name: 'Budi Santoso',
          email: 'budi.santoso@school.id',
          role: 'teacher',
          is_active: true,
          created_at: '2020-07-01T00:00:00Z',
          updated_at: '2020-07-01T00:00:00Z'
        }
      },
      class: {
        id: 'class-1',
        name: 'XII IPA 1',
        grade_level: 12,
        academic_year: '2024/2025',
        max_students: 36,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      },
      subject: {
        id: 'subject-1',
        name: 'Matematika',
        code: 'MAT',
        credit_hours: 4,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    },
    {
      id: '2',
      title: 'Quiz Fisika - Gelombang',
      description: 'Quiz harian untuk materi gelombang fisika',
      subject_id: 'subject-2',
      class_id: 'class-2',
      teacher_id: 'teacher-2',
      start_time: '2025-01-16T10:00:00Z',
      end_time: '2025-01-16T10:45:00Z',
      duration_minutes: 45,
      total_questions: 15,
      passing_score: 75,
      shuffle_questions: true,
      show_results: false,
      is_active: true,
      created_at: '2025-01-12T00:00:00Z',
      updated_at: '2025-01-12T00:00:00Z',
      teacher: {
        id: 'teacher-2',
        employee_id: 'EMP002',
        user_id: 'user-2',
        specialization: 'Fisika',
        hire_date: '2019-08-01',
        salary: 4800000,
        status: 'active',
        created_at: '2019-08-01T00:00:00Z',
        user: {
          id: 'user-2',
          name: 'Siti Rahayu',
          email: 'siti.rahayu@school.id',
          role: 'teacher',
          is_active: true,
          created_at: '2019-08-01T00:00:00Z',
          updated_at: '2019-08-01T00:00:00Z'
        }
      },
      class: {
        id: 'class-2',
        name: 'XII IPA 2',
        grade_level: 12,
        academic_year: '2024/2025',
        max_students: 36,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      },
      subject: {
        id: 'subject-2',
        name: 'Fisika',
        code: 'FIS',
        credit_hours: 3,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    },
    {
      id: '3',
      title: 'Evaluasi Kimia Organik',
      description: 'Evaluasi pemahaman kimia organik',
      subject_id: 'subject-3',
      class_id: 'class-3',
      teacher_id: 'teacher-3',
      start_time: '2025-01-10T13:00:00Z',
      end_time: '2025-01-10T14:00:00Z',
      duration_minutes: 60,
      total_questions: 20,
      passing_score: 70,
      shuffle_questions: false,
      show_results: true,
      is_active: false,
      created_at: '2025-01-08T00:00:00Z',
      updated_at: '2025-01-08T00:00:00Z',
      teacher: {
        id: 'teacher-3',
        employee_id: 'EMP003',
        user_id: 'user-3',
        specialization: 'Kimia',
        hire_date: '2021-01-15',
        salary: 4900000,
        status: 'active',
        created_at: '2021-01-15T00:00:00Z',
        user: {
          id: 'user-3',
          name: 'Ahmad Wijaya',
          email: 'ahmad.wijaya@school.id',
          role: 'teacher',
          is_active: true,
          created_at: '2021-01-15T00:00:00Z',
          updated_at: '2021-01-15T00:00:00Z'
        }
      },
      class: {
        id: 'class-3',
        name: 'XI IPA 1',
        grade_level: 11,
        academic_year: '2024/2025',
        max_students: 36,
        is_active: true,
        created_at: '2024-07-01T00:00:00Z'
      },
      subject: {
        id: 'subject-3',
        name: 'Kimia',
        code: 'KIM',
        credit_hours: 3,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    }
  ]);
  const [deleteSession, setDeleteSession] = useState<CBTSession | null>(null);

  const filteredSessions = filterStatus === 'all' 
    ? cbtSessions 
    : cbtSessions.filter(session => session.is_active === (filterStatus === 'active'));


  const openEditModal = (session: CBTSession) => {
    setEditSession(session);
    setFormTitle(session.title);
    setFormTeacher(teacherOptions.find(opt => opt.value === session.teacher?.user?.name) || null);
    setFormClass(classOptions.find(opt => opt.value === session.class?.name) || null);
    setFormStartDate(session.start_time ? session.start_time.slice(0, 16) : '');
    setFormDuration(session.duration_minutes ? String(session.duration_minutes) : '');
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setEditSession(null);
    setFormTitle('');
    setFormTeacher(null);
    setFormClass(null);
    setFormStartDate('');
    setFormDuration('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSession) return;
    setCbtSessions((prev: CBTSession[]) => prev.map(s =>
      s.id === editSession.id
        ? {
            ...s,
            title: formTitle,
            teacher: s.teacher ? {
              ...s.teacher,
              user: s.teacher.user ? {
                ...s.teacher.user,
                name: formTeacher?.value || s.teacher.user.name
              } : undefined
            } : undefined,
            class: s.class ? {
              ...s.class,
              name: formClass?.value || s.class.name
            } : undefined,
            start_time: formStartDate ? new Date(formStartDate).toISOString() : s.start_time,
            duration_minutes: Number(formDuration) || s.duration_minutes,
            updated_at: new Date().toISOString()
          }
        : s
    ));
    closeEditModal();
  };

  const openViewModal = (session: CBTSession) => {
    setViewSession(session);
  };

  const closeViewModal = () => {
    setViewSession(null);
  };

  const openDeleteModal = (session: CBTSession) => {
    setDeleteSession(session);
  };

  const handleDeleteSession = () => {
    if (!deleteSession) return;
    setCbtSessions((prev: CBTSession[]) => prev.filter(s => s.id !== deleteSession.id));
    setDeleteSession(null);
  };

  const columns = [
    { 
      key: 'title', 
      header: 'CBT Session',
      render: (session: any) => (
        <div>
          <p className="font-medium">{session.title}</p>
          <p className="text-sm text-gray-500">{session.teacher?.user?.name || 'N/A'} • {session.class?.name || 'N/A'}</p>
        </div>
      )
    },
    { 
      key: 'duration', 
      header: 'Duration',
      render: (session: any) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{session.duration_minutes} min</span>
        </div>
      )
    },
    { 
      key: 'questions', 
      header: 'Questions',
      render: (session: any) => (
        <span>{session.total_questions}</span>
      )
    },
    { 
      key: 'participants', 
      header: 'Participants',
      render: (session: any) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-400" />
          <span>{session.attempts?.length || 0}/{session.class?.max_students || 0}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (session: any) => {
        const now = new Date();
        const startTime = new Date(session.start_time);
        const endTime = new Date(session.end_time);
        
        let status = 'scheduled';
        let variant: 'success' | 'secondary' | 'warning' | 'danger' = 'warning';
        
        if (!session.is_active) {
          status = 'inactive';
          variant = 'secondary';
        } else if (now > endTime) {
          status = 'completed';
          variant = 'secondary';
        } else if (now >= startTime && now <= endTime) {
          status = 'ongoing';
          variant = 'success';
        } else if (now < startTime) {
          status = 'scheduled';
          variant = 'warning';
        }
        
        return (
          <Badge variant={variant}>
            {status}
          </Badge>
        );
      }
    },
    { 
      key: 'start_time', 
      header: 'Schedule',
      render: (session: any) => (
        <div className="text-sm">
          <p>{new Date(session.start_time).toLocaleDateString()}</p>
          <p className="text-gray-500">{new Date(session.start_time).toLocaleTimeString()}</p>
        </div>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (session: any) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" title="Lihat" onClick={() => openViewModal(session)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Edit" onClick={() => openEditModal(session)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Hapus" onClick={() => openDeleteModal(session)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">CBT Management</h1>
          <p className="text-gray-600 mt-2">Monitor semua ujian online di sekolah</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule CBT
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <FileText className="h-8 w-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Total CBT</h3>
          <p className="text-2xl font-bold text-primary-700">24</p>
        </Card>
        
        <Card className="text-center">
          <Clock className="h-8 w-8 text-success-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Active Tests</h3>
          <p className="text-2xl font-bold text-success-700">3</p>
        </Card>
        
        <Card className="text-center">
          <Users className="h-8 w-8 text-accent-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Total Participants</h3>
          <p className="text-2xl font-bold text-accent-700">847</p>
        </Card>
        
        <Card className="text-center">
          <FileText className="h-8 w-8 text-warning-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Completion Rate</h3>
          <p className="text-2xl font-bold text-warning-700">94%</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'scheduled' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('scheduled')}
            >
              Scheduled
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </Button>
          </div>
        </div>

        <Table 
          columns={columns} 
          data={filteredSessions}
        />
      </Card>

      <Modal
        isOpen={!!deleteSession}
        onClose={() => setDeleteSession(null)}
        title="Delete CBT Session"
        size="sm"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete <span className="font-semibold">{deleteSession?.title}</span>?</p>
          <div className="flex gap-3 pt-4">
            <Button variant="danger" onClick={handleDeleteSession}>Delete</Button>
            <Button variant="outline" onClick={() => setDeleteSession(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>


      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule New CBT"
        size="lg"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter test title"
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
              <Select
                options={teacherOptions}
                value={formTeacher}
                onChange={setFormTeacher}
                isSearchable
                placeholder="Pilih atau cari guru..."
                classNamePrefix="react-select"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <Select
                options={classOptions}
                value={formClass}
                onChange={setFormClass}
                isSearchable
                placeholder="Pilih atau cari kelas..."
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={formStartDate}
                onChange={e => setFormStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="90"
                value={formDuration}
                onChange={e => setFormDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Schedule CBT</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editSession}
        onClose={closeEditModal}
        title="Edit CBT Session"
        size="lg"
      >
        <form className="space-y-4" onSubmit={handleEditSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter test title"
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
              <Select
                options={teacherOptions}
                value={formTeacher}
                onChange={setFormTeacher}
                isSearchable
                placeholder="Pilih atau cari guru..."
                classNamePrefix="react-select"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <Select
                options={classOptions}
                value={formClass}
                onChange={setFormClass}
                isSearchable
                placeholder="Pilih atau cari kelas..."
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={formStartDate}
                onChange={e => setFormStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="90"
                value={formDuration}
                onChange={e => setFormDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Update CBT</Button>
            <Button variant="outline" onClick={closeEditModal}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={!!viewSession}
        onClose={closeViewModal}
        title="CBT Session Details"
        size="md"
      >
        {viewSession && (
          <div className="space-y-6 p-2">
            <div className="flex items-center gap-3 border-b pb-4 mb-4">
              <FileText className="h-8 w-8 text-primary-600" />
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-1">{viewSession.title}</h2>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span><span className="font-semibold">Teacher:</span> {viewSession.teacher?.user?.name || 'N/A'}</span>
                  <span>•</span>
                  <span><span className="font-semibold">Class:</span> {viewSession.class?.name || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-500" />
                <span><span className="font-semibold">Start:</span> {new Date(viewSession.start_time).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-500" />
                <span><span className="font-semibold">End:</span> {new Date(viewSession.end_time).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Duration:</span>
                <span>{viewSession.duration_minutes} min</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Questions:</span>
                <span>{viewSession.questions?.length || viewSession.total_questions}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent-500" />
                <span className="font-semibold">Participants:</span>
                <span>{viewSession.attempts?.length || 0}/{viewSession.class?.students?.length || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <Badge variant={viewSession.is_active ? 'success' : 'secondary'}>
                  {viewSession.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SchoolCBT;