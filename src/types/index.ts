import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Database, 
  Server, 
  Mail, 
  Shield, 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  Upload,
  Globe,
  Lock,
  Key,
  Monitor,
  HardDrive,
  Wifi,
  Zap,
  Clock,
  Users,
  FileText,
  Activity
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface SystemSettingsData {
  general: {
    systemName: string;
    systemDescription: string;
    systemVersion: string;
    timezone: string;
    language: string;
    dateFormat: string;
    timeFormat: string;
    maintenanceMode: boolean;
    maintenanceMessage: string;
    allowRegistration: boolean;
    defaultUserRole: string;
  };
  database: {
    host: string;
    port: string;
    name: string;
    username: string;
    connectionPool: number;
    maxConnections: number;
    backupSchedule: string;
    backupRetention: number;
    enableQueryLog: boolean;
    slowQueryThreshold: number;
  };
  server: {
    serverUrl: string;
    apiUrl: string;
    maxUploadSize: number;
    allowedFileTypes: string[];
    sessionTimeout: number;
    requestTimeout: number;
    enableCaching: boolean;
    cacheExpiration: number;
    logLevel: string;
    enableCompression: boolean;
    enableRateLimit: boolean;
    rateLimitRequests: number;
  };
  email: {
    provider: string;
    smtpServer: string;
    port: string;
    encryption: string;
    username: string;
    password: string;
    fromName: string;
    fromEmail: string;
    replyToEmail: string;
    enableQueue: boolean;
    maxRetries: number;
    testMode: boolean;
  };
  security: {
    requireTwoFactor: boolean;
    twoFactorMethod: string;
    sessionDuration: number;
    passwordMinLength: number;
    passwordRequireUppercase: boolean;
    passwordRequireLowercase: boolean;
    passwordRequireNumbers: boolean;
    passwordRequireSymbols: boolean;
    passwordExpiration: number;
    enableLoginAttempts: boolean;
    maxLoginAttempts: number;
    lockoutDuration: number;
    enableIpWhitelist: boolean;
    allowedIps: string[];
    enableAuditLog: boolean;
    auditLogRetention: number;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    inAppNotifications: boolean;
    notifyOnLogin: boolean;
    notifyOnFailedLogin: boolean;
    notifyOnUserRegistration: boolean;
    notifyOnSystemError: boolean;
    notifyOnBackupComplete: boolean;
    digestFrequency: string;
    quietHoursStart: string;
    quietHoursEnd: string;
  };
  performance: {
    enableCdn: boolean;
    cdnUrl: string;
    enableImageOptimization: boolean;
    enableLazyLoading: boolean;
    enableMinification: boolean;
    enableGzip: boolean;
    cacheStaticAssets: boolean;
    staticAssetsCacheDuration: number;
  };
  integrations: {
    enableGoogleAnalytics: boolean;
    googleAnalyticsId: string;
    enableSentry: boolean;
    sentryDsn: string;
    enableSlack: boolean;
    slackWebhook: string;
    enableZoom: boolean;
    zoomApiKey: string;
    enableGoogleDrive: boolean;
    googleDriveClientId: string;
  };
}

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [settings, setSettings] = useState<SystemSettingsData>({
    general: {
      systemName: 'LMS Pangestu',
      systemDescription: 'Learning Management System untuk institusi pendidikan',
      systemVersion: '2.1.0',
      timezone: 'Asia/Jakarta',
      language: 'id',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24',
      maintenanceMode: false
      maintenanceMessage: 'Sistem sedang dalam pemeliharaan. Silakan coba lagi nanti.',
      allowRegistration: true,
      defaultUserRole: 'student'
    },
    database: {
      host: 'localhost',
      port: '3306',
      name: 'lms_pangestu',
      username: 'root',
      connectionPool: 10,
      maxConnections: 100,
      backupSchedule: 'daily',
      backupRetention: 30,
      enableQueryLog: false,
      slowQueryThreshold: 2000
    },
    server: {
      serverUrl: 'http://localhost:3000',
      apiUrl: 'http://localhost:3000/api',
      maxUploadSize: 50,
      allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3'],
      sessionTimeout: 480,
      requestTimeout: 30,
      enableCaching: true,
      cacheExpiration: 3600,
      logLevel: 'info',
      enableCompression: true,
      enableRateLimit: true,
      rateLimitRequests: 100
    },
    email: {
      provider: 'smtp',
      smtpServer: 'smtp.gmail.com',
      port: '587',
      encryption: 'tls',
      username: '',
      password: '',
      fromName: 'LMS Pangestu',
      fromEmail: 'noreply@lmspangestu.com',
      replyToEmail: 'support@lmspangestu.com',
      enableQueue: true,
      maxRetries: 3,
      testMode: false
    },
    security: {
      requireTwoFactor: true,
      twoFactorMethod: 'email',
      sessionDuration: 480,
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireLowercase: true,
      passwordRequireNumbers: true,
      passwordRequireSymbols: false,
      passwordExpiration: 90,
      enableLoginAttempts: true,
      maxLoginAttempts: 5,
      lockoutDuration: 30,
      enableIpWhitelist: false,
      allowedIps: [],
      enableAuditLog: true,
      auditLogRetention: 365
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      inAppNotifications: true,
      notifyOnLogin: false,
      notifyOnFailedLogin: true,
      notifyOnUserRegistration: true,
      notifyOnSystemError: true,
      notifyOnBackupComplete: false,
      digestFrequency: 'daily',
      quietHoursStart: '22:00',
      quietHoursEnd: '06:00'
    },
    performance: {
      enableCdn: false,
      cdnUrl: '',
      enableImageOptimization: true,
      enableLazyLoading: true,
      enableMinification: true,
      enableGzip: true,
      cacheStaticAssets: true,
      staticAssetsCacheDuration: 86400
    },
    integrations: {
      enableGoogleAnalytics: false,
      googleAnalyticsId: '',
      enableSentry: false,
      sentryDsn: '',
      enableSlack: false,
      slackWebhook: '',
      enableZoom: false,
      zoomApiKey: '',
      enableGoogleDrive: false,
      googleDriveClientId: ''
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
    { id: 'performance', name: 'Performa', icon: Zap },
    { id: 'integrations', name: 'Integrasi', icon: Globe }
  ];

  const updateSetting = (section: keyof SystemSettingsData, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
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
    
    if (!settings.general.systemVersion.trim()) {
      newErrors['general.systemVersion'] = 'Versi sistem wajib diisi';
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
    
    if (settings.database.connectionPool < 1) {
      newErrors['database.connectionPool'] = 'Connection pool minimal 1';
    }
    
    if (settings.database.maxConnections < 1) {
      newErrors['database.maxConnections'] = 'Max connections minimal 1';
    }

    // Server validation
    if (!settings.server.serverUrl.trim()) {
      newErrors['server.serverUrl'] = 'Server URL wajib diisi';
    } else if (!/^https?:\/\/.+/.test(settings.server.serverUrl)) {
      newErrors['server.serverUrl'] = 'Server URL harus dimulai dengan http:// atau https://';
    }
    
    if (!settings.server.apiUrl.trim()) {
      newErrors['server.apiUrl'] = 'API URL wajib diisi';
    }
    
    if (settings.server.maxUploadSize < 1) {
      newErrors['server.maxUploadSize'] = 'Max upload size minimal 1 MB';
    }

    // Email validation
    if (!settings.email.fromEmail.trim()) {
      newErrors['email.fromEmail'] = 'From email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email.fromEmail)) {
      newErrors['email.fromEmail'] = 'Format email tidak valid';
    }
    
    if (settings.email.replyToEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email.replyToEmail)) {
      newErrors['email.replyToEmail'] = 'Format reply-to email tidak valid';
    }
    
    if (!settings.email.smtpServer.trim()) {
      newErrors['email.smtpServer'] = 'SMTP server wajib diisi';
    }

    // Security validation
    if (settings.security.passwordMinLength < 6) {
      newErrors['security.passwordMinLength'] = 'Panjang password minimal 6 karakter';
    }
    if (settings.security.maxLoginAttempts < 1) {
      newErrors['security.maxLoginAttempts'] = 'Maksimal percobaan login minimal 1';
    }
    if (settings.security.lockoutDuration < 1) {
      newErrors['security.lockoutDuration'] = 'Durasi lockout minimal 1 menit';
    }
    if (settings.security.sessionDuration < 15) {
      newErrors['security.sessionDuration'] = 'Durasi sesi minimal 15 menit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      setShowError(true);
      setErrorMessage('Mohon perbaiki kesalahan pada form');
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasUnsavedChanges(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      setShowError(true);
      setErrorMessage('Gagal menyimpan pengaturan');
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsTesting(true);
    try {
      // Simulate email test
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Email test berhasil dikirim!');
    } catch (error) {
      alert('Gagal mengirim email test');
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestDatabase = async () => {
    setIsTesting(true);
    try {
      // Simulate database test
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Koneksi database berhasil!');
    } catch (error) {
      alert('Gagal terhubung ke database');
    } finally {
      setIsTesting(false);
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
        version: settings.general.systemVersion,
        settings: settings,
        metadata: {
          exported_by: 'super_admin',
          export_type: 'full_settings'
        }
      };
      
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lms-settings-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      setShowError(true);
      setErrorMessage('Gagal membuat backup');
      setTimeout(() => setShowError(false), 5000);
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
          setHasUnsavedChanges(true);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
        } else {
          throw new Error('Invalid backup file');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('File backup tidak valid');
        setTimeout(() => setShowError(false), 5000);
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  const resetToDefaults = () => {
    if (!confirm('Reset semua pengaturan ke default? Perubahan yang belum disimpan akan hilang.')) return;
    
    // Reset to default values
    setSettings({
      general: {
        systemName: 'LMS Pangestu',
        systemDescription: 'Learning Management System untuk institusi pendidikan',
        systemVersion: '2.1.0',
        timezone: 'Asia/Jakarta',
        language: 'id',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24',
        maintenanceMode: false,
        maintenanceMessage: 'Sistem sedang dalam pemeliharaan. Silakan coba lagi nanti.',
        allowRegistration: true,
        defaultUserRole: 'student'
      },
      database: {
        host: 'localhost',
        port: '3306',
        name: 'lms_pangestu',
        username: 'root',
        connectionPool: 10,
        maxConnections: 100,
        backupSchedule: 'daily',
        backupRetention: 30,
        enableQueryLog: false,
        slowQueryThreshold: 2000
      },
      server: {
        serverUrl: 'http://localhost:3000',
        apiUrl: 'http://localhost:3000/api',
        maxUploadSize: 50,
        allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3'],
        sessionTimeout: 480,
        requestTimeout: 30,
        enableCaching: true,
        cacheExpiration: 3600,
        logLevel: 'info',
        enableCompression: true,
        enableRateLimit: true,
        rateLimitRequests: 100
      },
      email: {
        provider: 'smtp',
        smtpServer: 'smtp.gmail.com',
        port: '587',
        encryption: 'tls',
        username: '',
        password: '',
        fromName: 'LMS Pangestu',
        fromEmail: 'noreply@lmspangestu.com',
        replyToEmail: 'support@lmspangestu.com',
        enableQueue: true,
        maxRetries: 3,
        testMode: false
      },
      security: {
        requireTwoFactor: true,
        twoFactorMethod: 'email',
        sessionDuration: 480,
        passwordMinLength: 8,
        passwordRequireUppercase: true,
        passwordRequireLowercase: true,
        passwordRequireNumbers: true,
        passwordRequireSymbols: false,
        passwordExpiration: 90,
        enableLoginAttempts: true,
        maxLoginAttempts: 5,
        lockoutDuration: 30,
        enableIpWhitelist: false,
        allowedIps: [],
        enableAuditLog: true,
        auditLogRetention: 365
      },
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        inAppNotifications: true,
        notifyOnLogin: false,
        notifyOnFailedLogin: true,
        notifyOnUserRegistration: true,
        notifyOnSystemError: true,
        notifyOnBackupComplete: false,
        digestFrequency: 'daily',
        quietHoursStart: '22:00',
        quietHoursEnd: '06:00'
      },
      performance: {
        enableCdn: false,
        cdnUrl: '',
        enableImageOptimization: true,
        enableLazyLoading: true,
        enableMinification: true,
        enableGzip: true,
        cacheStaticAssets: true,
        staticAssetsCacheDuration: 86400
      },
      integrations: {
        enableGoogleAnalytics: false,
        googleAnalyticsId: '',
        enableSentry: false,
        sentryDsn: '',
        enableSlack: false,
        slackWebhook: '',
        enableZoom: false,
        zoomApiKey: '',
        enableGoogleDrive: false,
        googleDriveClientId: ''
      }
    });
    setHasUnsavedChanges(true);
  };

  // Render functions for each tab
  return (
    <div className="space-y-6">
      {/* Success/Error Notifications */}
      {showSuccess && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800">Pengaturan berhasil disimpan!</span>
          </div>
        </Card>
      )}
      
      {showError && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{errorMessage}</span>
          </div>
        </Card>
      )}

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">Anda memiliki perubahan yang belum disimpan</span>
            </div>
            <Button size="sm" onClick={handleSave}>
              Simpan Sekarang
            </Button>
          </div>
        </Card>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pengaturan Sistem</h1>
          <p className="text-gray-600 mt-1">Konfigurasi sistem LMS secara global</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={resetToDefaults}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Default
          </Button>
          <Button
            variant="outline"
            onClick={handleBackup}
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Backup</span>
          </Button>
          <label className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg cursor-pointer transition-colors">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Restore</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestore}
              className="hidden"
            />
          </label>
          <Button
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden sm:inline ml-2">{isLoading ? 'Menyimpan...' : 'Simpan'}</span>
          </Button>
        </div>
      </div>

      <Card>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Sistem *
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
                    Versi Sistem *
                  </label>
                  <input
                    type="text"
                    value={settings.general.systemVersion}
                    onChange={(e) => updateSetting('general', 'systemVersion', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['general.systemVersion'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="2.1.0"
                  />
                  {errors['general.systemVersion'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['general.systemVersion']}</p>
                  )}
                </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format Tanggal
                  </label>
                  <select 
                    value={settings.general.dateFormat}
                    onChange={(e) => updateSetting('general', 'dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format Waktu
                  </label>
                  <select 
                    value={settings.general.timeFormat}
                    onChange={(e) => updateSetting('general', 'timeFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="24">24 Jam</option>
                    <option value="12">12 Jam (AM/PM)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Default Pengguna Baru
                  </label>
                  <select 
                    value={settings.general.defaultUserRole}
                    onChange={(e) => updateSetting('general', 'defaultUserRole', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="student">Siswa</option>
                    <option value="teacher">Guru</option>
                    <option value="parent">Orang Tua</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Izinkan Registrasi Mandiri</h3>
                    <p className="text-xs text-gray-500">Pengguna dapat mendaftar sendiri</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.general.allowRegistration}
                      onChange={(e) => updateSetting('general', 'allowRegistration', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Mode Maintenance</h3>
                  <p className="text-xs text-gray-500">Nonaktifkan akses pengguna sementara</p>
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
              
              {settings.general.maintenanceMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan Maintenance
                  </label>
                  <textarea
                    rows={2}
                    value={settings.general.maintenanceMessage}
                    onChange={(e) => updateSetting('general', 'maintenanceMessage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Pesan yang akan ditampilkan saat maintenance"
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Konfigurasi Database</h3>
                <Button
                  variant="outline"
                  onClick={handleTestDatabase}
                  disabled={isTesting}
                  className="flex items-center gap-2"
                >
                  {isTesting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                  {isTesting ? 'Testing...' : 'Test Koneksi'}
                </Button>
              </div>
              
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
                    placeholder="localhost"
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
                    placeholder="3306"
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
                    placeholder="lms_pangestu"
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
                    placeholder="root"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Connection Pool
                  </label>
                  <input
                    type="number"
                    value={settings.database.connectionPool}
                    onChange={(e) => updateSetting('database', 'connectionPool', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['database.connectionPool'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min="1"
                    max="50"
                  />
                  {errors['database.connectionPool'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['database.connectionPool']}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Connections
                  </label>
                  <input
                    type="number"
                    value={settings.database.maxConnections}
                    onChange={(e) => updateSetting('database', 'maxConnections', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['database.maxConnections'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min="1"
                    max="1000"
                  />
                  {errors['database.maxConnections'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['database.maxConnections']}</p>
                  )}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retensi Backup (hari)
                  </label>
                  <input
                    type="number"
                    value={settings.database.backupRetention}
                    onChange={(e) => updateSetting('database', 'backupRetention', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="365"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Enable Query Log</h3>
                    <p className="text-xs text-gray-500">Log semua query database</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.database.enableQueryLog}
                      onChange={(e) => updateSetting('database', 'enableQueryLog', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slow Query Threshold (ms)
                  </label>
                  <input
                    type="number"
                    value={settings.database.slowQueryThreshold}
                    onChange={(e) => updateSetting('database', 'slowQueryThreshold', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="100"
                    max="10000"
                  />
                </div>
              </div>
              
              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Peringatan:</strong> Perubahan pengaturan database memerlukan restart sistem.
                </p>
              </Card>
            </div>
          )}

          {activeTab === 'server' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Konfigurasi Server</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Server URL
                  </label>
                  <input
                    type="url"
                    value={settings.server.serverUrl}
                    onChange={(e) => updateSetting('server', 'serverUrl', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['server.serverUrl'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="http://localhost:3000"
                  />
                  {errors['server.serverUrl'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['server.serverUrl']}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API URL
                  </label>
                  <input
                    type="url"
                    value={settings.server.apiUrl}
                    onChange={(e) => updateSetting('server', 'apiUrl', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['server.apiUrl'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="http://localhost:3000/api"
                  />
                  {errors['server.apiUrl'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['server.apiUrl']}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Upload Size (MB)
                  </label>
                  <input
                    type="number"
                    value={settings.server.maxUploadSize}
                    onChange={(e) => updateSetting('server', 'maxUploadSize', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['server.maxUploadSize'] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min="1"
                    max="1000"
                  />
                  {errors['server.maxUploadSize'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['server.maxUploadSize']}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (menit)
                  </label>
                  <input
                    type="number"
                    value={settings.server.sessionTimeout}
                    onChange={(e) => updateSetting('server', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="15"
                    max="1440"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Timeout (detik)
                  </label>
                  <input
                    type="number"
                    value={settings.server.requestTimeout}
                    onChange={(e) => updateSetting('server', 'requestTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="5"
                    max="300"
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe File yang Diizinkan
                </label>
                <input
                  type="text"
                  value={settings.server.allowedFileTypes.join(', ')}
                  onChange={(e) => updateSetting('server', 'allowedFileTypes', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pdf, doc, docx, jpg, png, mp4"
                />
                <p className="mt-1 text-xs text-gray-500">Pisahkan dengan koma</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Enable Caching</h3>
                    <p className="text-xs text-gray-500">Cache untuk meningkatkan performa</p>
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
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Enable Compression</h3>
                    <p className="text-xs text-gray-500">Kompresi response untuk menghemat bandwidth</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.server.enableCompression}
                      onChange={(e) => updateSetting('server', 'enableCompression', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Enable Rate Limiting</h3>
                    <p className="text-xs text-gray-500">Batasi jumlah request per IP</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.server.enableRateLimit}
                      onChange={(e) => updateSetting('server', 'enableRateLimit', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
                {settings.server.enableRateLimit && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Requests per Minute
                    </label>
                    <input
                      type="number"
                      value={settings.server.rateLimitRequests}
                      onChange={(e) => updateSetting('server', 'rateLimitRequests', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="10"
                      max="1000"
                    />
                  </div>
                )}
              </div>
              
              {settings.server.enableCaching && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cache Expiration (detik)
                  </label>
                  <input
                    type="number"
                    value={settings.server.cacheExpiration}
                    onChange={(e) => updateSetting('server', 'cacheExpiration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="60"
                    max="86400"
                  />
                </div>
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
