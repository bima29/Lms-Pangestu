import React, { useState } from 'react';
import { FileText, Plus, Eye, Edit, Trash2, Clock, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Table from '../../components/ui/Table';

const TeacherCBT: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('XII IPA 1');

  const cbtSessions = [
    {
      id: '1',
      title: 'Ujian Tengah Semester - Matematika',
      class: 'XII IPA 1',
      duration: 90,
      questions: 25,
      status: 'active',
      participants: 28,
      totalStudents: 32,
      startDate: '2025-01-15',
      endDate: '2025-01-15'
    },
    {
      id: '2',
      title: 'Quiz Integral',
      class: 'XII IPA 1',
      duration: 30,
      questions: 10,
      status: 'completed',
      participants: 32,
      totalStudents: 32,
      startDate: '2025-01-10',
      endDate: '2025-01-10'
    },
    {
      id: '3',
      title: 'Latihan Soal Trigonometri',
      class: 'XI IPA 2',
      duration: 45,
      questions: 15,
      status: 'scheduled',
      participants: 0,
      totalStudents: 30,
      startDate: '2025-01-20',
      endDate: '2025-01-20'
    }
  ];

  const classes = ['XII IPA 1', 'XI IPA 2', 'X MIPA 1'];

  // Pagination state (persistent)
  const getInitialPage = () => {
    const saved = window.localStorage.getItem('teacherCBTPage');
    return saved ? parseInt(saved) : 1;
  };
  const getInitialShow = () => {
    const saved = window.localStorage.getItem('teacherCBTShow');
    return saved ? parseInt(saved) : 10;
  };

  const [page, setPage] = useState<number>(getInitialPage());
  const [show, setShow] = useState<number>(getInitialShow());
  React.useEffect(() => {
    window.localStorage.setItem('teacherCBTPage', page.toString());
  }, [page]);
  React.useEffect(() => {
    window.localStorage.setItem('teacherCBTShow', show.toString());
  }, [show]);

  const filteredSessions = cbtSessions.filter(session => session.class === selectedClass);
  const totalPages = Math.ceil(filteredSessions.length / show);
  const paginatedSessions = filteredSessions.slice((page - 1) * show, page * show);

  const columns = [
    {
      key: 'title',
      header: 'Test Title',
      render: (session: any) => (
        <div>
          <p className="font-medium text-gray-900">{session.title}</p>
          <p className="text-sm text-gray-500">{session.questions} questions • {session.duration} minutes</p>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (session: any) => (
        <Badge
          variant={
            session.status === 'active' ? 'success'
            : session.status === 'completed' ? 'secondary'
            : 'warning'
          }
        >
          {session.status}
        </Badge>
      )
    },
    {
      key: 'participants',
      header: 'Participants',
      render: (session: any) => (
        <span>{session.participants}/{session.totalStudents}</span>
      )
    },
    {
      key: 'startDate',
      header: 'Date',
      render: (session: any) => (
        <span>{session.startDate}</span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (session: any) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => window.location.href = `/teacher/CBTViewParticipants?id=${session.id}`}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => window.location.href = `/teacher/manage-questions/${session.id}`}> 
            Kelola Soal
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
          <p className="text-gray-600 mt-2">Buat dan kelola ujian online untuk siswa</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create CBT
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="text-center">
          <FileText className="h-8 w-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Total CBT</h3>
          <p className="text-2xl font-bold text-primary-700">12</p>
        </Card>
        <Card className="text-center">
          <Clock className="h-8 w-8 text-success-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Active Tests</h3>
          <p className="text-2xl font-bold text-success-700">3</p>
        </Card>
        <Card className="text-center">
          <Users className="h-8 w-8 text-accent-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Participants</h3>
          <p className="text-2xl font-bold text-accent-700">156</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-sm">Show</span>
            <select value={show} onChange={e => { setShow(Number(e.target.value)); setPage(1); }} className="border rounded px-2 py-1 focus:ring-primary-500 focus:border-primary-500">
              {[10, 50, 100].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="text-sm">per page</span>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-2 py-1"
            >
              Previous
            </Button>
            <span className="text-sm">Page</span>
            <select value={page} onChange={e => setPage(Number(e.target.value))} className="border rounded px-2 py-1 focus:ring-primary-500 focus:border-primary-500">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <span className="text-sm">of {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-2 py-1"
            >
              Next
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table 
            columns={columns} 
            data={paginatedSessions}
          />
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New CBT"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter test title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="90"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="25"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter test instructions for students"
            ></textarea>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Create CBT</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default TeacherCBT;