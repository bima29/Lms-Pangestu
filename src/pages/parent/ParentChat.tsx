import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageCircle, Send, Search, Users, Phone, Video, UserCheck } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface ChatContact {
  id: number;
  name: string;
  role: 'teacher' | 'admin';
  subject?: string;
  position?: string;
  last_message: string;
  last_seen: string;
  unread_count: number;
  is_online: boolean;
}

interface Message {
  id: number;
  sender_id: number;
  sender_name: string;
  content: string;
  timestamp: string;
  is_own: boolean;
}

export default function ParentChat() {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'teachers' | 'admin'>('teachers');

  // Mock data
  const [contacts] = useState<ChatContact[]>([
    {
      id: 1,
      name: 'Dra. Siti Aminah',
      role: 'teacher',
      subject: 'Matematika',
      last_message: 'Ahmad menunjukkan kemajuan yang baik dalam pelajaran matematika',
      last_seen: '2024-01-23T15:30:00Z',
      unread_count: 1,
      is_online: true
    },
    {
      id: 2,
      name: 'Ahmad Fauzi, S.Pd',
      role: 'teacher',
      subject: 'Fisika',
      last_message: 'Terima kasih atas perhatiannya terhadap perkembangan anak',
      last_seen: '2024-01-23T14:20:00Z',
      unread_count: 0,
      is_online: false
    },
    {
      id: 3,
      name: 'Admin Sekolah',
      role: 'admin',
      position: 'Kepala Sekolah',
      last_message: 'Rapat orang tua akan diadakan minggu depan',
      last_seen: '2024-01-23T13:45:00Z',
      unread_count: 2,
      is_online: true
    },
    {
      id: 4,
      name: 'Wali Kelas XII IPA 1',
      role: 'teacher',
      subject: 'Wali Kelas',
      last_message: 'Perkembangan Ahmad sangat positif semester ini',
      last_seen: '2024-01-23T12:30:00Z',
      unread_count: 0,
      is_online: false
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender_id: 1,
      sender_name: 'Dra. Siti Aminah',
      content: 'Selamat siang Bapak/Ibu, saya ingin memberikan update tentang perkembangan Ahmad di pelajaran matematika',
      timestamp: '2024-01-23T15:25:00Z',
      is_own: false
    },
    {
      id: 2,
      sender_id: Number(user?.id) || 0,
      sender_name: user?.name || '',
      content: 'Terima kasih Bu, bagaimana perkembangannya?',
      timestamp: '2024-01-23T15:27:00Z',
      is_own: true
    },
    {
      id: 3,
      sender_id: 1,
      sender_name: 'Dra. Siti Aminah',
      content: 'Ahmad menunjukkan kemajuan yang sangat baik. Nilai-nilainya konsisten dan dia aktif bertanya di kelas',
      timestamp: '2024-01-23T15:30:00Z',
      is_own: false
    }
  ]);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'teachers' ? contact.role === 'teacher' : contact.role === 'admin';
    return matchesSearch && matchesTab;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedContact) {
      // Handle send message logic here
      setMessageText('');
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Baru saja';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} jam yang lalu`;
    } else {
      return date.toLocaleDateString('id-ID');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Chat dengan Guru & Admin</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Contacts List */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari kontak..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('teachers')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'teachers'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Guru
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'admin'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    Admin
                  </div>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedContact?.id === contact.id ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        {contact.role === 'teacher' ? (
                          <UserCheck className="h-5 w-5 text-primary-600" />
                        ) : (
                          <Users className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                      {contact.is_online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                        {contact.unread_count > 0 && (
                          <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {contact.unread_count}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        {contact.role === 'teacher' ? `Guru ${contact.subject}` : contact.position}
                      </p>
                      <p className="text-sm text-gray-600 truncate">{contact.last_message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatLastSeen(contact.last_seen)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        {selectedContact.role === 'teacher' ? (
                          <UserCheck className="h-5 w-5 text-primary-600" />
                        ) : (
                          <Users className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                      {selectedContact.is_online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedContact.role === 'teacher' ? `Guru ${selectedContact.subject}` : selectedContact.position}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.is_own ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.is_own
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.is_own ? 'text-primary-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={`Kirim pesan ke ${selectedContact.name}...`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <Button type="submit" disabled={!messageText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Pilih kontak untuk memulai percakapan</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Berkomunikasi dengan guru dan admin sekolah tentang perkembangan anak
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="font-medium mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="flex items-center gap-2 justify-start">
            <UserCheck className="h-4 w-4" />
            Hubungi Wali Kelas
          </Button>
          <Button variant="secondary" className="flex items-center gap-2 justify-start">
            <Users className="h-4 w-4" />
            Hubungi Admin Sekolah
          </Button>
          <Button variant="secondary" className="flex items-center gap-2 justify-start">
            <MessageCircle className="h-4 w-4" />
            Konsultasi Akademik
          </Button>
        </div>
      </Card>
    </div>
  );
}
