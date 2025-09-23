import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Download, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Child {
  id: number;
  name: string;
  class: string;
  student_id: string;
}

interface MonthlyAttendance {
  month: string;
  year: number;
  present: number;
  late: number;
  absent: number;
  sick: number;
  permit: number;
  total_days: number;
  percentage: number;
}

export default function AttendanceSummary() {
  const { } = useAuth();
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock data
  const [children] = useState<Child[]>([
    { id: 1, name: 'Ahmad Rizki Pratama', class: 'XII IPA 1', student_id: '2024001' },
    { id: 2, name: 'Siti Nurhaliza Pratama', class: 'X MIPA 2', student_id: '2024002' }
  ]);

  const [attendanceSummary] = useState<Record<number, MonthlyAttendance[]>>({
    1: [
      {
        month: 'Januari',
        year: 2024,
        present: 18,
        late: 2,
        absent: 0,
        sick: 1,
        permit: 1,
        total_days: 22,
        percentage: 91
      },
      {
        month: 'Februari',
        year: 2024,
        present: 19,
        late: 1,
        absent: 1,
        sick: 0,
        permit: 0,
        total_days: 21,
        percentage: 95
      },
      {
        month: 'Maret',
        year: 2024,
        present: 20,
        late: 0,
        absent: 0,
        sick: 2,
        permit: 0,
        total_days: 22,
        percentage: 91
      }
    ],
    2: [
      {
        month: 'Januari',
        year: 2024,
        present: 20,
        late: 1,
        absent: 0,
        sick: 1,
        permit: 0,
        total_days: 22,
        percentage: 95
      }
    ]
  });

  const selectedChildData = children.find(child => child.id === selectedChild);
  const childAttendance = attendanceSummary[selectedChild] || [];

  const yearlyStats = childAttendance.reduce((acc, month) => ({
    totalPresent: acc.totalPresent + month.present,
    totalLate: acc.totalLate + month.late,
    totalAbsent: acc.totalAbsent + month.absent,
    totalSick: acc.totalSick + month.sick,
    totalPermit: acc.totalPermit + month.permit,
    totalDays: acc.totalDays + month.total_days
  }), {
    totalPresent: 0,
    totalLate: 0,
    totalAbsent: 0,
    totalSick: 0,
    totalPermit: 0,
    totalDays: 0
  });

  const yearlyPercentage = yearlyStats.totalDays > 0 
    ? Math.round(((yearlyStats.totalPresent + yearlyStats.totalLate) / yearlyStats.totalDays) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Rekap Absensi</h1>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Laporan
        </Button>
      </div>

      {/* Child Selector */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Pilih Anak</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(parseInt(e.target.value))}
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg"
            >
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name} - {child.class}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tahun</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Selected Child Info */}
      {selectedChildData && (
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedChildData.name}</h3>
              <p className="text-sm text-gray-600">
                NIS: {selectedChildData.student_id} • Kelas: {selectedChildData.class}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Yearly Summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-primary-600" />
              <p className="text-2xl font-bold text-primary-600">{yearlyPercentage}%</p>
            </div>
            <p className="text-sm text-gray-600">Kehadiran Tahunan</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{yearlyStats.totalPresent}</p>
            <p className="text-sm text-gray-600">Hadir</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{yearlyStats.totalLate}</p>
            <p className="text-sm text-gray-600">Terlambat</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{yearlyStats.totalAbsent}</p>
            <p className="text-sm text-gray-600">Tidak Hadir</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{yearlyStats.totalSick}</p>
            <p className="text-sm text-gray-600">Sakit</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{yearlyStats.totalPermit}</p>
            <p className="text-sm text-gray-600">Izin</p>
          </div>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card>
        <h3 className="text-lg font-medium mb-4">Rekap Bulanan {selectedYear}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Bulan</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Hadir</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Terlambat</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Tidak Hadir</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Sakit</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Izin</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Total Hari</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Persentase</th>
              </tr>
            </thead>
            <tbody>
              {childAttendance.map((month, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{month.month}</td>
                  <td className="py-3 px-4 text-center text-green-600">{month.present}</td>
                  <td className="py-3 px-4 text-center text-yellow-600">{month.late}</td>
                  <td className="py-3 px-4 text-center text-red-600">{month.absent}</td>
                  <td className="py-3 px-4 text-center text-blue-600">{month.sick}</td>
                  <td className="py-3 px-4 text-center text-purple-600">{month.permit}</td>
                  <td className="py-3 px-4 text-center">{month.total_days}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-medium ${
                      month.percentage >= 95 ? 'text-green-600' :
                      month.percentage >= 85 ? 'text-blue-600' :
                      month.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {month.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Analysis & Recommendations */}
      <Card>
        <h3 className="text-lg font-medium mb-4">Analisis & Rekomendasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-green-700">Pencapaian Positif</h4>
            <div className="space-y-2 text-sm">
              {yearlyPercentage >= 95 && (
                <p className="text-green-600">✓ Tingkat kehadiran sangat baik ({yearlyPercentage}%)</p>
              )}
              {yearlyStats.totalAbsent === 0 && (
                <p className="text-green-600">✓ Tidak ada ketidakhadiran tanpa keterangan</p>
              )}
              {yearlyStats.totalLate <= 3 && (
                <p className="text-green-600">✓ Jarang terlambat</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-blue-700">Rekomendasi</h4>
            <div className="space-y-2 text-sm">
              {yearlyPercentage < 85 && (
                <p className="text-red-600">⚠ Tingkatkan kehadiran (saat ini {yearlyPercentage}%)</p>
              )}
              {yearlyStats.totalLate > 5 && (
                <p className="text-yellow-600">⚠ Kurangi keterlambatan ({yearlyStats.totalLate} kali)</p>
              )}
              {yearlyStats.totalAbsent > 0 && (
                <p className="text-red-600">⚠ Hindari ketidakhadiran tanpa keterangan</p>
              )}
              <p className="text-blue-600">💡 Pertahankan komunikasi dengan sekolah untuk izin</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
