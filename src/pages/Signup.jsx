

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // const Signup = () => {
// //   const [form, setForm] = useState({ name: '', email: '', password: '' });

// //   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('https://quiz-genius-website.onrender.com/api/auth/signup', form);
// //       alert('Signup successful! Please log in.');
// //       window.location.href = '/login';
// //     } catch (err) {
// //       alert('Signup failed');
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
// //         <h3 className="text-center mb-4 fw-bold text-success">Create Account</h3>

// //         <form onSubmit={handleSubmit}>
// //           <div className="form-floating mb-3">
// //             <input
// //               id="name"
// //               name="name"
// //               type="text"
// //               className="form-control rounded-4"
// //               placeholder="Your name"
// //               onChange={handleChange}
// //               required
// //             />
// //             <label htmlFor="name">Full Name</label>
// //           </div>

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

// //           <button type="submit" className="btn btn-success w-100 rounded-pill shadow-sm">
// //             Sign Up
// //           </button>
// //         </form>

// //         <p className="text-center mt-3">
// //           Already have an account?{' '}
// //           <Link to="/login" className="text-decoration-none fw-semibold text-primary">
// //             Login here
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;









// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', form);
//       alert('Signup successful! Please log in.');
//       window.location.href = '/login';
//     } catch (err) {
//       alert('Signup failed');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <div
//         className="card p-4 shadow-lg border-0"
//         style={{
//           width: '100%',
//           maxWidth: '420px',
//           background: 'rgba(255, 255, 255, 0.85)',
//           backdropFilter: 'blur(8px)',
//           borderRadius: '20px',
//         }}
//       >
//         <h3 className="text-center mb-4 fw-bold text-success">Create Account</h3>

//         <form onSubmit={handleSubmit}>
//           <div className="form-floating mb-3">
//             <input
//               id="name"
//               name="name"
//               type="text"
//               className="form-control rounded-4"
//               placeholder="Your name"
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="name">Full Name</label>
//           </div>

//           <div className="form-floating mb-3">
//             <input
//               id="email"
//               name="email"
//               type="email"
//               className="form-control rounded-4"
//               placeholder="Email"
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="email">Email address</label>
//           </div>

//           <div className="form-floating mb-4">
//             <input
//               id="password"
//               name="password"
//               type="password"
//               className="form-control rounded-4"
//               placeholder="Password"
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="password">Password</label>
//           </div>

//           <button type="submit" className="btn btn-success w-100 rounded-pill shadow-sm">
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center mt-3">
//           Already have an account?{' '}
//           <Link to="/login" className="text-decoration-none fw-semibold text-primary">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;





// // src/components/Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', form);
//       alert('Signup successful! Please log in.');
//       window.location.href = '/login';
//     } catch (err) {
//       alert('Signup failed');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '420px', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)', borderRadius: '20px' }}>
//         <h3 className="text-center mb-4 fw-bold text-success">Create Account</h3>

//         <form onSubmit={handleSubmit}>
//           <div className="form-floating mb-3">
//             <input id="name" name="name" type="text" className="form-control rounded-4" placeholder="Your name" onChange={handleChange} required />
//             <label htmlFor="name">Full Name</label>
//           </div>

//           <div className="form-floating mb-3">
//             <input id="email" name="email" type="email" className="form-control rounded-4" placeholder="Email" onChange={handleChange} required />
//             <label htmlFor="email">Email address</label>
//           </div>

//           <div className="form-floating mb-4">
//             <input id="password" name="password" type="password" className="form-control rounded-4" placeholder="Password" onChange={handleChange} required />
//             <label htmlFor="password">Password</label>
//           </div>

//           <button type="submit" className="btn btn-success w-100 rounded-pill shadow-sm">
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center mt-3">
//           Already have an account?{' '}
//           <Link to="/login" className="text-decoration-none fw-semibold text-primary">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import custom styles

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      alert('Signup successful! Please log in.');
      window.location.href = '/login';
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="sg-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="sg-card p-4 shadow-lg rounded-4">
        <h3 className="sg-title text-center mb-4">🚀 Create Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="name"
              name="name"
              type="text"
              className="form-control sg-input"
              placeholder="Your name"
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="email"
              name="email"
              type="email"
              className="form-control sg-input"
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
              className="form-control sg-input"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-success w-100 sg-button">
            Sign Up
          </button>
        </form>

        <p className="sg-footer text-center mt-3">
          Already have an account?{' '}
          <Link to="/login" className="sg-link-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
