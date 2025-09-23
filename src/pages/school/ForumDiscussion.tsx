import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Plus, Users, Clock, Pin, Lock } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface ForumTopic {
  id: number;
  title: string;
  description: string;
  author: string;
  created_at: string;
  replies: number;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  category: string;
  last_activity: string;
}

export default function ForumDiscussion() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = [
    { id: 'all', name: 'Semua Kategori', count: 45 },
    { id: 'announcement', name: 'Pengumuman', count: 12 },
    { id: 'academic', name: 'Akademik', count: 18 },
    { id: 'general', name: 'Diskusi Umum', count: 15 }
  ];

  // Mock data
  const [topics, setTopics] = useState<ForumTopic[]>([
    {
      id: 1,
      title: 'Persiapan Ujian Semester Ganjil 2024/2025',
      description: 'Diskusi mengenai persiapan dan jadwal ujian semester ganjil',
      author: 'Admin Sekolah',
      created_at: '2024-01-20T10:00:00Z',
      replies: 24,
      views: 156,
      is_pinned: true,
      is_locked: false,
      category: 'announcement',
      last_activity: '2024-01-23T14:30:00Z'
    },
    {
      id: 2,
      title: 'Implementasi Kurikulum Merdeka',
      description: 'Sharing pengalaman dan tips implementasi kurikulum merdeka',
      author: 'Dra. Siti Nurhaliza',
      created_at: '2024-01-19T09:15:00Z',
      replies: 18,
      views: 89,
      is_pinned: false,
      is_locked: false,
      category: 'academic',
      last_activity: '2024-01-23T11:20:00Z'
    },
    {
      id: 3,
      title: 'Kegiatan Ekstrakurikuler Semester Ini',
      description: 'Koordinasi dan diskusi kegiatan ekstrakurikuler',
      author: 'Ahmad Fauzi, S.Pd',
      created_at: '2024-01-18T16:45:00Z',
      replies: 12,
      views: 67,
      is_pinned: false,
      is_locked: false,
      category: 'general',
      last_activity: '2024-01-22T15:10:00Z'
    }
  ]);

  const filteredTopics = activeCategory === 'all' 
    ? topics 
    : topics.filter(topic => topic.category === activeCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Forum Diskusi</h1>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Buat Topik Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-medium mb-4">Kategori</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center ${
                    activeCategory === category.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="mt-4">
            <h3 className="font-medium mb-4">Statistik Forum</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Topik</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Balasan</span>
                <span className="font-medium">234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Anggota Aktif</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Topics List */}
        <div className="lg:col-span-3">
          <Card>
            <div className="space-y-4">
              {filteredTopics.map((topic) => (
                <div key={topic.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {topic.is_pinned && (
                          <Pin className="h-4 w-4 text-yellow-500" />
                        )}
                        {topic.is_locked && (
                          <Lock className="h-4 w-4 text-gray-500" />
                        )}
                        <h3 className="font-medium text-gray-900 hover:text-primary-600 cursor-pointer">
                          {topic.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {topic.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>oleh {topic.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(topic.created_at)}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          {topic.category === 'announcement' ? 'Pengumuman' :
                           topic.category === 'academic' ? 'Akademik' : 'Umum'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {topic.replies} balasan
                      </div>
                      <div className="text-xs text-gray-500">
                        {topic.views} views
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Terakhir: {formatDate(topic.last_activity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Create Topic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Buat Topik Baru</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="general">Diskusi Umum</option>
                  <option value="academic">Akademik</option>
                  <option value="announcement">Pengumuman</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Judul Topik</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan judul topik"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Deskripsi</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Jelaskan topik diskusi Anda"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Pin topik ini</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Kunci balasan</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  Buat Topik
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
