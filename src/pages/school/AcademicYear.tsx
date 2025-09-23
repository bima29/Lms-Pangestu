import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface AcademicYear {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  school_id: number;
  semester_1_start: string;
  semester_1_end: string;
  semester_2_start: string;
  semester_2_end: string;
}

export default function AcademicYear() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingYear, setEditingYear] = useState<AcademicYear | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    semester_1_start: '',
    semester_1_end: '',
    semester_2_start: '',
    semester_2_end: '',
    is_active: false
  });

  // Mock data - replace with actual API call
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([
    {
      id: 1,
      name: '2023/2024',
      start_date: '2023-07-17',
      end_date: '2024-06-15',
      is_active: false,
      school_id: user?.school_id || 1,
      semester_1_start: '2023-07-17',
      semester_1_end: '2023-12-22',
      semester_2_start: '2024-01-08',
      semester_2_end: '2024-06-15'
    },
    {
      id: 2,
      name: '2024/2025',
      start_date: '2024-07-15',
      end_date: '2025-06-14',
      is_active: true,
      school_id: user?.school_id || 1,
      semester_1_start: '2024-07-15',
      semester_1_end: '2024-12-20',
      semester_2_start: '2025-01-06',
      semester_2_end: '2025-06-14'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingYear) {
      // Update existing year
      setAcademicYears(years => years.map(year => 
        year.id === editingYear.id 
          ? { ...year, ...formData }
          : year
      ));
    } else {
      // Add new year
      const newYear: AcademicYear = {
        id: Date.now(),
        ...formData,
        school_id: user?.school_id || 1
      };
      setAcademicYears(years => [...years, newYear]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      start_date: '',
      end_date: '',
      semester_1_start: '',
      semester_1_end: '',
      semester_2_start: '',
      semester_2_end: '',
      is_active: false
    });
    setEditingYear(null);
    setShowModal(false);
  };

  const handleEdit = (year: AcademicYear) => {
    setFormData({
      name: year.name,
      start_date: year.start_date,
      end_date: year.end_date,
      semester_1_start: year.semester_1_start,
      semester_1_end: year.semester_1_end,
      semester_2_start: year.semester_2_start,
      semester_2_end: year.semester_2_end,
      is_active: year.is_active
    });
    setEditingYear(year);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus tahun akademik ini?')) {
      setAcademicYears(years => years.filter(year => year.id !== id));
    }
  };

  const handleSetActive = (id: number) => {
    setAcademicYears(years => years.map(year => ({
      ...year,
      is_active: year.id === id
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tahun Akademik</h1>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Tahun Akademik
        </Button>
      </div>

      {/* Academic Years List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {academicYears.map((year) => (
          <Card key={year.id}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary-600" />
                <div>
                  <h3 className="text-lg font-medium">{year.name}</h3>
                  {year.is_active && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      <CheckCircle className="h-3 w-3" />
                      Aktif
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(year)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDelete(year.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Periode Tahun Akademik</p>
                <p className="text-sm text-gray-600">
                  {new Date(year.start_date).toLocaleDateString('id-ID')} - {new Date(year.end_date).toLocaleDateString('id-ID')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Semester 1</p>
                  <p className="text-sm text-gray-600">
                    {new Date(year.semester_1_start).toLocaleDateString('id-ID')} - {new Date(year.semester_1_end).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Semester 2</p>
                  <p className="text-sm text-gray-600">
                    {new Date(year.semester_2_start).toLocaleDateString('id-ID')} - {new Date(year.semester_2_end).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>

              {!year.is_active && (
                <Button
                  size="sm"
                  onClick={() => handleSetActive(year.id)}
                  className="w-full mt-3"
                >
                  Aktifkan Tahun Akademik
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingYear ? 'Edit Tahun Akademik' : 'Tambah Tahun Akademik'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Tahun Akademik</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Contoh: 2024/2025"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Periode Semester</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Semester 1</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Tanggal Mulai</label>
                        <input
                          type="date"
                          value={formData.semester_1_start}
                          onChange={(e) => setFormData({...formData, semester_1_start: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Tanggal Selesai</label>
                        <input
                          type="date"
                          value={formData.semester_1_end}
                          onChange={(e) => setFormData({...formData, semester_1_end: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Semester 2</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Tanggal Mulai</label>
                        <input
                          type="date"
                          value={formData.semester_2_start}
                          onChange={(e) => setFormData({...formData, semester_2_start: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Tanggal Selesai</label>
                        <input
                          type="date"
                          value={formData.semester_2_end}
                          onChange={(e) => setFormData({...formData, semester_2_end: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="is_active" className="text-sm">
                  Aktifkan sebagai tahun akademik saat ini
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingYear ? 'Update' : 'Simpan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
