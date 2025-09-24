import { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Award,
  Target
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface AcademicStandard {
  id: string;
  code: string;
  title: string;
  description: string;
  subject_id: string;
  subject_name: string;
  grade_level: number;
  category: 'knowledge' | 'skill' | 'attitude';
  is_active: boolean;
  schools_using: number;
  created_at: string;
}

interface CurriculumTemplate {
  id: string;
  name: string;
  description: string;
  grade_level: number;
  subject_count: number;
  schools_using: number;
  is_default: boolean;
  created_at: string;
}

export default function AcademicGlobal() {
  const [activeTab, setActiveTab] = useState('standards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Mock data for Academic Standards
  const [academicStandards] = useState<AcademicStandard[]>([
    {
      id: '1',
      code: 'MTK.10.1.1',
      title: 'Memahami konsep bilangan real',
      description: 'Siswa mampu memahami dan mengaplikasikan konsep bilangan real dalam kehidupan sehari-hari',
      subject_id: 'sub-1',
      subject_name: 'Matematika',
      grade_level: 10,
      category: 'knowledge',
      is_active: true,
      schools_using: 15,
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      code: 'FIS.11.2.1',
      title: 'Menganalisis gerak parabola',
      description: 'Siswa mampu menganalisis dan menghitung gerak parabola dengan berbagai variasi',
      subject_id: 'sub-2',
      subject_name: 'Fisika',
      grade_level: 11,
      category: 'skill',
      is_active: true,
      schools_using: 12,
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '3',
      code: 'BIO.12.1.3',
      title: 'Menunjukkan sikap ilmiah dalam penelitian',
      description: 'Siswa menunjukkan sikap objektif, teliti, dan bertanggung jawab dalam melakukan penelitian',
      subject_id: 'sub-4',
      subject_name: 'Biologi',
      grade_level: 12,
      category: 'attitude',
      is_active: true,
      schools_using: 18,
      created_at: '2024-01-15T00:00:00Z'
    }
  ]);

  // Mock data for Curriculum Templates
  const [curriculumTemplates] = useState<CurriculumTemplate[]>([
    {
      id: '1',
      name: 'Kurikulum Merdeka - IPA',
      description: 'Template kurikulum merdeka untuk jurusan IPA',
      grade_level: 10,
      subject_count: 12,
      schools_using: 20,
      is_default: true,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Kurikulum Merdeka - IPS',
      description: 'Template kurikulum merdeka untuk jurusan IPS',
      grade_level: 10,
      subject_count: 10,
      schools_using: 15,
      is_default: false,
      created_at: '2024-01-01T00:00:00Z'
    }
  ]);

  const tabs = [
    { id: 'standards', name: 'Standar Kompetensi', icon: Award },
    { id: 'curriculum', name: 'Template Kurikulum', icon: BookOpen },
    { id: 'subjects', name: 'Mata Pelajaran Global', icon: GraduationCap },
    { id: 'assessment', name: 'Standar Penilaian', icon: Target }
  ];

  const filteredStandards = academicStandards.filter(standard => {
    const matchesSearch = standard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         standard.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || standard.grade_level.toString() === selectedGrade;
    const matchesCategory = selectedCategory === 'all' || standard.category === selectedCategory;
    return matchesSearch && matchesGrade && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'knowledge': return 'bg-blue-100 text-blue-800';
      case 'skill': return 'bg-green-100 text-green-800';
      case 'attitude': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'knowledge': return <BookOpen className="h-4 w-4" />;
      case 'skill': return <Target className="h-4 w-4" />;
      case 'attitude': return <Users className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manajemen Akademik Global</h1>
          <p className="text-gray-600 mt-1">Kelola standar akademik untuk semua sekolah dalam platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Standar
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Standar</p>
              <p className="text-2xl font-bold text-blue-600">{academicStandards.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Template Kurikulum</p>
              <p className="text-2xl font-bold text-green-600">{curriculumTemplates.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sekolah Menggunakan</p>
              <p className="text-2xl font-bold text-purple-600">25</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Standar Aktif</p>
              <p className="text-2xl font-bold text-orange-600">
                {academicStandards.filter(s => s.is_active).length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Settings className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
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

      {/* Standards Tab */}
      {activeTab === 'standards' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari standar kompetensi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Kelas</option>
                  <option value="10">Kelas 10</option>
                  <option value="11">Kelas 11</option>
                  <option value="12">Kelas 12</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="knowledge">Pengetahuan</option>
                  <option value="skill">Keterampilan</option>
                  <option value="attitude">Sikap</option>
                </select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Lanjutan
                </Button>
              </div>
            </div>
          </Card>

          {/* Standards Table */}
          <Card>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standar Kompetensi</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStandards.map((standard) => (
                      <tr key={standard.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {standard.code}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{standard.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{standard.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{standard.subject_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kelas {standard.grade_level}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1 ${getCategoryColor(standard.category)}`}>
                            {getCategoryIcon(standard.category)}
                            {standard.category === 'knowledge' ? 'Pengetahuan' : 
                             standard.category === 'skill' ? 'Keterampilan' : 'Sikap'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{standard.schools_using} sekolah</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            standard.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {standard.is_active ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingItem(standard)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Curriculum Templates Tab */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Template Kurikulum</h3>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Buat Template
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {curriculumTemplates.map((template) => (
                  <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          {template.is_default && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kelas:</span>
                        <span className="font-medium">Kelas {template.grade_level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Mata Pelajaran:</span>
                        <span className="font-medium">{template.subject_count} mapel</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Digunakan:</span>
                        <span className="font-medium">{template.schools_using} sekolah</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="secondary" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Global Subjects Tab */}
      {activeTab === 'subjects' && (
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Mata Pelajaran Global</h3>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah Mata Pelajaran
              </Button>
            </div>
            
            <div className="text-center py-8 text-gray-500">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Fitur mata pelajaran global akan segera tersedia</p>
              <p className="text-sm mt-2">Kelola mata pelajaran standar untuk semua sekolah</p>
            </div>
          </div>
        </Card>
      )}

      {/* Assessment Standards Tab */}
      {activeTab === 'assessment' && (
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Standar Penilaian</h3>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah Standar Penilaian
              </Button>
            </div>
            
            <div className="text-center py-8 text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Fitur standar penilaian akan segera tersedia</p>
              <p className="text-sm mt-2">Kelola kriteria dan rubrik penilaian standar</p>
            </div>
          </div>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Tambah Standar Kompetensi</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kode Kompetensi</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Contoh: MTK.10.1.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mata Pelajaran</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Pilih Mata Pelajaran</option>
                    <option value="matematika">Matematika</option>
                    <option value="fisika">Fisika</option>
                    <option value="kimia">Kimia</option>
                    <option value="biologi">Biologi</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Judul Kompetensi</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan judul standar kompetensi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Deskripsi</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Deskripsi detail standar kompetensi"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kelas</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="knowledge">Pengetahuan</option>
                    <option value="skill">Keterampilan</option>
                    <option value="attitude">Sikap</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Standar Kompetensi Aktif
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  Simpan Standar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}