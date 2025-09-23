import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Plus, Users, Clock, ThumbsUp, Reply } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  author_role: string;
  created_at: string;
  replies: number;
  likes: number;
  category: string;
  is_liked: boolean;
}

export default function TeacherForum() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = [
    { id: 'all', name: 'Semua', count: 28 },
    { id: 'teaching', name: 'Metode Mengajar', count: 12 },
    { id: 'curriculum', name: 'Kurikulum', count: 8 },
    { id: 'technology', name: 'Teknologi Pendidikan', count: 5 },
    { id: 'discussion', name: 'Diskusi Umum', count: 3 }
  ];

  const [posts] = useState<ForumPost[]>([
    {
      id: 1,
      title: 'Tips Mengajar Matematika dengan Metode Visual',
      content: 'Sharing pengalaman menggunakan media visual untuk mengajar konsep matematika yang abstrak...',
      author: 'Dra. Siti Aminah',
      author_role: 'Guru Matematika',
      created_at: '2024-01-23T10:30:00Z',
      replies: 15,
      likes: 24,
      category: 'teaching',
      is_liked: false
    },
    {
      id: 2,
      title: 'Implementasi Kurikulum Merdeka di Mata Pelajaran Fisika',
      content: 'Bagaimana pengalaman teman-teman dalam mengimplementasikan kurikulum merdeka?',
      author: 'Ahmad Fauzi, S.Pd',
      author_role: 'Guru Fisika',
      created_at: '2024-01-22T14:15:00Z',
      replies: 8,
      likes: 12,
      category: 'curriculum',
      is_liked: true
    },
    {
      id: 3,
      title: 'Penggunaan AI dalam Pembelajaran',
      content: 'Diskusi tentang pemanfaatan teknologi AI untuk mendukung proses pembelajaran...',
      author: 'Dr. Budi Santoso',
      author_role: 'Guru Informatika',
      created_at: '2024-01-21T09:45:00Z',
      replies: 22,
      likes: 35,
      category: 'technology',
      is_liked: false
    }
  ]);

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

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
        <h1 className="text-2xl font-semibold text-gray-900">Forum Diskusi Guru</h1>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Buat Post Baru
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
            <h3 className="font-medium mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">5 post baru hari ini</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">23 balasan baru</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">12 guru online</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Posts List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900 hover:text-primary-600 cursor-pointer">
                        {post.title}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {post.category === 'teaching' ? 'Metode Mengajar' :
                         post.category === 'curriculum' ? 'Kurikulum' :
                         post.category === 'technology' ? 'Teknologi' : 'Diskusi'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>oleh {post.author}</span>
                      <span>{post.author_role}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className={`flex items-center gap-1 text-sm ${
                        post.is_liked ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
                      }`}>
                        <ThumbsUp className="h-4 w-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600">
                        <Reply className="h-4 w-4" />
                        {post.replies} balasan
                      </button>
                      <Button size="sm" variant="secondary">
                        Baca Selengkapnya
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Buat Post Baru</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="teaching">Metode Mengajar</option>
                  <option value="curriculum">Kurikulum</option>
                  <option value="technology">Teknologi Pendidikan</option>
                  <option value="discussion">Diskusi Umum</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Judul Post</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan judul post"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Konten</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Tulis konten post Anda di sini..."
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  Posting
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
