import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Plus, Users, Clock, ThumbsUp, Reply, BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  author_role: string;
  subject: string;
  created_at: string;
  replies: number;
  likes: number;
  is_liked: boolean;
  is_solved: boolean;
}

export default function StudentForum() {
  const { user } = useAuth();
  const [activeSubject, setActiveSubject] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const subjects = [
    { id: 'all', name: 'Semua Mata Pelajaran', count: 45 },
    { id: 'matematika', name: 'Matematika', count: 12 },
    { id: 'fisika', name: 'Fisika', count: 8 },
    { id: 'kimia', name: 'Kimia', count: 6 },
    { id: 'biologi', name: 'Biologi', count: 7 },
    { id: 'bahasa_indonesia', name: 'Bahasa Indonesia', count: 5 },
    { id: 'bahasa_inggris', name: 'Bahasa Inggris', count: 4 },
    { id: 'sejarah', name: 'Sejarah', count: 3 }
  ];

  const [posts] = useState<ForumPost[]>([
    {
      id: 1,
      title: 'Cara menyelesaikan integral parsial?',
      content: 'Saya kesulitan memahami konsep integral parsial, khususnya dalam menentukan u dan dv...',
      author: 'Ahmad Rizki',
      author_role: 'XII IPA 1',
      subject: 'matematika',
      created_at: '2024-01-23T10:30:00Z',
      replies: 8,
      likes: 12,
      is_liked: false,
      is_solved: true
    },
    {
      id: 2,
      title: 'Penjelasan hukum Newton yang mudah dipahami',
      content: 'Ada yang bisa bantu jelaskan hukum Newton dengan contoh sehari-hari?',
      author: 'Siti Nurhaliza',
      author_role: 'XI IPA 2',
      subject: 'fisika',
      created_at: '2024-01-22T14:15:00Z',
      replies: 15,
      likes: 24,
      is_liked: true,
      is_solved: false
    },
    {
      id: 3,
      title: 'Tips menghapal tabel periodik',
      content: 'Bagaimana cara efektif menghapal unsur-unsur dalam tabel periodik?',
      author: 'Muhammad Fajar',
      author_role: 'X MIPA 1',
      subject: 'kimia',
      created_at: '2024-01-21T09:45:00Z',
      replies: 6,
      likes: 18,
      is_liked: false,
      is_solved: false
    }
  ]);

  const filteredPosts = activeSubject === 'all' 
    ? posts 
    : posts.filter(post => post.subject === activeSubject);

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
          Ajukan Pertanyaan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Subjects Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-medium mb-4">Mata Pelajaran</h3>
            <div className="space-y-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setActiveSubject(subject.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center ${
                    activeSubject === subject.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{subject.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {subject.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="mt-4">
            <h3 className="font-medium mb-4">Tips Forum</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span>Gunakan judul yang jelas dan spesifik</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span>Sertakan detail masalah yang dihadapi</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span>Berikan apresiasi untuk jawaban yang membantu</span>
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
                      <BookOpen className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900 hover:text-primary-600 cursor-pointer">
                        {post.title}
                      </h3>
                      {post.is_solved && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Terjawab
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {subjects.find(s => s.id === post.subject)?.name}
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
                        {post.replies} jawaban
                      </button>
                      <Button size="sm" variant="secondary">
                        Lihat Diskusi
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Question Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Ajukan Pertanyaan</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Mata Pelajaran</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Pilih mata pelajaran</option>
                  {subjects.slice(1).map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Judul Pertanyaan</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Tulis judul pertanyaan yang jelas dan spesifik"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Detail Pertanyaan</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Jelaskan pertanyaan Anda dengan detail. Sertakan informasi yang relevan seperti materi yang sedang dipelajari, bagian yang tidak dipahami, atau contoh soal."
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Tips untuk pertanyaan yang baik:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Gunakan judul yang spesifik dan mudah dipahami</li>
                  <li>• Jelaskan konteks materi yang sedang dipelajari</li>
                  <li>• Sebutkan bagian mana yang tidak dipahami</li>
                  <li>• Sertakan contoh jika memungkinkan</li>
                </ul>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  Ajukan Pertanyaan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
