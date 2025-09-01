import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, Users, Award } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';

const SchoolReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedClass, setSelectedClass] = useState('all');

  const reports = [
    { title: 'Academic Performance Report', type: 'academic', date: '2025-01-10', format: 'PDF' },
    { title: 'Attendance Summary', type: 'attendance', date: '2025-01-09', format: 'Excel' },
    { title: 'Teacher Performance Review', type: 'teacher', date: '2025-01-08', format: 'PDF' },
    { title: 'Student Progress Report', type: 'student', date: '2025-01-07', format: 'PDF' },
  ];

  const performanceData = [
    { subject: 'Matematika', average: 82.5, improvement: '+3.2%', students: 156 },
    { subject: 'Fisika', average: 79.8, improvement: '+1.8%', students: 156 },
    { subject: 'Kimia', average: 85.2, improvement: '+5.1%', students: 156 },
    { subject: 'Biologi', average: 81.7, improvement: '+2.5%', students: 156 },
    { subject: 'Bahasa Indonesia', average: 86.3, improvement: '+4.2%', students: 248 },
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
              {performanceData.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{subject.students} students</span>
                      <span className="font-semibold">{subject.average}%</span>
                      <span className="text-sm text-success-600">{subject.improvement}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.average}%` }}
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
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{report.title}</p>
                    <p className="text-xs text-gray-500">{report.date} • {report.format}</p>
                  </div>
                  <Button variant="ghost" size="sm">
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