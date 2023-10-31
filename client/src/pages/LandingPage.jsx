;import React, { useEffect } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import AuthService from '../utils/auth';  

function LandingPage() {

  useEffect(() => {
    document.title = 'EcoRewards';
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.loggedIn()) {
      navigate('/me');
    }
  }, [navigate]);

  const handleSuccessfulLogin = () => {
    navigate('/me');
  };

  const handleSuccessfulSignUp = () => {
    alert("Successfully registered! You can now log in.");
  };

  return (
    <div className="landing-page">
      <div className="log-in-form">        
        <LoginForm onLoginSuccess={handleSuccessfulLogin} />
      </div>
      <br />
      <div className="sign-up-form">        
        <SignUpForm onSignUpSuccess={handleSuccessfulSignUp} />
      </div>
    </div>
  );
}

export default LandingPage;
