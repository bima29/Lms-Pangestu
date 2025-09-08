import React, { useState, useEffect } from 'react';
import { CheckCircle, Flag, ChevronLeft, ChevronRight, FileText, XCircle, Clock, BookOpen, Users, Calendar, Award } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { mockCBTQuestions } from '../../data/mockData';

const availableTests = [
  {
    id: 'math-uts',
    title: 'Ujian Tengah Semester - Matematika',
    class: 'XII IPA 1',
    duration: 90,
    questions: mockCBTQuestions.length,
    description: 'Ujian Matematika untuk kelas XII IPA 1',
    date: '15 Jan 2025',
  },
  {
    id: 'quiz-integral',
    title: 'Quiz Integral',
    class: 'XII IPA 1',
    duration: 30,
    questions: 10,
    description: 'Quiz singkat tentang integral',
    date: '10 Jan 2025',
  },
];

const cbtResults = [
  {
    id: 'math-uts',
    title: 'Ujian Tengah Semester - Matematika',
    class: 'XII IPA 1',
    date: '2025-01-15',
    score: 85,
    maxScore: 100,
    correct: 17,
    total: 20,
    status: 'completed',
  },
  {
    id: 'quiz-integral',
    title: 'Quiz Integral',
    class: 'XII IPA 1',
    date: '2025-01-10',
    score: 90,
    maxScore: 100,
    correct: 9,
    total: 10,
    status: 'completed',
  },
];

type TestType = {
  id: string;
  title: string;
  class: string;
  duration: number;
  questions: number;
  description: string;
  date: string;
};

