import React, { useState } from 'react';
import { Settings, Save, Database, Server, Mail, Shield, Bell, CheckCircle, AlertCircle, RefreshCw, Download, Upload } from 'lucide-react';

interface SystemSettingsData {
  general: {
    systemName: string;
    systemDescription: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
  };
  database: {
    host: string;
    port: string;
    name: string;
    username: string;
    maxConnections: number;
    backupSchedule: string;
  };
  server: {
    maxUploadSize: number;
    sessionTimeout: number;
    enableCaching: boolean;
    logLevel: string;
    serverUrl: string;
  };
  email: {
    smtpServer: string;
    port: string;
    encryption: string;
    username: string;
    password: string;
    fromName: string;
    fromEmail: string;
  };
  security: {
    requireTwoFactor: boolean;
    sessionDuration: number;
    passwordMinLength: number;
    enableLoginAttempts: boolean;
    maxLoginAttempts: number;
    lockoutDuration: number;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    notifyOnLogin: boolean;
    notifyOnFailedLogin: boolean;
  };
}

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [settings, setSettings] = useState<SystemSettingsData>({
    general: {
      systemName: 'LMS Pangestu',
      systemDescription: 'Learning Management System untuk institusi pendidikan',
      timezone: 'Asia/Jakarta',
      language: 'id',
      maintenanceMode: false
    },
    database: {
      host: 'localhost',
      port: '3306',
      name: 'lms_pangestu',
      username: 'root',
      maxConnections: 100,
      backupSchedule: 'daily'
    },
    server: {
      maxUploadSize: 50,
      sessionTimeout: 480,
      enableCaching: true,
      logLevel: 'info',
      serverUrl: 'http://localhost:3000'
    },
    email: {
      smtpServer: 'smtp.gmail.com',
      port: '587',
      encryption: 'tls',
      username: '',
      password: '',
      fromName: 'LMS Pangestu',
      fromEmail: 'noreply@lmspangestu.com'
    },
    security: {
      requireTwoFactor: true,
      sessionDuration: 480,
      passwordMinLength: 8,
      enableLoginAttempts: true,
      maxLoginAttempts: 5,
      lockoutDuration: 30
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      notifyOnLogin: false,
      notifyOnFailedLogin: true
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const tabs = [
    { id: 'general', name: 'Umum', icon: Settings },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'server', name: 'Server', icon: Server },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'security', name: 'Keamanan', icon: Shield },
    { id: 'notifications', name: 'Notifikasi', icon: Bell },
  ];

  const updateSetting = (section: keyof SystemSettingsData, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const validateSettings = () => {
    const newErrors: Record<string, string> = {};

    // General validation
    if (!settings.general.systemName.trim()) {
      newErrors['general.systemName'] = 'Nama sistem wajib diisi';
    }

    // Database validation
    if (!settings.database.host.trim()) {
      newErrors['database.host'] = 'Host database wajib diisi';
    }
    if (!settings.database.port.trim()) {
      newErrors['database.port'] = 'Port database wajib diisi';
    } else if (!/^\d+$/.test(settings.database.port)) {
      newErrors['database.port'] = 'Port harus berupa angka';
    }
    if (!settings.database.name.trim()) {
      newErrors['database.name'] = 'Nama database wajib diisi';
    }

    // Email validation
    if (settings.email.fromEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email.fromEmail)) {
      newErrors['email.fromEmail'] = 'Format email tidak valid';
    }

    // Security validation
    if (settings.security.passwordMinLength < 6) {
      newErrors['security.passwordMinLength'] = 'Panjang password minimal 6 karakter';
    }
    if (settings.security.maxLoginAttempts < 1) {
      newErrors['security.maxLoginAttempts'] = 'Maksimal percobaan login minimal 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      setShowError(true);
      setErrorMessage('Mohon perbaiki kesalahan pada form');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setShowError(true);
      setErrorMessage('Gagal menyimpan pengaturan');
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create and download backup file
      const backupData = {
        timestamp: new Date().toISOString(),
        settings: settings,
        version: '1.0.0'
      };
      
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lms-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setShowError(true);
      setErrorMessage('Gagal membuat backup');
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target?.result as string);
        if (backupData.settings) {
          setSettings(backupData.settings);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        } else {
          throw new Error('Invalid backup file');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('File backup tidak valid');
        setTimeout(() => setShowError(false), 3000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Notifications */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800">Pengaturan berhasil disimpan!</span>
        </div>
      )}
      
      {showError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{errorMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handleBackup}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Backup</span>
          </button>
          <label className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Restore</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestore}
              className="hidden"
            />
          </label>
          <button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Sistem
                </label>
                <input
                  type="text"
                  value={settings.general.systemName}
                  onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors['general.systemName'] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors['general.systemName'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['general.systemName']}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Sistem
                </label>
                <textarea
                  rows={3}
                  value={settings.general.systemDescription}
                  onChange={(e) => updateSetting('general', 'systemDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zona Waktu
                  </label>
                  <select 
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bahasa Sistem
                  </label>
                  <select 
                    value={settings.general.language}
                    onChange={(e) => updateSetting('general', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Mode Maintenance</h3>
                  <p className="text-sm text-gray-500">Aktifkan untuk menonaktifkan akses pengguna sementara</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Host Database
                  </label>
                  <input
                    type="text"
                    value={settings.database.host}
                    onChange={(e) => updateSetting('database', 'host', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['database.host'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors['database.host'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['database.host']}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Port Database
                  </label>
                  <input
                    type="text"
                    value={settings.database.port}
                    onChange={(e) => updateSetting('database', 'port', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['database.port'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors['database.port'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['database.port']}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Database
                  </label>
                  <input
                    type="text"
                    value={settings.database.name}
                    onChange={(e) => updateSetting('database', 'name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['database.name'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors['database.name'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['database.name']}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username Database
                  </label>
                  <input
                    type="text"
                    value={settings.database.username}
                    onChange={(e) => updateSetting('database', 'username', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Connections
                  </label>
                  <input
                    type="number"
                    value={settings.database.maxConnections}
                    onChange={(e) => updateSetting('database', 'maxConnections', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jadwal Backup
                  </label>
                  <select
                    value={settings.database.backupSchedule}
                    onChange={(e) => updateSetting('database', 'backupSchedule', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                  </select>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Peringatan:</strong> Perubahan pengaturan database memerlukan restart sistem.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'server' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Server URL
                  </label>
                  <input
                    type="url"
                    value={settings.server.serverUrl}
                    onChange={(e) => updateSetting('server', 'serverUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="http://localhost:3000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Upload Size (MB)
                  </label>
                  <input
                    type="number"
                    value={settings.server.maxUploadSize}
                    onChange={(e) => updateSetting('server', 'maxUploadSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (menit)
                  </label>
                  <input
                    type="number"
                    value={settings.server.sessionTimeout}
                    onChange={(e) => updateSetting('server', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Log Level
                  </label>
                  <select
                    value={settings.server.logLevel}
                    onChange={(e) => updateSetting('server', 'logLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="error">Error</option>
                    <option value="warn">Warning</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Enable Caching</h3>
                  <p className="text-sm text-gray-500">Aktifkan cache untuk meningkatkan performa</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.server.enableCaching}
                    onChange={(e) => updateSetting('server', 'enableCaching', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                  <input 
                    type="text" 
                    value={settings.email.smtpServer}
                    onChange={(e) => updateSetting('email', 'smtpServer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                  <input 
                    type="text" 
                    value={settings.email.port}
                    onChange={(e) => updateSetting('email', 'port', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input 
                    type="text" 
                    value={settings.email.username}
                    onChange={(e) => updateSetting('email', 'username', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="username@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    value={settings.email.password}
                    onChange={(e) => updateSetting('email', 'password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                  <input 
                    type="text" 
                    value={settings.email.fromName}
                    onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                  <input 
                    type="email" 
                    value={settings.email.fromEmail}
                    onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['email.fromEmail'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors['email.fromEmail'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['email.fromEmail']}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                <select 
                  value={settings.email.encryption}
                  onChange={(e) => updateSetting('email', 'encryption', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Autentikasi Dua Faktor</h3>
                  <p className="text-sm text-gray-500">Wajibkan 2FA untuk semua admin</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.security.requireTwoFactor}
                    onChange={(e) => updateSetting('security', 'requireTwoFactor', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Masa Berlaku Session (menit)</label>
                  <input 
                    type="number" 
                    value={settings.security.sessionDuration}
                    onChange={(e) => updateSetting('security', 'sessionDuration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Panjang Password Minimal</label>
                  <input 
                    type="number" 
                    value={settings.security.passwordMinLength}
                    onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['security.passwordMinLength'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors['security.passwordMinLength'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['security.passwordMinLength']}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Pembatasan Login</h3>
                  <p className="text-sm text-gray-500">Aktifkan pembatasan percobaan login</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.security.enableLoginAttempts}
                    onChange={(e) => updateSetting('security', 'enableLoginAttempts', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              {settings.security.enableLoginAttempts && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maksimal Percobaan Login</label>
                    <input 
                      type="number" 
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors['security.maxLoginAttempts'] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors['security.maxLoginAttempts'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['security.maxLoginAttempts']}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durasi Lockout (menit)</label>
                    <input 
                      type="number" 
                      value={settings.security.lockoutDuration}
                      onChange={(e) => updateSetting('security', 'lockoutDuration', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Kirim notifikasi via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Kirim notifikasi via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.smsNotifications}
                    onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Kirim notifikasi push ke browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Notifikasi Login Berhasil</h3>
                  <p className="text-sm text-gray-500">Kirim notifikasi saat login berhasil</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.notifyOnLogin}
                    onChange={(e) => updateSetting('notifications', 'notifyOnLogin', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Notifikasi Login Gagal</h3>
                  <p className="text-sm text-gray-500">Kirim notifikasi saat ada percobaan login gagal</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications.notifyOnFailedLogin}
                    onChange={(e) => updateSetting('notifications', 'notifyOnFailedLogin', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
