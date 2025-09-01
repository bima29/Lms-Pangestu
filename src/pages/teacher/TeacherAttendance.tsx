import React, { useState } from 'react';
import { UserCheck, Users, Calendar, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const TeacherAttendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('XII IPA 1');
  const [selectedDate, setSelectedDate] = useState('2025-01-10');

  const classes = ['XII IPA 1', 'XI IPA 2', 'X MIPA 1'];

  const students = [
    { 
      id: '1', 
      name: 'Andi Pratama', 
      studentId: '2022001',
      avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 95,
      status: 'present'
    },
    { 
      id: '2', 
      name: 'Sari Wulandari', 
      studentId: '2022002',
      avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 98,
      status: 'present'
    },
    { 
      id: '3', 
      name: 'Rudi Hartono', 
      studentId: '2022003',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 92,
      status: 'absent'
    },
    { 
      id: '4', 
      name: 'Maya Sari', 
      studentId: '2022004',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1',
      attendanceRate: 96,
      status: 'late'
    }
  ];

  const [attendance, setAttendance] = useState<{ [key: string]: string }>(
    students.reduce((acc, student) => {
      acc[student.id] = student.status;
      return acc;
    }, {} as { [key: string]: string })
  );

  const updateAttendance = (studentId: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'error';
      case 'late': return 'warning';
      default: return 'secondary';
    }
  };

  const presentCount = Object.values(attendance).filter(status => status === 'present').length;
  const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
  const lateCount = Object.values(attendance).filter(status => status === 'late').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Attendance</h1>
          <p className="text-gray-600 mt-2">Kelola kehadiran siswa harian</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <UserCheck className="h-8 w-8 text-success-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Present</h3>
          <p className="text-2xl font-bold text-success-700">{presentCount}</p>
        </Card>
        
        <Card className="text-center">
          <Users className="h-8 w-8 text-error-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Absent</h3>
          <p className="text-2xl font-bold text-error-700">{absentCount}</p>
        </Card>
        
        <Card className="text-center">
          <Calendar className="h-8 w-8 text-warning-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Late</h3>
          <p className="text-2xl font-bold text-warning-700">{lateCount}</p>
        </Card>
        
        <Card className="text-center">
          <UserCheck className="h-8 w-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Rate</h3>
          <p className="text-2xl font-bold text-primary-700">{((presentCount / students.length) * 100).toFixed(0)}%</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b pb-3">
            <div className="col-span-6">Student</div>
            <div className="col-span-2">Student ID</div>
            <div className="col-span-2">Attendance Rate</div>
            <div className="col-span-2">Status</div>
          </div>
          
          {students.map((student) => (
            <div key={student.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
              <div className="col-span-6 flex items-center gap-3">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">{selectedClass}</p>
                </div>
              </div>
              
              <div className="col-span-2">
                <p className="text-gray-900">{student.studentId}</p>
              </div>
              
              <div className="col-span-2">
                <p className="text-gray-900">{student.attendanceRate}%</p>
              </div>
              
              <div className="col-span-2 flex gap-1">
                <Button
                  variant={attendance[student.id] === 'present' ? 'success' : 'outline'}
                  size="sm"
                  onClick={() => updateAttendance(student.id, 'present')}
                >
                  Present
                </Button>
                <Button
                  variant={attendance[student.id] === 'absent' ? 'danger' : 'outline'}
                  size="sm"
                  onClick={() => updateAttendance(student.id, 'absent')}
                >
                  Absent
                </Button>
                <Button
                  variant={attendance[student.id] === 'late' ? 'warning' : 'outline'}
                  size="sm"
                  onClick={() => updateAttendance(student.id, 'late')}
                >
                  Late
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500">
            {presentCount} present, {absentCount} absent, {lateCount} late of {students.length} students
          </p>
          <Button>Save Attendance</Button>
        </div>
      </Card>
    </div>
  );
};

export default TeacherAttendance;