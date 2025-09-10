import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.tsx';

// Layouts
import SuperAdminLayout from './layouts/SuperAdminLayout.tsx';
import SchoolLayout from './layouts/SchoolLayout.tsx';
import TeacherLayout from './layouts/TeacherLayout.tsx';
import StudentLayout from './layouts/StudentLayout.tsx';
import ParentLayout from './layouts/ParentLayout.tsx';

// Pages
import LandingPage from './pages/LandingPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import UnauthorizedPage from './pages/UnauthorizedPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard.tsx';
import SchoolManagement from './pages/super-admin/SchoolManagement.tsx';
import SuperAdminUsers from './pages/super-admin/SuperAdminUsers.tsx';
import SystemSettings from './pages/super-admin/SystemSettings.tsx';

// School Pages
import SchoolDashboard from './pages/school/SchoolDashboard.tsx';
import SchoolUsers from './pages/school/SchoolUsersPage.tsx';
import SchoolClasses from './pages/school/SchoolClasses.tsx';
import SchoolSchedules from './pages/school/SchoolSchedules.tsx';
import SchoolCBT from './pages/school/SchoolCBT.tsx';
import SuperAdminReports from './pages/super-admin/SuperAdminReports.tsx';
import SchoolMajorManagement from './pages/school/SchoolMajorManagement.tsx';
import SchoolSubjects from './pages/school/SubjectsPage.tsx';
import ClassSubjectsPage from './pages/school/ClassSubjectsPage.tsx';
import SchoolReports from './pages/school/SchoolReports.tsx';
import SchoolAssignments from './pages/school/SchoolAssignments.tsx';
import SchoolMaterials from './pages/school/SchoolMaterials.tsx';
import SchoolAttendance from './pages/school/SchoolAttendance.tsx';
import SchoolGrades from './pages/school/SchoolGrades.tsx';
import SchoolAnnouncements from './pages/school/SchoolAnnouncements.tsx';
import SchoolNotifications from './pages/school/SchoolNotifications.tsx';
import SchoolSettings from './pages/school/SchoolSettings.tsx';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard.tsx';
import TeacherClasses from './pages/teacher/TeacherClasses.tsx';
import TeacherMaterials from './pages/teacher/TeacherMaterials.tsx';
import TeacherCBT from './pages/teacher/TeacherCBT.tsx';
import CBTViewParticipants from './pages/teacher/CBTViewParticipants.tsx';
import ViewStudentAnswers from './pages/teacher/ViewStudentAnswers.tsx';
import ManualCorrection from './pages/teacher/ManualCorrection.tsx';
import TeacherAttendance from './pages/teacher/TeacherAttendance.tsx';
import ManageQuestions from './pages/teacher/ManageQuestions.tsx';
import TeacherGradebook from './pages/teacher/TeacherGradebook.tsx';

// Student Pages
import StudentHome from './pages/student/StudentHome.tsx';
import StudentCBT from './pages/student/StudentCBT.tsx';
import StudentGrades from './pages/student/StudentGrades.tsx';
import StudentClasses from './pages/student/StudentClasses.tsx';
import StudentMaterials from './pages/student/StudentMaterials.tsx';
import StudentSchedule from './pages/student/StudentSchedule.tsx';
import StudentAssignments from './pages/student/StudentAssignments.tsx';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard.tsx';
import ParentChildren from './pages/parent/ParentChildren.tsx';
import ParentGrades from './pages/parent/ParentGrades.tsx';
import ParentNotifications from './pages/parent/ParentNotifications.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
       
          {/* Super Admin Routes */}
          <Route path="/super-admin" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <SuperAdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="schools" element={<SchoolManagement />} />
            <Route path="users" element={<SuperAdminUsers />} />
            <Route path="system-settings" element={<SystemSettings />} />
            <Route path="reports" element={<SuperAdminReports />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* School Admin Routes */}
          <Route path="/school" element={
            <ProtectedRoute allowedRoles={['school_admin']}>
              <SchoolLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<SchoolDashboard />} />
            <Route path="users" element={<SchoolUsers />} />
            <Route path="classes" element={<SchoolClasses />} />
            <Route path="majors" element={<SchoolMajorManagement />} />
            <Route path="subjects" element={<SchoolSubjects />} />
            <Route path="class-subjects" element={<ClassSubjectsPage />} />
            <Route path="schedules" element={<SchoolSchedules />} />
            <Route path="cbt" element={<SchoolCBT />} />
            <Route path="assignments" element={<SchoolAssignments />} />
            <Route path="materials" element={<SchoolMaterials />} />
            <Route path="attendance" element={<SchoolAttendance />} />
            <Route path="grades" element={<SchoolGrades />} />
            <Route path="announcements" element={<SchoolAnnouncements />} />
            <Route path="notifications" element={<SchoolNotifications />} />
            <Route path="reports" element={<SchoolReports />} />
            <Route path="settings" element={<SchoolSettings />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="classes" element={<TeacherClasses />} />
            <Route path="materials" element={<TeacherMaterials />} />
            <Route path="assignments" element={<TeacherMaterials />} />
            <Route path="cbt" element={<TeacherCBT />} />
            <Route path="manage-questions" element={<ManageQuestions />} />
            <Route path="manage-questions/:id" element={<ManageQuestions />} />
            <Route path="cbt-participants" element={<CBTViewParticipants />} />
            <Route path="view-student-answers" element={<ViewStudentAnswers />} />
            <Route path="manual-correction" element={<ManualCorrection />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="gradebook" element={<TeacherGradebook />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Student Routes */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StudentHome />} />
            <Route path="classes" element={<StudentClasses />} />
            <Route path="materials" element={<StudentMaterials />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="cbt" element={<StudentCBT />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          
          {/* Parent Routes */}
          <Route path="/parent" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="children" element={<ParentChildren />} />
            <Route path="grades" element={<ParentGrades />} />
            <Route path="notifications" element={<ParentNotifications />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;