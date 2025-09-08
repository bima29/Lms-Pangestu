import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

import { mockCBTQuestions } from '../../data/mockData';

// Dummy student answers for demonstration
const dummyStudentAnswers: Record<string, number> = {
  '1': 2, // Soal 1, jawaban index 2
  '2': 0, // Soal 2, jawaban index 0
  '3': 1, // Soal 3, jawaban index 1
  '4': 0,
  '5': 1,
  '6': 1,
  '7': 2,
  '8': 0,
  '9': 1,
  '10': 1,
  '11': 0,
  '12': 0,
  '13': 0,
  '14': 1,
  '15': 1
};

const dummyParticipant = {
  id: '1',
  name: 'Andi Pratama',
};

const dummyCBT = {
  id: '1',
  title: 'Ujian Tengah Semester - Matematika',
  class: 'XII IPA 1',
};

const ManualCorrection: React.FC = () => {
  const navigate = useNavigate();
  // Compose questions with student answer and isCorrect
  const initialQuestions = mockCBTQuestions.map(q => {
    const studentAnswerIdx = dummyStudentAnswers[q.id];
    const studentAnswer = typeof studentAnswerIdx === 'number' ? q.options[studentAnswerIdx] : '-';
    const correctAnswer = q.options[q.correctAnswer];
    const isCorrect = studentAnswerIdx === q.correctAnswer;
    return {
      ...q,
      content: q.question,
      studentAnswer,
      correctAnswer,
      isCorrect
    };
  });
  const [questions, setQuestions] = React.useState(initialQuestions);

  // Koreksi manual: toggle benar/salah
  const handleToggleCorrect = (idx: number) => {
    setQuestions(qs =>
      qs.map((q, i) =>
        i === idx ? { ...q, isCorrect: !q.isCorrect } : q
      )
    );
  };

  return (
  <div className="max-w-7xl mx-auto space-y-6 p-2 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <Button variant="outline" onClick={() => navigate(-1)}>Kembali</Button>
          <h1 className="text-2xl font-bold text-primary-900">Koreksi Manual Jawaban Siswa</h1>
        </div>
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
        <h3 className="text-lg font-semibold mb-4">Detail Jawaban & Koreksi</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left">No</th>
                <th className="px-2 sm:px-4 py-2 text-left">Soal</th>
                <th className="px-2 sm:px-4 py-2 text-left">Jawaban Siswa</th>
                <th className="px-2 sm:px-4 py-2 text-left">Kunci Jawaban</th>
                <th className="px-2 sm:px-4 py-2 text-left">Status</th>
                <th className="px-2 sm:px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {questions.map((q, idx) => {
                const studentAnswerIdx = dummyStudentAnswers[q.id];
                const correctAnswerIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : Number(q.correctAnswer);
                const studentAnswer = typeof studentAnswerIdx === 'number' ? q.options[studentAnswerIdx] : '-';
                const correctAnswer = typeof correctAnswerIdx === 'number' ? q.options[correctAnswerIdx] : '-';
                const isCorrect = studentAnswerIdx === correctAnswerIdx;
                return (
                  <tr key={q.id} className="hover:bg-primary-50 transition-all">
                    <td className="px-2 sm:px-4 py-2 font-semibold">{idx + 1}</td>
                    <td className="px-2 sm:px-4 py-2 max-w-xs truncate">{q.question}</td>
                    <td className="px-2 sm:px-4 py-2">{studentAnswer}</td>
                    <td className="px-2 sm:px-4 py-2">{correctAnswer}</td>
                    <td className="px-2 sm:px-4 py-2">
                      <Badge variant={isCorrect ? 'success' : 'error'}>{isCorrect ? 'Benar' : 'Salah'}</Badge>
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <Button variant="secondary" size="sm" onClick={() => handleToggleCorrect(idx)}>
                        {isCorrect ? 'Tandai Salah' : 'Tandai Benar'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ManualCorrection;
