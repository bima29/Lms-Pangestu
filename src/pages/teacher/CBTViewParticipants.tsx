import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Trophy, User, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

// Dummy data
const participants = [
  { id: '1', name: 'Andi Pratama', score: 85 },
  { id: '2', name: 'Sari Wulandari', score: 90 },
  { id: '3', name: 'Rudi Hartono', score: 78 },
  { id: '4', name: 'Budi Santoso', score: 95 },
  { id: '5', name: 'Dewi Lestari', score: 60 },
  { id: '6', name: 'Tono Saputra', score: 88 },
];

const maxScore = Math.max(...participants.map(p => p.score));
const minScore = Math.min(...participants.map(p => p.score));
const avgScore = (participants.reduce((acc, p) => acc + p.score, 0) / participants.length).toFixed(2);
const maxScorer = participants.find(p => p.score === maxScore);
const minScorer = participants.find(p => p.score === minScore);

const handleExportExcel = () => {
  // Dummy export logic
  alert('Export to Excel!');
};

// Dummy CBT sessions (should be imported/shared from TeacherCBT)
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
    endDate: '2025-01-15',
    instructions: 'Kerjakan soal dengan teliti dan jujur.'
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
    endDate: '2025-01-10',
    instructions: 'Quiz singkat tentang integral.'
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
    endDate: '2025-01-20',
    instructions: 'Latihan soal trigonometri untuk persiapan ujian.'
  }
];

const CBTViewParticipants: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get id from query string, e.g. /teacher/CBTViewParticipants?id=1
  const params = new URLSearchParams(location.search);
  const cbtId = params.get('id') || '1';
  const cbtDetail = cbtSessions.find(s => s.id === cbtId) || cbtSessions[0];

  // Modal state & logic
  const [showAnswerModal, setShowAnswerModal] = React.useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = React.useState(false);
  const [selectedParticipant] = React.useState<any>(null);
  const [manualScore, setManualScore] = React.useState<number | ''>('');



  function handleSaveCorrection() {
    // Dummy update logic
    if (selectedParticipant) {
      selectedParticipant.score = Number(manualScore);
      setShowCorrectionModal(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.location.href = '/teacher/cbt'}>
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary-900">CBT Participants & Scores</h1>
            <p className="text-gray-600 mt-2">Detail peserta ujian, nilai, dan statistik</p>
          </div>
        </div>
        <Button onClick={handleExportExcel}>
          <Download className="h-4 w-4 mr-2" />
          Export Excel
        </Button>
      </div>

      {/* CBT Detail Section */}
      <Card className="mb-4 shadow-lg rounded-xl p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary-900 mb-2">{cbtDetail.title}</h2>
            <div className="flex flex-wrap gap-3">
              <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">Class: {cbtDetail.class}</span>
              <span className="bg-accent-50 text-accent-700 px-3 py-1 rounded-full text-sm font-semibold">Duration: {cbtDetail.duration} min</span>
              <span className="bg-success-50 text-success-700 px-3 py-1 rounded-full text-sm font-semibold">Questions: {cbtDetail.questions}</span>
              <span className="bg-warning-50 text-warning-700 px-3 py-1 rounded-full text-sm font-semibold">Participants: {cbtDetail.participants}/{cbtDetail.totalStudents}</span>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <span className="text-gray-700">Status:</span>
              <Badge variant={cbtDetail.status === 'active' ? 'success' : cbtDetail.status === 'completed' ? 'secondary' : 'warning'}>{cbtDetail.status}</Badge>
            </div>
            <div className="mt-2 text-gray-700">
              <span className="font-semibold">Date:</span> {cbtDetail.startDate} - {cbtDetail.endDate}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-primary-900 mb-2">Instructions</h3>
            <p className="text-gray-700 text-sm">{cbtDetail.instructions}</p>
          </div>
        </div>
      </Card>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <Card className="text-center">
          <FileText className="h-8 w-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Total Participants</h3>
          <p className="text-2xl font-bold text-primary-700">{participants.length}</p>
        </Card>
        <Card className="text-center">
          <Trophy className="h-8 w-8 text-success-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Max Score</h3>
          <p className="text-2xl font-bold text-success-700">{maxScore}</p>
          <p className="text-sm text-success-600">{maxScorer?.name}</p>
        </Card>
        <Card className="text-center">
          <Trophy className="h-8 w-8 text-red-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Min Score</h3>
          <p className="text-2xl font-bold text-red-700">{minScore}</p>
          <p className="text-sm text-red-600">{minScorer?.name}</p>
        </Card>
        <Card className="text-center">
          <User className="h-8 w-8 text-accent-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Average Score</h3>
          <p className="text-2xl font-bold text-accent-700">{avgScore}</p>
        </Card>
      </div>

      <Card className="shadow-lg rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Participants List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-primary-700 uppercase">#</th>
                <th className="px-4 py-2 text-left font-semibold text-primary-700 uppercase">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-primary-700 uppercase">Score</th>
                <th className="px-4 py-2 text-left font-semibold text-primary-700 uppercase">Grade</th>
                <th className="px-4 py-2 text-left font-semibold text-primary-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {participants.map((p, idx) => {
                let grade = 'E';
                if (p.score >= 85) grade = 'A';
                else if (p.score >= 75) grade = 'B';
                else if (p.score >= 65) grade = 'C';
                else if (p.score >= 55) grade = 'D';
                // else E
                return (
                  <tr key={p.id} className="hover:bg-primary-50 transition-colors">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-2 font-bold text-primary-700">{p.score}</td>
                    <td className="px-4 py-2">
                      <Badge variant={
                        grade === 'A' ? 'success' :
                        grade === 'B' ? 'primary' :
                        grade === 'C' ? 'secondary' :
                        grade === 'D' ? 'warning' : 'error'
                      }>
                        {grade}
                      </Badge>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/teacher/view-student-answers?cbtId=${cbtId}&studentId=${p.id}`)}>
                          Lihat Jawaban
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => navigate(`/teacher/manual-correction?cbtId=${cbtId}&studentId=${p.id}`)}>
                          Koreksi Manual
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Modal Lihat Jawaban */}
        <Modal
          isOpen={showAnswerModal}
          onClose={() => setShowAnswerModal(false)}
          title={`Jawaban ${selectedParticipant?.name || ''}`}
          size="md"
        >
          <div>
            <h4 className="font-semibold mb-2">Jawaban Siswa</h4>
            <ul className="list-decimal ml-5 mb-4">
              <li>Contoh jawaban 1</li>
              <li>Contoh jawaban 2</li>
              <li>Contoh jawaban 3</li>
            </ul>
            <Button variant="outline" onClick={() => setShowAnswerModal(false)}>Tutup</Button>
          </div>
        </Modal>
        {/* Modal Koreksi Manual */}
        <Modal
          isOpen={showCorrectionModal}
          onClose={() => setShowCorrectionModal(false)}
          title={`Koreksi Manual - ${selectedParticipant?.name || ''}`}
          size="sm"
        >
          <form onSubmit={e => { e.preventDefault(); handleSaveCorrection(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nilai Baru</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={manualScore}
                onChange={e => setManualScore(e.target.value === '' ? '' : Number(e.target.value))}
                min={0}
                max={100}
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary">Simpan</Button>
              <Button variant="outline" onClick={() => setShowCorrectionModal(false)}>Batal</Button>
            </div>
          </form>
        </Modal>
      </Card>
    </div>
  );
};


export default CBTViewParticipants;
