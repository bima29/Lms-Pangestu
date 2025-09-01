import React, { useState } from 'react';
import { Users, Trophy, BookOpen, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ParentChildren: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('1');

  const children = [
    {
      id: '1',
      name: 'Andi Pratama',
      class: 'XII IPA 1',
      avatar: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
      average: 85.0,
      attendance: 95,
      behaviorScore: 90
    },
    {
      id: '2',
      name: 'Sari Wulandari',
      class: 'X IPA 2',
      avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
      average: 88.5,
      attendance: 98,
      behaviorScore: 95
    }
  ];

  const selectedChildData = children.find(child => child.id === selectedChild);

  const recentActivities = [
    { activity: 'Mengerjakan Ujian Matematika', score: 85, subject: 'Matematika', date: '2025-01-10' },
    { activity: 'Submit Tugas Fisika', score: 78, subject: 'Fisika', date: '2025-01-09' },
    { activity: 'Presentasi Kimia', score: 92, subject: 'Kimia', date: '2025-01-08' },
  ];

  const upcomingEvents = [
    { event: 'Parent-Teacher Meeting', date: '2025-01-15', time: '14:00' },
    { event: 'Ujian Tengah Semester', date: '2025-01-20', time: '08:00' },
    { event: 'Field Trip Biologi', date: '2025-01-25', time: '07:00' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900">My Children</h1>
        <p className="text-gray-600 mt-2">Monitor perkembangan akademik anak Anda</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Anak</h3>
            <div className="space-y-3">
              {children.map((child) => (
                <div
                  key={child.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedChild === child.id 
                      ? 'bg-primary-50 border-2 border-primary-500' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => setSelectedChild(child.id)}
                >
                  <div className="flex items-center gap-3">
                    <img src={child.avatar} alt={child.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-gray-900">{child.name}</p>
                      <p className="text-sm text-gray-500">{child.class}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selectedChildData && (
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={selectedChildData.avatar} 
                    alt={selectedChildData.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-primary-900">{selectedChildData.name}</h2>
                    <p className="text-gray-600">{selectedChildData.class}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success-50 rounded-lg">
                    <Trophy className="h-8 w-8 text-success-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-success-700">{selectedChildData.average}</p>
                    <p className="text-sm text-success-600">Rata-rata Nilai</p>
                  </div>
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-primary-700">{selectedChildData.attendance}%</p>
                    <p className="text-sm text-primary-600">Kehadiran</p>
                  </div>
                  <div className="text-center p-4 bg-accent-50 rounded-lg">
                    <BookOpen className="h-8 w-8 text-accent-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-accent-700">{selectedChildData.behaviorScore}</p>
                    <p className="text-sm text-accent-600">Perilaku</p>
                  </div>
                </div>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">Aktivitas Terbaru</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{activity.activity}</p>
                          <p className="text-sm text-gray-500">{activity.subject} • {activity.date}</p>
                        </div>
                        <Badge variant={activity.score >= 85 ? 'success' : activity.score >= 75 ? 'warning' : 'error'}>
                          {activity.score}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">Jadwal Mendatang</h3>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary-600" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{event.event}</p>
                          <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentChildren;