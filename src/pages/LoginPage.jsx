import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
   
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1 style={{ textAlign: 'center', color: '#FF5722', fontSize: '2.5rem', fontWeight: 'bold' }}>🔥 DevTinder</h1>
          <p style={{ textAlign: 'center', color: '#757575', marginBottom: '1.5rem' }}>Connect. Collaborate. Code.</p>
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              style={{
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                fontSize: '1rem',
              }}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              style={{
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '20px',
                fontSize: '1rem',
              }}
            />
          </div>
          <button
            type="submit"
            className="login-button"
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#E64A19')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF5722')}
          >
            🚀 Login
          </button>
          <div className="extra-links" style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: '#757575' }}>
              New to DevTinder? <a href="/signup" className="link" style={{ color: '#FF5722', textDecoration: 'none' }}>Create an account</a>
            </p>
            <p>
              <a href="/forgot-password" className="link" style={{ color: '#FF5722', textDecoration: 'none' }}>Forgot your password?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
