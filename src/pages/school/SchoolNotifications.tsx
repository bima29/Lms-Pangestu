import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  Bell,
  Check,
  X,
  Eye,
  Search,
  Clock,
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import type { 
  Notification, 
  PaginationParams, 
  PaginationResult 
} from '../../types';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolNotifications() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [notifications, setNotifications] = useState<PaginationResult<Notification>>({ 
    data: [], total: 0, page: 1, limit: 10, total_pages: 0 
  });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const loadNotifications = () => {
    // Mock implementation - replace with actual API call
    const mockNotifications: Notification[] = [
      {
        id: 'notif-1',
        title: 'Tugas Baru Diterima',
        message: 'Ahmad Rizki telah mengumpulkan tugas Matematika',
        notification_type: 'info',
        user_id: 'admin-1',
        is_read: false,
        created_at: '2024-03-20T10:30:00Z'
      },
      {
        id: 'notif-2',
        title: 'Siswa Tidak Hadir',
        message: 'Siti Nurhaliza tidak hadir pada mata pelajaran Fisika',
        notification_type: 'warning',
        user_id: 'admin-1',
        is_read: true,
        created_at: '2024-03-20T08:15:00Z'
      },
      {
        id: 'notif-3',
        title: 'CBT Selesai',
        message: 'Ujian Matematika Kelas X IPA 1 telah selesai',
        notification_type: 'success',
        user_id: 'admin-1',
        is_read: false,
        created_at: '2024-03-19T16:45:00Z'
      },
      {
        id: 'notif-4',
        title: 'Pendaftaran Siswa Baru',
        message: 'Budi Santoso mendaftar sebagai siswa baru',
        notification_type: 'info',
        user_id: 'admin-1',
        is_read: true,
        created_at: '2024-03-19T14:20:00Z'
      }
    ];

    let filtered = mockNotifications.filter(n => 
      !pagination.search || 
      n.title.toLowerCase().includes(pagination.search.toLowerCase()) ||
      n.message.toLowerCase().includes(pagination.search.toLowerCase())
    );

    if (selectedStatus !== 'all') {
      const isRead = selectedStatus === 'read';
      filtered = filtered.filter(n => n.is_read === isRead);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(n => n.notification_type === selectedType);
    }

    const startIndex = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const paginatedData = filtered.slice(startIndex, startIndex + (pagination.limit || 10));

    setNotifications({
      data: paginatedData,
      total: filtered.length,
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total_pages: Math.ceil(filtered.length / (pagination.limit || 10))
    });
  };

  useEffect(() => { loadNotifications(); }, [pagination, selectedStatus, selectedType]);

  const markAsRead = (id: string) => {
    console.log('Marking notification as read:', id);
    loadNotifications();
  };

  const markAsUnread = (id: string) => {
    console.log('Marking notification as unread:', id);
    loadNotifications();
  };

  const deleteNotification = (id: string) => {
    if (!confirm('Hapus notifikasi ini?')) return;
    console.log('Deleting notification:', id);
    loadNotifications();
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
    loadNotifications();
  };

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'unread', label: 'Belum Dibaca' },
    { value: 'read', label: 'Sudah Dibaca' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Semua Jenis' },
    { value: 'assignment', label: 'Tugas' },
    { value: 'attendance', label: 'Kehadiran' },
    { value: 'cbt', label: 'CBT' },
    { value: 'registration', label: 'Pendaftaran' },
    { value: 'grade', label: 'Nilai' },
    { value: 'announcement', label: 'Pengumuman' }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'attendance': return <Users className="w-5 h-5 text-orange-600" />;
      case 'cbt': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'registration': return <Users className="w-5 h-5 text-purple-600" />;
      case 'grade': return <CheckCircle className="w-5 h-5 text-yellow-600" />;
      case 'announcement': return <Bell className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-700';
      case 'attendance': return 'bg-orange-100 text-orange-700';
      case 'cbt': return 'bg-green-100 text-green-700';
      case 'registration': return 'bg-purple-100 text-purple-700';
      case 'grade': return 'bg-yellow-100 text-yellow-700';
      case 'announcement': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
    
    return date.toLocaleDateString('id-ID');
  };

  const unreadCount = notifications.data.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Notifikasi</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0 && `${unreadCount} notifikasi belum dibaca`}
          </p>
        </div>
        <Button onClick={markAllAsRead} variant="outline" className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Tandai Semua Dibaca
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari notifikasi..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={pagination.search || ''}
                onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
              />
            </div>
          </div>
          <div>
            <SearchSelect
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Filter status"
            />
          </div>
          <div>
            <SearchSelect
              options={typeOptions}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Filter jenis"
            />
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.data.map((notification) => (
          <Card 
            key={notification.id} 
            className={`p-4 transition-colors ${
              !notification.is_read ? 'bg-blue-50 border-blue-200' : 'bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.notification_type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-medium ${
                        !notification.is_read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.is_read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded ${getTypeColor(notification.notification_type)}`}>
                        {typeOptions.find(t => t.value === notification.notification_type)?.label}
                      </span>
                      <span>{formatTimeAgo(notification.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 flex-shrink-0">
                    {!notification.is_read ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => markAsRead(notification.id)}
                        title="Tandai sudah dibaca"
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => markAsUnread(notification.id)}
                        title="Tandai belum dibaca"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="danger" 
                      onClick={() => deleteNotification(notification.id)}
                      title="Hapus notifikasi"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {notifications.total === 0 && (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Tidak ada notifikasi</p>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {notifications.total_pages > 1 && (
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Menampilkan {((pagination.page || 1) - 1) * (pagination.limit || 10) + 1} - {Math.min((pagination.page || 1) * (pagination.limit || 10), notifications.total)} dari {notifications.total} notifikasi
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={(pagination.page || 1) <= 1}
                onClick={() => setPagination(p => ({ ...p, page: (p.page || 1) - 1 }))}
              >
                Sebelumnya
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={(pagination.page || 1) >= notifications.total_pages}
                onClick={() => setPagination(p => ({ ...p, page: (p.page || 1) + 1 }))}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
