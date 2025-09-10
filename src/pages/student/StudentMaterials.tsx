import React, { useState } from 'react';
import { BookOpen, Download, Eye, Search, Filter, Calendar, FileText, Video, Image } from 'lucide-react';

const StudentMaterials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const materials = [
    {
      id: '1',
      title: 'Integral dan Diferensial',
      subject: 'Matematika',
      teacher: 'Pak Budi Santoso',
      type: 'pdf',
      size: '2.5 MB',
      uploadDate: '2025-01-08',
      description: 'Materi lengkap tentang integral dan diferensial untuk persiapan ujian',
      downloads: 45,
      icon: FileText
    },
    {
      id: '2',
      title: 'Video Pembelajaran Gerak Lurus',
      subject: 'Fisika',
      teacher: 'Ibu Sari Dewi',
      type: 'video',
      size: '125 MB',
      uploadDate: '2025-01-07',
      description: 'Video pembelajaran interaktif tentang gerak lurus beraturan',
      downloads: 32,
      icon: Video
    },
    {
      id: '3',
      title: 'Struktur Atom dan Ikatan Kimia',
      subject: 'Kimia',
      teacher: 'Pak Budi Santoso',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2025-01-06',
      description: 'Penjelasan detail tentang struktur atom dan berbagai jenis ikatan kimia',
      downloads: 28,
      icon: FileText
    },
    {
      id: '4',
      title: 'Diagram Fotosintesis',
      subject: 'Biologi',
      teacher: 'Ibu Sari Dewi',
      type: 'image',
      size: '850 KB',
      uploadDate: '2025-01-05',
      description: 'Diagram lengkap proses fotosintesis pada tumbuhan',
      downloads: 38,
      icon: Image
    }
  ];

  const subjects = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 'Bahasa Inggris'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === '' || material.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'image': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Materi Pembelajaran</h1>
        <div className="text-sm text-gray-500">
          Total: {filteredMaterials.length} materi
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari materi pembelajaran..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Semua Mata Pelajaran</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <material.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{material.title}</h3>
                    <p className="text-sm text-gray-500">{material.subject}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(material.type)}`}>
                  {material.type.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{material.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Guru: {material.teacher}</span>
                  <span>{material.size}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(material.uploadDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>{material.downloads} unduhan</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>Lihat</span>
                </button>
                <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>Unduh</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada materi ditemukan</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedSubject 
              ? 'Coba ubah filter pencarian Anda.' 
              : 'Belum ada materi pembelajaran yang tersedia.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
