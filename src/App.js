
// import React from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import QuizPage from './pages/QuizPage';
// import Result from './pages/Result';
// import Navbar from './components/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       {/* Wrapper for padding and layout */}
//       <div className="container mt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/quiz/:id" element={<QuizPage />} />
//           <Route path="/result" element={<Result />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;




// import React from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import QuizPage from './pages/QuizPage';
// import Result from './pages/Result';
// import MyQuizzes from './pages/MyQuizzes'; // ✅ Imported
// import Admin from './pages/Admin'
// import Navbar from './components/Navbar';
// import Footer from './pages/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import TermsAndPolicy from "./pages/TermsAndPolicy";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div className="container-fluid mt-2">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/quiz/:id" element={<QuizPage />} />
//           <Route path="/result" element={<Result />} />
//           <Route path="/my-quizzes" element={<MyQuizzes />} /> {/* ✅ New Route */}
//           <Route path="/admin" element={<Admin />} /> 
//           <Route path="/terms" element={<TermsAndPolicy />} />
//         </Routes>
//         <Footer/>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;




// import React from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import QuizPage from './pages/QuizPage';
// import Result from './pages/Result';
// import MyQuizzes from './pages/MyQuizzes';
// import Admin from './pages/Admin';
// import Navbar from './components/Navbar';
// import Footer from './pages/Footer';
// import TermsAndPolicy from "./pages/TermsAndPolicy";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // 👈 Add this if not added

// const App = () => {
//   return (
//     <div className="app-container">
//       <BrowserRouter>
//         <Navbar />
//         <div className="content-wrap container-fluid mt-2">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/quiz/:id" element={<QuizPage />} />
//             <Route path="/result" element={<Result />} />
//             <Route path="/my-quizzes" element={<MyQuizzes />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/terms" element={<TermsAndPolicy />} />
//           </Routes>
//         </div>
//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;











// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import OTPVerify from './components/OTPVerify';
// import ResetPassword from './components/ResetPassword';
// import Dashboard from './components/Dashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify-otp" element={<OTPVerify />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import Result from './pages/Result';
import MyQuizzes from './pages/MyQuizzes';
import Admin from './pages/Admin';
import TermsAndPolicy from './pages/TermsAndPolicy';

// Auth & Password
import ForgotPassword from './pages/ForgotPassword';
import OTPVerify from './pages/OTPVerify';
import ResetPassword from './pages/ResetPassword';

// Layout
import Navbar from './components/Navbar';
import Footer from './pages/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="content-wrap container-fluid mt-2">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/result" element={<Result />} />
            <Route path="/my-quizzes" element={<MyQuizzes />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/terms" element={<TermsAndPolicy />} />

            {/* Auth / OTP Flow */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<OTPVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
