// // src/components/OTPVerify.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function OTPVerify() {
//   const [otp, setOtp] = useState('');
//   const email = localStorage.getItem('email');
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
//       localStorage.setItem('otp', otp);
//       alert('OTP verified');
//       navigate('/reset-password');
//     } catch (err) {
//       alert(err.response?.data?.message || 'OTP verification failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Verify OTP</h2>
//       <input value={otp} onChange={e => setOtp(e.target.value)} required placeholder="Enter OTP" />
//       <button type="submit">Verify</button>
//     </form>
//   );
// }

// export default OTPVerify;











// src/components/OTPVerify.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OTPVerify.css'; // Import custom CSS

function OTPVerify() {
  const [otp, setOtp] = useState('');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('otp', otp);
      alert('OTP verified');
      navigate('/reset-password');
    } catch (err) {
      alert(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="otpv-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="otpv-card p-4 rounded-4 shadow-lg glass-effect">
        <h2 className="otpv-title text-center mb-4">🔑 OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              maxLength={6}
              className="form-control otp-input"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
              placeholder="Enter 6-digit OTP"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success otp-button">
              Verify OTP
            </button>
          </div>
        </form>
        <p className="otpv-footer mt-3 text-center">Check your inbox for the OTP code</p>
      </div>
    </div>
  );
}

export default OTPVerify;
