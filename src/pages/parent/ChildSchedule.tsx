import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, BookOpen, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface ScheduleItem {
  id: number;
  day: string;
  time_start: string;
  time_end: string;
  subject: string;
  teacher: string;
  room: string;
}

interface Child {
  id: number;
  name: string;
  class: string;
  student_id: string;
}

export default function ChildSchedule() {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Mock data
  const [children] = useState<Child[]>([
    { id: 1, name: 'Ahmad Rizki Pratama', class: 'XII IPA 1', student_id: '2024001' },
    { id: 2, name: 'Siti Nurhaliza Pratama', class: 'X MIPA 2', student_id: '2024002' }
  ]);

  const [schedules] = useState<Record<number, ScheduleItem[]>>({
    1: [
      {
        id: 1,
        day: 'Senin',
        time_start: '07:00',
        time_end: '08:30',
        subject: 'Matematika',
        teacher: 'Dra. Siti Aminah',
        room: 'XII-1'
      },
      {
        id: 2,
        day: 'Senin',
        time_start: '08:30',
        time_end: '10:00',
        subject: 'Fisika',
        teacher: 'Ahmad Fauzi, S.Pd',
        room: 'Lab Fisika'
      },
      {
        id: 3,
        day: 'Senin',
        time_start: '10:15',
        time_end: '11:45',
        subject: 'Kimia',
        teacher: 'Dr. Budi Santoso',
        room: 'Lab Kimia'
      },
      {
        id: 4,
        day: 'Selasa',
        time_start: '07:00',
        time_end: '08:30',
        subject: 'Biologi',
        teacher: 'Dra. Rina Sari',
        room: 'XII-1'
      },
      {
        id: 5,
        day: 'Selasa',
        time_start: '08:30',
        time_end: '10:00',
        subject: 'Bahasa Indonesia',
        teacher: 'Drs. Hasan Basri',
        room: 'XII-1'
      }
    ],
    2: [
      {
        id: 6,
        day: 'Senin',
        time_start: '07:00',
        time_end: '08:30',
        subject: 'Matematika',
        teacher: 'Dra. Siti Aminah',
        room: 'X-2'
      },
      {
        id: 7,
        day: 'Senin',
        time_start: '08:30',
        time_end: '10:00',
        subject: 'Bahasa Inggris',
        teacher: 'Sarah Johnson, S.Pd',
        room: 'X-2'
      }
    ]
  });

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const selectedChildData = children.find(child => child.id === selectedChild);
  const childSchedule = schedules[selectedChild] || [];

  const getScheduleByDay = (day: string) => {
    return childSchedule.filter(item => item.day === day).sort((a, b) => 
      a.time_start.localeCompare(b.time_start)
    );
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

    return `${startOfWeek.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Jadwal Pelajaran Anak</h1>
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
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[200px] text-center">
              {formatWeekRange(currentWeek)}
            </span>
            <Button variant="secondary" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
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

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {days.map(day => {
          const daySchedule = getScheduleByDay(day);
          return (
            <Card key={day}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary-600" />
                <h3 className="font-medium text-gray-900">{day}</h3>
              </div>
              
              <div className="space-y-3">
                {daySchedule.length > 0 ? (
                  daySchedule.map(item => (
                    <div key={item.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600 min-w-[80px]">
                          <Clock className="h-4 w-4" />
                          <span>{item.time_start}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="h-4 w-4 text-primary-600" />
                            <h4 className="font-medium text-gray-900">{item.subject}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{item.teacher}</p>
                          <p className="text-xs text-gray-500">Ruang: {item.room}</p>
                          <p className="text-xs text-gray-500">
                            {item.time_start} - {item.time_end}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Tidak ada jadwal</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly Summary */}
      <Card>
        <h3 className="font-medium mb-4">Ringkasan Minggu Ini</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{childSchedule.length}</p>
            <p className="text-sm text-gray-600">Total Mata Pelajaran</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {new Set(childSchedule.map(s => s.subject)).size}
            </p>
            <p className="text-sm text-gray-600">Mata Pelajaran Unik</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {new Set(childSchedule.map(s => s.teacher)).size}
            </p>
            <p className="text-sm text-gray-600">Guru Pengajar</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {childSchedule.filter(s => s.room.includes('Lab')).length}
            </p>
            <p className="text-sm text-gray-600">Praktikum Lab</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
