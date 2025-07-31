// // src/components/ResetPassword.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function ResetPassword() {
//   const [password, setPassword] = useState('');
//   const email = localStorage.getItem('email');
//   const otp = localStorage.getItem('otp');
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/reset-password', {
//         email,
//         otp,
//         newPassword: password,
//       });
//       localStorage.removeItem('email');
//       localStorage.removeItem('otp');
//       alert('Password reset successful!');
//       navigate('/login');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Password reset failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Reset Password</h2>
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="New Password" />
//       <button type="submit">Reset</button>
//     </form>
//   );
// }

// export default ResetPassword;











// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Import custom styles

function ResetPassword() {
  const [password, setPassword] = useState('');
  const email = localStorage.getItem('email');
  const otp = localStorage.getItem('otp');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        otp,
        newPassword: password,
      });
      localStorage.removeItem('email');
      localStorage.removeItem('otp');
      alert('Password reset successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="rp-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="rp-card p-4 rounded-4 shadow-lg glass-effect">
        <h2 className="rp-title text-center mb-4">🔐 Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control rp-input"
              placeholder="Enter new password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-danger rp-button">
              Reset Password
            </button>
          </div>
        </form>
        <p className="rp-footer text-center mt-3">Make sure to choose a strong password</p>
      </div>
    </div>
  );
}

export default ResetPassword;


