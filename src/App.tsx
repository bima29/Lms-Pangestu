import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import SchoolLayout from './layouts/SchoolLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import ParentLayout from './layouts/ParentLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages

// School Pages
import SchoolDashboard from './pages/school/SchoolDashboard';
import SchoolUsers from './pages/school/SchoolUsers';
import SchoolClasses from './pages/school/SchoolClasses';
import SchoolSchedules from './pages/school/SchoolSchedules';
import SchoolCBT from './pages/school/SchoolCBT';
import SchoolDocuments from './pages/school/SchoolDocuments';
import SchoolReports from './pages/school/SchoolReports';
import SchoolClassManagement from './pages/school/SchoolClassManagement';
import SchoolMajorManagement from './pages/school/SchoolMajorManagement';
import SchoolSubjects from './pages/school/SchoolSubjects';

// Teacher Pages
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherMaterials from './pages/teacher/TeacherMaterials';
import TeacherCBT from './pages/teacher/TeacherCBT';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import ManageQuestions from './pages/teacher/ManageQuestions';

// Student Pages
import StudentHome from './pages/student/StudentHome';
import StudentCBT from './pages/student/StudentCBT';
import StudentGrades from './pages/student/StudentGrades';

// Parent Pages
import ParentChildren from './pages/parent/ParentChildren';
import ParentGrades from './pages/parent/ParentGrades';
import ParentNotifications from './pages/parent/ParentNotifications';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
       
          {/* School Admin Routes */}
          <Route path="/school" element={
            <ProtectedRoute allowedRoles={['school_admin']}>
              <SchoolLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<SchoolDashboard />} />
            <Route path="users" element={<SchoolUsers />} />
            <Route path="classes" element={<SchoolClasses />} />
            <Route path="subjects" element={<SchoolSubjects />} />
            <Route path="class-management" element={<SchoolClassManagement />} />
            <Route path="major-management" element={<SchoolMajorManagement />} />
            <Route path="schedules" element={<SchoolSchedules />} />
            <Route path="cbt" element={<SchoolCBT />} />
            <Route path="documents" element={<SchoolDocuments />} />
            <Route path="reports" element={<SchoolReports />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherLayout />
            </ProtectedRoute>
          }>
            <Route path="classes" element={<TeacherClasses />} />
            <Route path="materials" element={<TeacherMaterials />} />
            <Route path="materials/manage-questions" element={<ManageQuestions />} />
            <Route path="manage-questions/:id" element={<ManageQuestions />} />
            <Route path="cbt" element={<TeacherCBT />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route index element={<Navigate to="classes" replace />} />
          </Route>
          
          {/* Student Routes */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }>
            <Route path="home" element={<StudentHome />} />
            <Route path="cbt" element={<StudentCBT />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route index element={<Navigate to="home" replace />} />
          </Route>
          
          {/* Parent Routes */}
          <Route path="/parent" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentLayout />
            </ProtectedRoute>
          }>
            <Route path="children" element={<ParentChildren />} />
            <Route path="grades" element={<ParentGrades />} />
            <Route path="notifications" element={<ParentNotifications />} />
            <Route index element={<Navigate to="children" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;