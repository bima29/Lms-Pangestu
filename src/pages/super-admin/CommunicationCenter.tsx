import { useState } from 'react';
import { Megaphone, MessageSquare, Send, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState('announcements');

  const tabs = [
    { id: 'announcements', name: 'Pengumuman Global', icon: Megaphone },
    { id: 'forums', name: 'Forum Komunitas', icon: MessageSquare },
    { id: 'broadcast', name: 'Pesan Broadcast', icon: Send }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Konten & Komunikasi</h1>
        <Button className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          Buat Pengumuman
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'announcements' && (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Pengumuman Global</h3>
              <Button size="sm">Tambah Pengumuman</Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Pembaruan Sistem LMS</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Sistem akan mengalami maintenance pada tanggal 25 Januari 2024
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Target: Semua Sekolah</span>
                        <span>Dibuat: 2 hari yang lalu</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Aktif</span>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'forums' && (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Forum Komunitas</h3>
              <Button size="sm">Buat Forum Baru</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Forum Admin Sekolah', members: 156, posts: 1234 },
                { name: 'Forum Guru', members: 2341, posts: 5678 },
                { name: 'Forum Pengembangan', members: 45, posts: 234 },
                { name: 'Forum Dukungan Teknis', members: 89, posts: 567 }
              ].map((forum, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium">{forum.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {forum.members} anggota
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {forum.posts} post
                    </span>
                  </div>
                  <Button className="mt-3" variant="secondary" size="sm">Kelola</Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'broadcast' && (
          <Card>
            <h3 className="text-lg font-medium mb-4">Pesan Broadcast</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Penerima</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Semua Pengguna</option>
                    <option>Admin Sekolah</option>
                    <option>Guru</option>
                    <option>Siswa</option>
                    <option>Orang Tua</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prioritas</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Normal</option>
                    <option>Penting</option>
                    <option>Mendesak</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Judul Pesan</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan judul pesan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Isi Pesan</label>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan isi pesan broadcast"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="secondary">Simpan Draft</Button>
                <Button>Kirim Sekarang</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
