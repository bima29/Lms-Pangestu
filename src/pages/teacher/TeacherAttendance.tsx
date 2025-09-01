import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import { Edit, Trash2, Eye } from 'lucide-react';
import { UserCheck, Users, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const dummyAttendanceList = [
  {
    id: 'a1',
    date: '2025-01-10',
    class: 'XII IPA 1',
    total: 32,
    present: 28,
    absent: 2,
    late: 2,
    students: [
      { id: '1', name: 'Andi Pratama', status: 'present' },
      { id: '2', name: 'Sari Wulandari', status: 'present' },
      { id: '3', name: 'Rudi Hartono', status: 'absent' },
      { id: '4', name: 'Maya Sari', status: 'late' },
      { id: '5', name: 'Budi Santoso', status: 'present' },
      { id: '6', name: 'Dewi Lestari', status: 'late' },
      { id: '7', name: 'Tono Saputra', status: 'present' },
    ],
  },
  {
    id: 'a2',
    date: '2025-01-09',
    class: 'XI IPA 2',
    total: 30,
    present: 27,
    absent: 1,
    late: 2,
    students: [
      { id: '1', name: 'Rina', status: 'present' },
      { id: '2', name: 'Doni', status: 'present' },
      { id: '3', name: 'Sinta', status: 'late' },
      { id: '4', name: 'Bambang', status: 'absent' },
    ],
  },
];

const TeacherAttendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('XII IPA 1');
  const [selectedDate, setSelectedDate] = useState('2025-01-10');

  const classes = ['XII IPA 1', 'XI IPA 2', 'X MIPA 1'];

  const students = [
    {
      id: '1',
      name: 'Andi Pratama',
      studentId: '2022001',
      avatar:
        'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 95,
      status: 'present',
    },
    {
      id: '2',
      name: 'Sari Wulandari',
      studentId: '2022002',
      avatar:
        'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 98,
      status: 'present',
    },
    {
      id: '3',
      name: 'Rudi Hartono',
      studentId: '2022003',
      avatar:
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 92,
      status: 'absent',
    },
    {
      id: '4',
      name: 'Maya Sari',
      studentId: '2022004',
      avatar:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 96,
      status: 'late',
    },
    {
      id: '5',
      name: 'Budi Santoso',
      studentId: '2022005',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 88,
      status: 'present',
    },
    {
      id: '6',
      name: 'Dewi Lestari',
      studentId: '2022006',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 94,
      status: 'late',
    },
    {
      id: '7',
      name: 'Tono Saputra',
      studentId: '2022007',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 91,
      status: 'present',
    },
  ];

  const [attendance, setAttendance] = useState<{ [key: string]: string }>(
    students.reduce((acc, student) => {
      acc[student.id] = student.status;
      return acc;
    }, {} as { [key: string]: string })
  );

  const updateAttendance = (studentId: string, status: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const presentCount = Object.values(attendance).filter(
    (status) => status === 'present'
  ).length;
  const absentCount = Object.values(attendance).filter(
    (status) => status === 'absent'
  ).length;
  const lateCount = Object.values(attendance).filter(
    (status) => status === 'late'
  ).length;

  // Modal partisipan
  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<any>(null);

  const handleViewParticipants = (attendance: any) => {
    setSelectedAttendance(attendance);
    setShowModal(true);
  };

  const handleEdit = (attendance: any) => {
    alert('Edit absensi: ' + attendance.date + ' ' + attendance.class);
  };
  const handleDelete = (attendance: any) => {
    alert('Delete absensi: ' + attendance.date + ' ' + attendance.class);
  };

  // Pagination logic
  const [studentPage, setStudentPage] = useState(1);
  const [studentPageSize, setStudentPageSize] = useState(5);
  const studentTotalPages = Math.ceil(students.length / studentPageSize);
  const paginatedStudents = students.slice(
    (studentPage - 1) * studentPageSize,
    studentPage * studentPageSize
  );

  const [historyPage, setHistoryPage] = useState(1);
  const [historyPageSize, setHistoryPageSize] = useState(5);
  const [historyClassFilter, setHistoryClassFilter] = useState('');
  const [historyDateFilter, setHistoryDateFilter] = useState('');
  const filteredHistory = dummyAttendanceList.filter(
    (att) =>
      (historyClassFilter === '' || att.class === historyClassFilter) &&
      (historyDateFilter === '' || att.date === historyDateFilter)
  );
  const historyTotalPages = Math.ceil(filteredHistory.length / historyPageSize);
  const paginatedHistory = filteredHistory.slice(
    (historyPage - 1) * historyPageSize,
    historyPage * historyPageSize
  );

  return (
    <React.Fragment>
      <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header & Form */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary-900">Attendance</h1>
            <p className="text-gray-600 mt-2">Kelola kehadiran siswa harian</p>
          </div>
        </div>

        <Card className="mt-6 p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white appearance-none shadow-sm"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="relative flex-1">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Tabel Siswa */}
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 bg-gray-50 p-4 border-b">
              <div className="col-span-6">Student</div>
              <div className="col-span-2">Student ID</div>
              <div className="col-span-2">Attendance Rate</div>
              <div className="col-span-2">Status</div>
            </div>

            <div className="divide-y divide-gray-100">
              {paginatedStudents.map((student) => (
                <div
                  key={student.id}
                  className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{selectedClass}</p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <p className="text-gray-900 font-mono">{student.studentId}</p>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center">
                      <p className="text-gray-900 font-medium">{student.attendanceRate}%</p>
                    </div>
                  </div>

                  <div className="col-span-2 flex gap-2 flex-wrap">
                    <Button
                      variant={
                        attendance[student.id] === 'present' ? 'primary' : 'outline'
                      }
                      size="sm"
                      onClick={() => updateAttendance(student.id, 'present')}
                      className="min-w-[70px] px-3 py-2 text-xs font-medium rounded-lg transition-all"
                    >
                      Present
                    </Button>
                    <Button
                      variant={
                        attendance[student.id] === 'absent' ? 'danger' : 'outline'
                      }
                      size="sm"
                      onClick={() => updateAttendance(student.id, 'absent')}
                      className="min-w-[70px] px-3 py-2 text-xs font-medium rounded-lg transition-all"
                    >
                      Absent
                    </Button>
                    <Button
                      variant={
                        attendance[student.id] === 'late' ? 'secondary' : 'outline'
                      }
                      size="sm"
                      onClick={() => updateAttendance(student.id, 'late')}
                      className="min-w-[70px] px-3 py-2 text-xs font-medium rounded-lg transition-all"
                    >
                      Late
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Siswa */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show</span>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentPageSize}
                onChange={(e) => {
                  setStudentPageSize(Number(e.target.value));
                  setStudentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-500">items per page</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="px-3 py-2 min-w-[80px] rounded-lg border-gray-300 hover:bg-gray-50"
                disabled={studentPage === 1 || studentTotalPages === 1}
                onClick={() => setStudentPage(studentPage - 1)}
              >
                Previous
              </Button>
              <span className="text-sm bg-primary-100 text-primary-800 px-3 py-1 rounded-lg">
                Page {studentPage} of {studentTotalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="px-3 py-2 min-w-[80px] rounded-lg border-gray-300 hover:bg-gray-50"
                disabled={studentPage === studentTotalPages || studentTotalPages === 1}
                onClick={() => setStudentPage(studentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="bg-success-100 text-success-800 text-sm px-3 py-1 rounded-full">
                {presentCount} Present
              </span>
              <span className="bg-error-100 text-error-800 text-sm px-3 py-1 rounded-full">
                {absentCount} Absent
              </span>
              <span className="bg-warning-100 text-warning-800 text-sm px-3 py-1 rounded-full">
                {lateCount} Late
              </span>
            </div>
            <Button className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-shadow">
              Save Attendance
            </Button>
          </div>
        </Card>

        {/* Statistik Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          <Card className="text-center p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-success-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-7 w-7 text-success-600" />
            </div>
            <h3 className="font-semibold text-primary-900 mb-2">Present</h3>
            <p className="text-2xl font-bold text-success-700">{presentCount}</p>
          </Card>
          <Card className="text-center p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-error-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-error-600" />
            </div>
            <h3 className="font-semibold text-primary-900 mb-2">Absent</h3>
            <p className="text-2xl font-bold text-error-700">{absentCount}</p>
          </Card>
          <Card className="text-center p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-warning-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-7 w-7 text-warning-600" />
            </div>
            <h3 className="font-semibold text-primary-900 mb-2">Late</h3>
            <p className="text-2xl font-bold text-warning-700">{lateCount}</p>
          </Card>
          <Card className="text-center p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="font-semibold text-primary-900 mb-2">Rate</h3>
            <p className="text-2xl font-bold text-primary-700">
              {((presentCount / students.length) * 100).toFixed(0)}%
            </p>
          </Card>
        </div>

        {/* Modal Partisipan */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Partisipan ${selectedAttendance?.class || ''} (${selectedAttendance?.date || ''})`}
          size="lg"
        >
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-primary-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Nama Siswa
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {selectedAttendance?.students?.map((s: any) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">{s.name}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          s.status === 'present'
                            ? 'success'
                            : s.status === 'absent'
                            ? 'error'
                            : s.status === 'late'
                            ? 'warning'
                            : 'secondary'
                        }
                        className="px-3 py-1 rounded-full"
                      >
                        {s.status === 'present'
                          ? 'Masuk'
                          : s.status === 'absent'
                          ? 'Ijin'
                          : 'Telat'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>

        {/* Riwayat Absensi di Paling Bawah */}
        <Card className="mb-6 mt-8 p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold text-primary-900 mb-6">
            Riwayat Absensi
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <select
                value={historyClassFilter}
                onChange={(e) => {
                  setHistoryClassFilter(e.target.value);
                  setHistoryPage(1);
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white appearance-none shadow-sm"
              >
                <option value="">Semua Kelas</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="relative flex-1">
              <input
                type="date"
                value={historyDateFilter}
                onChange={(e) => {
                  setHistoryDateFilter(e.target.value);
                  setHistoryPage(1);
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-primary-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Kelas
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Total Siswa
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Masuk
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Ijin
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Telat
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-primary-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedHistory.map((att) => (
                  <tr
                    key={att.id}
                    className="hover:bg-primary-50 transition-all duration-150"
                  >
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {att.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{att.class}</td>
                    <td className="px-4 py-3 text-center">{att.total}</td>
                    <td className="px-4 py-3 text-success-700 font-bold text-center">
                      {att.present}
                    </td>
                    <td className="px-4 py-3 text-error-700 font-bold text-center">
                      {att.absent}
                    </td>
                    <td className="px-4 py-3 text-warning-700 font-bold text-center">
                      {att.late}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col sm:flex-row gap-2 justify-start">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewParticipants(att)}
                          className="min-w-[70px] px-3 py-2 rounded-lg"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Lihat
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(att)}
                          className="min-w-[70px] px-3 py-2 rounded-lg"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(att)}
                          className="min-w-[70px] px-3 py-2 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Riwayat Absensi */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show</span>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={historyPageSize}
                onChange={(e) => {
                  setHistoryPageSize(Number(e.target.value));
                  setHistoryPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-500">items per page</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="px-3 py-2 min-w-[80px] rounded-lg border-gray-300 hover:bg-gray-50"
                disabled={historyPage === 1 || historyTotalPages === 1}
                onClick={() => setHistoryPage(historyPage - 1)}
              >
                Previous
              </Button>
              <span className="text-sm bg-primary-100 text-primary-800 px-3 py-1 rounded-lg">
                Page {historyPage} of {historyTotalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="px-3 py-2 min-w-[80px] rounded-lg border-gray-300 hover:bg-gray-50"
                disabled={
                  historyPage === historyTotalPages || historyTotalPages === 1
                }
                onClick={() => setHistoryPage(historyPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default TeacherAttendance;