import React from "react";
import { BookOpen, Clock, Trophy, Bell } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";

const StudentHome: React.FC = () => {
  const announcements = [
    { id: "1", title: "Ujian Tengah Semester", content: "Ujian tengah semester akan dilaksanakan mulai tanggal 20 Januari 2025", type: "important", date: "2025-01-10" },
    { id: "2", title: "Libur Semester Genap", content: "Libur semester genap dimulai tanggal 15 Juni 2025", type: "info", date: "2025-01-09" },
    { id: "3", title: "Pendaftaran Ekstrakurikuler", content: "Pendaftaran ekstrakurikuler dibuka untuk semester genap", type: "info", date: "2025-01-08" },
    { id: "4", title: "Perubahan Jadwal Pelajaran", content: "Jadwal pelajaran hari Jumat berubah menjadi jam 08.00", type: "info", date: "2025-01-07" },
    { id: "5", title: "Pengambilan Raport", content: "Pengambilan raport semester genap tanggal 25 Juni 2025", type: "important", date: "2025-01-06" },
    { id: "6", title: "Kegiatan Pramuka", content: "Kegiatan pramuka wajib untuk kelas X", type: "info", date: "2025-01-05" },
  ];

  const upcomingTasks = [
    { subject: "Matematika", task: "PR Integral", due: "2025-01-12", type: "homework" },
    { subject: "Fisika", task: "Ujian Gelombang", due: "2025-01-15", type: "exam" },
    { subject: "Kimia", task: "Laporan Praktikum", due: "2025-01-18", type: "project" },
    { subject: "Biologi", task: "PR Genetika", due: "2025-01-20", type: "homework" },
    { subject: "Bahasa Inggris", task: "Essay", due: "2025-01-22", type: "project" },
    { subject: "Sejarah", task: "Ujian Bab 2", due: "2025-01-25", type: "exam" },
  ];

  const recentGrades = [
    { subject: "Matematika", score: 85, maxScore: 100, date: "2025-01-10" },
    { subject: "Fisika", score: 78, maxScore: 100, date: "2025-01-09" },
    { subject: "Kimia", score: 92, maxScore: 100, date: "2025-01-08" },
    { subject: "Biologi", score: 88, maxScore: 100, date: "2025-01-07" },
    { subject: "Bahasa Inggris", score: 90, maxScore: 100, date: "2025-01-06" },
    { subject: "Sejarah", score: 80, maxScore: 100, date: "2025-01-05" },
  ];

  const [modalType, setModalType] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-primary-900">Dashboard Siswa</h1>
        <p className="text-gray-600 mt-1">Selamat datang kembali, Andi Pratama!</p>
      </header>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="flex flex-col items-center text-center p-6">
          <BookOpen className="h-10 w-10 text-primary-600 mb-2" />
          <h3 className="font-semibold text-primary-900">Mata Pelajaran</h3>
          <p className="text-2xl font-bold text-primary-700">8</p>
          <span className="text-sm text-gray-500">Aktif semester ini</span>
        </Card>

        <Card hover className="flex flex-col items-center text-center p-6">
          <Clock className="h-10 w-10 text-warning-600 mb-2" />
          <h3 className="font-semibold text-primary-900">Total Tugas</h3>
          <p className="text-2xl font-bold text-warning-700">3</p>
          <span className="text-sm text-gray-500">Harus dikerjakan</span>
        </Card>

        <Card hover className="flex flex-col items-center text-center p-6">
          <Trophy className="h-10 w-10 text-success-600 mb-2" />
          <h3 className="font-semibold text-primary-900">Rata-rata Nilai</h3>
          <p className="text-2xl font-bold text-success-700">85.0</p>
          <span className="text-sm text-gray-500">Semester ini</span>
        </Card>

        <Card hover className="flex flex-col items-center text-center p-6">
          <Bell className="h-10 w-10 text-accent-600 mb-2" />
          <h3 className="font-semibold text-primary-900">Pengumuman</h3>
          <p className="text-2xl font-bold text-accent-700">2</p>
          <span className="text-sm text-gray-500">Total</span>
        </Card>
      </div>

      {/* Tugas & Nilai */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary-900">Tugas & Ujian</h3>
            <Button size="sm" variant="outline" onClick={() => { setModalType("tasks"); setShowModal(true); }}>
              Lihat Semua
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.slice(0, 5).map((task, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-500">{task.subject} • {task.due}</p>
                </div>
                <Badge variant={task.type === "exam" ? "error" : task.type === "project" ? "warning" : "primary"}>
                  {task.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary-900">Nilai Terbaru</h3>
            <Button size="sm" variant="outline" onClick={() => { setModalType("grades"); setShowModal(true); }}>
              Lihat Semua
            </Button>
          </div>
          <div className="space-y-3">
            {recentGrades.slice(0, 5).map((grade, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{grade.subject}</p>
                  <span className="text-sm text-gray-500">{grade.date}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-700">{grade.score}/{grade.maxScore}</p>
                  <span className="text-sm text-gray-500">{((grade.score / grade.maxScore) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pengumuman */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary-900">Pengumuman</h3>
          <Button size="sm" variant="outline" onClick={() => { setModalType("announcements"); setShowModal(true); }}>
            Lihat Semua
          </Button>
        </div>
        <div className="space-y-4">
          {announcements.slice(0, 5).map((item) => (
            <div key={item.id} className="border-l-4 border-primary-500 bg-primary-50 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-primary-900">{item.title}</h4>
                <Badge size="sm" variant={item.type === "important" ? "error" : "primary"}>
                  {item.type}
                </Badge>
              </div>
              <p className="text-gray-700">{item.content}</p>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
        title={
          modalType === "tasks" ? "Semua Tugas & Ujian" :
          modalType === "grades" ? "Semua Nilai Terbaru" : "Semua Pengumuman"
        }
      >
        {modalType === "tasks" && (
          <div className="space-y-4">
            {upcomingTasks.map((task, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-left">{task.task}</p>
                  <p className="text-sm text-gray-500 text-left">{task.subject} • {task.due}</p>
                </div>
                <Badge variant={task.type === "exam" ? "error" : task.type === "project" ? "warning" : "primary"}>
                  {task.type}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {modalType === "grades" && (
          <div className="space-y-4">
            {recentGrades.map((grade, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-left">{grade.subject}</p>
                  <span className="text-sm text-gray-500 text-left">{grade.date}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-700">{grade.score}/{grade.maxScore}</p>
                  <span className="text-sm text-gray-500">{((grade.score / grade.maxScore) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {modalType === "announcements" && (
          <div className="space-y-4">
            {announcements.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-primary-900">{item.title}</h4>
                  <Badge size="sm" variant={item.type === "important" ? "error" : "primary"}>
                    {item.type}
                  </Badge>
                </div>
                <p className="text-gray-700">{item.content}</p>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentHome;
