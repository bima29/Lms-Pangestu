import React from 'react';
import { Users, GraduationCap, FileText, Award } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import { mockStudents } from '../../data/mockData';

const SchoolDashboard: React.FC = () => {
  const recentActivities = [
    { activity: 'Ujian Matematika XII IPA 1', type: 'CBT', time: '10 menit lalu' },
    { activity: 'Upload Materi Fisika', type: 'Material', time: '25 menit lalu' },
    { activity: 'Absensi Kelas XI IPS 2', type: 'Attendance', time: '1 jam lalu' },
    { activity: 'Pengumuman Libur Semester', type: 'Announcement', time: '2 jam lalu' },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'class', header: 'Class' },
    { key: 'email', header: 'Email' },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-900 tracking-tight">
          Dashboard Sekolah
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Selamat datang di sistem manajemen pembelajaran sekolah
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Siswa"
          value={1248}
          icon={Users}
          color="blue"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Guru"
          value={89}
          icon={GraduationCap}
          color="green"
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="CBT Aktif"
          value={15}
          icon={FileText}
          color="yellow"
        />
        <StatCard
          title="Rata-rata Nilai"
          value={82.5}
          icon={Award}
          color="green"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Konten utama */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tabel siswa */}
        <div className="lg:col-span-2">
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-primary-900 mb-4">
              Siswa Terbaru
            </h3>
            <div className="overflow-x-auto">
              <Table columns={columns} data={mockStudents} />
            </div>
          </Card>
        </div>

        {/* Sidebar kanan */}
        <div className="space-y-6">
          {/* Aktivitas */}
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-primary-900 mb-4">
              Aktivitas Terkini
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.type}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Distribusi kelas */}
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-primary-900 mb-4">
              Distribusi Kelas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">Kelas X</span>
                <span className="font-medium text-sm md:text-base">385 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">Kelas XI</span>
                <span className="font-medium text-sm md:text-base">412 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">Kelas XII</span>
                <span className="font-medium text-sm md:text-base">451 siswa</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
