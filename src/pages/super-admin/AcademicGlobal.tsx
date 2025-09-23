import { useState } from 'react';
import { BookOpen, GraduationCap, FileText, BarChart3, Plus, Search, Eye, Edit, School, Users, Calendar, TrendingUp, Award, Clock, CheckCircle, AlertCircle, Save, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credit_hours: number;
  is_active: boolean;
  schools_count: number;
  created_at: string;
}

export default function AcademicGlobal() {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Matematika', code: 'MTK', description: 'Mata pelajaran matematika untuk semua tingkat', credit_hours: 4, is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '2', name: 'Bahasa Indonesia', code: 'BID', description: 'Mata pelajaran bahasa Indonesia', credit_hours: 4, is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '3', name: 'Bahasa Inggris', code: 'BIG', description: 'Mata pelajaran bahasa Inggris', credit_hours: 3, is_active: true, schools_count: 12, created_at: '2024-01-15' },
    { id: '4', name: 'Fisika', code: 'FIS', description: 'Mata pelajaran fisika untuk IPA', credit_hours: 3, is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '5', name: 'Kimia', code: 'KIM', description: 'Mata pelajaran kimia untuk IPA', credit_hours: 3, is_active: true, schools_count: 8, created_at: '2024-01-15' }
  ]);
  const [subjectFormData, setSubjectFormData] = useState({
    name: '',
    code: '',
    description: '',
    credit_hours: 1,
    is_active: true
  });
  const [subjectErrors, setSubjectErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Subject management functions
  const validateSubjectForm = () => {
    const newErrors: Record<string, string> = {};

    if (!subjectFormData.name.trim()) {
      newErrors.name = 'Nama mata pelajaran wajib diisi';
    }

    if (!subjectFormData.code.trim()) {
      newErrors.code = 'Kode mata pelajaran wajib diisi';
    } else if (subjects.some(s => s.code === subjectFormData.code)) {
      newErrors.code = 'Kode mata pelajaran sudah digunakan';
    }

    if (subjectFormData.credit_hours < 1 || subjectFormData.credit_hours > 6) {
      newErrors.credit_hours = 'SKS harus antara 1-6';
    }

    setSubjectErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddSubjectModal = () => {
    setSubjectFormData({
      name: '',
      code: '',
      description: '',
      credit_hours: 1,
      is_active: true
    });
    setSubjectErrors({});
    setShowAddSubjectModal(true);
  };

  const closeSubjectModal = () => {
    setShowAddSubjectModal(false);
    setSubjectFormData({
      name: '',
      code: '',
      description: '',
      credit_hours: 1,
      is_active: true
    });
    setSubjectErrors({});
  };

  const handleAddSubject = () => {
    if (!validateSubjectForm()) return;

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: subjectFormData.name,
      code: subjectFormData.code.toUpperCase(),
      description: subjectFormData.description,
      credit_hours: subjectFormData.credit_hours,
      is_active: subjectFormData.is_active,
      schools_count: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setSubjects([...subjects, newSubject]);
    closeSubjectModal();
  };

  const tabs = [
    { id: 'curriculum', name: 'Kurikulum', icon: BookOpen },
    { id: 'classes', name: 'Monitoring Kelas', icon: GraduationCap },
    { id: 'assessments', name: 'Monitoring CBT & Assignment', icon: FileText },
    { id: 'analytics', name: 'Analitik', icon: BarChart3 }
  ];

  // Mock data
  const mockSchools = [
    { id: '1', name: 'SMA Negeri 1 Jakarta' },
    { id: '2', name: 'SMA Negeri 2 Jakarta' },
    { id: '3', name: 'SMA Swasta Pangestu' }
  ];


  const mockClasses = [
    { id: '1', name: 'X IPA 1', school: 'SMA Negeri 1 Jakarta', students: 32, teacher: 'Drs. Ahmad Suryadi', attendance: 95, status: 'active' },
    { id: '2', name: 'XI IPS 2', school: 'SMA Negeri 2 Jakarta', students: 28, teacher: 'Dr. Siti Nurhaliza', attendance: 92, status: 'active' },
    { id: '3', name: 'XII IPA 3', school: 'SMA Swasta Pangestu', students: 30, teacher: 'Prof. Bambang Sutrisno', attendance: 88, status: 'active' }
  ];

  const mockAssessments = [
    { id: '1', title: 'Ujian Tengah Semester Matematika', type: 'CBT', school: 'SMA Negeri 1 Jakarta', participants: 120, completion: 95, date: '2024-03-15' },
    { id: '2', title: 'Tugas Bahasa Indonesia', type: 'Assignment', school: 'SMA Negeri 2 Jakarta', participants: 85, completion: 78, date: '2024-03-10' },
    { id: '3', title: 'Quiz Fisika', type: 'CBT', school: 'SMA Swasta Pangestu', participants: 90, completion: 100, date: '2024-03-12' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Akademik Global</h1>
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
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={openAddSubjectModal}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Mata Pelajaran Global</h4>
                    <p className="text-sm text-gray-600 mt-1">Kelola mata pelajaran standar</p>
                    <p className="text-lg font-semibold text-blue-600 mt-2">{subjects.length} Mata Pelajaran</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/super-admin/academic-year')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Tahun Akademik</h4>
                    <p className="text-sm text-gray-600 mt-1">Atur tahun akademik global</p>
                    <p className="text-lg font-semibold text-green-600 mt-2">2023/2024</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-500" />
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/super-admin/competency-standards')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Standar Kompetensi</h4>
                    <p className="text-sm text-gray-600 mt-1">Kelola standar kompetensi</p>
                    <p className="text-lg font-semibold text-purple-600 mt-2">24 Standar</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </Card>
            </div>

            {/* Subject Overview */}
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Mata Pelajaran Global</h3>
                  <Button onClick={openAddSubjectModal} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Mata Pelajaran
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKS</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subjects.slice(0, 5).map((subject) => (
                        <tr key={subject.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{subject.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.code}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.credit_hours}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.schools_count} sekolah</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subject.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {subject.is_active ? 'Aktif' : 'Nonaktif'}
                            </span>
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

        {activeTab === 'classes' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Kelas</p>
                    <p className="text-2xl font-bold text-blue-600">1,245</p>
                    <p className="text-xs text-gray-500 mt-1">Di semua sekolah</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Kelas Aktif</p>
                    <p className="text-2xl font-bold text-green-600">1,180</p>
                    <p className="text-xs text-gray-500 mt-1">94.8% dari total</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rata-rata Siswa</p>
                    <p className="text-2xl font-bold text-yellow-600">28</p>
                    <p className="text-xs text-gray-500 mt-1">Per kelas</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tingkat Kehadiran</p>
                    <p className="text-2xl font-bold text-purple-600">94%</p>
                    <p className="text-xs text-gray-500 mt-1">Rata-rata global</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters and Classes Table */}
            <Card>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Cari kelas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Semua Sekolah</option>
                    {mockSchools.map(school => (
                      <option key={school.id} value={school.id}>{school.name}</option>
                    ))}
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wali Kelas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kehadiran</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockClasses.map((classItem) => (
                        <tr key={classItem.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{classItem.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.school}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.teacher}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.students} siswa</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                classItem.attendance >= 95 ? 'bg-green-400' :
                                classItem.attendance >= 90 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></div>
                              <span className="text-sm text-gray-900">{classItem.attendance}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="h-4 w-4" />
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

        {activeTab === 'assessments' && (
          <div className="space-y-6">
            {/* Assessment Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total CBT</p>
                    <p className="text-2xl font-bold text-indigo-600">2,456</p>
                    <p className="text-xs text-gray-500 mt-1">Ujian online</p>
                  </div>
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Assignment</p>
                    <p className="text-2xl font-bold text-pink-600">5,678</p>
                    <p className="text-xs text-gray-500 mt-1">Tugas mandiri</p>
                  </div>
                  <div className="p-3 bg-pink-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tingkat Penyelesaian</p>
                    <p className="text-2xl font-bold text-teal-600">87%</p>
                    <p className="text-xs text-gray-500 mt-1">Rata-rata global</p>
                  </div>
                  <div className="p-3 bg-teal-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-orange-600">342</p>
                    <p className="text-xs text-gray-500 mt-1">Menunggu koreksi</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Assessments */}
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Assessment Terbaru</h3>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Semua Tipe</option>
                      <option value="cbt">CBT</option>
                      <option value="assignment">Assignment</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Semua Sekolah</option>
                      {mockSchools.map(school => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peserta</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penyelesaian</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockAssessments.map((assessment) => (
                        <tr key={assessment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{assessment.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              assessment.type === 'CBT' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {assessment.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.school}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.participants} siswa</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    assessment.completion >= 90 ? 'bg-green-500' :
                                    assessment.completion >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${assessment.completion}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">{assessment.completion}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="h-4 w-4" />
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

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sekolah</p>
                    <p className="text-2xl font-bold text-blue-600">15</p>
                    <p className="text-xs text-green-600 mt-1">+2 bulan ini</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <School className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                    <p className="text-2xl font-bold text-green-600">34,892</p>
                    <p className="text-xs text-green-600 mt-1">+5.2% dari bulan lalu</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rata-rata Nilai</p>
                    <p className="text-2xl font-bold text-purple-600">82.5</p>
                    <p className="text-xs text-green-600 mt-1">+1.2 dari semester lalu</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Performa Sekolah</h3>
                  <div className="space-y-4">
                    {mockSchools.map((school, index) => (
                      <div key={school.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            index === 0 ? 'bg-green-500' : 
                            index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                          }`}></div>
                          <span className="text-sm font-medium">{school.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-green-500' : 
                                index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                              }`}
                              style={{ width: `${85 + index * 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{85 + index * 5}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Distribusi Mata Pelajaran</h3>
                  <div className="space-y-4">
                    {subjects.slice(0, 4).map((subject, index) => (
                      <div key={subject.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            index === 0 ? 'bg-red-500' : 
                            index === 1 ? 'bg-yellow-500' : 
                            index === 2 ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-sm font-medium">{subject.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{subject.schools} sekolah</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-red-500' : 
                                index === 1 ? 'bg-yellow-500' : 
                                index === 2 ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${(subject.schools / 15) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Trends and Insights */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Tren dan Insight</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-900">Peningkatan Kehadiran</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Kehadiran siswa meningkat 3.2% bulan ini</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-900">Nilai CBT Meningkat</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">Rata-rata nilai CBT naik 2.8 poin</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-yellow-900">Perlu Perhatian</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">3 sekolah memerlukan dukungan tambahan</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Mata Pelajaran</h3>
              <button onClick={closeSubjectModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mata Pelajaran *</label>
                <input
                  type="text"
                  value={subjectFormData.name}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama mata pelajaran"
                />
                {subjectErrors.name && <p className="mt-1 text-sm text-red-600">{subjectErrors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Mata Pelajaran *</label>
                <input
                  type="text"
                  value={subjectFormData.code}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, code: e.target.value.toUpperCase() })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.code ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Contoh: MTK, BID, BIG"
                  maxLength={5}
                />
                {subjectErrors.code && <p className="mt-1 text-sm text-red-600">{subjectErrors.code}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={subjectFormData.description}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Deskripsi mata pelajaran"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKS *</label>
                <select
                  value={subjectFormData.credit_hours}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, credit_hours: parseInt(e.target.value) })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.credit_hours ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6].map(sks => (
                    <option key={sks} value={sks}>{sks} SKS</option>
                  ))}
                </select>
                {subjectErrors.credit_hours && <p className="mt-1 text-sm text-red-600">{subjectErrors.credit_hours}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={subjectFormData.is_active}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Mata Pelajaran Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={closeSubjectModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddSubject}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
