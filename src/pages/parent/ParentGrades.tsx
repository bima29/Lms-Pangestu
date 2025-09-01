import React, { useState } from 'react';
import { Trophy, User, TrendingUp, Download, BookOpen, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ParentGrades: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('1');

  const children = [
    {
      id: '1',
      name: 'Andi Pratama',
      class: 'XII IPA 1',
      grades: [
        { subject: 'Matematika', score: 85, maxScore: 100, date: '2025-01-10' },
        { subject: 'Fisika', score: 78, maxScore: 100, date: '2025-01-09' },
        { subject: 'Kimia', score: 92, maxScore: 100, date: '2025-01-08' },
        { subject: 'Bahasa Indonesia', score: 88, maxScore: 100, date: '2025-01-07' },
        { subject: 'Bahasa Inggris', score: 85, maxScore: 100, date: '2025-01-06' },
      ]
    },
    {
      id: '2',
      name: 'Sari Wulandari',
      class: 'X IPA 2',
      grades: [
        { subject: 'Matematika', score: 90, maxScore: 100, date: '2025-01-10' },
        { subject: 'IPA', score: 88, maxScore: 100, date: '2025-01-09' },
        { subject: 'Bahasa Indonesia', score: 92, maxScore: 100, date: '2025-01-08' },
        { subject: 'Bahasa Inggris', score: 87, maxScore: 100, date: '2025-01-07' },
      ]
    }
  ];

  const selectedChildData = children.find(child => child.id === selectedChild);
  const averageScore = selectedChildData 
    ? selectedChildData.grades.reduce((sum, grade) => sum + (grade.score / grade.maxScore * 100), 0) / selectedChildData.grades.length
    : 0;

  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return 'success';
    if (percentage >= 75) return 'warning';
    return 'error';
  };

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 85) return 'A';
    if (percentage >= 75) return 'B';
    if (percentage >= 65) return 'C';
    return 'D';
  };

  const upcomingEvents = [
    { event: 'Ujian Matematika', date: '2025-02-01', time: '08:00' },
    { event: 'Praktikum Kimia', date: '2025-02-03', time: '10:00' },
    { event: 'Presentasi Bahasa Inggris', date: '2025-02-05', time: '09:00' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Grades & Reports</h1>
          <p className="text-gray-600 mt-2">Monitor nilai dan perkembangan akademik anak</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <select 
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedChildData && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <Trophy className="h-12 w-12 text-success-500 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-900 mb-1">Rata-rata Nilai</h3>
              <p className="text-3xl font-bold text-success-700">{averageScore.toFixed(1)}</p>
              <Badge variant="success" className="mt-2">
                {getGradeLetter(averageScore)}
              </Badge>
            </Card>

            <Card className="text-center">
              <User className="h-12 w-12 text-primary-500 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-900 mb-1">Ranking Kelas</h3>
              <p className="text-3xl font-bold text-primary-700">3</p>
              <p className="text-sm text-gray-500 mt-2">dari 32 siswa</p>
            </Card>

            <Card className="text-center">
              <TrendingUp className="h-12 w-12 text-accent-500 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-900 mb-1">Trend</h3>
              <p className="text-3xl font-bold text-accent-700">+5.2%</p>
              <Badge variant="success" className="mt-2">Improving</Badge>
            </Card>
          </div>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primary-900">
                Nilai {selectedChildData.name} - {selectedChildData.class}
              </h3>
              <Badge variant="primary">{selectedChildData.grades.length} Mata Pelajaran</Badge>
            </div>
            
            <div className="grid gap-4">
              {selectedChildData.grades.map((grade, index) => {
                const percentage = (grade.score / grade.maxScore) * 100;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-5 w-5 text-primary-600" />
                        <h4 className="font-medium text-gray-900">{grade.subject}</h4>
                      </div>
                      <p className="text-sm text-gray-500">Tanggal: {grade.date}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{grade.score}/{grade.maxScore}</p>
                        <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
                      </div>
                      <Badge variant={getGradeColor(percentage)}>
                        {getGradeLetter(percentage)}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Progress per Mata Pelajaran</h3>
              <div className="space-y-4">
                {selectedChildData.grades.map((grade, index) => {
                  const percentage = (grade.score / grade.maxScore) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{grade.subject}</span>
                        <span className="text-gray-500">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            percentage >= 85 ? 'bg-success-500' : 
                            percentage >= 75 ? 'bg-warning-500' : 'bg-error-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Jadwal Mendatang</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ParentGrades;