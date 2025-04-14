import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DoctorRegistration from './components/DoctorRegistration';
import RequestAccess from './components/RequestAccess';
import ManageAccess from './components/ManageAccess';
import NavigationBar from './components/NavigationBar';
import FloatingChatButton from './components/FloatingChatButton';
import HomePage from './pages/HomePage';
import PainDiagnosisPage from './pages/PainDiagnosisPage';
import ExerciseVideosPage from './pages/ExerciseVideosPage';
import NutritionPage from './pages/NutritionPage';
import ChatPage from './pages/ChatPage';
import MedicationPage from './pages/MedicationPage';
import SymptomsPage from './pages/SymptomsPage';
import HealthProblemsPage from './pages/HealthProblemsPage';
import ContactPage from './pages/ContactPage';
import EmergencyContactPage from './pages/EmergencyContactPage';
import PersonalSpacePage from './pages/PersonalSpacePage';
import Appointments from './components/Appointment';
import MedicationTracker from './components/MedicationTracker';
import PainLevel from './components/PainLevel';
import AnomalyReport from './components/AnomalyReport';
import FileUpload from './components/Records';
import Login from './pages/login';
import Signup from './pages/signup';
import PrivateRoute from './pages/Protected';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorRoute from './components/DoctorRoute';
import DoctorFiles from './components/DoctorFiles';

const AppContent = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';
  const userType = localStorage.getItem('userType');

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {userType !== 'doctor' && <NavigationBar />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegistration />} />

          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorRoute><DoctorDashboard /></DoctorRoute>} />
          <Route path="/doctor/request-access" element={<DoctorRoute><RequestAccess /></DoctorRoute>} />
          <Route path="/doctor/files" element={<DoctorRoute><DoctorFiles /></DoctorRoute>} />

          {/* Protected Patient Routes */}
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/welcome" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/patient/manage-access" element={<PrivateRoute><ManageAccess /></PrivateRoute>} />
          <Route path="/pain-diagnosis" element={<PrivateRoute><PainDiagnosisPage /></PrivateRoute>} />
          <Route path="/exercise-videos" element={<PrivateRoute><ExerciseVideosPage /></PrivateRoute>} />
          <Route path="/nutrition" element={<PrivateRoute><NutritionPage /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="/medication" element={<PrivateRoute><MedicationPage /></PrivateRoute>} />
          <Route path="/symptoms" element={<PrivateRoute><SymptomsPage /></PrivateRoute>} />
          <Route path="/health-problems" element={<PrivateRoute><HealthProblemsPage /></PrivateRoute>} />
          <Route path="/contact-us" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
          <Route path="/emergency-contact" element={<PrivateRoute><EmergencyContactPage /></PrivateRoute>} />
          <Route path="/personal-space" element={<PrivateRoute><PersonalSpacePage /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/medication-tracker" element={<PrivateRoute><MedicationTracker /></PrivateRoute>} />
          <Route path="/pain-level" element={<PrivateRoute><PainLevel /></PrivateRoute>} />
          <Route path="/anomaly-report" element={<PrivateRoute><AnomalyReport /></PrivateRoute>} />
          <Route path="/records" element={<PrivateRoute><FileUpload /></PrivateRoute>} />
        </Routes>
      </main>
      {!isChatPage && userType !== 'doctor' && <FloatingChatButton />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;