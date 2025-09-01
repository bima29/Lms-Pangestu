import React, { useState } from 'react';
import { Trophy, TrendingUp, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { mockStudents } from '../../data/mockData';

const StudentGrades: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  
  const student = mockStudents[0];
  
  const allGrades = [
    ...student.grades,
    { subject: 'Bahasa Indonesia', score: 88, maxScore: 100, date: '2025-01-07' },
    { subject: 'Bahasa Inggris', score: 85, maxScore: 100, date: '2025-01-06' },
    { subject: 'Sejarah', score: 79, maxScore: 100, date: '2025-01-05' },
    { subject: 'Geografi', score: 82, maxScore: 100, date: '2025-01-04' },
    { subject: 'Ekonomi', score: 90, maxScore: 100, date: '2025-01-03' },
  ];

  const averageScore = allGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore * 100), 0) / allGrades.length;

  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return 'success';
    if (percentage >= 75) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Nilai & Rapor</h1>
          <p className="text-gray-600 mt-2">Pantau perkembangan akademik Anda</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Rapor
          </Button>
          <select 
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="current">Semester Ganjil 2024/2025</option>
            <option value="previous">Semester Genap 2023/2024</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <Trophy className="h-12 w-12 text-accent-500 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Rata-rata Nilai</h3>
          <p className="text-3xl font-bold text-primary-700">{averageScore.toFixed(1)}</p>
          <Badge variant="success" className="mt-2">Excellent</Badge>
        </Card>

        <Card className="text-center">
          <TrendingUp className="h-12 w-12 text-success-500 mx-auto mb-3" />
          <h3 className="font-semibold text-primary-900 mb-1">Ranking Kelas</h3>
          <p className="text-3xl font-bold text-success-700">3</p>
          <p className="text-sm text-gray-500 mt-2">dari 32 siswa</p>
        </Card>

        <Card className="text-center">
          <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl font-bold text-primary-700">A</span>
          </div>
          <h3 className="font-semibold text-primary-900 mb-1">Grade Point</h3>
          <p className="text-3xl font-bold text-primary-700">3.42</p>
          <p className="text-sm text-gray-500 mt-2">Skala 4.0</p>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Detail Nilai per Mata Pelajaran</h3>
        <div className="grid gap-4">
          {allGrades.map((grade, index) => {
            const percentage = (grade.score / grade.maxScore) * 100;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{grade.subject}</h4>
                  <p className="text-sm text-gray-500">Tanggal: {grade.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{grade.score}/{grade.maxScore}</p>
                    <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
                  </div>
                  <Badge variant={getGradeColor(percentage)}>
                    {percentage >= 85 ? 'A' : percentage >= 75 ? 'B' : percentage >= 65 ? 'C' : 'D'}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Progress Chart</h3>
          <div className="space-y-4">
            {['Matematika', 'Fisika', 'Kimia', 'Bahasa Indonesia'].map((subject, index) => {
              const score = allGrades.find(g => g.subject === subject)?.score || 0;
              const percentage = (score / 100) * 100;
              return (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{subject}</span>
                    <span className="text-gray-500">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Achievement Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <Trophy className="h-8 w-8 text-success-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-success-800">Perfect Score</p>
              <p className="text-xs text-success-600">Matematika</p>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-primary-800">Most Improved</p>
              <p className="text-xs text-primary-600">Fisika</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentGrades;