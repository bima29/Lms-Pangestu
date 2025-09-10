import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Megaphone,
  Calendar,
  Users,
  Search,
  Filter
} from 'lucide-react';
import type { 
  Announcement, 
  PaginationParams, 
  PaginationResult 
} from '../../types';

const defaultPage: PaginationParams = { page: 1, limit: 10, search: '' };

export default function SchoolAnnouncements() {
  const [pagination, setPagination] = useState<PaginationParams>(defaultPage);
  const [announcements, setAnnouncements] = useState<PaginationResult<Announcement>>({ 
    data: [], total: 0, page: 1, limit: 10, total_pages: 0 
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [announcementForm, setAnnouncementForm] = useState<Partial<Announcement>>({
    announcement_type: 'general',
    target_role: 'all',
    priority: 'normal',
    is_published: false
  });
  const [selectedType, setSelectedType] = useState<string>('all');

  const loadAnnouncements = () => {
    // Mock implementation - replace with actual API call
    const mockAnnouncements: Announcement[] = [
      {
        id: 'ann-1',
        title: 'Libur Hari Kemerdekaan',
        content: 'Sekolah libur pada tanggal 17 Agustus 2024 dalam rangka memperingati Hari Kemerdekaan RI.',
        announcement_type: 'holiday',
        target_role: 'all',
        created_by: 'admin-1',
        is_published: true,
        priority: 'high',
        created_at: '2024-08-10T00:00:00Z'
      },
      {
        id: 'ann-2',
        title: 'Rapat Guru Bulanan',
        content: 'Rapat koordinasi guru akan dilaksanakan pada hari Jumat, 20 September 2024 pukul 13:00 WIB.',
        announcement_type: 'meeting',
        target_role: 'teacher',
        created_by: 'admin-1',
        is_published: true,
        priority: 'normal',
        created_at: '2024-09-15T00:00:00Z'
      },
      {
        id: 'ann-3',
        title: 'Pengumuman Ujian Tengah Semester',
        content: 'Ujian Tengah Semester akan dimulai pada tanggal 1 Oktober 2024. Siswa diharapkan mempersiapkan diri dengan baik.',
        announcement_type: 'exam',
        target_role: 'student',
        created_by: 'admin-1',
        is_published: false,
        priority: 'high',
        created_at: '2024-09-20T00:00:00Z'
      }
    ];

    let filtered = mockAnnouncements.filter(a => 
      !pagination.search || 
      a.title.toLowerCase().includes(pagination.search.toLowerCase()) ||
      a.content.toLowerCase().includes(pagination.search.toLowerCase())
    );

    if (selectedType !== 'all') {
      filtered = filtered.filter(a => a.announcement_type === selectedType);
    }

    const startIndex = ((pagination.page || 1) - 1) * (pagination.limit || 10);
    const paginatedData = filtered.slice(startIndex, startIndex + (pagination.limit || 10));

    setAnnouncements({
      data: paginatedData,
      total: filtered.length,
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total_pages: Math.ceil(filtered.length / (pagination.limit || 10))
    });
  };

  useEffect(() => { loadAnnouncements(); }, [pagination, selectedType]);

  const resetForm = () => {
    setEditingAnnouncement(null);
    setAnnouncementForm({
      announcement_type: 'general',
      target_role: 'all',
      priority: 'normal',
      is_published: false
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
      console.log('Updating announcement:', editingAnnouncement.id, announcementForm);
    } else {
      console.log('Creating announcement:', announcementForm);
    }
    resetForm();
    loadAnnouncements();
  };

  const onEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementForm({
      title: announcement.title,
      content: announcement.content,
      announcement_type: announcement.announcement_type,
      target_role: announcement.target_role,
      priority: announcement.priority,
      is_published: announcement.is_published
    });
  };

  const onDelete = (id: string) => {
    if (!confirm('Hapus pengumuman ini?')) return;
    console.log('Deleting announcement:', id);
    loadAnnouncements();
  };

  const typeOptions = [
    { value: 'general', label: 'Umum' },
    { value: 'academic', label: 'Akademik' },
    { value: 'exam', label: 'Ujian' },
    { value: 'holiday', label: 'Libur' },
    { value: 'meeting', label: 'Rapat' },
    { value: 'event', label: 'Acara' }
  ];

  const filterOptions = [
    { value: 'all', label: 'Semua Jenis' },
    ...typeOptions
  ];

  const targetOptions = [
    { value: 'all', label: 'Semua' },
    { value: 'student', label: 'Siswa' },
    { value: 'teacher', label: 'Guru' },
    { value: 'parent', label: 'Orang Tua' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Rendah' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Tinggi' },
    { value: 'urgent', label: 'Mendesak' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-blue-100 text-blue-700';
      case 'academic': return 'bg-green-100 text-green-700';
      case 'exam': return 'bg-red-100 text-red-700';
      case 'holiday': return 'bg-yellow-100 text-yellow-700';
      case 'meeting': return 'bg-purple-100 text-purple-700';
      case 'event': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'normal': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manajemen Pengumuman</h1>
        <Button onClick={() => setEditingAnnouncement({} as Announcement)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Pengumuman
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari pengumuman..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={pagination.search || ''}
                onChange={(e) => setPagination(p => ({ ...p, search: e.target.value, page: 1 }))}
              />
            </div>
          </div>
          <div className="min-w-48">
            <SearchSelect
              options={filterOptions}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Filter jenis"
            />
          </div>
        </div>
      </Card>

      {/* Announcement Form */}
      {editingAnnouncement && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingAnnouncement.id ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}
          </h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Judul Pengumuman</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={announcementForm.title ?? ''}
                onChange={(e) => setAnnouncementForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Pengumuman</label>
              <SearchSelect
                options={typeOptions}
                value={announcementForm.announcement_type ?? 'general'}
                onChange={(v) => setAnnouncementForm(f => ({ ...f, announcement_type: String(v) as any }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target</label>
              <SearchSelect
                options={targetOptions}
                value={announcementForm.target_role ?? 'all'}
                onChange={(v) => setAnnouncementForm(f => ({ ...f, target_role: String(v) as any }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prioritas</label>
              <SearchSelect
                options={priorityOptions}
                value={announcementForm.priority ?? 'normal'}
                onChange={(v) => setAnnouncementForm(f => ({ ...f, priority: String(v) as any }))}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="is_published"
                type="checkbox"
                checked={announcementForm.is_published ?? false}
                onChange={(e) => setAnnouncementForm(f => ({ ...f, is_published: e.target.checked }))}
              />
              <label htmlFor="is_published">Publikasikan</label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Isi Pengumuman</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                value={announcementForm.content ?? ''}
                onChange={(e) => setAnnouncementForm(f => ({ ...f, content: e.target.value }))}
                rows={5}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingAnnouncement.id ? 'Update' : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Batal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Announcements List */}
      <div className="grid grid-cols-1 gap-4">
        {announcements.data.map((announcement) => (
          <Card key={announcement.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Megaphone className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">{announcement.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(announcement.announcement_type)}`}>
                      {typeOptions.find(t => t.value === announcement.announcement_type)?.label}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(announcement.priority)}`}>
                      {priorityOptions.find(p => p.value === announcement.priority)?.label}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      announcement.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {announcement.is_published ? 'Dipublikasi' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => onEdit(announcement)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(announcement.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Target: {targetOptions.find(t => t.value === announcement.target_role)?.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(announcement.created_at).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {announcements.total === 0 && (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <Megaphone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Belum ada pengumuman</p>
          </div>
        </Card>
      )}
    </div>
  );
}
