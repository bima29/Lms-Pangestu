import React from 'react';
import { BookOpen, Clock, Trophy, Bell } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const StudentHome: React.FC = () => {
  const announcements = [
    { id: '1', title: 'Ujian Tengah Semester', content: 'Ujian tengah semester akan dilaksanakan mulai tanggal 20 Januari 2025', type: 'important', date: '2025-01-10' },
    { id: '2', title: 'Libur Semester Genap', content: 'Libur semester genap dimulai tanggal 15 Juni 2025', type: 'info', date: '2025-01-09' },
    { id: '3', title: 'Pendaftaran Ekstrakurikuler', content: 'Pendaftaran ekstrakurikuler dibuka untuk semester genap', type: 'info', date: '2025-01-08' },
  ];

  const upcomingTasks = [
    { subject: 'Matematika', task: 'PR Integral', due: '2025-01-12', type: 'homework' },
    { subject: 'Fisika', task: 'Ujian Gelombang', due: '2025-01-15', type: 'exam' },
    { subject: 'Kimia', task: 'Laporan Praktikum', due: '2025-01-18', type: 'project' },
  ];

  const recentGrades = [
    { subject: 'Matematika', score: 85, maxScore: 100, date: '2025-01-10' },
    { subject: 'Fisika', score: 78, maxScore: 100, date: '2025-01-09' },
    { subject: 'Kimia', score: 92, maxScore: 100, date: '2025-01-08' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900">Dashboard Siswa</h1>
        <p className="text-gray-600 mt-2">Selamat datang kembali, Andi Pratama!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="text-center">
          <BookOpen className="h-8 w-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Mata Pelajaran</h3>
          <p className="text-2xl font-bold text-primary-700">8</p>
          <p className="text-sm text-gray-500">Aktif semester ini</p>
        </Card>
        
        <Card hover className="text-center">
          <Clock className="h-8 w-8 text-warning-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Tugas Pending</h3>
          <p className="text-2xl font-bold text-warning-700">3</p>
          <p className="text-sm text-gray-500">Harus dikerjakan</p>
        </Card>
        
        <Card hover className="text-center">
          <Trophy className="h-8 w-8 text-success-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Rata-rata Nilai</h3>
          <p className="text-2xl font-bold text-success-700">85.0</p>
          <p className="text-sm text-gray-500">Semester ini</p>
        </Card>
        
        <Card hover className="text-center">
          <Bell className="h-8 w-8 text-accent-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Pengumuman</h3>
          <p className="text-2xl font-bold text-accent-700">2</p>
          <p className="text-sm text-gray-500">Belum dibaca</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary-900">Tugas & Ujian</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-500">{task.subject} • Due {task.due}</p>
                </div>
                <Badge 
                  variant={
                    task.type === 'exam' ? 'error' : 
                    task.type === 'project' ? 'warning' : 'primary'
                  }
                >
                  {task.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary-900">Nilai Terbaru</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{grade.subject}</p>
                  <p className="text-sm text-gray-500">{grade.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-700">{grade.score}/{grade.maxScore}</p>
                  <p className="text-sm text-gray-500">{((grade.score / grade.maxScore) * 100).toFixed(0)}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Pengumuman</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border-l-4 border-primary-500 bg-primary-50 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-primary-900">{announcement.title}</h4>
                <Badge 
                  variant={announcement.type === 'important' ? 'error' : 'primary'}
                  size="sm"
                >
                  {announcement.type}
                </Badge>
              </div>
              <p className="text-gray-700 mb-2">{announcement.content}</p>
              <p className="text-sm text-gray-500">{announcement.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentHome;