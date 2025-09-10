import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';

const StudentSchedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const schedule = [
    {
      id: '1',
      day: 'Senin',
      date: '2025-01-13',
      subjects: [
        { time: '07:00-08:30', subject: 'Matematika', teacher: 'Pak Budi Santoso', room: 'XII-A', type: 'regular' },
        { time: '08:30-10:00', subject: 'Fisika', teacher: 'Ibu Sari Dewi', room: 'Lab Fisika', type: 'lab' },
        { time: '10:15-11:45', subject: 'Bahasa Indonesia', teacher: 'Ibu Maya', room: 'XII-A', type: 'regular' },
        { time: '12:30-14:00', subject: 'Kimia', teacher: 'Pak Ahmad', room: 'Lab Kimia', type: 'lab' }
      ]
    },
    {
      id: '2',
      day: 'Selasa',
      date: '2025-01-14',
      subjects: [
        { time: '07:00-08:30', subject: 'Biologi', teacher: 'Ibu Sari Dewi', room: 'XII-A', type: 'regular' },
        { time: '08:30-10:00', subject: 'Bahasa Inggris', teacher: 'Mr. John', room: 'XII-A', type: 'regular' },
        { time: '10:15-11:45', subject: 'Sejarah', teacher: 'Pak Rudi', room: 'XII-A', type: 'regular' },
        { time: '12:30-14:00', subject: 'Matematika', teacher: 'Pak Budi Santoso', room: 'XII-A', type: 'regular' }
      ]
    },
    {
      id: '3',
      day: 'Rabu',
      date: '2025-01-15',
      subjects: [
        { time: '07:00-08:30', subject: 'Fisika', teacher: 'Ibu Sari Dewi', room: 'XII-A', type: 'regular' },
        { time: '08:30-10:00', subject: 'Kimia', teacher: 'Pak Ahmad', room: 'XII-A', type: 'regular' },
        { time: '10:15-11:45', subject: 'CBT Matematika', teacher: 'Pak Budi Santoso', room: 'Lab Komputer', type: 'exam' },
        { time: '12:30-14:00', subject: 'Olahraga', teacher: 'Pak Yoga', room: 'Lapangan', type: 'sport' }
      ]
    },
    {
      id: '4',
      day: 'Kamis',
      date: '2025-01-16',
      subjects: [
        { time: '07:00-08:30', subject: 'Matematika', teacher: 'Pak Budi Santoso', room: 'XII-A', type: 'regular' },
        { time: '08:30-10:00', subject: 'Biologi', teacher: 'Ibu Sari Dewi', room: 'Lab Biologi', type: 'lab' },
        { time: '10:15-11:45', subject: 'Bahasa Indonesia', teacher: 'Ibu Maya', room: 'XII-A', type: 'regular' },
        { time: '12:30-14:00', subject: 'Seni Budaya', teacher: 'Ibu Rina', room: 'Ruang Seni', type: 'regular' }
      ]
    },
    {
      id: '5',
      day: 'Jumat',
      date: '2025-01-17',
      subjects: [
        { time: '07:00-08:30', subject: 'Agama', teacher: 'Pak Imam', room: 'XII-A', type: 'regular' },
        { time: '08:30-10:00', subject: 'PKN', teacher: 'Ibu Dewi', room: 'XII-A', type: 'regular' },
        { time: '10:15-11:45', subject: 'Bahasa Inggris', teacher: 'Mr. John', room: 'XII-A', type: 'regular' }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'lab': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sport': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam': return '📝';
      case 'lab': return '🔬';
      case 'sport': return '⚽';
      default: return '📚';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Jadwal Pelajaran</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Minggu ini: 13 - 17 Januari 2025
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {schedule.map((day) => (
          <div key={day.id} className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h3 className="font-semibold text-gray-900">{day.day}</h3>
              <p className="text-sm text-gray-500">
                {new Date(day.date).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short' 
                })}
              </p>
            </div>
            <div className="p-4 space-y-3">
              {day.subjects.map((subject, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${getTypeColor(subject.type)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(subject.type)}</span>
                      <h4 className="font-medium text-sm">{subject.subject}</h4>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{subject.time}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                      <User className="h-3 w-3" />
                      <span>{subject.teacher}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{subject.room}</span>
                    </div>
                  </div>
                </div>
              ))}
              {day.subjects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="mx-auto h-8 w-8 mb-2" />
                  <p className="text-sm">Tidak ada jadwal</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Keterangan:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📚</span>
            <span className="text-sm text-gray-600">Pelajaran Regular</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔬</span>
            <span className="text-sm text-gray-600">Praktikum Lab</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">📝</span>
            <span className="text-sm text-gray-600">Ujian/CBT</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">⚽</span>
            <span className="text-sm text-gray-600">Olahraga</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;
