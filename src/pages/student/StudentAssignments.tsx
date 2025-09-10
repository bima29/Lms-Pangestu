import React, { useState } from 'react';
import { FileText, Calendar, Clock, CheckCircle, AlertCircle, Upload, Eye } from 'lucide-react';

const StudentAssignments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const assignments = [
    {
      id: '1',
      title: 'Tugas Integral dan Diferensial',
      subject: 'Matematika',
      teacher: 'Pak Budi Santoso',
      dueDate: '2025-01-20',
      assignedDate: '2025-01-10',
      status: 'pending',
      description: 'Kerjakan soal-soal integral dan diferensial pada buku halaman 45-50',
      maxScore: 100,
      submittedScore: null,
      type: 'homework'
    },
    {
      id: '2',
      title: 'Laporan Praktikum Gerak Lurus',
      subject: 'Fisika',
      teacher: 'Ibu Sari Dewi',
      dueDate: '2025-01-18',
      assignedDate: '2025-01-08',
      status: 'submitted',
      description: 'Buat laporan hasil praktikum gerak lurus beraturan yang telah dilakukan',
      maxScore: 100,
      submittedScore: 85,
      type: 'report'
    },
    {
      id: '3',
      title: 'Essay Struktur Atom',
      subject: 'Kimia',
      teacher: 'Pak Ahmad',
      dueDate: '2025-01-15',
      assignedDate: '2025-01-05',
      status: 'overdue',
      description: 'Tulis essay tentang perkembangan teori struktur atom minimal 1000 kata',
      maxScore: 100,
      submittedScore: null,
      type: 'essay'
    },
    {
      id: '4',
      title: 'Presentasi Fotosintesis',
      subject: 'Biologi',
      teacher: 'Ibu Sari Dewi',
      dueDate: '2025-01-25',
      assignedDate: '2025-01-12',
      status: 'pending',
      description: 'Buat presentasi PowerPoint tentang proses fotosintesis pada tumbuhan',
      maxScore: 100,
      submittedScore: null,
      type: 'presentation'
    },
    {
      id: '5',
      title: 'Analisis Puisi Modern',
      subject: 'Bahasa Indonesia',
      teacher: 'Ibu Maya',
      dueDate: '2025-01-12',
      assignedDate: '2025-01-02',
      status: 'graded',
      description: 'Analisis struktur dan makna puisi modern karya Chairil Anwar',
      maxScore: 100,
      submittedScore: 92,
      type: 'analysis'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'submitted': return Upload;
      case 'graded': return CheckCircle;
      case 'overdue': return AlertCircle;
      default: return FileText;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homework': return '📝';
      case 'report': return '📊';
      case 'essay': return '📄';
      case 'presentation': return '📋';
      case 'analysis': return '🔍';
      default: return '📚';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    switch (activeTab) {
      case 'pending': return assignment.status === 'pending';
      case 'submitted': return assignment.status === 'submitted';
      case 'graded': return assignment.status === 'graded';
      case 'overdue': return assignment.status === 'overdue';
      default: return true;
    }
  });

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tugas & Pekerjaan Rumah</h1>
        <div className="text-sm text-gray-500">
          Total: {assignments.length} tugas
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'pending', name: 'Belum Dikerjakan', count: assignments.filter(a => a.status === 'pending').length },
              { id: 'submitted', name: 'Sudah Dikumpul', count: assignments.filter(a => a.status === 'submitted').length },
              { id: 'graded', name: 'Sudah Dinilai', count: assignments.filter(a => a.status === 'graded').length },
              { id: 'overdue', name: 'Terlambat', count: assignments.filter(a => a.status === 'overdue').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Assignments List */}
        <div className="p-6">
          {filteredAssignments.length > 0 ? (
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => {
                const StatusIcon = getStatusIcon(assignment.status);
                const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                
                return (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-2xl">{getTypeIcon(assignment.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.status)}`}>
                              {assignment.status === 'pending' && 'Belum Dikerjakan'}
                              {assignment.status === 'submitted' && 'Sudah Dikumpul'}
                              {assignment.status === 'graded' && 'Sudah Dinilai'}
                              {assignment.status === 'overdue' && 'Terlambat'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{assignment.subject} • {assignment.teacher}</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}</span>
                            </div>
                            {assignment.status === 'pending' && (
                              <span className={`${daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {daysUntilDue < 0 ? `Terlambat ${Math.abs(daysUntilDue)} hari` : 
                                 daysUntilDue === 0 ? 'Hari ini' : 
                                 `${daysUntilDue} hari lagi`}
                              </span>
                            )}
                          </div>
                          {assignment.submittedScore && (
                            <div className="mt-2">
                              <span className="text-sm font-medium text-green-600">
                                Nilai: {assignment.submittedScore}/{assignment.maxScore}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-5 w-5 text-gray-400" />
                        <div className="flex space-x-2">
                          <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-lg flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>Detail</span>
                          </button>
                          {assignment.status === 'pending' && (
                            <button className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded-lg flex items-center space-x-1">
                              <Upload className="h-4 w-4" />
                              <span>Kumpul</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada tugas</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tidak ada tugas dalam kategori ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;
