import React, { useState, useEffect, useMemo } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Play, 
  Users, 
  FileText, 
  Search, 
  Calendar 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect, { Option } from '../../components/ui/SearchSelect';
import type { 
  CBTSession, 
  ClassSubject,
  PaginationParams, 
  PaginationResult 
} from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

type TabKey = 'sessions' | 'questions' | 'results';

export default function SchoolCBT() {
  const [activeTab, setActiveTab] = useState<TabKey>('sessions');
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  
  // Sessions state
  const [sessions, setSessions] = useState<PaginationResult<CBTSession>>({ 
    data: [], total: 0, page: 1, limit: 10, total_pages: 0 
  });
  const [editingSession, setEditingSession] = useState<CBTSession | null>(null);
  const [sessionForm, setSessionForm] = useState<Partial<CBTSession>>({
    duration_minutes: 90,
    total_questions: 10,
    passing_score: 70,
    shuffle_questions: true,
    show_results: true,
    is_active: false
  });

  // Lookup data
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);

  const loadSessions = () => {
    // Mock implementation - replace with actual API call
    const mockSessions: CBTSession[] = [
      {
        id: 'cbt-1',
        title: 'Ujian Tengah Semester Matematika',
        description: 'UTS Matematika Kelas XII IPA',
        subject_id: 'subj-1',
        class_id: 'cls-1',
        teacher_id: 'teacher-1',
        start_time: '2024-03-15T08:00:00Z',
        end_time: '2024-03-15T10:00:00Z',
        duration_minutes: 90,
        total_questions: 20,
        passing_score: 75,
        shuffle_questions: true,
        show_results: true,
        is_active: true,
        created_at: '2024-03-01T00:00:00Z'
      },
      {
        id: 'cbt-2',
        title: 'Quiz Fisika Bab 3',
        description: 'Quiz tentang Gelombang dan Bunyi',
        subject_id: 'subj-2',
        class_id: 'cls-2',
        teacher_id: 'teacher-2',
        start_time: '2024-03-20T10:00:00Z',
        end_time: '2024-03-20T11:00:00Z',
        duration_minutes: 60,
        total_questions: 15,
        passing_score: 70,
        shuffle_questions: false,
        show_results: false,
        is_active: false,
        created_at: '2024-03-10T00:00:00Z'
      }
    ];

    const filtered = mockSessions.filter(s => 
      !pagination.search || 
      s.title.toLowerCase().includes(pagination.search.toLowerCase()) ||
      s.description?.toLowerCase().includes(pagination.search.toLowerCase())
    );

    const start = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const end = start + (pagination.limit || 10);
    const paginatedData = filtered.slice(start, end);

    setSessions({
      data: paginatedData,
      total: filtered.length,
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total_pages: Math.ceil(filtered.length / (pagination.limit || 10))
    });
  };

  const loadLookups = () => {
    setClassSubjects(schoolService.listClassSubjectsRaw());
  };

  useEffect(() => { loadLookups(); }, []);
  useEffect(() => { loadSessions(); }, [pagination]);

  const isSessionValid = useMemo(() => {
    return !!sessionForm.title && !!sessionForm.subject_id && !!sessionForm.class_id &&
           !!sessionForm.start_time && !!sessionForm.end_time &&
           typeof sessionForm.duration_minutes === 'number';
  }, [sessionForm]);

  const resetSessionForm = () => {
    setEditingSession(null);
    setSessionForm({
      duration_minutes: 90,
      total_questions: 10,
      passing_score: 70,
      shuffle_questions: true,
      show_results: true,
      is_active: false
    });
  };

  const onSubmitSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSessionValid) return;

    if (editingSession) {
      // Update session logic
      console.log('Updating session:', editingSession.id, sessionForm);
    } else {
      // Create session logic
      const newSession: CBTSession = {
        id: `cbt-${Date.now()}`,
        title: sessionForm.title!,
        description: sessionForm.description,
        subject_id: sessionForm.subject_id!,
        class_id: sessionForm.class_id!,
        teacher_id: 'current-teacher-id',
        start_time: sessionForm.start_time!,
        end_time: sessionForm.end_time!,
        duration_minutes: sessionForm.duration_minutes!,
        total_questions: sessionForm.total_questions || 10,
        passing_score: sessionForm.passing_score || 70,
        shuffle_questions: sessionForm.shuffle_questions ?? true,
        show_results: sessionForm.show_results ?? true,
        is_active: sessionForm.is_active ?? false,
        created_at: new Date().toISOString()
      };
      console.log('Creating session:', newSession);
    }
    resetSessionForm();
    loadSessions();
  };

  const onEditSession = (session: CBTSession) => {
    setEditingSession(session);
    setSessionForm({
      title: session.title,
      description: session.description,
      subject_id: session.subject_id,
      class_id: session.class_id,
      start_time: session.start_time,
      end_time: session.end_time,
      duration_minutes: session.duration_minutes,
      total_questions: session.total_questions,
      passing_score: session.passing_score,
      shuffle_questions: session.shuffle_questions,
      show_results: session.show_results,
      is_active: session.is_active
    });
  };

  const onDeleteSession = (id: string) => {
    if (!confirm('Hapus sesi CBT ini?')) return;
    console.log('Deleting session:', id);
    loadSessions();
  };

  const onUpdateSessionStatus = (id: string, isActive: boolean) => {
    console.log('Updating session status:', id, isActive);
    loadSessions();
  };

  const classSubjectOptions: Option<string>[] = classSubjects.map(cs => {
    const cls = schoolService.listClassesRaw().find(c => c.id === cs.class_id);
    const sub = schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id);
    return { 
      value: cs.id, 
      label: `${cls?.name ?? cs.class_id} - ${sub?.name ?? cs.subject_id}` 
    };
  });

  const statusOptions: Option<string>[] = [
    { value: 'false', label: 'Draft' },
    { value: 'true', label: 'Aktif' }
  ];

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? 'Aktif' : 'Draft';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">CBT Management</h1>
        <Button 
          onClick={() => setActiveTab('sessions')} 
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Sesi Baru
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'sessions', label: 'Sesi CBT', icon: Calendar },
          { key: 'questions', label: 'Bank Soal', icon: FileText },
          { key: 'results', label: 'Hasil', icon: Users }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as TabKey)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <>
          <Card>
            <form onSubmit={onSubmitSession} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Judul CBT</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  value={sessionForm.title ?? ''}
                  onChange={(e) => setSessionForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Contoh: Ujian Tengah Semester Matematika"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <SearchSelect
                  options={statusOptions}
                  value={sessionForm.is_active ? 'true' : 'false'}
                  onChange={(v) => setSessionForm(f => ({ ...f, is_active: String(v) === 'true' }))}
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  value={sessionForm.description ?? ''}
                  onChange={(e) => setSessionForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Deskripsi ujian..."
                  rows={2}
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1">Kelas & Mata Pelajaran</label>
                <SearchSelect
                  options={classSubjectOptions}
                  value={sessionForm.subject_id ?? ''}
                  onChange={(v) => {
                    const cs = classSubjects.find(cs => cs.id === String(v));
                    if (cs) {
                      setSessionForm(f => ({ ...f, subject_id: cs.subject_id, class_id: cs.class_id }));
                    }
                  }}
                  placeholder="Pilih kelas dan mapel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Waktu Mulai</label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={sessionForm.start_time?.slice(0, 16) ?? ''}
                  onChange={(e) => setSessionForm(f => ({ ...f, start_time: e.target.value + ':00Z' }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Waktu Selesai</label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={sessionForm.end_time?.slice(0, 16) ?? ''}
                  onChange={(e) => setSessionForm(f => ({ ...f, end_time: e.target.value + ':00Z' }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Durasi (menit)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={sessionForm.duration_minutes ?? 90}
                  onChange={(e) => setSessionForm(f => ({ ...f, duration_minutes: Number(e.target.value) }))}
                  min={1}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nilai Kelulusan (%)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={sessionForm.passing_score ?? 70}
                  onChange={(e) => setSessionForm(f => ({ ...f, passing_score: Number(e.target.value) }))}
                  min={0}
                  max={100}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="show_results"
                  type="checkbox"
                  checked={sessionForm.show_results ?? true}
                  onChange={(e) => setSessionForm(f => ({ ...f, show_results: e.target.checked }))}
                />
                <label htmlFor="show_results">Tampilkan Hasil</label>
              </div>
              <div className="flex items-end gap-2">
                <Button type="submit" disabled={!isSessionValid}>
                  {editingSession ? 'Update' : 'Buat Sesi'}
                </Button>
                {editingSession && (
                  <Button type="button" variant="secondary" onClick={resetSessionForm}>
                    Batal
                  </Button>
                )}
              </div>
            </form>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  className="px-3 py-2 border rounded-lg"
                  placeholder="Cari sesi CBT..."
                  value={pagination.search ?? ''}
                  onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
                />
              </div>
              <span className="text-sm text-gray-500">Total: {sessions.total}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-3 py-2">Judul</th>
                    <th className="px-3 py-2">Kelas & Mapel</th>
                    <th className="px-3 py-2">Waktu</th>
                    <th className="px-3 py-2">Durasi</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.data.map((session) => {
                    const cls = schoolService.listClassesRaw().find(c => c.id === session.class_id);
                    const sub = schoolService.listSubjectsRaw().find(s => s.id === session.subject_id);
                    
                    return (
                      <tr key={session.id} className="border-t">
                        <td className="px-3 py-2">
                          <div>
                            <div className="font-medium">{session.title}</div>
                            {session.description && (
                              <div className="text-xs text-gray-500">{session.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          {cls?.name} - {sub?.name}
                        </td>
                        <td className="px-3 py-2">
                          <div className="text-xs">
                            <div>{new Date(session.start_time).toLocaleString('id-ID')}</div>
                            <div className="text-gray-500">s/d {new Date(session.end_time).toLocaleString('id-ID')}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2">{session.duration_minutes} menit</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(session.is_active)}`}>
                            {getStatusLabel(session.is_active)}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            <Button size="sm" variant="secondary" onClick={() => onEditSession(session)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Eye className="h-3 w-3" />
                            </Button>
                            {!session.is_active && (
                              <Button 
                                size="sm" 
                                variant="primary" 
                                onClick={() => onUpdateSessionStatus(session.id, true)}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                            {session.is_active && (
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                onClick={() => onUpdateSessionStatus(session.id, false)}
                              >
                                <FileText className="h-3 w-3" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="danger" 
                              onClick={() => onDeleteSession(session.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Halaman {sessions.page} dari {Math.max(1, sessions.total_pages)}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  disabled={sessions.page <= 1}
                  onClick={() => setPagination(p => ({ ...p, page: Math.max(1, (p.page ?? 1) - 1) }))}
                >
                  Prev
                </Button>
                <Button
                  variant="secondary"
                  disabled={sessions.page >= sessions.total_pages}
                  onClick={() => setPagination(p => ({ ...p, page: Math.min(sessions.total_pages, (p.page ?? 1) + 1) }))}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Bank Soal</h2>
          <p className="text-gray-600">Fitur manajemen soal akan segera tersedia.</p>
        </Card>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Hasil CBT</h2>
          <p className="text-gray-600">Fitur analisis hasil akan segera tersedia.</p>
        </Card>
      )}
    </div>
  );
}
