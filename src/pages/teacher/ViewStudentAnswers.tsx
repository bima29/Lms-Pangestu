import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Download } from 'lucide-react';

// Dummy data for demonstration
const dummyQuestions = [
  {
    id: 'q1',
    content: 'Apa hasil dari 2 + 2?',
    correctAnswer: '4',
    studentAnswer: '4',
    isCorrect: true,
  },
  {
    id: 'q2',
    content: 'Identifikasi gambar berikut',
    correctAnswer: 'Gambar persegi',
    studentAnswer: 'Gambar lingkaran',
    isCorrect: false,
  },
  {
    id: 'q3',
    content: 'Manakah hasil dari 3 x 3?',
    correctAnswer: '9',
    studentAnswer: '9',
    isCorrect: true,
  },
];

const dummyParticipant = {
  id: '1',
  name: 'Andi Pratama',
};

const dummyCBT = {
  id: '1',
  title: 'Ujian Tengah Semester - Matematika',
  class: 'XII IPA 1',
};

const ViewStudentAnswers: React.FC = () => {
  const navigate = useNavigate();
  // In real app, get params from router and fetch data
  const [questions] = React.useState(dummyQuestions);

  // Dummy export logic
  const handleExportExcel = () => {
    // In real app, use library like SheetJS/xlsx
    alert('Export to Excel!');
  };

  return (
  <div className="max-w-7xl mx-auto space-y-6 p-2 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <Button variant="outline" onClick={() => navigate(-1)}>Kembali</Button>
          <h1 className="text-2xl font-bold text-primary-900">Lihat Jawaban Siswa</h1>
        </div>
        <Button onClick={handleExportExcel}>
          <Download className="h-4 w-4 mr-2" />
          Export Excel
        </Button>
      </div>
  <Card className="mb-4 p-4 shadow-lg rounded-xl bg-white">
        <div className="mb-2">
          <span className="font-semibold">Nama Siswa:</span> {dummyParticipant.name}
        </div>
        <div>
          <span className="font-semibold">CBT:</span> {dummyCBT.title} ({dummyCBT.class})
        </div>
      </Card>
      <Card className="p-4 shadow-lg rounded-xl bg-white">
        <h3 className="text-lg font-semibold mb-4">Detail Jawaban</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left">No</th>
                <th className="px-2 sm:px-4 py-2 text-left">Soal</th>
                <th className="px-2 sm:px-4 py-2 text-left">Jawaban Siswa</th>
                <th className="px-2 sm:px-4 py-2 text-left">Kunci Jawaban</th>
                <th className="px-2 sm:px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {questions.map((q, idx) => (
                <tr key={q.id} className="hover:bg-primary-50 transition-all">
                  <td className="px-2 sm:px-4 py-2 font-semibold">{idx + 1}</td>
                  <td className="px-2 sm:px-4 py-2 max-w-xs truncate">{q.content}</td>
                  <td className="px-2 sm:px-4 py-2">{q.studentAnswer}</td>
                  <td className="px-2 sm:px-4 py-2">{q.correctAnswer}</td>
                  <td className="px-2 sm:px-4 py-2">
                    <Badge variant={q.isCorrect ? 'success' : 'error'}>{q.isCorrect ? 'Benar' : 'Salah'}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ViewStudentAnswers;
