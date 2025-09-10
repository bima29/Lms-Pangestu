import React from 'react';
import { Users, BookOpen, Trophy, Calendar, Bell, Clock, AlertCircle } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const children = [
    {
      id: '1',
      name: 'Andi Pratama',
      class: 'XII IPA 1',
      studentId: 'STU001',
      avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      averageGrade: 85,
      attendance: 95,
      recentActivities: [
        { type: 'grade', subject: 'Matematika', score: 88, date: '2025-01-10' },
        { type: 'assignment', subject: 'Fisika', title: 'Laporan Praktikum', status: 'submitted', date: '2025-01-09' }
      ]
    }
  ];

  const upcomingEvents = [
    { date: '2025-01-15', event: 'Ujian Tengah Semester - Matematika', type: 'exam' },
    { date: '2025-01-18', event: 'Deadline Tugas Fisika', type: 'assignment' },
    { date: '2025-01-20', event: 'Rapat Orang Tua', type: 'meeting' },
    { date: '2025-01-22', event: 'Presentasi Biologi', type: 'presentation' }
  ];

  const notifications = [
    { id: '1', message: 'Nilai Matematika Andi telah diperbarui', time: '2 jam lalu', type: 'grade' },
    { id: '2', message: 'Tugas Fisika berhasil dikumpulkan', time: '1 hari lalu', type: 'assignment' },
    { id: '3', message: 'Absensi hari ini: Hadir', time: '1 hari lalu', type: 'attendance' }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800';
      case 'assignment': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'presentation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Orang Tua</h1>
        <div className="text-sm text-gray-500">
          Terakhir diperbarui: {new Date().toLocaleString('id-ID')}
        </div>
      </div>

      {/* Children Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children.map((child) => (
          <div key={child.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={child.avatar}
                alt={child.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{child.name}</h3>
                <p className="text-gray-500">{child.class} • {child.studentId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{child.averageGrade}</p>
                <p className="text-sm text-gray-600">Rata-rata Nilai</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{child.attendance}%</p>
                <p className="text-sm text-gray-600">Kehadiran</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Aktivitas Terbaru</h4>
              <div className="space-y-2">
                {child.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      {activity.type === 'grade' ? (
                        <Trophy className="h-4 w-4 text-blue-600" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-green-600" />
                      )}
                      <span className="text-sm text-gray-700">
                        {activity.type === 'grade' 
                          ? `${activity.subject}: ${activity.score}`
                          : `${activity.title} - ${activity.status}`}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tugas Aktif</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Nilai Terbaru</p>
              <p className="text-2xl font-bold text-gray-900">88</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ujian Mendatang</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Perlu Perhatian</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Jadwal Mendatang
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                    {event.type === 'exam' && 'Ujian'}
                    {event.type === 'assignment' && 'Tugas'}
                    {event.type === 'meeting' && 'Rapat'}
                    {event.type === 'presentation' && 'Presentasi'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifikasi Terbaru
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
