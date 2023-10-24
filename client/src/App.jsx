import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CommunityBoard from './pages/CommunityBoard';
import Footer from './pages/Footer';

function App() {
  const isAuthenticated = false; // Replace with actual authentication check

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<CommunityBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
}

export default App;

