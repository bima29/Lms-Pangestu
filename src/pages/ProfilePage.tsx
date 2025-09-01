import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <div className="text-center py-20">User tidak ditemukan.</div>;

  // Fungsi tombol kembali
  const handleBack = () => {
    window.history.length > 1 ? window.history.back() : window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-10">
      <div className="w-full max-w-xl">
        <Card className="p-8 shadow-xl border border-primary-100">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" size="sm" onClick={handleBack} className="flex items-center gap-2 text-primary-700 border-primary-300 hover:bg-primary-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Kembali
            </Button>
            <h2 className="text-2xl font-bold text-primary-900">Profil Pengguna</h2>
          </div>
          <div className="flex items-center gap-6 mb-6">
            <img
              src={user.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1'}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover border-4 border-primary-200 shadow"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{user.email}</p>
              <span className="inline-block px-3 py-1 rounded bg-primary-100 text-primary-700 text-xs font-semibold">
                {user.role.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary-700">Nama Lengkap</label>
              <input type="text" className="w-full border rounded px-3 py-2 bg-primary-50" value={user.name} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary-700">Email</label>
              <input type="email" className="w-full border rounded px-3 py-2 bg-primary-50" value={user.email} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary-700">No. HP</label>
              <input type="text" className="w-full border rounded px-3 py-2 bg-primary-50" value={user.phone || ''} readOnly />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <Button variant="primary" className="px-6">Edit Profil</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
