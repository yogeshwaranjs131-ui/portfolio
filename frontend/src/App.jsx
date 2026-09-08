import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import LoginPage from './components/LoginPage.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef(null);

  const githubUrl = 'https://github.com/yogeshwaranjs131-ui';
  const linkedinUrl = 'https://www.linkedin.com/in/yogeshwaran-udayakumar-25b94b170';
  const profilePhotoUrl = '/my-photo.jpg';
  const resumeUrl = 'https://drive.google.com/file/d/1VDmoeLuQe1Skdop6Uzo4mrpXYTQVEz75/view?usp=sharing';
  const nsdcCertificateImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzhHCKU8uyjyCfIiyeYtJRLMN8QbPlN7kFqBhvJE2fCw&s=10';
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchProjects = useCallback(() => {
    setIsProjectsLoading(true);
    fetch(`${API_BASE_URL}/api/projects`, { signal: AbortSignal.timeout(5000) })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setDynamicProjects(Array.isArray(data) ? data : []);
        setIsProjectsLoading(false);
      })
      .catch(() => {
        console.warn('API connection failed, using fallback projects.');
        setIsProjectsLoading(false);
      });
  }, [API_BASE_URL]);

  const fetchExperiences = useCallback(() => {
    fetch(`${API_BASE_URL}/api/experiences`, { signal: AbortSignal.timeout(5000) })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch experiences');
        return res.json();
      })
      .then((data) => {
        setExperiences(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.warn('Failed to fetch experiences:', err);
      });
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchProjects();
    fetchExperiences();
  }, [fetchProjects, fetchExperiences]);

  const basename = window.location.pathname.includes('/my-portfolio') ? '/my-portfolio' : '';

  return (
    <Router basename={basename || undefined}>
      <Routes>
        <Route
          path="/"
          element={
            <PortfolioPage
              dynamicProjects={dynamicProjects}
              isProjectsLoading={isProjectsLoading}
              experiences={experiences}
              API_BASE_URL={API_BASE_URL}
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
              profilePhotoUrl={profilePhotoUrl}
              resumeUrl={resumeUrl}
              nsdcCertificateImageUrl={nsdcCertificateImageUrl}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              canvasRef={canvasRef}
            />
          }
        />
        <Route path="/login" element={<LoginPage API_BASE_URL={API_BASE_URL} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard
                API_BASE_URL={API_BASE_URL}
                projects={dynamicProjects}
                fetchProjects={fetchProjects}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;