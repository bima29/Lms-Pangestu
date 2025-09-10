import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download
} from 'lucide-react';
import type { 
  Attendance, 
  ClassSubject,
  Student,
  PaginationParams, 
  PaginationResult 
} from '../../types';
import { schoolService } from '../../services/schoolService';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolAttendance() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [attendances, setAttendances] = useState<PaginationResult<Attendance>>({ 
    data: [], total: 0, page: 1, limit: 10, total_pages: 0 
  });
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedClassSubject, setSelectedClassSubject] = useState<string>('all');

  const loadAttendances = () => {
    // Mock implementation - replace with actual API call
    const mockAttendances: Attendance[] = [
      {
        id: 'att-1',
        date: '2024-03-15',
        class_subject_id: 'cs-1',
        student_id: 'std-1',
        status: 'present',
        notes: '',
        recorded_by: 'teacher-1',
        recorded_at: '2024-03-15T08:00:00Z'
      },
      {
        id: 'att-2',
        date: '2024-03-15',
        class_subject_id: 'cs-1',
        student_id: 'std-2',
        status: 'absent',
        notes: 'Sakit',
        recorded_by: 'teacher-1',
        recorded_at: '2024-03-15T08:00:00Z'
      },
      {
        id: 'att-3',
        date: '2024-03-15',
        class_subject_id: 'cs-1',
        student_id: 'std-3',
        status: 'late',
        notes: 'Terlambat 15 menit',
        recorded_by: 'teacher-1',
        recorded_at: '2024-03-15T08:15:00Z'
      }
    ];

    let filtered = mockAttendances.filter(a => a.date === selectedDate);
    
    if (selectedClassSubject !== 'all') {
      filtered = filtered.filter(a => a.class_subject_id === selectedClassSubject);
    }

    const startIndex = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const paginatedData = filtered.slice(startIndex, startIndex + (pagination.limit || 10));

    setAttendances({
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
  useEffect(() => { loadAttendances(); }, [pagination, selectedDate, selectedClassSubject]);

  const onUpdateAttendance = (id: string, status: string, notes?: string) => {
    console.log('Updating attendance:', id, status, notes);
    loadAttendances();
  };

  const exportAttendance = () => {
    console.log('Exporting attendance data...');
    alert('Mengekspor data kehadiran...');
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

  const statusOptions = [
    { value: 'present', label: 'Hadir' },
    { value: 'absent', label: 'Tidak Hadir' },
    { value: 'late', label: 'Terlambat' },
    { value: 'excused', label: 'Izin' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'absent': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'late': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'excused': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'absent': return 'bg-red-100 text-red-700';
      case 'late': return 'bg-yellow-100 text-yellow-700';
      case 'excused': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Mock students data
  const mockStudents: Student[] = [
    { id: 'std-1', user_id: 'user-1', student_id: 'STD001', class_id: 'cls-1', parent_id: 'parent-1', enrollment_date: '2024-01-01', status: 'active', created_at: '2024-01-01T00:00:00Z' },
    { id: 'std-2', user_id: 'user-2', student_id: 'STD002', class_id: 'cls-1', parent_id: 'parent-2', enrollment_date: '2024-01-01', status: 'active', created_at: '2024-01-01T00:00:00Z' },
    { id: 'std-3', user_id: 'user-3', student_id: 'STD003', class_id: 'cls-1', parent_id: 'parent-3', enrollment_date: '2024-01-01', status: 'active', created_at: '2024-01-01T00:00:00Z' }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manajemen Kehadiran</h1>
        <Button onClick={exportAttendance} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kelas & Mata Pelajaran</label>
            <SearchSelect
              options={classSubjectOptions}
              value={selectedClassSubject}
              onChange={setSelectedClassSubject}
              placeholder="Pilih kelas dan mapel"
            />
          </div>
          <div className="flex items-end">
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Hadir</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Tidak Hadir</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Terlambat</p>
              <p className="text-2xl font-bold">1</p>
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
      </div>

      {/* Attendance List */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Siswa</th>
                <th className="text-left py-3 px-4">Kelas & Mapel</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Catatan</th>
                <th className="text-left py-3 px-4">Waktu Dicatat</th>
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {attendances.data.map((attendance) => {
                const cs = classSubjects.find(cs => cs.id === attendance.class_subject_id);
                const cls = cs ? schoolService.listClassesRaw().find(c => c.id === cs.class_id) : null;
                const sub = cs ? schoolService.listSubjectsRaw().find(s => s.id === cs.subject_id) : null;
                
                return (
                  <tr key={attendance.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {getStudentName(attendance.student_id).charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{getStudentName(attendance.student_id)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {cls?.name} - {sub?.name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(attendance.status)}
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(attendance.status)}`}>
                          {statusOptions.find(s => s.value === attendance.status)?.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{attendance.notes || '-'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(attendance.recorded_at).toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <SearchSelect
                          options={statusOptions}
                          value={attendance.status}
                          onChange={(v) => onUpdateAttendance(attendance.id, String(v))}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {attendances.total === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Belum ada data kehadiran untuk tanggal yang dipilih</p>
          </div>
        )}
      </Card>
    </div>
  );
}
