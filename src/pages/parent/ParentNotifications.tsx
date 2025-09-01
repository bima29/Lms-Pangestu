import React, { useState } from 'react';
import { Bell, MessageSquare, Calendar, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ParentNotifications: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: '1',
      title: 'Nilai Ujian Matematika',
      message: 'Andi Pratama mendapat nilai 85 untuk ujian Matematika',
      type: 'grade',
      priority: 'normal',
      date: '2025-01-10 14:30',
      read: false
    },
    {
      id: '2',
      title: 'Absen Tidak Masuk',
      message: 'Andi Pratama tidak hadir pada pelajaran Fisika hari ini',
      type: 'attendance',
      priority: 'high',
      date: '2025-01-10 10:15',
      read: false
    },
    {
      id: '3',
      title: 'Parent-Teacher Meeting',
      message: 'Undangan rapat orang tua dan guru tanggal 15 Januari 2025',
      type: 'event',
      priority: 'normal',
      date: '2025-01-09 16:00',
      read: true
    },
    {
      id: '4',
      title: 'Pembayaran SPP',
      message: 'Reminder pembayaran SPP bulan Januari 2025',
      type: 'payment',
      priority: 'high',
      date: '2025-01-08 09:00',
      read: true
    },
    {
      id: '5',
      title: 'Pengumuman Libur',
      message: 'Libur semester genap akan dimulai tanggal 15 Juni 2025',
      type: 'announcement',
      priority: 'normal',
      date: '2025-01-07 15:30',
      read: true
    }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'grade': return Bell;
      case 'attendance': return AlertTriangle;
      case 'event': return Calendar;
      case 'payment': return MessageSquare;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grade': return 'success';
      case 'attendance': return 'error';
      case 'event': return 'primary';
      case 'payment': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Pantau semua notifikasi sekolah anak Anda</p>
        </div>
        <Button variant="outline">
          Mark All as Read
        </Button>
      </div>

      <Card>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({notifications.filter(n => !n.read).length})
          </Button>
          <Button
            variant={filter === 'grade' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('grade')}
          >
            Grades
          </Button>
          <Button
            variant={filter === 'attendance' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('attendance')}
          >
            Attendance
          </Button>
          <Button
            variant={filter === 'event' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('event')}
          >
            Events
          </Button>
        </div>

        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  !notification.read 
                    ? 'bg-primary-50 border-primary-200' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'grade' ? 'bg-success-100' :
                    notification.type === 'attendance' ? 'bg-error-100' :
                    notification.type === 'event' ? 'bg-primary-100' :
                    'bg-warning-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      notification.type === 'grade' ? 'text-success-600' :
                      notification.type === 'attendance' ? 'text-error-600' :
                      notification.type === 'event' ? 'text-primary-600' :
                      'text-warning-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      <div className="flex items-center gap-2">
                        {notification.priority === 'high' && (
                          <Badge variant="error" size="sm">High Priority</Badge>
                        )}
                        <Badge variant={getTypeColor(notification.type)} size="sm">
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p>No notifications found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ParentNotifications;