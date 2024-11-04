import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // API URL to fetch users
  const apiUrl = 'https://contentapi-m9vl.onrender.com';
  const staticPassword = 'test123';    // static password on for admin user only


  //  handles with API request
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      // Fetching users from the API
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error('Failed to fetch users:', response.statusText);
        throw new Error('Failed to fetch users');
      }
      const users = await response.json();

      // Got the first user for admin access
      const adminUser = users[0];

      // Checked if the entered email matches the admin user's email
      const isAdminUser = adminUser.personalInfo.email.toLowerCase() === email.toLowerCase();

      // Only allow login if the email matches the admin user's email and the static password is correct
      if (isAdminUser && password === staticPassword) {

        // Store a token in localStorage
        localStorage.setItem('authToken', 'your-session-token');

        // Redirect to Dashboard
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid email and password ');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };

  // handling loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="login-container">
      {loading ? (

        // Logo loader Section
        <div className="loader">
          <img src="./logo.svg" alt="Loading..." />
        </div>
      ) : (
        <>
          {/* Image section */}
          <div className="image-section">
            <img src="./images/logo.svg" alt="logo" className="logo" />
            <div className="image">
              <img src="./images/login.png" alt="Login" />
            </div>
          </div>

          {/* Form section */}
          <div className="form-section">
            <h2>Welcome!</h2>
            <p>Enter details to login.</p>
            

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>} 

              <div className="form-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="forgot-password">
                <a href="#">FORGOT PASSWORD?</a>
              </div>

              <button type="submit" className="login-button">LOG IN</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
