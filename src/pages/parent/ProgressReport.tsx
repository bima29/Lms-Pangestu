import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp, TrendingDown, Award, Calendar, User, FileText, BarChart3 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Child {
  id: number;
  name: string;
  class: string;
  student_id: string;
}

interface SubjectProgress {
  subject: string;
  teacher: string;
  current_score: number;
  previous_score: number;
  trend: 'up' | 'down' | 'stable';
  assignments_completed: number;
  total_assignments: number;
  last_test_score: number;
  attendance_rate: number;
}

interface ProgressSummary {
  overall_average: number;
  class_rank: number;
  total_students: number;
  attendance_percentage: number;
  subjects: SubjectProgress[];
  achievements: string[];
  areas_for_improvement: string[];
}

export default function ProgressReport() {
  const { } = useAuth();
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock data
  const [children] = useState<Child[]>([
    { id: 1, name: 'Ahmad Rizki Pratama', class: 'XII IPA 1', student_id: '2024001' },
    { id: 2, name: 'Siti Nurhaliza Pratama', class: 'X MIPA 2', student_id: '2024002' }
  ]);

  const [progressData] = useState<Record<number, ProgressSummary>>({
    1: {
      overall_average: 85.6,
      class_rank: 5,
      total_students: 32,
      attendance_percentage: 95,
      subjects: [
        {
          subject: 'Matematika',
          teacher: 'Dra. Siti Aminah',
          current_score: 87,
          previous_score: 82,
          trend: 'up',
          assignments_completed: 8,
          total_assignments: 10,
          last_test_score: 85,
          attendance_rate: 100
        },
        {
          subject: 'Fisika',
          teacher: 'Ahmad Fauzi, S.Pd',
          current_score: 84,
          previous_score: 86,
          trend: 'down',
          assignments_completed: 7,
          total_assignments: 9,
          last_test_score: 82,
          attendance_rate: 95
        },
        {
          subject: 'Kimia',
          teacher: 'Dr. Budi Santoso',
          current_score: 79,
          previous_score: 79,
          trend: 'stable',
          assignments_completed: 6,
          total_assignments: 8,
          last_test_score: 78,
          attendance_rate: 90
        },
        {
          subject: 'Biologi',
          teacher: 'Dra. Rina Sari',
          current_score: 91,
          previous_score: 88,
          trend: 'up',
          assignments_completed: 9,
          total_assignments: 10,
          last_test_score: 92,
          attendance_rate: 100
        }
      ],
      achievements: [
        'Peringkat 5 besar di kelas',
        'Nilai Biologi meningkat signifikan',
        'Kehadiran sangat baik (95%)',
        'Aktif dalam diskusi kelas'
      ],
      areas_for_improvement: [
        'Perlu fokus lebih pada mata pelajaran Kimia',
        'Tingkatkan pengumpulan tugas tepat waktu',
        'Perbaiki nilai Fisika yang menurun'
      ]
    },
    2: {
      overall_average: 88.2,
      class_rank: 3,
      total_students: 30,
      attendance_percentage: 98,
      subjects: [
        {
          subject: 'Matematika',
          teacher: 'Dra. Siti Aminah',
          current_score: 92,
          previous_score: 89,
          trend: 'up',
          assignments_completed: 10,
          total_assignments: 10,
          last_test_score: 94,
          attendance_rate: 100
        }
      ],
      achievements: [
        'Peringkat 3 besar di kelas',
        'Nilai Matematika sangat baik',
        'Kehadiran hampir sempurna (98%)',
        'Konsisten dalam prestasi'
      ],
      areas_for_improvement: [
        'Pertahankan konsistensi prestasi',
        'Tingkatkan partisipasi dalam kegiatan ekstrakurikuler'
      ]
    }
  });

  const selectedChildData = children.find(child => child.id === selectedChild);
  const childProgress = progressData[selectedChild];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Laporan Perkembangan</h1>
      </div>

      {/* Child Selector */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
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
          
          <div>
            <label className="block text-sm font-medium mb-2">Periode</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="current">Semester Ini</option>
              <option value="previous">Semester Lalu</option>
              <option value="yearly">Tahun Ini</option>
            </select>
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

      {/* Overall Summary */}
      {childProgress && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rata-rata Nilai</p>
                <p className="text-xl font-semibold">{childProgress.overall_average}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Peringkat Kelas</p>
                <p className="text-xl font-semibold">{childProgress.class_rank} dari {childProgress.total_students}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Kehadiran</p>
                <p className="text-xl font-semibold">{childProgress.attendance_percentage}%</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tugas Selesai</p>
                <p className="text-xl font-semibold">
                  {childProgress.subjects.reduce((sum, s) => sum + s.assignments_completed, 0)}/
                  {childProgress.subjects.reduce((sum, s) => sum + s.total_assignments, 0)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Subject Progress */}
      {childProgress && (
        <Card>
          <h3 className="text-lg font-medium mb-4">Perkembangan per Mata Pelajaran</h3>
          <div className="space-y-4">
            {childProgress.subjects.map((subject, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                    <p className="text-sm text-gray-600">{subject.teacher}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(subject.trend)}
                    <span className={`font-medium ${getTrendColor(subject.trend)}`}>
                      {subject.current_score}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Perubahan:</span>
                    <p className={`font-medium ${getTrendColor(subject.trend)}`}>
                      {subject.trend === 'up' ? '+' : subject.trend === 'down' ? '-' : ''}
                      {Math.abs(subject.current_score - subject.previous_score)} poin
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tugas:</span>
                    <p className="font-medium">
                      {subject.assignments_completed}/{subject.total_assignments}
                      <span className="text-xs text-gray-500 ml-1">
                        ({Math.round((subject.assignments_completed / subject.total_assignments) * 100)}%)
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Ujian Terakhir:</span>
                    <p className="font-medium">{subject.last_test_score}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Kehadiran:</span>
                    <p className="font-medium">{subject.attendance_rate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Achievements & Areas for Improvement */}
      {childProgress && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-medium">Pencapaian</h3>
            </div>
            <div className="space-y-2">
              {childProgress.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">Area Pengembangan</h3>
            </div>
            <div className="space-y-2">
              {childProgress.areas_for_improvement.map((area, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">{area}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      <Card>
        <h3 className="font-medium mb-4">Tindak Lanjut</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">
            Konsultasi dengan Wali Kelas
          </Button>
          <Button variant="secondary">
            Jadwalkan Bimbingan Belajar
          </Button>
          <Button variant="secondary">
            Download Laporan PDF
          </Button>
          <Button variant="secondary">
            Lihat Riwayat Perkembangan
          </Button>
        </div>
      </Card>
    </div>
  );
}
