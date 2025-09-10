import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Upload,
  Search,
  Filter,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';
import type { 
  Grade, 
  ClassSubject,
  Student,
  PaginationParams, 
  PaginationResult 
} from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolGrades() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [grades, setGrades] = useState<PaginationResult<Grade>>({ 
    data: [], total: 0, page: 1, limit: 10, total_pages: 0 
  });
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [gradeForm, setGradeForm] = useState<Partial<Grade>>({
    assessment_type: 'quiz',
    semester: 1
  });
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);
  const [selectedClassSubject, setSelectedClassSubject] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('1');

  const loadGrades = () => {
    // Mock implementation - replace with actual API call
    const mockGrades: Grade[] = [
      {
        id: 'grade-1',
        student_id: 'std-1',
        class_subject_id: 'cs-1',
        assessment_type: 'quiz',
        assessment_id: 'quiz-1',
        score: 85,
        max_score: 100,
        semester: 1,
        academic_year: '2023/2024',
        graded_by: 'teacher-1',
        graded_at: '2024-03-15T10:00:00Z',
        created_at: '2024-03-15T10:00:00Z'
      },
      {
        id: 'grade-2',
        student_id: 'std-2',
        class_subject_id: 'cs-1',
        assessment_type: 'assignment',
        assessment_id: 'assign-1',
        score: 92,
        max_score: 100,
        semester: 1,
        academic_year: '2023/2024',
        graded_by: 'teacher-1',
        graded_at: '2024-03-16T14:30:00Z',
        created_at: '2024-03-16T14:30:00Z'
      },
      {
        id: 'grade-3',
        student_id: 'std-3',
        class_subject_id: 'cs-2',
        assessment_type: 'exam',
        assessment_id: 'exam-1',
        score: 78,
        max_score: 100,
        semester: 1,
        academic_year: '2023/2024',
        graded_by: 'teacher-2',
        graded_at: '2024-03-17T09:15:00Z',
        created_at: '2024-03-17T09:15:00Z'
      }
    ];

    let filtered = mockGrades.filter(g => 
      (!pagination.search || 
       getStudentName(g.student_id).toLowerCase().includes(pagination.search.toLowerCase())) &&
      (selectedSemester === 'all' || g.semester.toString() === selectedSemester)
    );

    if (selectedClassSubject !== 'all') {
      filtered = filtered.filter(g => g.class_subject_id === selectedClassSubject);
    }

    const startIndex = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const paginatedData = filtered.slice(startIndex, startIndex + (pagination.limit || 10));

    setGrades({
      data: paginatedData,
      total: filtered.length,
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total_pages: Math.ceil(filtered.length / (pagination.limit || 10))
    });
  };

  const loadClassSubjects = () => {
    setClassSubjects(schoolService.listClassSubjectsRaw());
  };

  useEffect(() => { loadClassSubjects(); }, []);
  useEffect(() => { loadGrades(); }, [pagination, selectedClassSubject, selectedSemester]);

  const resetForm = () => {
    setEditingGrade(null);
    setGradeForm({
      assessment_type: 'quiz',
      semester: 1
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGrade) {
      console.log('Updating grade:', editingGrade.id, gradeForm);
    } else {
      console.log('Creating grade:', gradeForm);
    }
    resetForm();
    loadGrades();
  };

  const onEdit = (grade: Grade) => {
    setEditingGrade(grade);
    setGradeForm({
      student_id: grade.student_id,
      class_subject_id: grade.class_subject_id,
      assessment_type: grade.assessment_type,
      assessment_id: grade.assessment_id,
      score: grade.score,
      max_score: grade.max_score,
      semester: grade.semester,
      academic_year: grade.academic_year
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus nilai ini?')) return;
    console.log('Deleting grade:', id);
    loadGrades();
  };

  const exportGrades = () => {
    console.log('Exporting grades...');
    alert('Mengekspor data nilai...');
  };

  const classSubjectOptions = [
    { value: 'all', label: 'Semua Kelas & Mapel' },
    ...classSubjects.map(cs => {
      const cls = schoolService.listClassesRaw().find(c => c.id === cs.class_id);
      const sub = schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id);
      return { 
        value: cs.id, 
        label: `${cls?.name ?? cs.class_id} - ${sub?.name ?? cs.subject_id}` 
      };
    })
  ];

  const semesterOptions = [
    { value: 'all', label: 'Semua Semester' },
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' }
  ];

  const assessmentTypeOptions = [
    { value: 'quiz', label: 'Kuis' },
    { value: 'assignment', label: 'Tugas' },
    { value: 'exam', label: 'Ujian' },
    { value: 'project', label: 'Proyek' }
  ];

  const getStudentName = (studentId: string) => {
    // In real implementation, this would come from the student data with user relation
    const studentNames: { [key: string]: string } = {
      'std-1': 'Ahmad Rizki',
      'std-2': 'Siti Nurhaliza',
      'std-3': 'Budi Santoso'
    };
    return studentNames[studentId] || studentId;
  };

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLetterGrade = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'E';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manajemen Nilai</h1>
        <div className="flex gap-2">
          <Button onClick={exportGrades} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={() => setEditingGrade({} as Grade)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Nilai
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari siswa..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={pagination.search || ''}
                onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
              />
            </div>
          </div>
          <div>
            <SearchSelect
              options={classSubjectOptions}
              value={selectedClassSubject}
              onChange={setSelectedClassSubject}
              placeholder="Pilih kelas & mapel"
            />
          </div>
          <div>
            <SearchSelect
              options={semesterOptions}
              value={selectedSemester}
              onChange={setSelectedSemester}
              placeholder="Pilih semester"
            />
          </div>
          <div>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Grade Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Rata-rata Nilai</p>
              <p className="text-2xl font-bold">85.0</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Nilai Tertinggi</p>
              <p className="text-2xl font-bold">92</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Lulus (≥70)</p>
              <p className="text-2xl font-bold">100%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Grade Form */}
      {editingGrade && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingGrade.id ? 'Edit Nilai' : 'Tambah Nilai Baru'}
          </h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Siswa</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Pilih siswa..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kelas & Mata Pelajaran</label>
              <SearchSelect
                options={classSubjectOptions.filter(opt => opt.value !== 'all')}
                value={gradeForm.class_subject_id ?? ''}
                onChange={(v) => setGradeForm(f => ({ ...f, class_subject_id: String(v) }))}
                placeholder="Pilih kelas dan mapel"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Penilaian</label>
              <SearchSelect
                options={assessmentTypeOptions}
                value={gradeForm.assessment_type ?? 'quiz'}
                onChange={(v) => setGradeForm(f => ({ ...f, assessment_type: String(v) as any }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <SearchSelect
                options={semesterOptions.filter(opt => opt.value !== 'all')}
                value={gradeForm.semester?.toString() ?? '1'}
                onChange={(v) => setGradeForm(f => ({ ...f, semester: Number(v) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nilai</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                value={gradeForm.score ?? ''}
                onChange={(e) => setGradeForm(f => ({ ...f, score: Number(e.target.value) }))}
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nilai Maksimal</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                value={gradeForm.max_score ?? 100}
                onChange={(e) => setGradeForm(f => ({ ...f, max_score: Number(e.target.value) }))}
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={gradeForm.academic_year ?? '2023/2024'}
                onChange={(e) => setGradeForm(f => ({ ...f, academic_year: e.target.value }))}
                placeholder="2023/2024"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingGrade.id ? 'Update' : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Batal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Grades List */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Siswa</th>
                <th className="text-left py-3 px-4">Kelas & Mapel</th>
                <th className="text-left py-3 px-4">Jenis</th>
                <th className="text-left py-3 px-4">Nilai</th>
                <th className="text-left py-3 px-4">Grade</th>
                <th className="text-left py-3 px-4">Semester</th>
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {grades.data.map((grade) => {
                const cs = classSubjects.find(cs => cs.id === grade.class_subject_id);
                const cls = cs ? schoolService.listClassesRaw().find(c => c.id === cs.class_id) : null;
                const sub = cs ? schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id) : null;
                
                return (
                  <tr key={grade.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {getStudentName(grade.student_id).charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{getStudentName(grade.student_id)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {cls?.name} - {sub?.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {assessmentTypeOptions.find(t => t.value === grade.assessment_type)?.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${getGradeColor(grade.score, grade.max_score)}`}>
                        {grade.score}/{grade.max_score}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({Math.round((grade.score / grade.max_score) * 100)}%)
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${getGradeColor(grade.score, grade.max_score)}`}>
                        {getLetterGrade(grade.score, grade.max_score)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      Semester {grade.semester}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => onEdit(grade)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => onDelete(grade.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {grades.total === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Belum ada data nilai</p>
          </div>
        )}
      </Card>
    </div>
  );
}
