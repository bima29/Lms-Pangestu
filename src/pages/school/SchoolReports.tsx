import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Download,
  Filter,
  RefreshCw,
  PieChart,
  GraduationCap,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';

interface ReportData {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  averageGrade: number;
  attendanceRate: number;
  cbtCompletionRate: number;
  activeAssignments: number;
}

interface GradeDistribution {
  grade: string;
  count: number;
  percentage: number;
}

interface ClassPerformance {
  className: string;
  averageGrade: number;
  studentCount: number;
  attendanceRate: number;
}

interface SubjectPerformance {
  subjectName: string;
  averageGrade: number;
  completionRate: number;
  teacherName: string;
}

interface MonthlyTrend {
  month: string;
  grades: number;
  attendance: number;
  cbtScores: number;
}

export default function SchoolReports() {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current_semester');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [reportData, setReportData] = useState<ReportData>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSubjects: 0,
    averageGrade: 0,
    attendanceRate: 0,
    cbtCompletionRate: 0,
    activeAssignments: 0
  });

  // Mock data
  const gradeDistribution: GradeDistribution[] = [
    { grade: 'A', count: 45, percentage: 25 },
    { grade: 'B', count: 72, percentage: 40 },
    { grade: 'C', count: 36, percentage: 20 },
    { grade: 'D', count: 18, percentage: 10 },
    { grade: 'E', count: 9, percentage: 5 }
  ];

  const classPerformance: ClassPerformance[] = [
    { className: 'X IPA 1', averageGrade: 85.5, studentCount: 32, attendanceRate: 95.2 },
    { className: 'X IPA 2', averageGrade: 82.3, studentCount: 30, attendanceRate: 92.8 },
    { className: 'X IPS 1', averageGrade: 78.9, studentCount: 28, attendanceRate: 89.5 },
    { className: 'XI IPA 1', averageGrade: 87.2, studentCount: 29, attendanceRate: 96.1 },
    { className: 'XI IPS 1', averageGrade: 81.7, studentCount: 31, attendanceRate: 91.3 }
  ];

  const subjectPerformance: SubjectPerformance[] = [
    { subjectName: 'Matematika', averageGrade: 82.5, completionRate: 94.2, teacherName: 'Dr. Ahmad Susanto' },
    { subjectName: 'Bahasa Indonesia', averageGrade: 85.1, completionRate: 96.8, teacherName: 'Siti Nurhaliza, S.Pd' },
    { subjectName: 'Fisika', averageGrade: 79.3, completionRate: 91.5, teacherName: 'Prof. Budi Santoso' },
    { subjectName: 'Kimia', averageGrade: 81.7, completionRate: 93.2, teacherName: 'Dr. Maya Sari' },
    { subjectName: 'Biologi', averageGrade: 84.2, completionRate: 95.1, teacherName: 'Andi Wijaya, M.Pd' }
  ];

  const monthlyTrends: MonthlyTrend[] = [
    { month: 'Jan', grades: 78, attendance: 92, cbtScores: 75 },
    { month: 'Feb', grades: 80, attendance: 94, cbtScores: 78 },
    { month: 'Mar', grades: 82, attendance: 91, cbtScores: 80 },
    { month: 'Apr', grades: 85, attendance: 95, cbtScores: 83 },
    { month: 'May', grades: 83, attendance: 93, cbtScores: 81 },
    { month: 'Jun', grades: 86, attendance: 96, cbtScores: 85 }
  ];

  const periodOptions = [
    { value: 'current_semester', label: 'Semester Saat Ini' },
    { value: 'last_semester', label: 'Semester Lalu' },
    { value: 'current_year', label: 'Tahun Ajaran Ini' },
    { value: 'last_year', label: 'Tahun Ajaran Lalu' }
  ];

  const classOptions = [
    { value: 'all', label: 'Semua Kelas' },
    { value: 'x_ipa_1', label: 'X IPA 1' },
    { value: 'x_ipa_2', label: 'X IPA 2' },
    { value: 'x_ips_1', label: 'X IPS 1' },
    { value: 'xi_ipa_1', label: 'XI IPA 1' },
    { value: 'xi_ips_1', label: 'XI IPS 1' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'Semua Mata Pelajaran' },
    { value: 'matematika', label: 'Matematika' },
    { value: 'bahasa_indonesia', label: 'Bahasa Indonesia' },
    { value: 'fisika', label: 'Fisika' },
    { value: 'kimia', label: 'Kimia' },
    { value: 'biologi', label: 'Biologi' }
  ];

  useEffect(() => {
    loadReportData();
  }, [selectedPeriod, selectedClass, selectedSubject]);

  const loadReportData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReportData({
        totalStudents: 180,
        totalTeachers: 25,
        totalClasses: 12,
        totalSubjects: 15,
        averageGrade: 83.2,
        attendanceRate: 94.5,
        cbtCompletionRate: 92.8,
        activeAssignments: 24
      });
      setLoading(false);
    }, 1000);
  };

  const refreshData = () => {
    loadReportData();
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    // Simulate export
    alert(`Mengekspor laporan dalam format ${format.toUpperCase()}...`);
  };

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }: {
    title: string;
    value: string | number;
    icon: any;
    trend?: number;
    color?: string;
  }) => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
          <p className="text-gray-600 mt-1">Analisis performa dan statistik sekolah</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refreshData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button
            onClick={() => exportReport('pdf')}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => exportReport('excel')}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex gap-4 flex-1">
            <div className="min-w-48">
              <SearchSelect
                options={periodOptions}
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                placeholder="Pilih Periode"
              />
            </div>
            <div className="min-w-48">
              <SearchSelect
                options={classOptions}
                value={selectedClass}
                onChange={setSelectedClass}
                placeholder="Pilih Kelas"
              />
            </div>
            <div className="min-w-48">
              <SearchSelect
                options={subjectOptions}
                value={selectedSubject}
                onChange={setSelectedSubject}
                placeholder="Pilih Mata Pelajaran"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Siswa"
          value={reportData.totalStudents}
          icon={Users}
          trend={5.2}
          color="blue"
        />
        <StatCard
          title="Rata-rata Nilai"
          value={`${reportData.averageGrade}%`}
          icon={Award}
          trend={2.1}
          color="green"
        />
        <StatCard
          title="Tingkat Kehadiran"
          value={`${reportData.attendanceRate}%`}
          icon={Clock}
          trend={1.8}
          color="orange"
        />
        <StatCard
          title="Penyelesaian CBT"
          value={`${reportData.cbtCompletionRate}%`}
          icon={GraduationCap}
          trend={3.5}
          color="purple"
        />
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Ringkasan', icon: BarChart3 },
            { id: 'grades', label: 'Distribusi Nilai', icon: PieChart },
            { id: 'classes', label: 'Performa Kelas', icon: Users },
            { id: 'subjects', label: 'Performa Mata Pelajaran', icon: BookOpen },
            { id: 'trends', label: 'Tren Bulanan', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Statistik Umum</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Guru</span>
                <span className="font-semibold">{reportData.totalTeachers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Kelas</span>
                <span className="font-semibold">{reportData.totalClasses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Mata Pelajaran</span>
                <span className="font-semibold">{reportData.totalSubjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tugas Aktif</span>
                <span className="font-semibold">{reportData.activeAssignments}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Indikator Kinerja</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Rata-rata Nilai</span>
                  <span className="font-semibold">{reportData.averageGrade}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${reportData.averageGrade}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tingkat Kehadiran</span>
                  <span className="font-semibold">{reportData.attendanceRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${reportData.attendanceRate}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Penyelesaian CBT</span>
                  <span className="font-semibold">{reportData.cbtCompletionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${reportData.cbtCompletionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'grades' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Distribusi Nilai</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">Grafik Distribusi</h4>
              <div className="space-y-3">
                {gradeDistribution.map((grade) => (
                  <div key={grade.grade} className="flex items-center gap-4">
                    <div className="w-8 text-center font-semibold">{grade.grade}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-blue-600 h-4 rounded-full flex items-center justify-end pr-2" 
                          style={{ width: `${grade.percentage}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            {grade.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">
                      {grade.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Detail Statistik</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Siswa Dinilai</span>
                  <span className="font-semibold">
                    {gradeDistribution.reduce((sum, grade) => sum + grade.count, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Siswa dengan Nilai A-B</span>
                  <span className="font-semibold text-green-600">
                    {gradeDistribution.slice(0, 2).reduce((sum, grade) => sum + grade.count, 0)} 
                    ({gradeDistribution.slice(0, 2).reduce((sum, grade) => sum + grade.percentage, 0)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Siswa Perlu Perhatian (D-E)</span>
                  <span className="font-semibold text-red-600">
                    {gradeDistribution.slice(-2).reduce((sum, grade) => sum + grade.count, 0)}
                    ({gradeDistribution.slice(-2).reduce((sum, grade) => sum + grade.percentage, 0)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'classes' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performa Kelas</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Kelas</th>
                  <th className="text-left py-3 px-4">Jumlah Siswa</th>
                  <th className="text-left py-3 px-4">Rata-rata Nilai</th>
                  <th className="text-left py-3 px-4">Tingkat Kehadiran</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {classPerformance.map((classData, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{classData.className}</td>
                    <td className="py-3 px-4">{classData.studentCount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{classData.averageGrade}</span>
                        <div className={`px-2 py-1 rounded text-xs ${
                          classData.averageGrade >= 85 
                            ? 'bg-green-100 text-green-800' 
                            : classData.averageGrade >= 75 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {classData.averageGrade >= 85 ? 'Sangat Baik' : 
                           classData.averageGrade >= 75 ? 'Baik' : 'Perlu Perbaikan'}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{classData.attendanceRate}%</td>
                    <td className="py-3 px-4">
                      {classData.attendanceRate >= 95 ? (
                        <span className="text-green-600">Optimal</span>
                      ) : classData.attendanceRate >= 90 ? (
                        <span className="text-yellow-600">Baik</span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          Perhatian
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'subjects' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performa Mata Pelajaran</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Mata Pelajaran</th>
                  <th className="text-left py-3 px-4">Guru Pengampu</th>
                  <th className="text-left py-3 px-4">Rata-rata Nilai</th>
                  <th className="text-left py-3 px-4">Tingkat Penyelesaian</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjectPerformance.map((subject, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{subject.subjectName}</td>
                    <td className="py-3 px-4 text-gray-600">{subject.teacherName}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{subject.averageGrade}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${subject.averageGrade}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{subject.completionRate}%</td>
                    <td className="py-3 px-4">
                      {subject.averageGrade >= 85 && subject.completionRate >= 95 ? (
                        <span className="text-green-600">Excellent</span>
                      ) : subject.averageGrade >= 75 && subject.completionRate >= 90 ? (
                        <span className="text-yellow-600">Good</span>
                      ) : (
                        <span className="text-red-600">Needs Improvement</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'trends' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tren Bulanan</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {monthlyTrends[monthlyTrends.length - 1].grades}
                </div>
                <div className="text-sm text-gray-600">Rata-rata Nilai Bulan Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {monthlyTrends[monthlyTrends.length - 1].attendance}%
                </div>
                <div className="text-sm text-gray-600">Kehadiran Bulan Ini</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {monthlyTrends[monthlyTrends.length - 1].cbtScores}
                </div>
                <div className="text-sm text-gray-600">Skor CBT Bulan Ini</div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Bulan</th>
                    <th className="text-left py-3 px-4">Rata-rata Nilai</th>
                    <th className="text-left py-3 px-4">Kehadiran (%)</th>
                    <th className="text-left py-3 px-4">Skor CBT</th>
                    <th className="text-left py-3 px-4">Tren</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyTrends.map((trend, index) => {
                    const prevTrend = index > 0 ? monthlyTrends[index - 1] : null;
                    const gradeChange = prevTrend ? trend.grades - prevTrend.grades : 0;
                    
                    return (
                      <tr key={trend.month} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{trend.month}</td>
                        <td className="py-3 px-4">{trend.grades}</td>
                        <td className="py-3 px-4">{trend.attendance}%</td>
                        <td className="py-3 px-4">{trend.cbtScores}</td>
                        <td className="py-3 px-4">
                          {gradeChange !== 0 && (
                            <div className={`flex items-center gap-1 ${
                              gradeChange > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              <TrendingUp className={`w-4 h-4 ${gradeChange < 0 ? 'rotate-180' : ''}`} />
                              <span className="text-sm">
                                {gradeChange > 0 ? '+' : ''}{gradeChange}
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
