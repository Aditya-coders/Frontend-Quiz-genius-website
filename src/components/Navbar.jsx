
// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Navbar.css"; // Custom scoped styles

// const Navbar = () => {
//   const token = localStorage.getItem("token");

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark navbar-genius shadow-sm">
//       <div className="container-fluid px-4 py-2">
//         <Link className="navbar-brand navbar-genius-brand" to="/">
//           <span className="text-success">Quiz</span>
//           <span className="text-success">Genius</span>
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto navbar-genius-menu">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>

//             {token ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/dashboard">Dashboard</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/my-quizzes">My Quizzes</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/admin">Admin</Link>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     className="btn btn-outline-light navbar-genius-logout"
//                     onClick={() => {
//                       localStorage.removeItem("token");
//                       window.location.href = "/";
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">Admin </Link>
//                 </li>
//                 {/* <li className="nav-item">
//                   <Link className="nav-link" to="/signup">Signup</Link>
//                 </li> */}
                


//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-genius shadow-sm">
      <div className="container-fluid px-4 py-2">
        <Link className="navbar-brand navbar-genius-brand" to="/">
          <span className="text-success">Quiz</span>
          <span className="text-success">Genius</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto navbar-genius-menu">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-quizzes">My Quizzes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light navbar-genius-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
