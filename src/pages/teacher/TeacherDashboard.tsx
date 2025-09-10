import React from 'react';
import { 
  Users, 
  BookOpen, 
  FileText, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';

const TeacherDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Kelas',
      value: '5',
      icon: Users,
      color: 'bg-blue-500',
      change: '+2 dari bulan lalu'
    },
    {
      title: 'Materi Aktif',
      value: '24',
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+5 materi baru'
    },
    {
      title: 'CBT Berlangsung',
      value: '3',
      icon: FileText,
      color: 'bg-purple-500',
      change: '2 akan berakhir'
    },
    {
      title: 'Siswa Aktif',
      value: '142',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '98% kehadiran'
    }
  ];

  const recentActivities = [
    {
      type: 'cbt',
      title: 'CBT Matematika Kelas X',
      description: '25 siswa telah mengerjakan',
      time: '2 jam yang lalu',
      status: 'active'
    },
    {
      type: 'material',
      title: 'Materi Trigonometri',
      description: 'Diupload untuk Kelas XI',
      time: '1 hari yang lalu',
      status: 'completed'
    },
    {
      type: 'grade',
      title: 'Nilai UTS Fisika',
      description: 'Perlu koreksi manual 5 soal',
      time: '2 hari yang lalu',
      status: 'pending'
    },
    {
      type: 'attendance',
      title: 'Absensi Kelas XII-A',
      description: '3 siswa tidak hadir',
      time: '3 hari yang lalu',
      status: 'warning'
    }
  ];

  const upcomingSchedule = [
    {
      subject: 'Matematika',
      class: 'X-A',
      time: '08:00 - 09:30',
      room: 'Lab Komputer 1'
    },
    {
      subject: 'Fisika',
      class: 'XI-B',
      time: '10:00 - 11:30',
      room: 'Ruang 201'
    },
    {
      subject: 'Matematika',
      class: 'XII-C',
      time: '13:00 - 14:30',
      room: 'Ruang 105'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Guru</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang kembali! Berikut ringkasan aktivitas mengajar Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Schedule */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Jadwal Hari Ini</h2>
          <div className="space-y-4">
            {upcomingSchedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {schedule.subject} - {schedule.class}
                    </p>
                    <p className="text-xs text-gray-500">{schedule.room}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{schedule.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Upload Materi</p>
          </button>
          <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Buat CBT</p>
          </button>
          <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Absensi</p>
          </button>
          <button className="p-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Input Nilai</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