const StudentCBT: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tab, setTab] = useState<"daftar" | "hasil">("daftar");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showQuestionNav, setShowQuestionNav] = useState(false);
  
  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  
  // Start timer when test starts
  useEffect(() => {
    if (started && selectedTest) {
      setTimeLeft(selectedTest.duration * 60);
    }
  }, [started, selectedTest]);
  
  // Countdown effect
  useEffect(() => {
    if (timeLeft === null || isSubmitted || !started) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted, started]);

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
  };

  const toggleFlag = (questionIndex: number) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.has(questionIndex) ? newSet.delete(questionIndex) : newSet.add(questionIndex);
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
      if (mockCBTQuestions[parseInt(questionIndex)]?.correctAnswer === answerIndex) correct++;
    });
    return (correct / mockCBTQuestions.length) * 100;
  };

  // Tab daftar ujian
  if (tab === 'daftar' && !selectedTest) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-primary-900">Computer Based Test</h1>
          <div className="flex gap-2">
            <Button 
              variant={tab === 'daftar' ? 'primary' : 'outline'} 
              onClick={() => setTab('daftar')}
              className="text-sm"
            >
              Daftar Ujian
            </Button>
            <Button 
              variant={tab === 'daftar' ? 'primary' : 'outline'}
              onClick={() => setTab('hasil')}
              className="text-sm"
            >
              Hasil Ujian
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableTests.map(test => (
            <Card key={test.id} className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex items-center justify-center w-14 h-14 bg-primary-100 rounded-lg">
                  <FileText className="h-7 w-7 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">{test.title}</h3>
                  <p className="text-gray-600 mb-4">{test.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{test.class}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{test.duration} menit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{test.questions} soal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{test.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
                  <Button 
                    onClick={() => setSelectedTest(test)} 
                    variant="primary"
                    className="w-full md:w-auto"
                  >
                    Mulai Ujian
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Tab hasil ujian
  if (tab === 'hasil') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-primary-900">Hasil Computer Based Test</h1>
          <div className="flex gap-2">
            <Button 
              variant={tab === 'hasil' ? 'primary' : 'outline'} 
              onClick={() => setTab('daftar')}
              className="text-sm"
            >
              Daftar Ujian
            </Button>
            <Button 
              variant={tab === 'hasil' ? 'primary' : 'outline'} 
              onClick={() => setTab('hasil')}
              className="text-sm"
            >
              Hasil Ujian
            </Button>
          </div>
        </div>
        
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">Judul Ujian</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">Kelas</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-primary-700 uppercase tracking-wider">Nilai</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-primary-700 uppercase tracking-wider">Benar/Salah</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-primary-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cbtResults.map(result => (
                  <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{result.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{result.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{result.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-primary-100 text-primary-800">
                        {result.score}/{result.maxScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                      {result.correct}/{result.total - result.correct}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${result.status === 'completed'
                        ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>
                        {result.status === 'completed' ? 'Selesai' : 'Belum Selesai'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {cbtResults.length === 0 && (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada hasil ujian yang tersedia</p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Konfirmasi sebelum mulai
  if (selectedTest && !started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 text-center border border-gray-100 shadow-lg">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
            <FileText className="h-10 w-10 text-primary-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-primary-900 mb-2">{selectedTest.title}</h2>
          <p className="text-gray-600 mb-6">{selectedTest.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Users className="h-5 w-5 text-primary-600 mx-auto mb-2" />
              <div className="font-medium">Kelas</div>
              <div className="text-gray-600">{selectedTest.class}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Clock className="h-5 w-5 text-primary-600 mx-auto mb-2" />
              <div className="font-medium">Durasi</div>
              <div className="text-gray-600">{selectedTest.duration} menit</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary-600 mx-auto mb-2" />
              <div className="font-medium">Jumlah Soal</div>
              <div className="text-gray-600">{selectedTest.questions} soal</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Calendar className="h-5 w-5 text-primary-600 mx-auto mb-2" />
              <div className="font-medium">Tanggal</div>
              <div className="text-gray-600">{selectedTest.date}</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="primary" 
              onClick={() => setStarted(true)} 
              className="w-full py-3 text-lg"
            >
              Mulai Ujian Sekarang
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSelectedTest(null)} 
              className="w-full py-3"
            >
              Kembali
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Selesai ujian
  if (isSubmitted) {
    const score = calculateScore();
    const correctAnswers = Object.entries(answers).filter(([questionIndex, answerIndex]) => 
      mockCBTQuestions[parseInt(questionIndex)]?.correctAnswer === answerIndex
    ).length;
    
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="text-center p-8 border border-gray-100 shadow-lg">
          <div className="w-24 h-24 mx-auto mb-6 bg-success-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-success-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Ujian Selesai!</h1>
          <p className="text-gray-600 mb-8">Terima kasih telah mengikuti ujian</p>
          
          <div className="bg-primary-50 rounded-xl p-6 mb-8 border border-primary-100">
            <h2 className="text-xl font-semibold text-primary-900 mb-4">Hasil Ujian</h2>
            
            <div className="flex justify-center items-baseline mb-4">
              <span className="text-5xl font-bold text-primary-700">{score.toFixed(0)}</span>
              <span className="text-2xl text-primary-700">%</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-700">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Benar</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-700">{Object.keys(answers).length - correctAnswers}</div>
                <div className="text-sm text-gray-600">Salah</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-700">{mockCBTQuestions.length - Object.keys(answers).length}</div>
                <div className="text-sm text-gray-600">Tidak dijawab</div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => {
              setSelectedTest(null);
              setStarted(false);
              setIsSubmitted(false);
              setTab('daftar');
            }} 
            className="w-full py-3"
          >
            Kembali ke Daftar Ujian
          </Button>
        </Card>
      </div>
    );
  }

  // Ujian berlangsung
  if (!mockCBTQuestions.length) {
    return (
      <div className="max-w-lg mx-auto text-center px-4 py-20">
        <div className="w-20 h-20 mx-auto mb-6 bg-danger-100 rounded-full flex items-center justify-center">
          <XCircle className="h-10 w-10 text-danger-600" />
        </div>
        <h2 className="text-xl font-bold text-primary-900 mb-2">Soal tidak tersedia</h2>
        <p className="text-gray-600 mb-6">Silakan hubungi guru atau admin untuk memperbarui soal.</p>
        <Button variant="outline" onClick={() => setSelectedTest(null)}>Kembali</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header dengan timer dan info ujian */}
      <Card className="p-5 flex flex-col md:flex-row items-center justify-between bg-primary-50 border border-primary-100">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-primary-900">{selectedTest?.title}</h2>
          <p className="text-primary-700">{selectedTest?.class}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-sm text-primary-700">Sisa Waktu</div>
            <div className={`text-2xl font-bold ${timeLeft && timeLeft < 300 ? 'text-danger-600' : 'text-primary-700'} tracking-widest`}>
              {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQuestionNav(!showQuestionNav)}
            className="hidden md:flex"
          >
            {showQuestionNav ? 'Sembunyikan' : 'Lihat'} Navigasi Soal
          </Button>
        </div>
      </Card>

      {/* Navigasi soal (toggleable on all screen sizes) */}
      {showQuestionNav && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Navigasi Soal</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-12 gap-1">
            {mockCBTQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={`w-full aspect-square flex items-center justify-center rounded border text-[10px] font-semibold transition-all p-0
                  ${currentQuestion === i ? 'bg-primary-500 text-white border-primary-500' :
                    answers[i] !== undefined ? 'bg-success-100 text-success-700 border-success-200' :
                    flaggedQuestions.has(i) ? 'bg-warning-100 text-warning-700 border-warning-200' :
                    'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-primary-500"></div>
              <span>Sedang dikerjakan</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-success-100 border border-success-200"></div>
              <span>Terjawab</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-warning-100 border border-warning-200"></div>
              <span>Ditandai</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-white border border-gray-200"></div>
              <span>Belum dijawab</span>
            </div>
          </div>
        </Card>
      )}

      {/* Soal dan pilihan jawaban */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary-900">
            Soal <span className="text-primary-600">{currentQuestion + 1}</span> dari {mockCBTQuestions.length}
          </h3>
          <Button
            variant={flaggedQuestions.has(currentQuestion) ? 'danger' : 'outline'}
            size="sm"
            onClick={() => toggleFlag(currentQuestion)}
            className="flex items-center gap-2"
          >
            <Flag className="h-4 w-4" />
            {flaggedQuestions.has(currentQuestion) ? 'Hapus Tanda' : 'Tandai'}
          </Button>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
          <p className="text-gray-900 leading-relaxed mb-4 whitespace-pre-line">
            {mockCBTQuestions[currentQuestion]?.question}
          </p>
          
          {/* Media preview for image/audio/video */}
          {mockCBTQuestions[currentQuestion]?.mediaUrl && mockCBTQuestions[currentQuestion]?.type === 'image' && (
            <div className="mt-4">
              <img 
                src={mockCBTQuestions[currentQuestion].mediaUrl} 
                alt="Gambar Soal" 
                className="max-w-full md:max-w-md rounded-lg shadow-md" 
              />
            </div>
          )}
          {mockCBTQuestions[currentQuestion]?.mediaUrl && mockCBTQuestions[currentQuestion]?.type === 'audio' && (
            <div className="mt-4">
              <audio controls src={mockCBTQuestions[currentQuestion].mediaUrl} className="w-full" />
            </div>
          )}
          {mockCBTQuestions[currentQuestion]?.mediaUrl && mockCBTQuestions[currentQuestion]?.type === 'video' && (
            <div className="mt-4">
              <video 
                controls 
                src={mockCBTQuestions[currentQuestion].mediaUrl} 
                className="max-w-full rounded-lg" 
              />
            </div>
          )}
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
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-900">
                  <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigasi bawah */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="w-full md:w-auto"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Soal Sebelumnya
        </Button>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={() => setShowQuestionNav(!showQuestionNav)}
            className="md:hidden"
          >
            {showQuestionNav ? 'Sembunyikan' : 'Lihat'} Navigasi
          </Button>
          
          <Button
            variant="primary"
            onClick={() => setShowSubmitModal(true)}
            disabled={isSubmitted}
            className="flex-1 md:flex-none"
          >
            Kumpulkan Jawaban
          </Button>
        </div>
        
        <Button
          onClick={() => setCurrentQuestion(Math.min(mockCBTQuestions.length - 1, currentQuestion + 1))}
          disabled={currentQuestion === mockCBTQuestions.length - 1}
          className="w-full md:w-auto"
        >
          Soal Selanjutnya <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Modal submit */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Konfirmasi Pengumpulan"
        size="md"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Kumpulkan Jawaban?</h3>
          <p className="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengumpulkan jawaban ujian?<br />
            Pastikan Anda telah memeriksa semua jawaban dengan teliti.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-700">{Object.keys(answers).length}</div>
                <div className="text-gray-600">Terjawab</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-700">{mockCBTQuestions.length - Object.keys(answers).length}</div>
                <div className="text-gray-600">Belum terjawab</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowSubmitModal(false)} 
              className="flex-1"
            >
              Periksa Lagi
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1"
            >
              Ya, Kumpulkan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentCBT;