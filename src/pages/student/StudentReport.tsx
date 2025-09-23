import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Download, Eye, Calendar, TrendingUp, Award } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface ReportCard {
  id: number;
  semester: string;
  academic_year: string;
  issued_date: string;
  subjects: {
    name: string;
    teacher: string;
    daily_score: number;
    midterm_score: number;
    final_score: number;
    final_grade: string;
    description: string;
  }[];
  overall_average: number;
  rank: number;
  total_students: number;
  attendance: {
    present: number;
    sick: number;
    permit: number;
    absent: number;
    total_days: number;
  };
  notes: string;
}

export default function StudentReport() {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState<ReportCard | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data
  const [reports] = useState<ReportCard[]>([
    {
      id: 1,
      semester: 'Ganjil',
      academic_year: '2024/2025',
      issued_date: '2024-01-15',
      subjects: [
        {
          name: 'Matematika',
          teacher: 'Dra. Siti Aminah',
          daily_score: 85,
          midterm_score: 88,
          final_score: 87,
          final_grade: 'A',
          description: 'Sangat baik dalam pemahaman konsep'
        },
        {
          name: 'Fisika',
          teacher: 'Ahmad Fauzi, S.Pd',
          daily_score: 82,
          midterm_score: 85,
          final_score: 84,
          final_grade: 'A',
          description: 'Baik dalam praktikum dan teori'
        },
        {
          name: 'Kimia',
          teacher: 'Dr. Budi Santoso',
          daily_score: 78,
          midterm_score: 80,
          final_score: 79,
          final_grade: 'B+',
          description: 'Perlu peningkatan dalam perhitungan'
        },
        {
          name: 'Biologi',
          teacher: 'Dra. Rina Sari',
          daily_score: 90,
          midterm_score: 92,
          final_score: 91,
          final_grade: 'A',
          description: 'Sangat aktif dan memahami materi'
        },
        {
          name: 'Bahasa Indonesia',
          teacher: 'Drs. Hasan Basri',
          daily_score: 86,
          midterm_score: 88,
          final_score: 87,
          final_grade: 'A',
          description: 'Kemampuan menulis dan berbicara baik'
        }
      ],
      overall_average: 85.6,
      rank: 5,
      total_students: 32,
      attendance: {
        present: 95,
        sick: 3,
        permit: 2,
        absent: 0,
        total_days: 100
      },
      notes: 'Siswa menunjukkan prestasi yang konsisten dan sikap belajar yang baik.'
    },
    {
      id: 2,
      semester: 'Genap',
      academic_year: '2023/2024',
      issued_date: '2024-06-20',
      subjects: [
        {
          name: 'Matematika',
          teacher: 'Dra. Siti Aminah',
          daily_score: 83,
          midterm_score: 86,
          final_score: 85,
          final_grade: 'A',
          description: 'Konsisten dalam prestasi'
        },
        {
          name: 'Fisika',
          teacher: 'Ahmad Fauzi, S.Pd',
          daily_score: 80,
          midterm_score: 82,
          final_score: 81,
          final_grade: 'B+',
          description: 'Baik dalam teori'
        }
      ],
      overall_average: 83.0,
      rank: 7,
      total_students: 32,
      attendance: {
        present: 92,
        sick: 5,
        permit: 3,
        absent: 0,
        total_days: 100
      },
      notes: 'Prestasi stabil dengan kehadiran yang baik.'
    }
  ]);

  const handleViewDetail = (report: ReportCard) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'A-': return 'text-green-600 bg-green-100';
      case 'B+': return 'text-blue-600 bg-blue-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'B-': return 'text-yellow-600 bg-yellow-100';
      case 'C+': return 'text-yellow-600 bg-yellow-100';
      case 'C': return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Raport</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rata-rata Terbaru</p>
              <p className="text-xl font-semibold">{reports[0]?.overall_average}</p>
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
              <p className="text-xl font-semibold">{reports[0]?.rank} dari {reports[0]?.total_students}</p>
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
              <p className="text-xl font-semibold">
                {Math.round((reports[0]?.attendance.present / reports[0]?.attendance.total_days) * 100)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Daftar Raport</h3>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-primary-600" />
                    <h4 className="font-medium">
                      Raport Semester {report.semester} - {report.academic_year}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tanggal Terbit:</span>
                      <p className="font-medium">
                        {new Date(report.issued_date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Rata-rata:</span>
                      <p className="font-medium text-primary-600">{report.overall_average}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Peringkat:</span>
                      <p className="font-medium">{report.rank} dari {report.total_students}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Kehadiran:</span>
                      <p className="font-medium">
                        {Math.round((report.attendance.present / report.attendance.total_days) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleViewDetail(report)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Raport Semester {selectedReport.semester} - {selectedReport.academic_year}
              </h2>
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Tutup
              </Button>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Nama Siswa</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kelas</p>
                <p className="font-medium">XII IPA 1</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rata-rata</p>
                <p className="font-medium text-primary-600">{selectedReport.overall_average}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Peringkat</p>
                <p className="font-medium">{selectedReport.rank} dari {selectedReport.total_students}</p>
              </div>
            </div>

            {/* Subjects Table */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Nilai Mata Pelajaran</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2 text-left">Mata Pelajaran</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Harian</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">UTS</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">UAS</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Nilai Akhir</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Grade</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.subjects.map((subject, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">
                          <div>
                            <p className="font-medium">{subject.name}</p>
                            <p className="text-sm text-gray-600">{subject.teacher}</p>
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">{subject.daily_score}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center">{subject.midterm_score}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center">{subject.final_score}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center font-medium">{subject.final_score}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.final_grade)}`}>
                            {subject.final_grade}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{subject.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium mb-3">Kehadiran</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hadir</span>
                    <span className="font-medium">{selectedReport.attendance.present} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sakit</span>
                    <span className="font-medium">{selectedReport.attendance.sick} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Izin</span>
                    <span className="font-medium">{selectedReport.attendance.permit} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanpa Keterangan</span>
                    <span className="font-medium">{selectedReport.attendance.absent} hari</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total Hari Efektif</span>
                    <span className="font-medium">{selectedReport.attendance.total_days} hari</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Catatan Wali Kelas</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedReport.notes}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Tutup
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
