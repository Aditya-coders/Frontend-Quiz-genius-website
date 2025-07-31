

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizCard from '../components/QuizCard';
import './Home.css'; // ⬅️ Make sure this file is present

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/api/quizzes")
        .then((res) => {
          const visibleQuizzes = res.data.filter((q) => q.visible);
          setQuizzes(visibleQuizzes);
        })
        .catch((err) => console.error(err));
    };

    fetchData();

    const handleStorageChange = (e) => {
      if (e.key === "quizVisibilityChanged") {
        fetchData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="home-genius-container">
      <div className="home-genius-content container py-2">
        {/* <h1 className="home-genius-heading text-center mb-3">
          Welcome to the Quiz Hub
        </h1> */}
        <h1 className="home-genius-heading animated-heading text-center mb-3">
  Welcome to the <span>Quiz Hub</span>🚀
</h1>


        {quizzes.length === 0 ? (
          <p className="text-center text-light">🤖No quizzes available🤖</p>
        ) : (
          <div className="row justify-content-center g-4">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="col-sm-10 col-md-6 col-lg-4">
                <QuizCard quiz={quiz} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
 









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import QuizCard from '../components/QuizCard';
// import './Home.css'; // ⬅️ Make sure this file is present

// const Home = () => {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     const fetchData = () => {
//       axios
//         .get("https://quiz-genius-website.onrender.com/api/quizzes")
//         .then((res) => {
//           const visibleQuizzes = res.data.filter((q) => q.visible);
//           setQuizzes(visibleQuizzes);
//         })
//         .catch((err) => console.error(err));
//     };

//     fetchData();

//     const handleStorageChange = (e) => {
//       if (e.key === "quizVisibilityChanged") {
//         fetchData();
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <div className="home-genius-container">
//       <div className="home-genius-content container py-5">
//         <h1 className="home-genius-heading text-center mb-5">
//           Available Quizzes
//         </h1>

//         {quizzes.length === 0 ? (
//           <p className="text-center text-muted">No quizzes available.</p>
//         ) : (
//           <div className="row justify-content-center g-4">
//             {quizzes.map((quiz) => (
//               <div key={quiz._id} className="col-sm-10 col-md-6 col-lg-4">
//                 <QuizCard quiz={quiz} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
 