import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  Users,
  FileText,
  Search
} from 'lucide-react';
import type { 
  Assignment, 
  ClassSubject,
  PaginationParams, 
  PaginationResult 
} from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolAssignments() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [assignments, setAssignments] = useState<PaginationResult<Assignment>>({ 
    data: [], total: 0, page: 1, limit: 10, total_pages: 0 
  });
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [assignmentForm, setAssignmentForm] = useState<Partial<Assignment>>({
    assignment_type: 'homework',
    is_published: false
  });
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);

  const loadAssignments = () => {
    // Mock implementation - replace with actual API call
    const mockAssignments: Assignment[] = [
      {
        id: 'assign-1',
        title: 'Tugas Matematika Bab 5',
        description: 'Kerjakan soal-soal latihan halaman 120-125',
        class_subject_id: 'cs-1',
        assignment_type: 'homework',
        due_date: '2024-03-20T23:59:59Z',
        max_score: 100,
        instructions: 'Tulis jawaban dengan rapi dan lengkap',
        is_published: true,
        created_by: 'teacher-1',
        created_at: '2024-03-01T00:00:00Z'
      },
      {
        id: 'assign-2',
        title: 'Project Fisika - Hukum Newton',
        description: 'Buat eksperimen sederhana tentang hukum Newton',
        class_subject_id: 'cs-2',
        assignment_type: 'project',
        due_date: '2024-03-25T23:59:59Z',
        max_score: 100,
        instructions: 'Buat laporan lengkap dengan foto dan video',
        is_published: false,
        created_by: 'teacher-2',
        created_at: '2024-03-05T00:00:00Z'
      }
    ];

    const filtered = mockAssignments.filter(a => 
      !pagination.search || 
      a.title.toLowerCase().includes(pagination.search.toLowerCase()) ||
      a.description?.toLowerCase().includes(pagination.search.toLowerCase())
    );

    const startIndex = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const paginatedData = filtered.slice(startIndex, startIndex + (pagination.limit || 10));

    setAssignments({
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
  useEffect(() => { loadAssignments(); }, [pagination]);

  const resetForm = () => {
    setEditingAssignment(null);
    setAssignmentForm({
      assignment_type: 'homework',
      is_published: false
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAssignment) {
      console.log('Updating assignment:', editingAssignment.id, assignmentForm);
    } else {
      console.log('Creating assignment:', assignmentForm);
    }
    resetForm();
    loadAssignments();
  };

  const onEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setAssignmentForm({
      title: assignment.title,
      description: assignment.description,
      class_subject_id: assignment.class_subject_id,
      assignment_type: assignment.assignment_type,
      due_date: assignment.due_date,
      max_score: assignment.max_score,
      instructions: assignment.instructions,
      is_published: assignment.is_published
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus tugas ini?')) return;
    console.log('Deleting assignment:', id);
    loadAssignments();
  };

  const classSubjectOptions = classSubjects.map(cs => {
    const cls = schoolService.listClassesRaw().find(c => c.id === cs.class_id);
    const sub = schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id);
    return { 
      value: cs.id, 
      label: `${cls?.name ?? cs.class_id} - ${sub?.name ?? cs.subject_id}` 
    };
  });

  const typeOptions = [
    { value: 'homework', label: 'Pekerjaan Rumah' },
    { value: 'project', label: 'Proyek' },
    { value: 'quiz', label: 'Kuis' },
    { value: 'essay', label: 'Esai' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'homework': return 'bg-blue-100 text-blue-700';
      case 'project': return 'bg-green-100 text-green-700';
      case 'quiz': return 'bg-yellow-100 text-yellow-700';
      case 'essay': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manajemen Tugas</h1>
        <Button onClick={() => setEditingAssignment({} as Assignment)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Tugas
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari tugas..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={pagination.search || ''}
                onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Assignment Form */}
      {editingAssignment && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingAssignment.id ? 'Edit Tugas' : 'Tambah Tugas Baru'}
          </h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul Tugas</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={assignmentForm.title ?? ''}
                onChange={(e) => setAssignmentForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Tugas</label>
              <SearchSelect
                options={typeOptions}
                value={assignmentForm.assignment_type ?? 'homework'}
                onChange={(v) => setAssignmentForm(f => ({ ...f, assignment_type: String(v) as any }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Kelas & Mata Pelajaran</label>
              <SearchSelect
                options={classSubjectOptions}
                value={assignmentForm.class_subject_id ?? ''}
                onChange={(v) => setAssignmentForm(f => ({ ...f, class_subject_id: String(v) }))}
                placeholder="Pilih kelas dan mapel"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Batas Waktu</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border rounded-lg"
                value={assignmentForm.due_date?.slice(0, 16) ?? ''}
                onChange={(e) => setAssignmentForm(f => ({ ...f, due_date: e.target.value + ':00Z' }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nilai Maksimal</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                value={assignmentForm.max_score ?? 100}
                onChange={(e) => setAssignmentForm(f => ({ ...f, max_score: Number(e.target.value) }))}
                min={1}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                value={assignmentForm.description ?? ''}
                onChange={(e) => setAssignmentForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Instruksi</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                value={assignmentForm.instructions ?? ''}
                onChange={(e) => setAssignmentForm(f => ({ ...f, instructions: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="is_published"
                type="checkbox"
                checked={assignmentForm.is_published ?? false}
                onChange={(e) => setAssignmentForm(f => ({ ...f, is_published: e.target.checked }))}
              />
              <label htmlFor="is_published">Publikasikan</label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingAssignment.id ? 'Update' : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Batal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Assignments List */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Tugas</th>
                <th className="text-left py-3 px-4">Kelas & Mapel</th>
                <th className="text-left py-3 px-4">Jenis</th>
                <th className="text-left py-3 px-4">Batas Waktu</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {assignments.data.map((assignment) => {
                const cs = classSubjects.find(cs => cs.id === assignment.class_subject_id);
                const cls = cs ? schoolService.listClassesRaw().find(c => c.id === cs.class_id) : null;
                const sub = cs ? schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id) : null;
                
                return (
                  <tr key={assignment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        {assignment.description && (
                          <div className="text-sm text-gray-500">{assignment.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {cls?.name} - {sub?.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(assignment.assignment_type)}`}>
                        {typeOptions.find(t => t.value === assignment.assignment_type)?.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(assignment.due_date).toLocaleString('id-ID')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        assignment.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {assignment.is_published ? 'Dipublikasi' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => onEdit(assignment)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => onDelete(assignment.id)}>
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

        {assignments.total === 0 && (
          <div className="text-center py-8 text-gray-500">
            Belum ada tugas yang dibuat
          </div>
        )}
      </Card>
    </div>
  );
}
