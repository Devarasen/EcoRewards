// import '../styles/LandingPage.css';

// function LandingPage () {
//   return (
//     <div className="landing-page">
//       <div className="log-in-form">
//         <h2>Log In</h2>
//         <form>
//           <div className="form-group">
//             <label htmlFor="email">Email : </label>
//             <input type="email" id="email" name="email" placeholder="Your email" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password : </label>
//             <input type="password" id="password" name="password" placeholder="Your password" />
//           </div>
//           <button type="submit">Log In</button>
//         </form>
//       </div>
//       <div className="sign-up-form">
//         <h2>Sign Up</h2>
//         <form>
//           <div className="form-group">
//             <label htmlFor="signupEmail">Email : </label>
//             <input type="email" id="signupEmail" name="signupEmail" placeholder="Your email" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="signupPassword">Password : </label>
//             <input type="password" id="signupPassword" name="signupPassword" placeholder="Your password" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password : </label>
//             <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" />
//           </div>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

import React from 'react';
import '../styles/LandingPage.css';
import { useNavigation } from 'react-router-dom';
import Auth from '../utils/auth';

function LandingPage() {
  const navigate = useNavigation();

  const handleLoginLanding = async (event) => {
    event.preventDefault();

    // Get values from the form
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Authentication logic here. Assuming Auth has a login method for demonstration purposes.
    const isAuthenticated = await Auth.login(email, password);

    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      // Handle login failure (e.g., show an error message)
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="landing-page">
      <div className="log-in-form">
        <h2>Log In</h2>
        <form onSubmit={handleLoginLanding}>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input type="email" id="email" name="email" placeholder="Your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input type="password" id="password" name="password" placeholder="Your password" required />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="signupEmail">Email : </label>
            <input type="email" id="signupEmail" name="signupEmail" placeholder="Your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password : </label>
            <input type="password" id="signupPassword" name="signupPassword" placeholder="Your password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password : </label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
