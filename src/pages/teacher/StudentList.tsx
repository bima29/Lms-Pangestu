import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Search, Filter, Mail, Phone, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Student {
  id: number;
  student_id: string;
  name: string;
  email: string;
  phone?: string;
  class_name: string;
  major_name: string;
  grade_level: number;
  status: 'active' | 'inactive';
  parent_name?: string;
  parent_phone?: string;
}

export default function StudentList() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data - replace with actual API call
  const [students] = useState<Student[]>([
    {
      id: 1,
      student_id: '2024001',
      name: 'Ahmad Rizki Pratama',
      email: 'ahmad.rizki@student.sman1.sch.id',
      phone: '081234567890',
      class_name: 'XII IPA 1',
      major_name: 'IPA',
      grade_level: 12,
      status: 'active',
      parent_name: 'Budi Pratama',
      parent_phone: '081234567891'
    },
    {
      id: 2,
      student_id: '2024002',
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@student.sman1.sch.id',
      phone: '081234567892',
      class_name: 'XII IPA 1',
      major_name: 'IPA',
      grade_level: 12,
      status: 'active',
      parent_name: 'Hasan Basri',
      parent_phone: '081234567893'
    },
    {
      id: 3,
      student_id: '2024003',
      name: 'Muhammad Fajar',
      email: 'muhammad.fajar@student.sman1.sch.id',
      phone: '081234567894',
      class_name: 'XI IPS 2',
      major_name: 'IPS',
      grade_level: 11,
      status: 'active',
      parent_name: 'Indra Gunawan',
      parent_phone: '081234567895'
    }
  ]);

  const classes = ['all', 'XII IPA 1', 'XII IPA 2', 'XI IPS 1', 'XI IPS 2', 'X MIPA 1'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_id.includes(searchTerm) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class_name === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleViewDetail = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Daftar Siswa</h1>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari siswa berdasarkan nama, NIS, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Semua Kelas</option>
              {classes.slice(1).map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-xl font-semibold">{students.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Siswa Aktif</p>
              <p className="text-xl font-semibold">{students.filter(s => s.status === 'active').length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Kelas XII</p>
              <p className="text-xl font-semibold">{students.filter(s => s.grade_level === 12).length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Kelas XI</p>
              <p className="text-xl font-semibold">{students.filter(s => s.grade_level === 11).length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">NIS</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Nama Siswa</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Kelas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Jurusan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{student.student_id}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{student.class_name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{student.major_name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{student.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleViewDetail(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(`mailto:${student.email}`)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Detail Siswa</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">NIS</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudent.student_id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudent.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kelas</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudent.class_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jurusan</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudent.major_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudent.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">No. Telepon</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudent.phone || '-'}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Informasi Orang Tua</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Orang Tua</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStudent.parent_name || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">No. Telepon Orang Tua</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStudent.parent_phone || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Tutup
              </Button>
              <Button onClick={() => window.open(`mailto:${selectedStudent.email}`)}>
                Kirim Email
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
