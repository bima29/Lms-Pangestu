import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { School, MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function SchoolProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'SMA Negeri 1 Jakarta',
    npsn: '20104001',
    address: 'Jl. Budi Kemuliaan I No.2, Gambir, Jakarta Pusat',
    phone: '(021) 3441621',
    email: 'info@sman1jakarta.sch.id',
    website: 'www.sman1jakarta.sch.id',
    principal: 'Dr. Ahmad Suryadi, M.Pd',
    established: '1950',
    accreditation: 'A',
    studentCapacity: 1200,
    currentStudents: 1150,
    teacherCount: 85,
    vision: 'Menjadi sekolah unggulan yang menghasilkan lulusan berkarakter, berprestasi, dan berwawasan global.',
    mission: 'Menyelenggarakan pendidikan berkualitas dengan mengintegrasikan nilai-nilai karakter, teknologi, dan kearifan lokal.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Profil Sekolah</h1>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "secondary" : "primary"}
        >
          {isEditing ? 'Batal' : 'Edit Profil'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <School className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-medium">Informasi Dasar</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Sekolah</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">NPSN</label>
              <input
                type="text"
                value={formData.npsn}
                onChange={(e) => setFormData({...formData, npsn: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kepala Sekolah</label>
              <input
                type="text"
                value={formData.principal}
                onChange={(e) => setFormData({...formData, principal: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tahun Berdiri</label>
              <input
                type="text"
                value={formData.established}
                onChange={(e) => setFormData({...formData, established: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Akreditasi</label>
              <select
                value={formData.accreditation}
                onChange={(e) => setFormData({...formData, accreditation: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              >
                <option value="A">A (Sangat Baik)</option>
                <option value="B">B (Baik)</option>
                <option value="C">C (Cukup)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-medium">Informasi Kontak</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Alamat</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Telepon</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <Card>
          <h3 className="text-lg font-medium mb-4">Statistik Sekolah</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kapasitas Siswa</label>
              <input
                type="number"
                value={formData.studentCapacity}
                onChange={(e) => setFormData({...formData, studentCapacity: parseInt(e.target.value)})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jumlah Siswa Saat Ini</label>
              <input
                type="number"
                value={formData.currentStudents}
                onChange={(e) => setFormData({...formData, currentStudents: parseInt(e.target.value)})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jumlah Guru</label>
              <input
                type="number"
                value={formData.teacherCount}
                onChange={(e) => setFormData({...formData, teacherCount: parseInt(e.target.value)})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
          </div>
        </Card>

        {/* Vision & Mission */}
        <Card>
          <h3 className="text-lg font-medium mb-4">Visi & Misi</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Visi</label>
              <textarea
                value={formData.vision}
                onChange={(e) => setFormData({...formData, vision: e.target.value})}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Misi</label>
              <textarea
                value={formData.mission}
                onChange={(e) => setFormData({...formData, mission: e.target.value})}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
          </div>
        </Card>

        {isEditing && (
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
              Batal
            </Button>
            <Button type="submit">
              Simpan Perubahan
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
