import React, { useState } from 'react';
import { Search, Edit, Plus, Download } from 'lucide-react';

const TeacherGradebook: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('XII-IPA-1');
  const [selectedSubject, setSelectedSubject] = useState('Matematika');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: '1',
      name: 'Andi Pratama',
      studentId: 'STU001',
      grades: {
        quiz1: 85,
        quiz2: 78,
        midterm: 82,
        assignment1: 90,
        assignment2: 75,
        final: null
      }
    },
    {
      id: '2',
      name: 'Sari Wulandari',
      studentId: 'STU002',
      grades: {
        quiz1: 92,
        quiz2: 88,
        midterm: 90,
        assignment1: 85,
        assignment2: 92,
        final: null
      }
    },
    {
      id: '3',
      name: 'Budi Santoso',
      studentId: 'STU003',
      grades: {
        quiz1: 76,
        quiz2: 82,
        midterm: 79,
        assignment1: 88,
        assignment2: 80,
        final: null
      }
    },
    {
      id: '4',
      name: 'Maya Sari',
      studentId: 'STU004',
      grades: {
        quiz1: 88,
        quiz2: 85,
        midterm: 87,
        assignment1: 92,
        assignment2: 89,
        final: null
      }
    }
  ];

  const assessmentTypes = [
    { key: 'quiz1', name: 'Kuis 1', weight: 10, maxScore: 100 },
    { key: 'quiz2', name: 'Kuis 2', weight: 10, maxScore: 100 },
    { key: 'midterm', name: 'UTS', weight: 25, maxScore: 100 },
    { key: 'assignment1', name: 'Tugas 1', weight: 15, maxScore: 100 },
    { key: 'assignment2', name: 'Tugas 2', weight: 15, maxScore: 100 },
    { key: 'final', name: 'UAS', weight: 25, maxScore: 100 }
  ];

  const calculateFinalGrade = (grades: any) => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    assessmentTypes.forEach(assessment => {
      const score = grades[assessment.key];
      if (score !== null && score !== undefined) {
        totalWeightedScore += (score * assessment.weight) / 100;
        totalWeight += assessment.weight;
      }
    });

    return totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 100) : 0;
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Buku Nilai</h1>
        <div className="flex space-x-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Tambah Penilaian</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="XII-IPA-1">XII IPA 1</option>
              <option value="XII-IPA-2">XII IPA 2</option>
              <option value="XI-IPA-1">XI IPA 1</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Matematika">Matematika</option>
              <option value="Fisika">Fisika</option>
              <option value="Kimia">Kimia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Siswa</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Nama atau NIS..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                  Siswa
                </th>
                {assessmentTypes.map((assessment) => (
                  <th key={assessment.key} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div>
                      <div>{assessment.name}</div>
                      <div className="text-xs text-gray-400">({assessment.weight}%)</div>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai Akhir
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.studentId}</div>
                    </div>
                  </td>
                  {assessmentTypes.map((assessment) => (
                    <td key={assessment.key} className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="number"
                        min="0"
                        max={assessment.maxScore}
                        value={student.grades[assessment.key as keyof typeof student.grades] || ''}
                        onChange={(e) => {
                          // Handle grade update
                          console.log(`Update ${student.id} ${assessment.key} to ${e.target.value}`);
                        }}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="-"
                      />
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      calculateFinalGrade(student.grades) >= 75 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {calculateFinalGrade(student.grades)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Rata-rata Kelas</h3>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round(filteredStudents.reduce((sum, student) => sum + calculateFinalGrade(student.grades), 0) / filteredStudents.length)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Siswa Lulus</h3>
          <p className="text-3xl font-bold text-green-600">
            {filteredStudents.filter(student => calculateFinalGrade(student.grades) >= 75).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Siswa Tidak Lulus</h3>
          <p className="text-3xl font-bold text-red-600">
            {filteredStudents.filter(student => calculateFinalGrade(student.grades) < 75).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Siswa</h3>
          <p className="text-3xl font-bold text-gray-600">
            {filteredStudents.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherGradebook;
