




// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // const Login = () => {
// //   const [form, setForm] = useState({ email: '', password: '' });

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post(
// //         'https://quiz-genius-website.onrender.com/api/auth/login',
// //         form
// //       );
// //       localStorage.setItem('token', res.data.token);
// //       localStorage.setItem('role', res.data.user.role);

// //       if (res.data.user.role === 'admin') {
// //         window.location.href = '/admin';
// //       } else {
// //         window.location.href = '/dashboard';
// //       }
// //     } catch (err) {
// //       alert(err.response?.data?.message || 'Login failed');
// //     }
// //   };

// //   return (
// //     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
// //       <div
// //         className="card p-4 shadow-lg border-0"
// //         style={{
// //           width: '100%',
// //           maxWidth: '420px',
// //           background: 'rgba(255, 255, 255, 0.85)',
// //           backdropFilter: 'blur(8px)',
// //           borderRadius: '20px',
// //         }}
// //       >
// //         <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>

// //         <form onSubmit={handleSubmit}>
// //           <div className="form-floating mb-3">
// //             <input
// //               id="email"
// //               name="email"
// //               type="email"
// //               className="form-control rounded-4"
// //               placeholder="Email"
// //               onChange={handleChange}
// //               required
// //             />
// //             <label htmlFor="email">Email address</label>
// //           </div>

// //           <div className="form-floating mb-4">
// //             <input
// //               id="password"
// //               name="password"
// //               type="password"
// //               className="form-control rounded-4"
// //               placeholder="Password"
// //               onChange={handleChange}
// //               required
// //             />
// //             <label htmlFor="password">Password</label>
// //           </div>

// //           <button
// //             type="submit"
// //             className="btn btn-primary w-100 rounded-pill shadow-sm"
// //           >
// //             Login
// //           </button>
// //         </form>

// //         <p className="text-center mt-3">
// //           Don't have an account?{' '}
// //           <Link
// //             to="/signup"
// //             className="text-decoration-none fw-semibold text-success"
// //           >
// //             Signup here
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;







// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // const Login = () => {
// //   const [form, setForm] = useState({ email: '', password: '' });

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post(
// //         'http://localhost:5000/api/auth/login',
// //         form
// //       );
// //       localStorage.setItem('token', res.data.token);
// //       localStorage.setItem('role', res.data.user.role);

// //       if (res.data.user.role === 'admin') {
// //         window.location.href = '/admin';
// //       } else {
// //         window.location.href = '/dashboard';
// //       }
// //     } catch (err) {
// //       alert(err.response?.data?.message || 'Login failed');
// //     }
// //   };

// //   return (
// //     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
// //       <div
// //         className="card p-4 shadow-lg border-0"
// //         style={{
// //           width: '100%',
// //           maxWidth: '420px',
// //           background: 'rgba(255, 255, 255, 0.85)',
// //           backdropFilter: 'blur(8px)',
// //           borderRadius: '20px',
// //         }}
// //       >
// //         <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>

// //         <form onSubmit={handleSubmit}>
// //           <div className="form-floating mb-3">
// //             <input
// //               id="email"
// //               name="email"
// //               type="email"
// //               className="form-control rounded-4"
// //               placeholder="Email"
// //               onChange={handleChange}
// //               required
// //             />
// //             <label htmlFor="email">Email address</label>
// //           </div>

// //           <div className="form-floating mb-4">
// //             <input
// //               id="password"
// //               name="password"
// //               type="password"
// //               className="form-control rounded-4"
// //               placeholder="Password"
// //               onChange={handleChange}
// //               required
// //             />
// //             <label htmlFor="password">Password</label>
// //           </div>

// //           <button
// //             type="submit"
// //             className="btn btn-primary w-100 rounded-pill shadow-sm"
// //           >
// //             Login
// //           </button>
// //         </form>

// //         <p className="text-center mt-3">
// //           Don't have an account?{' '}
// //           <Link
// //             to="/signup"
// //             className="text-decoration-none fw-semibold text-success"
// //           >
// //             Signup here
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// // src/components/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('role', res.data.user.role);

//       if (res.data.user.role === 'admin') {
//         window.location.href = '/admin';
//       } else {
//         window.location.href = '/dashboard';
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '420px', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)', borderRadius: '20px' }}>
//         <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>

//         <form onSubmit={handleSubmit}>
//           <div className="form-floating mb-3">
//             <input id="email" name="email" type="email" className="form-control rounded-4" placeholder="Email" onChange={handleChange} required />
//             <label htmlFor="email">Email address</label>
//           </div>

//           <div className="form-floating mb-4">
//             <input id="password" name="password" type="password" className="form-control rounded-4" placeholder="Password" onChange={handleChange} required />
//             <label htmlFor="password">Password</label>
//           </div>

//           <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm">Login</button>

//           <p className="text-center mt-2">
//             <Link to="/forgot-password" className="text-decoration-none text-danger">
//               Forgot Password?
//             </Link>
//           </p>
//         </form>

//         <p className="text-center mt-3">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-decoration-none fw-semibold text-success">
//             Signup here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'; // Import custom styles

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      if (res.data.user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card p-4 rounded-4 shadow-lg glass-effect">
        <h2 className="text-center mb-4 fw-bold login-title">🚀 Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="email"
              name="email"
              type="email"
              className="form-control login-input"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              id="password"
              name="password"
              type="password"
              className="form-control login-input"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 login-btn shadow-sm">
            Login
          </button>

          <p className="text-center mt-3">
            <Link to="/forgot-password" className="login-link text-warning">
              Forgot Password?
            </Link>
          </p>
        </form>

        <p className="text-center mt-4 login-footer">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-decoration-none fw-semibold text-success">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
