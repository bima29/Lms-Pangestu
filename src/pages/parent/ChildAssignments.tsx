import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Calendar, Clock, CheckCircle, AlertCircle, User, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  teacher: string;
  description: string;
  due_date: string;
  assigned_date: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  score?: number;
  max_score?: number;
  submission_date?: string;
  feedback?: string;
}

interface Child {
  id: number;
  name: string;
  class: string;
  student_id: string;
}

export default function ChildAssignments() {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data
  const [children] = useState<Child[]>([
    { id: 1, name: 'Ahmad Rizki Pratama', class: 'XII IPA 1', student_id: '2024001' },
    { id: 2, name: 'Siti Nurhaliza Pratama', class: 'X MIPA 2', student_id: '2024002' }
  ]);

  const [assignments] = useState<Record<number, Assignment[]>>({
    1: [
      {
        id: 1,
        title: 'Tugas Integral Parsial',
        subject: 'Matematika',
        teacher: 'Dra. Siti Aminah',
        description: 'Kerjakan soal integral parsial nomor 1-10 di buku paket halaman 125',
        due_date: '2024-01-25T23:59:00Z',
        assigned_date: '2024-01-20T08:00:00Z',
        status: 'submitted',
        score: 85,
        max_score: 100,
        submission_date: '2024-01-24T20:30:00Z',
        feedback: 'Pekerjaan sudah baik, perhatikan langkah-langkah penyelesaian'
      },
      {
        id: 2,
        title: 'Laporan Praktikum Hukum Newton',
        subject: 'Fisika',
        teacher: 'Ahmad Fauzi, S.Pd',
        description: 'Buat laporan praktikum tentang hukum Newton berdasarkan percobaan yang telah dilakukan',
        due_date: '2024-01-26T23:59:00Z',
        assigned_date: '2024-01-22T10:00:00Z',
        status: 'pending'
      },
      {
        id: 3,
        title: 'Essay Reaksi Redoks',
        subject: 'Kimia',
        teacher: 'Dr. Budi Santoso',
        description: 'Tulis essay tentang aplikasi reaksi redoks dalam kehidupan sehari-hari',
        due_date: '2024-01-24T23:59:00Z',
        assigned_date: '2024-01-19T09:00:00Z',
        status: 'overdue'
      },
      {
        id: 4,
        title: 'Presentasi Sistem Pencernaan',
        subject: 'Biologi',
        teacher: 'Dra. Rina Sari',
        description: 'Buat presentasi PowerPoint tentang sistem pencernaan manusia',
        due_date: '2024-01-28T23:59:00Z',
        assigned_date: '2024-01-23T11:00:00Z',
        status: 'pending'
      }
    ],
    2: [
      {
        id: 5,
        title: 'Tugas Aljabar Linear',
        subject: 'Matematika',
        teacher: 'Dra. Siti Aminah',
        description: 'Selesaikan soal-soal aljabar linear di buku latihan',
        due_date: '2024-01-27T23:59:00Z',
        assigned_date: '2024-01-21T08:00:00Z',
        status: 'submitted',
        score: 92,
        max_score: 100,
        submission_date: '2024-01-26T19:45:00Z'
      }
    ]
  });

  const statusConfig = {
    pending: { label: 'Belum Dikerjakan', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    submitted: { label: 'Sudah Dikumpul', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    graded: { label: 'Sudah Dinilai', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    overdue: { label: 'Terlambat', color: 'bg-red-100 text-red-800', icon: AlertCircle }
  };

  const selectedChildData = children.find(child => child.id === selectedChild);
  const childAssignments = assignments[selectedChild] || [];
  
  const filteredAssignments = filterStatus === 'all' 
    ? childAssignments 
    : childAssignments.filter(assignment => assignment.status === filterStatus);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilDue = (dueDateString: string) => {
    const dueDate = new Date(dueDateString);
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetail = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailModal(true);
  };

  // Calculate statistics
  const totalAssignments = childAssignments.length;
  const submittedCount = childAssignments.filter(a => a.status === 'submitted' || a.status === 'graded').length;
  const pendingCount = childAssignments.filter(a => a.status === 'pending').length;
  const overdueCount = childAssignments.filter(a => a.status === 'overdue').length;
  const averageScore = childAssignments
    .filter(a => a.score !== undefined)
    .reduce((sum, a) => sum + (a.score || 0), 0) / childAssignments.filter(a => a.score !== undefined).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tugas & Ujian Anak</h1>
      </div>

      {/* Child Selector & Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Pilih Anak</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(parseInt(e.target.value))}
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg"
            >
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name} - {child.class}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">Filter Status</label>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Belum Dikerjakan</option>
                  <option value="submitted">Sudah Dikumpul</option>
                  <option value="graded">Sudah Dinilai</option>
                  <option value="overdue">Terlambat</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Selected Child Info */}
      {selectedChildData && (
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedChildData.name}</h3>
              <p className="text-sm text-gray-600">
                NIS: {selectedChildData.student_id} • Kelas: {selectedChildData.class}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{totalAssignments}</p>
            <p className="text-sm text-gray-600">Total Tugas</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{submittedCount}</p>
            <p className="text-sm text-gray-600">Dikumpul</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            <p className="text-sm text-gray-600">Terlambat</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{averageScore.toFixed(0)}</p>
            <p className="text-sm text-gray-600">Rata-rata Nilai</p>
          </div>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Daftar Tugas</h3>
          <span className="text-sm text-gray-500">
            {filteredAssignments.length} dari {totalAssignments} tugas
          </span>
        </div>

        <div className="space-y-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => {
              const StatusIcon = statusConfig[assignment.status].icon;
              const daysUntilDue = getDaysUntilDue(assignment.due_date);
              
              return (
                <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-primary-600" />
                        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                        <div className="flex items-center gap-1">
                          <StatusIcon className="h-4 w-4" />
                          <span className={`px-2 py-1 text-xs rounded-full ${statusConfig[assignment.status].color}`}>
                            {statusConfig[assignment.status].label}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Mata Pelajaran:</span>
                          <p className="font-medium">{assignment.subject}</p>
                          <p className="text-gray-600">{assignment.teacher}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Deadline:</span>
                          <p className="font-medium">{formatDate(assignment.due_date)}</p>
                          {assignment.status === 'pending' && (
                            <p className={`text-xs ${daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {daysUntilDue < 0 ? `Terlambat ${Math.abs(daysUntilDue)} hari` :
                               daysUntilDue === 0 ? 'Deadline hari ini' :
                               `${daysUntilDue} hari lagi`}
                            </p>
                          )}
                        </div>
                        <div>
                          {assignment.score !== undefined && (
                            <>
                              <span className="text-gray-600">Nilai:</span>
                              <p className="font-medium text-primary-600">
                                {assignment.score}/{assignment.max_score}
                              </p>
                            </>
                          )}
                          {assignment.submission_date && (
                            <>
                              <span className="text-gray-600">Dikumpul:</span>
                              <p className="text-xs text-gray-600">
                                {formatDate(assignment.submission_date)}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleViewDetail(assignment)}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada tugas untuk filter yang dipilih</p>
            </div>
          )}
        </div>
      </Card>

      {/* Assignment Detail Modal */}
      {showDetailModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Detail Tugas</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">{selectedAssignment.title}</h3>
                <p className="text-sm text-gray-600">{selectedAssignment.subject} • {selectedAssignment.teacher}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Tugas</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedAssignment.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Diberikan</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedAssignment.assigned_date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deadline</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedAssignment.due_date)}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusConfig[selectedAssignment.status].color}`}>
                    {statusConfig[selectedAssignment.status].label}
                  </span>
                </div>
              </div>
              
              {selectedAssignment.submission_date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Pengumpulan</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedAssignment.submission_date)}</p>
                </div>
              )}
              
              {selectedAssignment.score !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nilai</label>
                  <p className="text-lg font-semibold text-primary-600">
                    {selectedAssignment.score}/{selectedAssignment.max_score}
                  </p>
                </div>
              )}
              
              {selectedAssignment.feedback && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Guru</label>
                  <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-lg">
                    {selectedAssignment.feedback}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
