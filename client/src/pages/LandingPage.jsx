
const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password" />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="signupEmail">Email</label>
            <input type="email" id="signupEmail" name="signupEmail" placeholder="Your email" />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <input type="password" id="signupPassword" name="signupPassword" placeholder="Your password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
