import React, { useState } from 'react';
import { CheckCircle, Flag, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Timer from '../../components/ui/Timer';
import Modal from '../../components/ui/Modal';
import { mockCBTQuestions } from '../../data/mockData';

// Dummy list of available tests
const availableTests = [
  {
    id: 'math-uts',
    title: 'Ujian Tengah Semester - Matematika',
    class: 'XII IPA 1',
    duration: 60,
    questions: mockCBTQuestions.length,
    description: 'Ujian Matematika untuk kelas XII IPA 1',
  },
  {
    id: 'quiz-integral',
    title: 'Quiz Integral',
    class: 'XII IPA 1',
    duration: 30,
    questions: 10,
    description: 'Quiz singkat tentang integral',
  },
];

type TestType = {
  id: string;
  title: string;
  class: string;
  duration: number;
  questions: number;
  description: string;
};

const StudentCBT: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Step 1: List available tests
  if (!selectedTest) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary-900 mb-4">Daftar Ujian CBT</h1>
        {availableTests.map(test => (
          <Card key={test.id} className="mb-4">
            <div className="flex items-center gap-4">
              <FileText className="h-10 w-10 text-primary-600" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary-900">{test.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{test.description}</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>Kelas: {test.class}</span>
                  <span>Durasi: {test.duration} menit</span>
                  <span>Soal: {test.questions}</span>
                </div>
              </div>
              <Button onClick={() => setSelectedTest(test)} variant="primary">Pilih & Mulai</Button>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Step 2: Confirm start
  if (!started) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-2">{selectedTest.title}</h2>
          <p className="text-gray-600 mb-4">{selectedTest.description}</p>
          <div className="flex justify-center gap-6 mb-6 text-sm text-gray-500">
            <span>Kelas: {selectedTest.class}</span>
            <span>Durasi: {selectedTest.duration} menit</span>
            <span>Soal: {selectedTest.questions}</span>
          </div>
          <Button variant="primary" onClick={() => setStarted(true)} className="px-6">Konfirmasi & Mulai Test</Button>
          <Button variant="outline" onClick={() => setSelectedTest(null)} className="ml-3 px-6">Kembali</Button>
        </Card>
      </div>
    );
  }

  // Step 3: Test in progress (gunakan test yang dipilih)
  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const toggleFlag = (questionIndex: number) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex);
      } else {
        newSet.add(questionIndex);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitModal(false);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      if (mockCBTQuestions[parseInt(questionIndex)]?.correctAnswer === answerIndex) {
        correct++;
      }
    });
    return (correct / mockCBTQuestions.length) * 100;
  };

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-success-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Ujian Selesai!</h1>
            <p className="text-gray-600">Terima kasih telah mengikuti ujian</p>
          </div>
          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-primary-900 mb-2">Hasil Ujian</h2>
            <div className="text-4xl font-bold text-primary-700 mb-2">{score.toFixed(1)}%</div>
            <p className="text-gray-600">
              {Object.keys(answers).length} dari {mockCBTQuestions.length} soal dijawab
            </p>
          </div>
          <Button onClick={() => window.location.reload()} className="w-full">
            Kembali ke Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">{selectedTest.title}</h1>
          <p className="text-gray-600 mt-2">Kelas {selectedTest.class}  {selectedTest.questions} Soal</p>
        </div>
        <div className="flex items-center gap-4">
          <Timer 
            initialMinutes={selectedTest.duration}
            onTimeUp={() => setShowSubmitModal(true)}
          />
          <Button 
            variant="danger" 
            onClick={() => setShowSubmitModal(true)}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary-900">
                  Soal {currentQuestion + 1} dari {mockCBTQuestions.length}
                </h3>
                <Button
                  variant={flaggedQuestions.has(currentQuestion) ? 'danger' : 'outline'}
                  size="sm"
                  onClick={() => toggleFlag(currentQuestion)}
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-900 leading-relaxed">
                  {mockCBTQuestions[currentQuestion]?.question}
                </p>
              </div>
              <div className="space-y-3">
                {mockCBTQuestions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      answers[currentQuestion] === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-900">{String.fromCharCode(65 + index)}. {option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {mockCBTQuestions.length}
              </span>
              <Button
                onClick={() => setCurrentQuestion(Math.min(mockCBTQuestions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === mockCBTQuestions.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Navigasi Soal</h3>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {mockCBTQuestions.map((_, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                    index === currentQuestion
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : answers[index] !== undefined
                      ? 'border-success-500 bg-success-50 text-success-700'
                      : flaggedQuestions.has(index)
                      ? 'border-warning-500 bg-warning-50 text-warning-700'
                      : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                  {flaggedQuestions.has(index) && (
                    <Flag className="h-3 w-3 absolute -top-1 -right-1 text-warning-600" />
                  )}
                </button>
              ))}
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-success-500 rounded"></div>
                <span>Sudah dijawab ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-warning-500 rounded"></div>
                <span>Ditandai ({flaggedQuestions.size})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span>Belum dijawab ({mockCBTQuestions.length - Object.keys(answers).length})</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Konfirmasi Submit"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengumpulkan jawaban? 
            Anda telah menjawab {Object.keys(answers).length} dari {mockCBTQuestions.length} soal.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowSubmitModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentCBT;