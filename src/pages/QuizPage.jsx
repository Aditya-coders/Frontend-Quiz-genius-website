


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizPage.css";
import Swal from "sweetalert2";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [start, setStart] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [switchCount, setSwitchCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quizzes/${id}`)
      .then((res) => {
        const shuffledQuestions = shuffleArray(res.data.questions);
        setQuiz({ ...res.data, questions: shuffledQuestions });
        setTimeLeft(res.data.timeLimit * 60);
      })
      .catch((err) => console.error(err));
  }, [id]);



useEffect(() => {
  if (!start || submitted) return;

  const handleVisibilityChange = () => {
    if (document.hidden) triggerWarning();
  };

  const handleBlur = () => {
    triggerWarning();
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Customize this threshold as per your quiz's expected fullscreen size
    if (width < 800 || height < 500) {
      triggerWarning();
    }
  };

  const triggerWarning = () => {
    setSwitchCount((prev) => {
      const newCount = prev + 1;
      Swal.fire({
        icon: "warning",
        title: "⚠️ Warning",
        html: "Do not switch tabs, resize window, or open another app!<br>The quiz will be <strong>auto-submitted</strong>.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });

      if (newCount >= 10) {
        handleSubmit(true); // Auto-submit on 6th warning
      }

      return newCount;
    });
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleBlur);
  window.addEventListener("resize", handleResize);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("blur", handleBlur);
    window.removeEventListener("resize", handleResize);
  };
}, [start, submitted]);




  useEffect(() => {
    if (!start || submitted || timeLeft === null) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [start, timeLeft, submitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid Gmail address");
      return;
    }
    setError("");
    setStart(true);
  };

  const handleAnswer = (qIndex, selectedOption) => {
    setAnswers({ ...answers, [qIndex]: selectedOption });
  };

  const isAllAnswered = () => {
    return quiz.questions.every((_, index) => answers[index] !== undefined);
  };

  const handleSubmit = async (forceSubmit = false) => {
    if (submitted) return;
    if (!forceSubmit && !isAllAnswered()) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setSubmitted(true);

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score += 1;
      }
    });

    try {
      await axios.post("http://localhost:5000/api/results/save", {
        name,
        email,
        score,
        total: quiz.questions.length,
        quizId: quiz._id,
      });
    } catch (err) {
      console.error("Error saving result", err);
    }

    navigate("/result", {
      state: {
        score,
        total: quiz.questions.length,
        name,
        email,
        title: quiz.title,
      },
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!quiz)
    return <p className="text-center mt-5 fs-5 text-muted">Loading quiz...</p>;

  return (
    <div className="container quiz-container my-5">
      <h2 className="text-center mb-4 quiz-title">{quiz.title}</h2>

      {!start ? (
        <div
          className="card p-4 shadow-sm quiz-start-card mx-auto"
          style={{ maxWidth: "450px" }}
        >
          <h5 className="text-center mb-4 fw-semibold text-primary">
            Enter your details to start
          </h5>
          <input
            type="text"
            className="form-control mb-3 rounded-3 border-primary"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitted}
          />
          <input
            type="email"
            className="form-control mb-3 rounded-3 border-primary"
            placeholder="Enter a valid Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted}
          />
          {error && (
            <p className="text-danger text-center small mb-3">{error}</p>
          )}
          <button
            className="btn btn-primary w-100 fw-semibold shadow-sm"
            onClick={handleStart}
            disabled={submitted}
          >
            Start Quiz
          </button>
        </div>
      ) : submitted ? (
        <p className="text-center mt-5 fs-5 text-secondary">Submitting...</p>
      ) : (
        <div className="quiz-questions">
          <div className="text-end mb-3">
            <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
              ⏱ Time Left: {formatTime(timeLeft)}
            </span>
          </div>

          {quiz.questions[currentQuestionIndex] && (
            <div className="mb-4 p-4 quiz-question shadow rounded-4 bg-white border border-2 border-primary">
              <p className="fw-bold fs-5 mb-3">
                Q{currentQuestionIndex + 1}:{" "}
                {quiz.questions[currentQuestionIndex].questionText}
              </p>
              <div>
                {quiz.questions[currentQuestionIndex].options.map((opt, j) => (
                  <div key={j} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={opt}
                      checked={answers[currentQuestionIndex] === opt}
                      onChange={() => handleAnswer(currentQuestionIndex, opt)}
                      id={`q${currentQuestionIndex}_opt${j}`}
                    />
                    <label
                      className="form-check-label fs-6"
                      htmlFor={`q${currentQuestionIndex}_opt${j}`}
                    >
                      {opt}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ⬅ Previous
            </button>

            <button
              className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
              onClick={handleNext}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
            >
              Next ➡
            </button>
          </div>

          {error && (
            <p className="text-danger text-center small mt-2">{error}</p>
          )}

          {currentQuestionIndex === quiz.questions.length - 1 && (
            <button
              className="btn btn-success w-100 fw-semibold py-3 rounded-4 shadow-sm"
              onClick={() => handleSubmit(false)}
              disabled={!isAllAnswered()}
            >
              Submit Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;










// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./QuizPage.css";
// import Swal from "sweetalert2";

// const QuizPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [start, setStart] = useState(false);
//   const [error, setError] = useState("");
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [switchCount, setSwitchCount] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   useEffect(() => {
//     axios
//       .get(`https://quiz-genius-website.onrender.com/api/quizzes/${id}`)
//       .then((res) => {
//         const shuffledQuestions = shuffleArray(res.data.questions);
//         setQuiz({ ...res.data, questions: shuffledQuestions });
//         setTimeLeft(res.data.timeLimit * 60);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);



// useEffect(() => {
//   if (!start || submitted) return;

//   const handleVisibilityChange = () => {
//     if (document.hidden) triggerWarning();
//   };

//   const handleBlur = () => {
//     triggerWarning();
//   };

//   const handleResize = () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     // Customize this threshold as per your quiz's expected fullscreen size
//     if (width < 800 || height < 500) {
//       triggerWarning();
//     }
//   };

//   const triggerWarning = () => {
//     setSwitchCount((prev) => {
//       const newCount = prev + 1;
//       Swal.fire({
//         icon: "warning",
//         title: "⚠️ Warning",
//         html: "Do not switch tabs, resize window, or open another app!<br>The quiz will be <strong>auto-submitted</strong>.",
//         confirmButtonColor: "#d33",
//         confirmButtonText: "OK",
//       });

//       if (newCount >= 10) {
//         handleSubmit(true); // Auto-submit on 6th warning
//       }

//       return newCount;
//     });
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);
//   window.addEventListener("blur", handleBlur);
//   window.addEventListener("resize", handleResize);

//   return () => {
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//     window.removeEventListener("blur", handleBlur);
//     window.removeEventListener("resize", handleResize);
//   };
// }, [start, submitted]);




//   useEffect(() => {
//     if (!start || submitted || timeLeft === null) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [start, timeLeft, submitted]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleStart = () => {
//     if (!name.trim()) {
//       setError("Name is required");
//       return;
//     }
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     if (!emailRegex.test(email)) {
//       setError("Enter a valid Gmail address");
//       return;
//     }
//     setError("");
//     setStart(true);
//   };

//   const handleAnswer = (qIndex, selectedOption) => {
//     setAnswers({ ...answers, [qIndex]: selectedOption });
//   };

//   const isAllAnswered = () => {
//     return quiz.questions.every((_, index) => answers[index] !== undefined);
//   };

//   const handleSubmit = async (forceSubmit = false) => {
//     if (submitted) return;
//     if (!forceSubmit && !isAllAnswered()) {
//       setError("Please answer all questions before submitting.");
//       return;
//     }

//     setSubmitted(true);

//     let score = 0;
//     quiz.questions.forEach((q, index) => {
//       if (answers[index] === q.correctAnswer) {
//         score += 1;
//       }
//     });

//     try {
//       await axios.post("https://quiz-genius-website.onrender.com/api/results/save", {
//         name,
//         email,
//         score,
//         total: quiz.questions.length,
//         quizId: quiz._id,
//       });
//     } catch (err) {
//       console.error("Error saving result", err);
//     }

//     navigate("/result", {
//       state: {
//         score,
//         total: quiz.questions.length,
//         name,
//         email,
//         title: quiz.title,
//       },
//     });
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   if (!quiz)
//     return <p className="text-center mt-5 fs-5 text-muted">Loading quiz...</p>;

//   return (
//     <div className="container quiz-container my-5">
//       <h2 className="text-center mb-4 quiz-title">{quiz.title}</h2>

//       {!start ? (
//         <div
//           className="card p-4 shadow-sm quiz-start-card mx-auto"
//           style={{ maxWidth: "450px" }}
//         >
//           <h5 className="text-center mb-4 fw-semibold text-primary">
//             Enter your details to start
//           </h5>
//           <input
//             type="text"
//             className="form-control mb-3 rounded-3 border-primary"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             disabled={submitted}
//           />
//           <input
//             type="email"
//             className="form-control mb-3 rounded-3 border-primary"
//             placeholder="Enter a valid Gmail"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={submitted}
//           />
//           {error && (
//             <p className="text-danger text-center small mb-3">{error}</p>
//           )}
//           <button
//             className="btn btn-primary w-100 fw-semibold shadow-sm"
//             onClick={handleStart}
//             disabled={submitted}
//           >
//             Start Quiz
//           </button>
//         </div>
//       ) : submitted ? (
//         <p className="text-center mt-5 fs-5 text-secondary">Submitting...</p>
//       ) : (
//         <div className="quiz-questions">
//           <div className="text-end mb-3">
//             <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
//               ⏱ Time Left: {formatTime(timeLeft)}
//             </span>
//           </div>

//           {quiz.questions[currentQuestionIndex] && (
//             <div className="mb-4 p-4 quiz-question shadow rounded-4 bg-white border border-2 border-primary">
//               <p className="fw-bold fs-5 mb-3">
//                 Q{currentQuestionIndex + 1}:{" "}
//                 {quiz.questions[currentQuestionIndex].questionText}
//               </p>
//               <div>
//                 {quiz.questions[currentQuestionIndex].options.map((opt, j) => (
//                   <div key={j} className="form-check mb-2">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name={`question-${currentQuestionIndex}`}
//                       value={opt}
//                       checked={answers[currentQuestionIndex] === opt}
//                       onChange={() => handleAnswer(currentQuestionIndex, opt)}
//                       id={`q${currentQuestionIndex}_opt${j}`}
//                     />
//                     <label
//                       className="form-check-label fs-6"
//                       htmlFor={`q${currentQuestionIndex}_opt${j}`}
//                     >
//                       {opt}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="d-flex justify-content-between mb-3">
//             <button
//               className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//             >
//               ⬅ Previous
//             </button>

//             <button
//               className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
//               onClick={handleNext}
//               disabled={currentQuestionIndex === quiz.questions.length - 1}
//             >
//               Next ➡
//             </button>
//           </div>

//           {error && (
//             <p className="text-danger text-center small mt-2">{error}</p>
//           )}

//           {currentQuestionIndex === quiz.questions.length - 1 && (
//             <button
//               className="btn btn-success w-100 fw-semibold py-3 rounded-4 shadow-sm"
//               onClick={() => handleSubmit(false)}
//               disabled={!isAllAnswered()}
//             >
//               Submit Quiz
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;







