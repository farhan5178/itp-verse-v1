import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/common/AuthModal';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UniversityFinderPage from './pages/UniversityFinderPage';
import UniversityDetailsPage from './pages/UniversityDetailsPage';
import MockTest from './pages/MockTest';
import Results from './pages/Results';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-dark-900 text-ink dark:text-dark-text transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/university-finder" element={<UniversityFinderPage />} />
              <Route path="/university-details/:id" element={<UniversityDetailsPage />} />
              <Route path="/mock-test" element={<MockTest />} />
              <Route path="/results" element={<Results />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
