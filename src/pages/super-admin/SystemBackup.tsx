import { useState } from 'react';
import { Download, Upload, Database, Shield, Clock, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function SystemBackup() {
  const [activeTab, setActiveTab] = useState('backup');

  const tabs = [
    { id: 'backup', name: 'Backup & Restore', icon: Database },
    { id: 'security', name: 'Hak Akses & Role', icon: Shield },
    { id: 'logs', name: 'System Logs', icon: Clock }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Pengaturan Sistem</h1>
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
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium mb-4">Backup Database</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Backup Manual</h4>
                  <p className="text-sm text-gray-600 mb-4">Buat backup database secara manual</p>
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Buat Backup Sekarang
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Restore Database</h4>
                  <p className="text-sm text-gray-600 mb-4">Pulihkan database dari file backup</p>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload & Restore
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-medium mb-4">Riwayat Backup</h3>
              <div className="space-y-3">
                {[
                  { date: '2024-01-23 14:30', size: '2.3 GB', status: 'success' },
                  { date: '2024-01-22 14:30', size: '2.2 GB', status: 'success' },
                  { date: '2024-01-21 14:30', size: '2.1 GB', status: 'success' },
                  { date: '2024-01-20 14:30', size: '2.0 GB', status: 'failed' }
                ].map((backup, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{backup.date}</p>
                      <p className="text-sm text-gray-600">Ukuran: {backup.size}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs rounded ${
                        backup.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {backup.status === 'success' ? 'Berhasil' : 'Gagal'}
                      </span>
                      {backup.status === 'success' && (
                        <Button size="sm" variant="secondary">Download</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <Card>
            <h3 className="text-lg font-medium mb-4">Manajemen Hak Akses & Role</h3>
            <div className="space-y-4">
              {[
                { role: 'super_admin', name: 'Super Admin', users: 2, permissions: 'Full Access' },
                { role: 'school_admin', name: 'Admin Sekolah', users: 45, permissions: 'School Management' },
                { role: 'teacher', name: 'Guru', users: 1234, permissions: 'Teaching & Assessment' },
                { role: 'student', name: 'Siswa', users: 15678, permissions: 'Learning Access' },
                { role: 'parent', name: 'Orang Tua', users: 12456, permissions: 'Monitoring Access' }
              ].map((role, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-sm text-gray-600">{role.permissions}</p>
                    <p className="text-xs text-gray-500">{role.users} pengguna</p>
                  </div>
                  <Button variant="secondary" size="sm">Kelola Hak Akses</Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'logs' && (
          <Card>
            <h3 className="text-lg font-medium mb-4">System Logs</h3>
            <div className="space-y-3">
              {[
                { time: '2024-01-23 15:45:32', level: 'INFO', message: 'User login: admin@school1.com', ip: '192.168.1.100' },
                { time: '2024-01-23 15:44:21', level: 'WARNING', message: 'Failed login attempt', ip: '192.168.1.105' },
                { time: '2024-01-23 15:43:15', level: 'INFO', message: 'Database backup completed', ip: 'system' },
                { time: '2024-01-23 15:42:08', level: 'ERROR', message: 'Email service connection failed', ip: 'system' },
                { time: '2024-01-23 15:41:33', level: 'INFO', message: 'New user registered: teacher@school2.com', ip: '192.168.1.102' }
              ].map((log, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    {log.level === 'ERROR' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {log.level === 'WARNING' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {log.level === 'INFO' && <Clock className="h-4 w-4 text-blue-500" />}
                    <span className={`px-2 py-1 text-xs rounded ${
                      log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                      log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.level}
                    </span>
                  </div>
                  <span className="text-gray-500">{log.time}</span>
                  <span className="flex-1">{log.message}</span>
                  <span className="text-gray-400 font-mono text-xs">{log.ip}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
