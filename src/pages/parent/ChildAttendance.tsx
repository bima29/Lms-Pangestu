import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, User, Filter, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface AttendanceRecord {
  id: number;
  date: string;
  subject: string;
  teacher: string;
  status: 'present' | 'absent' | 'late' | 'sick' | 'permit';
  time_in?: string;
  notes?: string;
}

interface Child {
  id: number;
  name: string;
  class: string;
  student_id: string;
}

export default function ChildAttendance() {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const [children] = useState<Child[]>([
    { id: 1, name: 'Ahmad Rizki Pratama', class: 'XII IPA 1', student_id: '2024001' },
    { id: 2, name: 'Siti Nurhaliza Pratama', class: 'X MIPA 2', student_id: '2024002' }
  ]);

  const [attendanceRecords] = useState<Record<number, AttendanceRecord[]>>({
    1: [
      {
        id: 1,
        date: '2024-01-23',
        subject: 'Matematika',
        teacher: 'Dra. Siti Aminah',
        status: 'present',
        time_in: '07:15'
      },
      {
        id: 2,
        date: '2024-01-23',
        subject: 'Fisika',
        teacher: 'Ahmad Fauzi, S.Pd',
        status: 'late',
        time_in: '08:35',
        notes: 'Terlambat 5 menit'
      },
      {
        id: 3,
        date: '2024-01-22',
        subject: 'Kimia',
        teacher: 'Dr. Budi Santoso',
        status: 'present',
        time_in: '09:00'
      },
      {
        id: 4,
        date: '2024-01-22',
        subject: 'Biologi',
        teacher: 'Dra. Rina Sari',
        status: 'sick',
        notes: 'Sakit demam'
      },
      {
        id: 5,
        date: '2024-01-21',
        subject: 'Bahasa Indonesia',
        teacher: 'Drs. Hasan Basri',
        status: 'absent',
        notes: 'Tanpa keterangan'
      },
      {
        id: 6,
        date: '2024-01-20',
        subject: 'Matematika',
        teacher: 'Dra. Siti Aminah',
        status: 'present',
        time_in: '07:10'
      }
    ],
    2: [
      {
        id: 7,
        date: '2024-01-23',
        subject: 'Matematika',
        teacher: 'Dra. Siti Aminah',
        status: 'present',
        time_in: '07:20'
      },
      {
        id: 8,
        date: '2024-01-22',
        subject: 'Bahasa Inggris',
        teacher: 'Sarah Johnson, S.Pd',
        status: 'present',
        time_in: '08:00'
      }
    ]
  });

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const statusConfig = {
    present: { label: 'Hadir', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    late: { label: 'Terlambat', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    absent: { label: 'Tidak Hadir', color: 'bg-red-100 text-red-800', icon: XCircle },
    sick: { label: 'Sakit', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
    permit: { label: 'Izin', color: 'bg-purple-100 text-purple-800', icon: AlertCircle }
  };

  const selectedChildData = children.find(child => child.id === selectedChild);
  const childRecords = attendanceRecords[selectedChild] || [];

  const filteredRecords = childRecords.filter(record => {
    const recordDate = new Date(record.date);
    const matchesMonth = recordDate.getMonth() === selectedMonth;
    const matchesYear = recordDate.getFullYear() === selectedYear;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    
    return matchesMonth && matchesYear && matchesStatus;
  });

  // Calculate statistics
  const totalRecords = filteredRecords.length;
  const presentCount = filteredRecords.filter(r => r.status === 'present').length;
  const lateCount = filteredRecords.filter(r => r.status === 'late').length;
  const absentCount = filteredRecords.filter(r => r.status === 'absent').length;
  const sickCount = filteredRecords.filter(r => r.status === 'sick').length;
  const permitCount = filteredRecords.filter(r => r.status === 'permit').length;
  
  const attendancePercentage = totalRecords > 0 ? Math.round(((presentCount + lateCount) / totalRecords) * 100) : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Absensi Anak</h1>
      </div>

      {/* Child Selector & Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
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
          
          <div className="flex gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Bulan</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tahun</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">Semua</option>
                  <option value="present">Hadir</option>
                  <option value="late">Terlambat</option>
                  <option value="absent">Tidak Hadir</option>
                  <option value="sick">Sakit</option>
                  <option value="permit">Izin</option>
                </select>
              </div>
            </div>
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

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-primary-600" />
              <p className="text-2xl font-bold text-primary-600">{attendancePercentage}%</p>
            </div>
            <p className="text-sm text-gray-600">Kehadiran</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            <p className="text-sm text-gray-600">Hadir</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
            <p className="text-sm text-gray-600">Terlambat</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            <p className="text-sm text-gray-600">Tidak Hadir</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{sickCount}</p>
            <p className="text-sm text-gray-600">Sakit</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{permitCount}</p>
            <p className="text-sm text-gray-600">Izin</p>
          </div>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            Riwayat Absensi - {months[selectedMonth]} {selectedYear}
          </h3>
          <span className="text-sm text-gray-500">
            {filteredRecords.length} dari {totalRecords} catatan
          </span>
        </div>

        <div className="space-y-3">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => {
              const StatusIcon = statusConfig[record.status].icon;
              return (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium min-w-[150px]">{formatDate(record.date)}</span>
                    </div>
                    <div className="min-w-[120px]">
                      <p className="font-medium">{record.subject}</p>
                      <p className="text-sm text-gray-600">{record.teacher}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {record.time_in && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {record.time_in}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-4 w-4" />
                      <span className={`px-2 py-1 text-xs rounded-full ${statusConfig[record.status].color}`}>
                        {statusConfig[record.status].label}
                      </span>
                    </div>
                    {record.notes && (
                      <div className="text-sm text-gray-500 italic max-w-[200px] truncate">
                        {record.notes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada data absensi untuk periode yang dipilih</p>
            </div>
          )}
        </div>
      </Card>

      {/* Monthly Summary */}
      {totalRecords > 0 && (
        <Card>
          <h3 className="text-lg font-medium mb-4">Ringkasan Bulanan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Tingkat Kehadiran</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Hadir + Terlambat</span>
                  <span className="font-medium">{attendancePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Evaluasi</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {attendancePercentage >= 95 && (
                  <p className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Kehadiran sangat baik
                  </p>
                )}
                {attendancePercentage >= 85 && attendancePercentage < 95 && (
                  <p className="text-blue-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Kehadiran baik
                  </p>
                )}
                {attendancePercentage >= 75 && attendancePercentage < 85 && (
                  <p className="text-yellow-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Kehadiran cukup baik
                  </p>
                )}
                {attendancePercentage < 75 && (
                  <p className="text-red-600 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    Kehadiran perlu ditingkatkan
                  </p>
                )}
                {lateCount > 3 && (
                  <p className="text-yellow-600 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Sering terlambat ({lateCount} kali)
                  </p>
                )}
                {absentCount > 0 && (
                  <p className="text-red-600 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    Ada {absentCount} kali tidak hadir tanpa keterangan
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
