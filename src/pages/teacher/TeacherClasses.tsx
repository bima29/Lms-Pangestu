import React, { useState } from 'react';
import { GraduationCap, Users, BookOpen, Plus } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const TeacherClasses: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('1');

  const classes = [
    { 
      id: '1', 
      name: 'XII IPA 1', 
      subject: 'Matematika',
      students: 32, 
      schedule: 'Sen, Rab, Jum • 07:00-08:30',
      nextClass: '2025-01-13 07:00'
    },
    { 
      id: '2', 
      name: 'XI IPA 2', 
      subject: 'Matematika',
      students: 30, 
      schedule: 'Sel, Kam • 08:30-10:00',
      nextClass: '2025-01-12 08:30'
    },
    { 
      id: '3', 
      name: 'X MIPA 1', 
      subject: 'Matematika',
      students: 28, 
      schedule: 'Rab, Sab • 10:15-11:45',
      nextClass: '2025-01-11 10:15'
    }
  ];

  const selectedClassData = classes.find(c => c.id === selectedClass);

  const students = [
    { id: '1', name: 'Andi Pratama', attendance: 95, lastGrade: 85, avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '2', name: 'Sari Wulandari', attendance: 98, lastGrade: 90, avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
    { id: '3', name: 'Rudi Hartono', attendance: 92, lastGrade: 78, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1' },
  ];

  const assignments = [
    { title: 'Latihan Soal Integral', due: '2025-01-15', submitted: 28, total: 32 },
    { title: 'Tugas Differensial', due: '2025-01-12', submitted: 30, total: 32 },
    { title: 'PR Matriks', due: '2025-01-18', submitted: 15, total: 32 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">My Classes</h1>
          <p className="text-gray-600 mt-2">Kelola kelas dan pantau progress siswa</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div>
          <Card>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Kelas Saya</h3>
            <div className="space-y-3">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedClass === classItem.id 
                      ? 'bg-primary-50 border-2 border-primary-500' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => setSelectedClass(classItem.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                    <Badge variant="primary">{classItem.students}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{classItem.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">{classItem.schedule}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedClassData && (
            <div className="space-y-6">
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-primary-900">{selectedClassData.name}</h2>
                    <p className="text-gray-600">{selectedClassData.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedClassData.schedule}</p>
                  </div>
                  <Badge variant="success">Next: {selectedClassData.nextClass}</Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-primary-700">{selectedClassData.students}</p>
                    <p className="text-sm text-primary-600">Total Siswa</p>
                  </div>
                  <div className="text-center p-4 bg-success-50 rounded-lg">
                    <BookOpen className="h-8 w-8 text-success-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-success-700">94%</p>
                    <p className="text-sm text-success-600">Avg Attendance</p>
                  </div>
                  <div className="text-center p-4 bg-accent-50 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-accent-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-accent-700">84.2</p>
                    <p className="text-sm text-accent-600">Avg Grade</p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Recent Assignments</h3>
                <div className="space-y-3">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-sm text-gray-500">Due: {assignment.due}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {assignment.submitted}/{assignment.total}
                        </p>
                        <p className="text-sm text-gray-500">Submitted</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClasses;