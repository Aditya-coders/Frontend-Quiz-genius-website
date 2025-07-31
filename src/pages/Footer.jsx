
// // src/components/Footer.jsx
// import React from "react";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer className="quiz-footer-container bg-black text-white py-4">
//       <div className="container">
//         <div className="row text-center text-md-start">
//           {/* Brand Section */}
//           <div className="col-md-4 mb-4">
//             <h5 className="quiz-footer-title">QuizGenius</h5>
//             <p className="quiz-footer-description">
//               Sharpen your mind. Test your knowledge. Master every quiz.
//             </p>
//             <p className="quiz-footer-keywords">
//               #LearnFast #BrainBoost #ChallengeYourself #DailyQuiz #SmartLearning
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="col-md-4 mb-4">
//             <h5 className="quiz-footer-title">Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="/" className="quiz-footer-link text-light linkkk" onClick={(e) => e.preventDefault()}>Home</a></li>
//               <li><a href="/" className="quiz-footer-link text-light linkkk" onClick={(e) => e.preventDefault()}>Support</a></li>
//               <li><a href="/" className="quiz-footer-link text-light linkkk" onClick={(e) => e.preventDefault()}>Privacy/Policy</a></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="col-md-4 mb-4">
//             <h5 className="quiz-footer-title">Contact Us</h5>
//             <p className="mb-1">📧 kumaraditya55513@gmail.com</p>
//             <p className="mb-1">📞 +91 7061 XXXX XX</p>
//             <p className="mb-0">📍 India</p>
//           </div>
//         </div>

//         <hr className="quiz-footer-divider" />
//         <p className="text-center mt-3 mb-0 small">
//           &copy; {new Date().getFullYear()} <strong>QuizGenius</strong>. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container quiz-footer bg-dark text-light py-5">
      <div className="container">
        <div className="row gy-4 text-center text-md-start">
          {/* Brand / About */}
          <div className="col-md-4">
            <h4 className="footer-title">🎓 QuizGenius</h4>
            <p className="footer-desc">
              Explore, learn, and challenge yourself with curated quizzes for
              every curious mind.
            </p>
            <div className="footer-tags">
              #LearnSmarter #QuizMaster #LevelUp #BrainChallenge #QuizDaily
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/terms">Support</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Policies</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="footer-title">Contact</h5>
            <p>📧 support@quizgenius.com</p>
            <p>📞 +91 7061 XXX XXX</p>
            <p>📍 India</p>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} <strong>QuizGenius</strong>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
