// // src/components/ForgotPassword.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
//       localStorage.setItem('email', email);
//       alert('OTP sent to your email!');
//       navigate('/verify-otp');
//     } catch (err) {
//       console.error('OTP error:', err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Error sending OTP');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Forgot Password</h2>
//       <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter Email" />
//       <button type="submit">Send OTP</button>
//     </form>
//   );
// }

// export default ForgotPassword;



// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Custom styles

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      localStorage.setItem('email', email);
      alert('OTP sent to your email!');
      navigate('/verify-otp');
    } catch (err) {
      console.error('OTP error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error sending OTP');
    }
  };

  return (
    <div className="fp-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="fp-card shadow-lg p-4 rounded-4 glass-effect">
        <h2 className="fp-title text-center mb-4">🔐 Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control fp-input"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary fp-button">
              Send OTP
            </button>
          </div>
        </form>
        <p className="fp-footer mt-3 text-center">We'll send an OTP to reset your password</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
