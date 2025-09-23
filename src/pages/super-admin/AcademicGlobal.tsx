import { useState } from 'react';
import { BookOpen, GraduationCap, FileText, BarChart3, Plus, Search, Eye, Edit, School, Users, Calendar, TrendingUp, Award, Clock, CheckCircle, AlertCircle, Save, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  teaching_hours: number;
  is_active: boolean;
  schools_count: number;
  created_at: string;
}

interface AcademicYear {
  id: string;
  year: string;
  semester: 1 | 2;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_current: boolean;
  schools_count: number;
  students_count: number;
  classes_count: number;
  created_at: string;
}

interface CompetencyStandard {
  id: string;
  code: string;
  title: string;
  description: string;
  subject_id: string;
  subject_name: string;
  grade_level: string;
  category: 'knowledge' | 'skill' | 'attitude';
  is_active: boolean;
  schools_count: number;
  created_at: string;
}

export default function AcademicGlobal() {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [activeView, setActiveView] = useState<'subjects' | 'academic-years' | 'competency-standards'>('subjects');
  
  // Pagination state
  const [subjectsPage, setSubjectsPage] = useState(1);
  const [subjectsPerPage, setSubjectsPerPage] = useState(5);
  const [academicYearsPage, setAcademicYearsPage] = useState(1);
  const [academicYearsPerPage, setAcademicYearsPerPage] = useState(5);
  const [competencyPage, setCompetencyPage] = useState(1);
  const [competencyPerPage, setCompetencyPerPage] = useState(5);
  
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Matematika', code: 'MTK', description: 'Mata pelajaran matematika untuk semua tingkat', teaching_hours: 4, is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '2', name: 'Bahasa Indonesia', code: 'BID', description: 'Mata pelajaran bahasa Indonesia', teaching_hours: 4, is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '3', name: 'Bahasa Inggris', code: 'BIG', description: 'Mata pelajaran bahasa Inggris', teaching_hours: 3, is_active: true, schools_count: 12, created_at: '2024-01-15' },
    { id: '4', name: 'Fisika', code: 'FIS', description: 'Mata pelajaran fisika untuk IPA', teaching_hours: 3, is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '5', name: 'Kimia', code: 'KIM', description: 'Mata pelajaran kimia untuk IPA', teaching_hours: 3, is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '6', name: 'Biologi', code: 'BIO', description: 'Mata pelajaran biologi untuk IPA', teaching_hours: 3, is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '7', name: 'Sejarah', code: 'SEJ', description: 'Mata pelajaran sejarah untuk IPS', teaching_hours: 2, is_active: true, schools_count: 10, created_at: '2024-01-15' },
    { id: '8', name: 'Geografi', code: 'GEO', description: 'Mata pelajaran geografi untuk IPS', teaching_hours: 2, is_active: true, schools_count: 10, created_at: '2024-01-15' },
    { id: '9', name: 'Ekonomi', code: 'EKO', description: 'Mata pelajaran ekonomi untuk IPS', teaching_hours: 3, is_active: true, schools_count: 10, created_at: '2024-01-15' },
    { id: '10', name: 'Sosiologi', code: 'SOS', description: 'Mata pelajaran sosiologi untuk IPS', teaching_hours: 2, is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '11', name: 'Pendidikan Agama', code: 'PAI', description: 'Mata pelajaran pendidikan agama Islam', teaching_hours: 2, is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '12', name: 'PPKN', code: 'PKN', description: 'Mata pelajaran pendidikan pancasila dan kewarganegaraan', teaching_hours: 2, is_active: true, schools_count: 15, created_at: '2024-01-15' }
  ]);
  const [subjectFormData, setSubjectFormData] = useState({
    name: '',
    code: '',
    description: '',
    teaching_hours: 1,
    is_active: true
  });
  const [subjectErrors, setSubjectErrors] = useState<Record<string, string>>({});
  
  // Academic Year state
  const [showAddAcademicYearModal, setShowAddAcademicYearModal] = useState(false);
  const [showEditAcademicYearModal, setShowEditAcademicYearModal] = useState(false);
  const [editingAcademicYear, setEditingAcademicYear] = useState<AcademicYear | null>(null);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([
    { id: '1', year: '2024/2025', semester: 1, start_date: '2024-07-15', end_date: '2024-12-20', is_active: true, is_current: true, schools_count: 15, students_count: 2450, classes_count: 98, created_at: '2024-06-01' },
    { id: '2', year: '2024/2025', semester: 2, start_date: '2025-01-06', end_date: '2025-06-15', is_active: true, is_current: false, schools_count: 15, students_count: 2450, classes_count: 98, created_at: '2024-06-01' },
    { id: '3', year: '2023/2024', semester: 1, start_date: '2023-07-15', end_date: '2023-12-20', is_active: false, is_current: false, schools_count: 15, students_count: 2380, classes_count: 95, created_at: '2023-06-01' },
    { id: '4', year: '2023/2024', semester: 2, start_date: '2024-01-06', end_date: '2024-06-15', is_active: false, is_current: false, schools_count: 15, students_count: 2380, classes_count: 95, created_at: '2023-06-01' },
    { id: '5', year: '2022/2023', semester: 1, start_date: '2022-07-15', end_date: '2022-12-20', is_active: false, is_current: false, schools_count: 14, students_count: 2250, classes_count: 90, created_at: '2022-06-01' },
    { id: '6', year: '2022/2023', semester: 2, start_date: '2023-01-06', end_date: '2023-06-15', is_active: false, is_current: false, schools_count: 14, students_count: 2250, classes_count: 90, created_at: '2022-06-01' },
    { id: '7', year: '2025/2026', semester: 1, start_date: '2025-07-15', end_date: '2025-12-20', is_active: false, is_current: false, schools_count: 15, students_count: 0, classes_count: 0, created_at: '2025-06-01' }
  ]);
  const [academicYearFormData, setAcademicYearFormData] = useState({
    year: '',
    semester: 1 as 1 | 2,
    start_date: '',
    end_date: '',
    is_active: true
  });
  const [academicYearErrors, setAcademicYearErrors] = useState<Record<string, string>>({});

  // Competency Standards state
  const [showAddCompetencyModal, setShowAddCompetencyModal] = useState(false);
  const [showEditCompetencyModal, setShowEditCompetencyModal] = useState(false);
  const [editingCompetency, setEditingCompetency] = useState<CompetencyStandard | null>(null);
  const [competencyStandards, setCompetencyStandards] = useState<CompetencyStandard[]>([
    { id: '1', code: 'MTK.10.1.1', title: 'Memahami konsep bilangan real', description: 'Siswa mampu memahami dan mengaplikasikan konsep bilangan real', subject_id: '1', subject_name: 'Matematika', grade_level: '10', category: 'knowledge', is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '2', code: 'BID.10.1.1', title: 'Menganalisis teks laporan hasil observasi', description: 'Siswa mampu menganalisis struktur dan kebahasaan teks laporan hasil observasi', subject_id: '2', subject_name: 'Bahasa Indonesia', grade_level: '10', category: 'knowledge', is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '3', code: 'MTK.10.1.2', title: 'Menerapkan operasi aljabar', description: 'Siswa mampu menerapkan operasi aljabar dalam pemecahan masalah', subject_id: '1', subject_name: 'Matematika', grade_level: '10', category: 'skill', is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '4', code: 'FIS.10.1.1', title: 'Memahami besaran dan satuan', description: 'Siswa mampu memahami konsep besaran pokok dan turunan serta satuannya', subject_id: '4', subject_name: 'Fisika', grade_level: '10', category: 'knowledge', is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '5', code: 'BIG.10.1.1', title: 'Menggunakan tenses dengan tepat', description: 'Siswa mampu menggunakan berbagai tenses dalam komunikasi sehari-hari', subject_id: '3', subject_name: 'Bahasa Inggris', grade_level: '10', category: 'skill', is_active: true, schools_count: 12, created_at: '2024-01-15' },
    { id: '6', code: 'KIM.10.1.1', title: 'Memahami struktur atom', description: 'Siswa mampu memahami konsep struktur atom dan konfigurasi elektron', subject_id: '5', subject_name: 'Kimia', grade_level: '10', category: 'knowledge', is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '7', code: 'BIO.10.1.1', title: 'Mengklasifikasi makhluk hidup', description: 'Siswa mampu mengklasifikasi makhluk hidup berdasarkan ciri-ciri tertentu', subject_id: '6', subject_name: 'Biologi', grade_level: '10', category: 'skill', is_active: true, schools_count: 8, created_at: '2024-01-15' },
    { id: '8', code: 'SEJ.10.1.1', title: 'Menganalisis peristiwa sejarah', description: 'Siswa mampu menganalisis peristiwa sejarah Indonesia', subject_id: '7', subject_name: 'Sejarah', grade_level: '10', category: 'knowledge', is_active: true, schools_count: 10, created_at: '2024-01-15' },
    { id: '9', code: 'PAI.10.1.1', title: 'Menghayati nilai-nilai agama', description: 'Siswa mampu menghayati dan mengamalkan nilai-nilai agama dalam kehidupan', subject_id: '11', subject_name: 'Pendidikan Agama', grade_level: '10', category: 'attitude', is_active: true, schools_count: 15, created_at: '2024-01-15' },
    { id: '10', code: 'PKN.10.1.1', title: 'Memahami nilai-nilai Pancasila', description: 'Siswa mampu memahami dan mengamalkan nilai-nilai Pancasila', subject_id: '12', subject_name: 'PPKN', grade_level: '10', category: 'attitude', is_active: true, schools_count: 15, created_at: '2024-01-15' }
  ]);
  const [competencyFormData, setCompetencyFormData] = useState({
    code: '',
    title: '',
    description: '',
    subject_id: '',
    grade_level: '10',
    category: 'knowledge' as 'knowledge' | 'skill' | 'attitude',
    is_active: true
  });
  const [competencyErrors, setCompetencyErrors] = useState<Record<string, string>>({});

  // Subject management functions
  const validateSubjectForm = () => {
    const newErrors: Record<string, string> = {};

    if (!subjectFormData.name.trim()) {
      newErrors.name = 'Nama mata pelajaran wajib diisi';
    }

    if (!subjectFormData.code.trim()) {
      newErrors.code = 'Kode mata pelajaran wajib diisi';
    } else if (subjects.some(s => s.code === subjectFormData.code)) {
      newErrors.code = 'Kode mata pelajaran sudah digunakan';
    }

    if (subjectFormData.teaching_hours < 1 || subjectFormData.teaching_hours > 6) {
      newErrors.teaching_hours = 'Jam pelajaran harus antara 1-6';
    }

    setSubjectErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddSubjectModal = () => {
    setActiveView('subjects');
    setSubjectFormData({
      name: '',
      code: '',
      description: '',
      teaching_hours: 1,
      is_active: true
    });
    setSubjectErrors({});
    setShowAddSubjectModal(true);
  };

  const closeSubjectModal = () => {
    setShowAddSubjectModal(false);
    setSubjectFormData({
      name: '',
      code: '',
      description: '',
      teaching_hours: 1,
      is_active: true
    });
    setSubjectErrors({});
  };

  const handleAddSubject = () => {
    if (!validateSubjectForm()) return;

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: subjectFormData.name,
      code: subjectFormData.code.toUpperCase(),
      description: subjectFormData.description,
      teaching_hours: subjectFormData.teaching_hours,
      is_active: subjectFormData.is_active,
      schools_count: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setSubjects([...subjects, newSubject]);
    closeSubjectModal();
  };

  const openEditSubjectModal = (subject: Subject) => {
    setEditingSubject(subject);
    setSubjectFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      teaching_hours: subject.teaching_hours,
      is_active: subject.is_active
    });
    setSubjectErrors({});
    setShowEditSubjectModal(true);
  };

  const closeEditSubjectModal = () => {
    setShowEditSubjectModal(false);
    setEditingSubject(null);
    setSubjectFormData({
      name: '',
      code: '',
      description: '',
      teaching_hours: 1,
      is_active: true
    });
    setSubjectErrors({});
  };

  const handleEditSubject = () => {
    if (!validateSubjectForm() || !editingSubject) return;

    const updatedSubjects = subjects.map(subject =>
      subject.id === editingSubject.id
        ? {
            ...subject,
            name: subjectFormData.name,
            code: subjectFormData.code,
            description: subjectFormData.description,
            teaching_hours: subjectFormData.teaching_hours,
            is_active: subjectFormData.is_active
          }
        : subject
    );

    setSubjects(updatedSubjects);
    closeEditSubjectModal();
  };

  const handleDeleteSubject = (subjectId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
      setSubjects(subjects.filter(subject => subject.id !== subjectId));
    }
  };

  // Academic Year management functions
  const validateAcademicYearForm = () => {
    const newErrors: Record<string, string> = {};

    if (!academicYearFormData.year.trim()) {
      newErrors.year = 'Tahun akademik wajib diisi';
    } else if (!/^\d{4}\/\d{4}$/.test(academicYearFormData.year)) {
      newErrors.year = 'Format tahun harus YYYY/YYYY (contoh: 2024/2025)';
    }

    if (!academicYearFormData.start_date) {
      newErrors.start_date = 'Tanggal mulai wajib diisi';
    }

    if (!academicYearFormData.end_date) {
      newErrors.end_date = 'Tanggal selesai wajib diisi';
    }

    if (academicYearFormData.start_date && academicYearFormData.end_date && academicYearFormData.start_date >= academicYearFormData.end_date) {
      newErrors.end_date = 'Tanggal selesai harus setelah tanggal mulai';
    }

    const isDuplicate = academicYears.some(ay => 
      ay.year === academicYearFormData.year && 
      ay.semester === academicYearFormData.semester
    );
    
    if (isDuplicate) {
      newErrors.year = `Tahun akademik ${academicYearFormData.year} semester ${academicYearFormData.semester} sudah ada`;
    }

    setAcademicYearErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddAcademicYearModal = () => {
    setActiveView('academic-years');
    const currentYear = new Date().getFullYear();
    setAcademicYearFormData({
      year: `${currentYear}/${currentYear + 1}`,
      semester: 1,
      start_date: '',
      end_date: '',
      is_active: true
    });
    setAcademicYearErrors({});
    setShowAddAcademicYearModal(true);
  };

  const closeAcademicYearModal = () => {
    setShowAddAcademicYearModal(false);
    setAcademicYearFormData({
      year: '',
      semester: 1,
      start_date: '',
      end_date: '',
      is_active: true
    });
    setAcademicYearErrors({});
  };

  const handleAddAcademicYear = () => {
    if (!validateAcademicYearForm()) return;

    const newAcademicYear: AcademicYear = {
      id: Date.now().toString(),
      year: academicYearFormData.year,
      semester: academicYearFormData.semester,
      start_date: academicYearFormData.start_date,
      end_date: academicYearFormData.end_date,
      is_active: academicYearFormData.is_active,
      is_current: false,
      schools_count: 0,
      students_count: 0,
      classes_count: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setAcademicYears([...academicYears, newAcademicYear]);
    closeAcademicYearModal();
  };

  const openEditAcademicYearModal = (academicYear: AcademicYear) => {
    setEditingAcademicYear(academicYear);
    setAcademicYearFormData({
      year: academicYear.year,
      semester: academicYear.semester,
      start_date: academicYear.start_date,
      end_date: academicYear.end_date,
      is_active: academicYear.is_active
    });
    setAcademicYearErrors({});
    setShowEditAcademicYearModal(true);
  };

  const closeEditAcademicYearModal = () => {
    setShowEditAcademicYearModal(false);
    setEditingAcademicYear(null);
    setAcademicYearFormData({
      year: '',
      semester: 1,
      start_date: '',
      end_date: '',
      is_active: true
    });
    setAcademicYearErrors({});
  };

  const handleEditAcademicYear = () => {
    if (!validateAcademicYearForm() || !editingAcademicYear) return;

    const updatedAcademicYears = academicYears.map(year =>
      year.id === editingAcademicYear.id
        ? {
            ...year,
            year: academicYearFormData.year,
            semester: academicYearFormData.semester,
            start_date: academicYearFormData.start_date,
            end_date: academicYearFormData.end_date,
            is_active: academicYearFormData.is_active
          }
        : year
    );

    setAcademicYears(updatedAcademicYears);
    closeEditAcademicYearModal();
  };

  const handleDeleteAcademicYear = (yearId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tahun akademik ini?')) {
      setAcademicYears(academicYears.filter(year => year.id !== yearId));
    }
  };

  // Competency Standards management functions
  const validateCompetencyForm = () => {
    const newErrors: Record<string, string> = {};

    if (!competencyFormData.code.trim()) {
      newErrors.code = 'Kode kompetensi wajib diisi';
    } else if (competencyStandards.some(s => s.code === competencyFormData.code)) {
      newErrors.code = 'Kode kompetensi sudah digunakan';
    }

    if (!competencyFormData.title.trim()) {
      newErrors.title = 'Judul kompetensi wajib diisi';
    }

    if (!competencyFormData.description.trim()) {
      newErrors.description = 'Deskripsi kompetensi wajib diisi';
    }

    if (!competencyFormData.subject_id) {
      newErrors.subject_id = 'Mata pelajaran wajib dipilih';
    }

    setCompetencyErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddCompetencyModal = () => {
    setActiveView('competency-standards');
    setCompetencyFormData({
      code: '',
      title: '',
      description: '',
      subject_id: '',
      grade_level: '10',
      category: 'knowledge',
      is_active: true
    });
    setCompetencyErrors({});
    setShowAddCompetencyModal(true);
  };

  const closeCompetencyModal = () => {
    setShowAddCompetencyModal(false);
    setCompetencyFormData({
      code: '',
      title: '',
      description: '',
      subject_id: '',
      grade_level: '10',
      category: 'knowledge',
      is_active: true
    });
    setCompetencyErrors({});
  };

  const handleAddCompetency = () => {
    if (!validateCompetencyForm()) return;

    const selectedSubject = subjects.find(s => s.id === competencyFormData.subject_id);
    const newCompetency: CompetencyStandard = {
      id: Date.now().toString(),
      code: competencyFormData.code,
      title: competencyFormData.title,
      description: competencyFormData.description,
      subject_id: competencyFormData.subject_id,
      subject_name: selectedSubject?.name || '',
      grade_level: competencyFormData.grade_level,
      category: competencyFormData.category,
      is_active: competencyFormData.is_active,
      schools_count: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setCompetencyStandards([...competencyStandards, newCompetency]);
    closeCompetencyModal();
  };

  const openEditCompetencyModal = (competency: CompetencyStandard) => {
    setEditingCompetency(competency);
    setCompetencyFormData({
      code: competency.code,
      title: competency.title,
      description: competency.description,
      subject_id: competency.subject_id,
      grade_level: competency.grade_level,
      category: competency.category,
      is_active: competency.is_active
    });
    setCompetencyErrors({});
    setShowEditCompetencyModal(true);
  };

  const closeEditCompetencyModal = () => {
    setShowEditCompetencyModal(false);
    setEditingCompetency(null);
    setCompetencyFormData({
      code: '',
      title: '',
      description: '',
      subject_id: '',
      grade_level: '10',
      category: 'knowledge',
      is_active: true
    });
    setCompetencyErrors({});
  };

  const handleEditCompetency = () => {
    if (!validateCompetencyForm() || !editingCompetency) return;

    const selectedSubject = subjects.find(s => s.id === competencyFormData.subject_id);
    const updatedCompetencyStandards = competencyStandards.map(standard =>
      standard.id === editingCompetency.id
        ? {
            ...standard,
            code: competencyFormData.code,
            title: competencyFormData.title,
            description: competencyFormData.description,
            subject_id: competencyFormData.subject_id,
            subject_name: selectedSubject?.name || '',
            grade_level: competencyFormData.grade_level,
            category: competencyFormData.category,
            is_active: competencyFormData.is_active
          }
        : standard
    );

    setCompetencyStandards(updatedCompetencyStandards);
    closeEditCompetencyModal();
  };

  const handleDeleteCompetency = (competencyId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus standar kompetensi ini?')) {
      setCompetencyStandards(competencyStandards.filter(standard => standard.id !== competencyId));
    }
  };

  // View switching functions
  const showSubjectsView = () => setActiveView('subjects');
  const showAcademicYearsView = () => setActiveView('academic-years');
  const showCompetencyStandardsView = () => setActiveView('competency-standards');

  // Pagination helper functions
  const getPaginatedData = (data: any[], page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (totalItems: number, perPage: number) => {
    return Math.ceil(totalItems / perPage);
  };

  // Pagination data
  const paginatedSubjects = getPaginatedData(subjects, subjectsPage, subjectsPerPage);
  const totalSubjectPages = getTotalPages(subjects.length, subjectsPerPage);
  
  const paginatedAcademicYears = getPaginatedData(academicYears, academicYearsPage, academicYearsPerPage);
  const totalAcademicYearPages = getTotalPages(academicYears.length, academicYearsPerPage);
  
  const paginatedCompetencyStandards = getPaginatedData(competencyStandards, competencyPage, competencyPerPage);
  const totalCompetencyPages = getTotalPages(competencyStandards.length, competencyPerPage);

  // Pagination component
  const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    itemsPerPage, 
    totalItems,
    onPageChange, 
    onItemsPerPageChange 
  }: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (perPage: number) => void;
  }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {totalItems} entries
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === page
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'curriculum', name: 'Kurikulum', icon: BookOpen },
    { id: 'classes', name: 'Monitoring Kelas', icon: GraduationCap },
    { id: 'assessments', name: 'Monitoring CBT & Assignment', icon: FileText },
    { id: 'analytics', name: 'Analitik', icon: BarChart3 }
  ];

  // Mock data
  const mockSchools = [
    { id: '1', name: 'SMA Negeri 1 Jakarta' },
    { id: '2', name: 'SMA Negeri 2 Jakarta' },
    { id: '3', name: 'SMA Swasta Pangestu' }
  ];


  const mockClasses = [
    { id: '1', name: 'X IPA 1', school: 'SMA Negeri 1 Jakarta', students: 32, teacher: 'Drs. Ahmad Suryadi', attendance: 95, status: 'active' },
    { id: '2', name: 'XI IPS 2', school: 'SMA Negeri 2 Jakarta', students: 28, teacher: 'Dr. Siti Nurhaliza', attendance: 92, status: 'active' },
    { id: '3', name: 'XII IPA 3', school: 'SMA Swasta Pangestu', students: 30, teacher: 'Prof. Bambang Sutrisno', attendance: 88, status: 'active' }
  ];

  const mockAssessments = [
    { id: '1', title: 'Ujian Tengah Semester Matematika', type: 'CBT', school: 'SMA Negeri 1 Jakarta', participants: 120, completion: 95, date: '2024-03-15' },
    { id: '2', title: 'Tugas Bahasa Indonesia', type: 'Assignment', school: 'SMA Negeri 2 Jakarta', participants: 85, completion: 78, date: '2024-03-10' },
    { id: '3', title: 'Quiz Fisika', type: 'CBT', school: 'SMA Swasta Pangestu', participants: 90, completion: 100, date: '2024-03-12' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Akademik Global</h1>
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
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={showSubjectsView} className="text-left">
                <Card className={`p-6 hover:shadow-lg transition-shadow cursor-pointer ${activeView === 'subjects' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Mata Pelajaran Global</h4>
                      <p className="text-sm text-gray-600 mt-1">Kelola mata pelajaran standar</p>
                      <p className="text-lg font-semibold text-blue-600 mt-2">{subjects.length} Mata Pelajaran</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500" />
                  </div>
                </Card>
              </button>
              
              <button onClick={showAcademicYearsView} className="text-left">
                <Card className={`p-6 hover:shadow-lg transition-shadow cursor-pointer ${activeView === 'academic-years' ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Tahun Akademik</h4>
                      <p className="text-sm text-gray-600 mt-1">Atur tahun akademik global</p>
                      <p className="text-lg font-semibold text-green-600 mt-2">{academicYears.length} Tahun</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-500" />
                  </div>
                </Card>
              </button>
              
              <button onClick={showCompetencyStandardsView} className="text-left">
                <Card className={`p-6 hover:shadow-lg transition-shadow cursor-pointer ${activeView === 'competency-standards' ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Standar Kompetensi</h4>
                      <p className="text-sm text-gray-600 mt-1">Kelola standar kompetensi</p>
                      <p className="text-lg font-semibold text-purple-600 mt-2">{competencyStandards.length} Standar</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                </Card>
              </button>
            </div>

            {/* Dynamic Content Based on Active View */}
            {activeView === 'subjects' && (
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Mata Pelajaran Global</h3>
                    <Button onClick={openAddSubjectModal} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Tambah Mata Pelajaran
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Pelajaran</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedSubjects.map((subject) => (
                          <tr key={subject.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{subject.name}</div>
                              <div className="text-sm text-gray-500">{subject.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.code}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.teaching_hours} jam</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.schools_count} sekolah</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                subject.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {subject.is_active ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditSubjectModal(subject)}
                                  className="text-blue-600 hover:text-blue-900 flex items-center"
                                  title="Edit mata pelajaran"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSubject(subject.id)}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                  title="Hapus mata pelajaran"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <PaginationControls
                    currentPage={subjectsPage}
                    totalPages={totalSubjectPages}
                    itemsPerPage={subjectsPerPage}
                    totalItems={subjects.length}
                    onPageChange={setSubjectsPage}
                    onItemsPerPageChange={(perPage) => {
                      setSubjectsPerPage(perPage);
                      setSubjectsPage(1);
                    }}
                  />
                </div>
              </Card>
            )}

            {activeView === 'academic-years' && (
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Tahun Akademik</h3>
                    <Button onClick={openAddAcademicYearModal} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Tambah Tahun Akademik
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Akademik</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedAcademicYears.map((year) => (
                          <tr key={year.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{year.year}</div>
                              {year.is_current && <div className="text-xs text-blue-600 font-medium">Tahun Aktif</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Semester {year.semester}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(year.start_date).toLocaleDateString('id-ID')} - {new Date(year.end_date).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{year.schools_count} sekolah</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{year.students_count.toLocaleString()} siswa</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                year.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {year.is_active ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditAcademicYearModal(year)}
                                  className="text-blue-600 hover:text-blue-900 flex items-center"
                                  title="Edit tahun akademik"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAcademicYear(year.id)}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                  title="Hapus tahun akademik"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <PaginationControls
                    currentPage={academicYearsPage}
                    totalPages={totalAcademicYearPages}
                    itemsPerPage={academicYearsPerPage}
                    totalItems={academicYears.length}
                    onPageChange={setAcademicYearsPage}
                    onItemsPerPageChange={(perPage) => {
                      setAcademicYearsPerPage(perPage);
                      setAcademicYearsPage(1);
                    }}
                  />
                </div>
              </Card>
            )}

            {activeView === 'competency-standards' && (
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Standar Kompetensi</h3>
                    <Button onClick={openAddCompetencyModal} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Tambah Standar Kompetensi
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kompetensi</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedCompetencyStandards.map((standard) => (
                          <tr key={standard.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{standard.code}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{standard.title}</div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">{standard.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{standard.subject_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kelas {standard.grade_level}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                standard.category === 'knowledge' ? 'bg-blue-100 text-blue-800' :
                                standard.category === 'skill' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {standard.category === 'knowledge' ? 'Pengetahuan' :
                                 standard.category === 'skill' ? 'Keterampilan' : 'Sikap'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                standard.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {standard.is_active ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditCompetencyModal(standard)}
                                  className="text-blue-600 hover:text-blue-900 flex items-center"
                                  title="Edit standar kompetensi"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCompetency(standard.id)}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                  title="Hapus standar kompetensi"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <PaginationControls
                    currentPage={competencyPage}
                    totalPages={totalCompetencyPages}
                    itemsPerPage={competencyPerPage}
                    totalItems={competencyStandards.length}
                    onPageChange={setCompetencyPage}
                    onItemsPerPageChange={(perPage) => {
                      setCompetencyPerPage(perPage);
                      setCompetencyPage(1);
                    }}
                  />
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Kelas</p>
                    <p className="text-2xl font-bold text-blue-600">1,245</p>
                    <p className="text-xs text-gray-500 mt-1">Di semua sekolah</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Kelas Aktif</p>
                    <p className="text-2xl font-bold text-green-600">1,180</p>
                    <p className="text-xs text-gray-500 mt-1">94.8% dari total</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rata-rata Siswa</p>
                    <p className="text-2xl font-bold text-yellow-600">28</p>
                    <p className="text-xs text-gray-500 mt-1">Per kelas</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tingkat Kehadiran</p>
                    <p className="text-2xl font-bold text-purple-600">94%</p>
                    <p className="text-xs text-gray-500 mt-1">Rata-rata global</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters and Classes Table */}
            <Card>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Cari kelas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Semua Sekolah</option>
                    {mockSchools.map(school => (
                      <option key={school.id} value={school.id}>{school.name}</option>
                    ))}
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wali Kelas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kehadiran</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockClasses.map((classItem) => (
                        <tr key={classItem.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{classItem.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.school}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.teacher}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.students} siswa</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                classItem.attendance >= 95 ? 'bg-green-400' :
                                classItem.attendance >= 90 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></div>
                              <span className="text-sm text-gray-900">{classItem.attendance}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="space-y-6">
            {/* Assessment Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total CBT</p>
                    <p className="text-2xl font-bold text-indigo-600">2,456</p>
                    <p className="text-xs text-gray-500 mt-1">Ujian online</p>
                  </div>
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Assignment</p>
                    <p className="text-2xl font-bold text-pink-600">5,678</p>
                    <p className="text-xs text-gray-500 mt-1">Tugas mandiri</p>
                  </div>
                  <div className="p-3 bg-pink-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tingkat Penyelesaian</p>
                    <p className="text-2xl font-bold text-teal-600">87%</p>
                    <p className="text-xs text-gray-500 mt-1">Rata-rata global</p>
                  </div>
                  <div className="p-3 bg-teal-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-orange-600">342</p>
                    <p className="text-xs text-gray-500 mt-1">Menunggu koreksi</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Assessments */}
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Assessment Terbaru</h3>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Semua Tipe</option>
                      <option value="cbt">CBT</option>
                      <option value="assignment">Assignment</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Semua Sekolah</option>
                      {mockSchools.map(school => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peserta</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penyelesaian</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockAssessments.map((assessment) => (
                        <tr key={assessment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{assessment.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              assessment.type === 'CBT' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {assessment.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.school}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.participants} siswa</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    assessment.completion >= 90 ? 'bg-green-500' :
                                    assessment.completion >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${assessment.completion}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">{assessment.completion}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sekolah</p>
                    <p className="text-2xl font-bold text-blue-600">15</p>
                    <p className="text-xs text-green-600 mt-1">+2 bulan ini</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <School className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                    <p className="text-2xl font-bold text-green-600">34,892</p>
                    <p className="text-xs text-green-600 mt-1">+5.2% dari bulan lalu</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rata-rata Nilai</p>
                    <p className="text-2xl font-bold text-purple-600">82.5</p>
                    <p className="text-xs text-green-600 mt-1">+1.2 dari semester lalu</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Performa Sekolah</h3>
                  <div className="space-y-4">
                    {mockSchools.map((school, index) => (
                      <div key={school.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            index === 0 ? 'bg-green-500' : 
                            index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                          }`}></div>
                          <span className="text-sm font-medium">{school.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-green-500' : 
                                index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                              }`}
                              style={{ width: `${85 + index * 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{85 + index * 5}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Distribusi Mata Pelajaran</h3>
                  <div className="space-y-4">
                    {subjects.slice(0, 4).map((subject, index) => (
                      <div key={subject.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            index === 0 ? 'bg-red-500' : 
                            index === 1 ? 'bg-yellow-500' : 
                            index === 2 ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-sm font-medium">{subject.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{subject.schools_count} sekolah</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-red-500' : 
                                index === 1 ? 'bg-yellow-500' : 
                                index === 2 ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${(subject.schools_count / 15) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Trends and Insights */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Tren dan Insight</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-900">Peningkatan Kehadiran</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Kehadiran siswa meningkat 3.2% bulan ini</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-900">Nilai CBT Meningkat</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">Rata-rata nilai CBT naik 2.8 poin</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-yellow-900">Perlu Perhatian</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">3 sekolah memerlukan dukungan tambahan</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Mata Pelajaran</h3>
              <button onClick={closeSubjectModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mata Pelajaran *</label>
                <input
                  type="text"
                  value={subjectFormData.name}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama mata pelajaran"
                />
                {subjectErrors.name && <p className="mt-1 text-sm text-red-600">{subjectErrors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Mata Pelajaran *</label>
                <input
                  type="text"
                  value={subjectFormData.code}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, code: e.target.value.toUpperCase() })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.code ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Contoh: MTK, BID, BIG"
                  maxLength={5}
                />
                {subjectErrors.code && <p className="mt-1 text-sm text-red-600">{subjectErrors.code}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={subjectFormData.description}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Deskripsi mata pelajaran"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Pelajaran *</label>
                <select
                  value={subjectFormData.teaching_hours}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, teaching_hours: parseInt(e.target.value) })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.teaching_hours ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6].map(hours => (
                    <option key={hours} value={hours}>{hours} jam</option>
                  ))}
                </select>
                {subjectErrors.teaching_hours && <p className="mt-1 text-sm text-red-600">{subjectErrors.teaching_hours}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={subjectFormData.is_active}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Mata Pelajaran Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={closeSubjectModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddSubject}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Academic Year Modal */}
      {showAddAcademicYearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Tahun Akademik</h3>
              <button onClick={closeAcademicYearModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Akademik *</label>
                <input
                  type="text"
                  value={academicYearFormData.year}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, year: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    academicYearErrors.year ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="2024/2025"
                />
                {academicYearErrors.year && <p className="mt-1 text-sm text-red-600">{academicYearErrors.year}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                <select
                  value={academicYearFormData.semester}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, semester: parseInt(e.target.value) as 1 | 2 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>Semester 1</option>
                  <option value={2}>Semester 2</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai *</label>
                <input
                  type="date"
                  value={academicYearFormData.start_date}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, start_date: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    academicYearErrors.start_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {academicYearErrors.start_date && <p className="mt-1 text-sm text-red-600">{academicYearErrors.start_date}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai *</label>
                <input
                  type="date"
                  value={academicYearFormData.end_date}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, end_date: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    academicYearErrors.end_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {academicYearErrors.end_date && <p className="mt-1 text-sm text-red-600">{academicYearErrors.end_date}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="academic_year_active"
                  checked={academicYearFormData.is_active}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="academic_year_active" className="ml-2 block text-sm text-gray-900">
                  Tahun Akademik Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={closeAcademicYearModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddAcademicYear}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Competency Standards Modal */}
      {showAddCompetencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tambah Standar Kompetensi</h3>
              <button onClick={closeCompetencyModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Kompetensi *</label>
                  <input
                    type="text"
                    value={competencyFormData.code}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, code: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      competencyErrors.code ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Contoh: MTK.10.1.1"
                  />
                  {competencyErrors.code && <p className="mt-1 text-sm text-red-600">{competencyErrors.code}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
                  <select
                    value={competencyFormData.subject_id}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, subject_id: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      competencyErrors.subject_id ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Mata Pelajaran</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                  {competencyErrors.subject_id && <p className="mt-1 text-sm text-red-600">{competencyErrors.subject_id}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kompetensi *</label>
                <input
                  type="text"
                  value={competencyFormData.title}
                  onChange={(e) => setCompetencyFormData({ ...competencyFormData, title: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    competencyErrors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan judul standar kompetensi"
                />
                {competencyErrors.title && <p className="mt-1 text-sm text-red-600">{competencyErrors.title}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                <textarea
                  value={competencyFormData.description}
                  onChange={(e) => setCompetencyFormData({ ...competencyFormData, description: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    competencyErrors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Deskripsi detail standar kompetensi"
                  rows={4}
                />
                {competencyErrors.description && <p className="mt-1 text-sm text-red-600">{competencyErrors.description}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                  <select
                    value={competencyFormData.grade_level}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, grade_level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={competencyFormData.category}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, category: e.target.value as 'knowledge' | 'skill' | 'attitude' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="knowledge">Pengetahuan</option>
                    <option value="skill">Keterampilan</option>
                    <option value="attitude">Sikap</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="competency_active"
                  checked={competencyFormData.is_active}
                  onChange={(e) => setCompetencyFormData({ ...competencyFormData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="competency_active" className="ml-2 block text-sm text-gray-900">
                  Standar Kompetensi Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-6">
              <button
                onClick={closeCompetencyModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddCompetency}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {showEditSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Mata Pelajaran</h3>
              <button onClick={closeEditSubjectModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mata Pelajaran *</label>
                <input
                  type="text"
                  value={subjectFormData.name}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama mata pelajaran"
                />
                {subjectErrors.name && <p className="mt-1 text-sm text-red-600">{subjectErrors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Mata Pelajaran *</label>
                <input
                  type="text"
                  value={subjectFormData.code}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, code: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.code ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Contoh: MTK"
                />
                {subjectErrors.code && <p className="mt-1 text-sm text-red-600">{subjectErrors.code}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={subjectFormData.description}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Deskripsi mata pelajaran"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Pelajaran *</label>
                <select
                  value={subjectFormData.teaching_hours}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, teaching_hours: parseInt(e.target.value) })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    subjectErrors.teaching_hours ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6].map(hours => (
                    <option key={hours} value={hours}>{hours} jam</option>
                  ))}
                </select>
                {subjectErrors.teaching_hours && <p className="mt-1 text-sm text-red-600">{subjectErrors.teaching_hours}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit_subject_active"
                  checked={subjectFormData.is_active}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="edit_subject_active" className="ml-2 block text-sm text-gray-900">
                  Mata Pelajaran Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={closeEditSubjectModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleEditSubject}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Academic Year Modal */}
      {showEditAcademicYearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Tahun Akademik</h3>
              <button onClick={closeEditAcademicYearModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Akademik *</label>
                <input
                  type="text"
                  value={academicYearFormData.year}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, year: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    academicYearErrors.year ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="2024/2025"
                />
                {academicYearErrors.year && <p className="mt-1 text-sm text-red-600">{academicYearErrors.year}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                <select
                  value={academicYearFormData.semester}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, semester: parseInt(e.target.value) as 1 | 2 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>Semester 1</option>
                  <option value={2}>Semester 2</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai *</label>
                <input
                  type="date"
                  value={academicYearFormData.start_date}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, start_date: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    academicYearErrors.start_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {academicYearErrors.start_date && <p className="mt-1 text-sm text-red-600">{academicYearErrors.start_date}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai *</label>
                <input
                  type="date"
                  value={academicYearFormData.end_date}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, end_date: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    academicYearErrors.end_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {academicYearErrors.end_date && <p className="mt-1 text-sm text-red-600">{academicYearErrors.end_date}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit_academic_year_active"
                  checked={academicYearFormData.is_active}
                  onChange={(e) => setAcademicYearFormData({ ...academicYearFormData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="edit_academic_year_active" className="ml-2 block text-sm text-gray-900">
                  Tahun Akademik Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={closeEditAcademicYearModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleEditAcademicYear}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Competency Standards Modal */}
      {showEditCompetencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Standar Kompetensi</h3>
              <button onClick={closeEditCompetencyModal}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Kompetensi *</label>
                  <input
                    type="text"
                    value={competencyFormData.code}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, code: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      competencyErrors.code ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Contoh: MTK.10.1.1"
                  />
                  {competencyErrors.code && <p className="mt-1 text-sm text-red-600">{competencyErrors.code}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
                  <select
                    value={competencyFormData.subject_id}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, subject_id: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      competencyErrors.subject_id ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Mata Pelajaran</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                  {competencyErrors.subject_id && <p className="mt-1 text-sm text-red-600">{competencyErrors.subject_id}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kompetensi *</label>
                <input
                  type="text"
                  value={competencyFormData.title}
                  onChange={(e) => setCompetencyFormData({ ...competencyFormData, title: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    competencyErrors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan judul standar kompetensi"
                />
                {competencyErrors.title && <p className="mt-1 text-sm text-red-600">{competencyErrors.title}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                <textarea
                  value={competencyFormData.description}
                  onChange={(e) => setCompetencyFormData({ ...competencyFormData, description: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    competencyErrors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Deskripsi detail standar kompetensi"
                  rows={4}
                />
                {competencyErrors.description && <p className="mt-1 text-sm text-red-600">{competencyErrors.description}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                  <select
                    value={competencyFormData.grade_level}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, grade_level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={competencyFormData.category}
                    onChange={(e) => setCompetencyFormData({ ...competencyFormData, category: e.target.value as 'knowledge' | 'skill' | 'attitude' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="knowledge">Pengetahuan</option>
                    <option value="skill">Keterampilan</option>
                    <option value="attitude">Sikap</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit_competency_active"
                  checked={competencyFormData.is_active}
                  onChange={(e) => setCompetencyFormData({ ...competencyFormData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="edit_competency_active" className="ml-2 block text-sm text-gray-900">
                  Standar Kompetensi Aktif
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-6">
              <button
                onClick={closeEditCompetencyModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleEditCompetency}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
