import React, { useState } from 'react';
import Select from 'react-select';
import { FileText, Plus, Eye, Users, Clock, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';

const SchoolCBT: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSession, setEditSession] = useState<any | null>(null);
  const [viewSession, setViewSession] = useState<any | null>(null);
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

  const [cbtSessions, setCbtSessions] = useState([
    {
      id: '1',
      title: 'Ujian Tengah Semester - Matematika',
      teacher: 'Budi Santoso',
      class: 'XII IPA 1',
      duration: 90,
      questions: 25,
      status: 'active',
      participants: 28,
      totalStudents: 32,
      startDate: '2025-01-15 08:00',
      endDate: '2025-01-15 09:30'
    },
    {
      id: '2',
      title: 'Quiz Fisika - Gelombang',
      teacher: 'Siti Rahayu',
      class: 'XII IPA 2',
      duration: 45,
      questions: 15,
      status: 'scheduled',
      participants: 0,
      totalStudents: 30,
      startDate: '2025-01-16 10:00',
      endDate: '2025-01-16 10:45'
    },
    {
      id: '3',
      title: 'Evaluasi Kimia Organik',
      teacher: 'Ahmad Wijaya',
      class: 'XI IPA 1',
      duration: 60,
      questions: 20,
      status: 'completed',
      participants: 29,
      totalStudents: 29,
      startDate: '2025-01-10 13:00',
      endDate: '2025-01-10 14:00'
    }
  ]);
  const [deleteSession, setDeleteSession] = useState<any | null>(null);

  const filteredSessions = filterStatus === 'all' 
    ? cbtSessions 
    : cbtSessions.filter(session => session.status === filterStatus);


  const openEditModal = (session: any) => {
    setEditSession(session);
    setFormTitle(session.title);
    setFormTeacher(teacherOptions.find(opt => opt.value === session.teacher) || null);
    setFormClass(classOptions.find(opt => opt.value === session.class) || null);
    setFormStartDate(session.startDate ? session.startDate.replace(' ', 'T') : '');
    setFormDuration(session.duration ? String(session.duration) : '');
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
    setCbtSessions((prev: any[]) => prev.map(s =>
      s.id === editSession.id
        ? {
            ...s,
            title: formTitle,
            teacher: formTeacher?.value || '',
            class: formClass?.value || '',
            startDate: formStartDate.replace('T', ' '),
            duration: Number(formDuration)
          }
        : s
    ));
    closeEditModal();
  };

  const openViewModal = (session: any) => {
    setViewSession(session);
  };

  const closeViewModal = () => {
    setViewSession(null);
  };

  const openDeleteModal = (session: any) => {
    setDeleteSession(session);
  };

  const handleDeleteSession = () => {
    if (!deleteSession) return;
    setCbtSessions((prev: any[]) => prev.filter(s => s.id !== deleteSession.id));
    setDeleteSession(null);
  };

  const columns = [
    { 
      key: 'title', 
      header: 'Test Title',
      render: (session: any) => (
        <div>
          <p className="font-medium text-gray-900">{session.title}</p>
          <p className="text-sm text-gray-500">{session.teacher} • {session.class}</p>
        </div>
      )
    },
    { 
      key: 'duration', 
      header: 'Duration',
      render: (session: any) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{session.duration} min</span>
        </div>
      )
    },
    { 
      key: 'questions', 
      header: 'Questions',
      render: (session: any) => (
        <span>{session.questions}</span>
      )
    },
    { 
      key: 'participants', 
      header: 'Participants',
      render: (session: any) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-400" />
          <span>{session.participants}/{session.totalStudents}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (session: any) => (
        <Badge 
          variant={
            session.status === 'active' ? 'success' : 
            session.status === 'completed' ? 'secondary' : 'warning'
          }
        >
          {session.status}
        </Badge>
      )
    },
    { 
      key: 'startDate', 
      header: 'Schedule',
      render: (session: any) => (
        <div className="text-sm">
          <p>{session.startDate.split(' ')[0]}</p>
          <p className="text-gray-500">{session.startDate.split(' ')[1]}</p>
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
                  <span><span className="font-semibold">Teacher:</span> {viewSession.teacher}</span>
                  <span>•</span>
                  <span><span className="font-semibold">Class:</span> {viewSession.class}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-500" />
                <span><span className="font-semibold">Start:</span> {viewSession.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-500" />
                <span><span className="font-semibold">End:</span> {viewSession.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Duration:</span>
                <span>{viewSession.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Questions:</span>
                <span>{viewSession.questions}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent-500" />
                <span className="font-semibold">Participants:</span>
                <span>{viewSession.participants}/{viewSession.totalStudents}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <Badge variant={
                  viewSession.status === 'active' ? 'success' : 
                  viewSession.status === 'completed' ? 'secondary' : 'warning'
                }>{viewSession.status}</Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SchoolCBT;