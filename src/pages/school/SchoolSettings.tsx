import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchSelect from '../../components/ui/SearchSelect';
import { 
  Settings,
  School,
  Users,
  Bell,
  Shield,
  Database,
  Save,
  RefreshCw
} from 'lucide-react';

interface SchoolSettings {
  id: string;
  school_name: string;
  school_address: string;
  school_phone: string;
  school_email: string;
  principal_name: string;
  academic_year: string;
  semester: string;
  timezone: string;
  language: string;
  max_students_per_class: number;
  passing_grade: number;
  attendance_required_percentage: number;
  enable_notifications: boolean;
  enable_parent_access: boolean;
  enable_online_payment: boolean;
  backup_frequency: string;
  session_timeout_minutes: number;
}

export default function SchoolSettings() {
  const [settings, setSettings] = useState<SchoolSettings>({
    id: 'school-1',
    school_name: 'SMA Pangestu',
    school_address: 'Jl. Pendidikan No. 123, Jakarta',
    school_phone: '021-12345678',
    school_email: 'info@smapangestu.sch.id',
    principal_name: 'Dr. Ahmad Susanto, M.Pd',
    academic_year: '2024/2025',
    semester: '1',
    timezone: 'Asia/Jakarta',
    language: 'id',
    max_students_per_class: 30,
    passing_grade: 70,
    attendance_required_percentage: 75,
    enable_notifications: true,
    enable_parent_access: true,
    enable_online_payment: false,
    backup_frequency: 'daily',
    session_timeout_minutes: 60
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const loadSettings = () => {
    // Mock implementation - replace with actual API call
    console.log('Loading school settings...');
  };

  useEffect(() => { loadSettings(); }, []);

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Mock implementation - replace with actual API call
      console.log('Saving settings:', settings);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Pengaturan berhasil disimpan!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Gagal menyimpan pengaturan!');
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    if (!confirm('Reset pengaturan ke default? Perubahan yang belum disimpan akan hilang.')) return;
    loadSettings();
  };

  const tabs = [
    { id: 'general', label: 'Umum', icon: School },
    { id: 'academic', label: 'Akademik', icon: Users },
    { id: 'system', label: 'Sistem', icon: Settings },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  const timezoneOptions = [
    { value: 'Asia/Jakarta', label: 'WIB (UTC+7)' },
    { value: 'Asia/Makassar', label: 'WITA (UTC+8)' },
    { value: 'Asia/Jayapura', label: 'WIT (UTC+9)' }
  ];

  const languageOptions = [
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'en', label: 'English' }
  ];

  const semesterOptions = [
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' }
  ];

  const backupFrequencyOptions = [
    { value: 'daily', label: 'Harian' },
    { value: 'weekly', label: 'Mingguan' },
    { value: 'monthly', label: 'Bulanan' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nama Sekolah</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.school_name}
            onChange={(e) => setSettings(s => ({ ...s, school_name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Nama Kepala Sekolah</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.principal_name}
            onChange={(e) => setSettings(s => ({ ...s, principal_name: e.target.value }))}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Alamat Sekolah</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg"
          value={settings.school_address}
          onChange={(e) => setSettings(s => ({ ...s, school_address: e.target.value }))}
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.school_phone}
            onChange={(e) => setSettings(s => ({ ...s, school_phone: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email Sekolah</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.school_email}
            onChange={(e) => setSettings(s => ({ ...s, school_email: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tahun Ajaran</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.academic_year}
            onChange={(e) => setSettings(s => ({ ...s, academic_year: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Semester</label>
          <SearchSelect
            options={semesterOptions}
            value={settings.semester}
            onChange={(v) => setSettings(s => ({ ...s, semester: String(v) }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Zona Waktu</label>
          <SearchSelect
            options={timezoneOptions}
            value={settings.timezone}
            onChange={(v) => setSettings(s => ({ ...s, timezone: String(v) }))}
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Maksimal Siswa per Kelas</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.max_students_per_class}
            onChange={(e) => setSettings(s => ({ ...s, max_students_per_class: parseInt(e.target.value) }))}
            min="1"
            max="50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Nilai Kelulusan Minimum</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.passing_grade}
            onChange={(e) => setSettings(s => ({ ...s, passing_grade: parseInt(e.target.value) }))}
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Minimum Kehadiran (%)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.attendance_required_percentage}
            onChange={(e) => setSettings(s => ({ ...s, attendance_required_percentage: parseInt(e.target.value) }))}
            min="0"
            max="100"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            id="parent_access"
            type="checkbox"
            checked={settings.enable_parent_access}
            onChange={(e) => setSettings(s => ({ ...s, enable_parent_access: e.target.checked }))}
          />
          <label htmlFor="parent_access" className="text-sm font-medium">
            Aktifkan Akses Orang Tua
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            id="online_payment"
            type="checkbox"
            checked={settings.enable_online_payment}
            onChange={(e) => setSettings(s => ({ ...s, enable_online_payment: e.target.checked }))}
          />
          <label htmlFor="online_payment" className="text-sm font-medium">
            Aktifkan Pembayaran Online
          </label>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Bahasa Sistem</label>
          <SearchSelect
            options={languageOptions}
            value={settings.language}
            onChange={(v) => setSettings(s => ({ ...s, language: String(v) }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Timeout Sesi (menit)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={settings.session_timeout_minutes}
            onChange={(e) => setSettings(s => ({ ...s, session_timeout_minutes: parseInt(e.target.value) }))}
            min="15"
            max="480"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            id="notifications"
            type="checkbox"
            checked={settings.enable_notifications}
            onChange={(e) => setSettings(s => ({ ...s, enable_notifications: e.target.checked }))}
          />
          <label htmlFor="notifications" className="text-sm font-medium">
            Aktifkan Notifikasi Sistem
          </label>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Jenis Notifikasi</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Tugas baru dan pengumpulan tugas</p>
          <p>• Kehadiran siswa dan ketidakhadiran</p>
          <p>• Hasil ujian dan CBT</p>
          <p>• Pendaftaran siswa baru</p>
          <p>• Pengumuman sekolah</p>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-yellow-600" />
          <h4 className="font-medium text-yellow-800">Pengaturan Keamanan</h4>
        </div>
        <p className="text-sm text-yellow-700">
          Pengaturan keamanan sistem seperti kebijakan password, enkripsi data, dan audit log 
          dikelola oleh administrator sistem.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Status Keamanan</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm">SSL/HTTPS</span>
              <span className="text-sm text-green-600 font-medium">Aktif</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm">Enkripsi Database</span>
              <span className="text-sm text-green-600 font-medium">Aktif</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm">Audit Log</span>
              <span className="text-sm text-green-600 font-medium">Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Frekuensi Backup</label>
        <SearchSelect
          options={backupFrequencyOptions}
          value={settings.backup_frequency}
          onChange={(v) => setSettings(s => ({ ...s, backup_frequency: String(v) }))}
        />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-blue-800">Status Backup Terakhir</h4>
        </div>
        <p className="text-sm text-blue-700 mb-2">
          Backup terakhir: 20 Maret 2024, 02:00 WIB
        </p>
        <p className="text-sm text-blue-700">
          Status: Berhasil
        </p>
      </div>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Database className="w-4 h-4" />
        Backup Manual Sekarang
      </Button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'academic': return renderAcademicSettings();
      case 'system': return renderSystemSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'backup': return renderBackupSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pengaturan Sekolah</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetSettings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveSettings} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
            {renderTabContent()}
          </Card>
        </div>
      </div>
    </div>
  );
}
