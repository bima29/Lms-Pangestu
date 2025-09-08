import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, Users, Award } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import { Subject } from '../../types';

// Report interface based on database schema
interface Report {
  id: string;
  title: string;
  description?: string;
  type: 'academic' | 'attendance' | 'teacher' | 'student' | 'financial';
  file_path: string;
  file_name: string;
  file_type: string;
  generated_by: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  generator?: {
    id: string;
    name: string;
    role: string;
  };
}

// Performance data interface
interface SubjectPerformance {
  subject_id: string;
  subject_name: string;
  average_score: number;
  improvement_percentage: number;
  total_students: number;
  total_assessments: number;
  subject?: Subject;
}

const SchoolReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedClass, setSelectedClass] = useState('all');

  const reports: Report[] = [
    {
      id: 'r1',
      title: 'Academic Performance Report',
      description: 'Comprehensive academic performance analysis for current semester',
      type: 'academic',
      file_path: '/reports/academic-performance-2025-01.pdf',
      file_name: 'Academic Performance Report - January 2025.pdf',
      file_type: 'application/pdf',
      generated_by: 'admin1',
      is_public: true,
      created_at: '2025-01-10T00:00:00Z',
      updated_at: '2025-01-10T00:00:00Z',
      generator: {
        id: 'admin1',
        name: 'Admin Sekolah',
        role: 'school_admin'
      }
    },
    {
      id: 'r2',
      title: 'Attendance Summary',
      description: 'Monthly attendance summary for all classes',
      type: 'attendance',
      file_path: '/reports/attendance-summary-2025-01.xlsx',
      file_name: 'Attendance Summary - January 2025.xlsx',
      file_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      generated_by: 'admin1',
      is_public: false,
      created_at: '2025-01-09T00:00:00Z',
      updated_at: '2025-01-09T00:00:00Z',
      generator: {
        id: 'admin1',
        name: 'Admin Sekolah',
        role: 'school_admin'
      }
    },
    {
      id: 'r3',
      title: 'Teacher Performance Review',
      description: 'Quarterly teacher performance evaluation',
      type: 'teacher',
      file_path: '/reports/teacher-performance-q1-2025.pdf',
      file_name: 'Teacher Performance Review - Q1 2025.pdf',
      file_type: 'application/pdf',
      generated_by: 'principal1',
      is_public: false,
      created_at: '2025-01-08T00:00:00Z',
      updated_at: '2025-01-08T00:00:00Z',
      generator: {
        id: 'principal1',
        name: 'Kepala Sekolah',
        role: 'school_admin'
      }
    },
    {
      id: 'r4',
      title: 'Student Progress Report',
      description: 'Individual student progress tracking report',
      type: 'student',
      file_path: '/reports/student-progress-2025-01.pdf',
      file_name: 'Student Progress Report - January 2025.pdf',
      file_type: 'application/pdf',
      generated_by: 'admin1',
      is_public: true,
      created_at: '2025-01-07T00:00:00Z',
      updated_at: '2025-01-07T00:00:00Z',
      generator: {
        id: 'admin1',
        name: 'Admin Sekolah',
        role: 'school_admin'
      }
    }
  ];

  const performanceData: SubjectPerformance[] = [
    {
      subject_id: 's1',
      subject_name: 'Matematika',
      average_score: 82.5,
      improvement_percentage: 3.2,
      total_students: 156,
      total_assessments: 12,
      subject: {
        id: 's1',
        name: 'Matematika',
        code: 'MAT',
        credit_hours: 4,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    },
    {
      subject_id: 's2',
      subject_name: 'Fisika',
      average_score: 79.8,
      improvement_percentage: 1.8,
      total_students: 156,
      total_assessments: 10,
      subject: {
        id: 's2',
        name: 'Fisika',
        code: 'FIS',
        credit_hours: 3,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    },
    {
      subject_id: 's3',
      subject_name: 'Kimia',
      average_score: 85.2,
      improvement_percentage: 5.1,
      total_students: 156,
      total_assessments: 11,
      subject: {
        id: 's3',
        name: 'Kimia',
        code: 'KIM',
        credit_hours: 3,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    },
    {
      subject_id: 's4',
      subject_name: 'Biologi',
      average_score: 81.7,
      improvement_percentage: 2.5,
      total_students: 156,
      total_assessments: 9,
      subject: {
        id: 's4',
        name: 'Biologi',
        code: 'BIO',
        credit_hours: 3,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    },
    {
      subject_id: 's5',
      subject_name: 'Bahasa Indonesia',
      average_score: 86.3,
      improvement_percentage: 4.2,
      total_students: 248,
      total_assessments: 15,
      subject: {
        id: 's5',
        name: 'Bahasa Indonesia',
        code: 'BIN',
        credit_hours: 4,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-900 tracking-tight">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Analisis performa akademik dan operasional sekolah
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Overall Performance"
          value="83.2%"
          icon={Award}
          color="green"
          trend={{ value: 4.2, isPositive: true }}
        />
        <StatCard
          title="Attendance Rate"
          value="94.8%"
          icon={Users}
          color="blue"
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Teacher Satisfaction"
          value="89%"
          icon={TrendingUp}
          color="yellow"
          trend={{ value: 1.5, isPositive: true }}
        />
        <StatCard
          title="Parent Engagement"
          value="76%"
          icon={BarChart3}
          color="green"
          trend={{ value: 8.3, isPositive: true }}
        />
      </div>

      {/* Konten utama */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Konten utama kiri */}
        <div className="lg:col-span-2">
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-primary-900">Academic Performance by Subject</h3>
              <div className="flex gap-2">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="semester">This Semester</option>
                  <option value="month">This Month</option>
                  <option value="week">This Week</option>
                </select>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Classes</option>
                  <option value="XII">Class XII</option>
                  <option value="XI">Class XI</option>
                  <option value="X">Class X</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {performanceData.map((subject) => (
                <div key={subject.subject_id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{subject.subject_name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{subject.total_students} students</span>
                      <span className="font-semibold">{subject.average_score}%</span>
                      <span className="text-sm text-success-600">+{subject.improvement_percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.average_score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar kanan */}
        <div className="space-y-6">
          {/* Recent Reports */}
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Recent Reports</h3>
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{report.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(report.created_at).toLocaleDateString('id-ID')} • 
                      {report.file_name.split('.').pop()?.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400">By {report.generator?.name}</p>
                  </div>
                  <Button variant="ghost" size="sm" title="Download Report">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition rounded-2xl">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Students</span>
                <span className="font-semibold">1,248</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Teachers</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Classes</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Graduation Rate</span>
                <span className="font-semibold">96.5%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchoolReports;