
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [quiz, setQuiz] = useState({
//     title: "",
//     questions: [],
//     timeLimit: 1,
//   });

//   const [quizzes, setQuizzes] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const res = await axios.get("https://quiz-genius-website.onrender.com/api/quizzes");
//       setQuizzes(res.data);
//     } catch (err) {
//       console.error("Error fetching quizzes:", err);
//     }
//   };

//   const handleTitleChange = (e) => setQuiz({ ...quiz, title: e.target.value });

//   const handleTimeChange = (e) =>
//     setQuiz({ ...quiz, timeLimit: Number(e.target.value) });

//   const addQuestion = () => {
//     setQuiz({
//       ...quiz,
//       questions: [
//         ...quiz.questions,
//         { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
//       ],
//     });
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updated = [...quiz.questions];
//     updated[index][field] = value;
//     setQuiz({ ...quiz, questions: updated });
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const updated = [...quiz.questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuiz({ ...quiz, questions: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");

//       if (editingId) {
//         await axios.put(
//           `https://quiz-genius-website.onrender.com/api/quizzes/${editingId}`,
//           quiz,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         alert("Quiz updated!");
//       } else {
//         await axios.post(
//           "https://quiz-genius-website.onrender.com/api/quizzes",
//           {
//             ...quiz,
//             createdBy: localStorage.getItem("userId"),
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         alert("Quiz created!");
//       }

//       setQuiz({ title: "", questions: [], timeLimit: 1 });
//       setEditingId(null);
//       fetchQuizzes();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving quiz");
//     }
//   };

//   const handleEdit = (quiz) => {
//     setQuiz({
//       title: quiz.title,
//       timeLimit: quiz.timeLimit || 1,
//       questions: quiz.questions,
//     });
//     setEditingId(quiz._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this quiz?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`https://quiz-genius-website.onrender.com/api/quizzes/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchQuizzes();
//       alert("Quiz deleted successfully");
//     } catch (err) {
//       console.error("Delete error:", err.response?.data || err);
//       alert(err.response?.data?.message || "Failed to delete quiz");
//     }
//   };

//   const toggleVisibility = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://quiz-genius-website.onrender.com/api/quizzes/toggle/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       fetchQuizzes();
//       localStorage.setItem("quizVisibilityChanged", Date.now());
//     } catch (err) {
//       console.error("Toggle error:", err.response?.data || err);
//       alert("Failed to toggle quiz visibility");
//     }
//   };

//   return (
//     <div className="dashboard-wrapper px-2 px-md-4 py-4">
//       <div className="dashboard-inner mx-auto">
//         <h3 className="dashboard-title mb-4">
//           {editingId ? "✏️ Edit Quiz" : "📝 Create Quiz"}
//         </h3>

//         {role === "admin" && (
//           <div className="alert alert-warning">
//             🔒 Admins are not allowed to create or update quizzes.
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <input
//             className="form-control mb-3"
//             placeholder="Quiz Title"
//             value={quiz.title}
//             onChange={handleTitleChange}
//             required
//             disabled={role === "admin"}
//           />

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Time Limit (in minutes)"
//             value={quiz.timeLimit}
//             onChange={handleTimeChange}
//             min={1}
//             required
//           />

//           {quiz.questions.map((q, i) => (
//             <div key={i} className="dashboard-question card p-3 mb-3 shadow-sm">
//               <input
//                 className="form-control mb-2"
//                 placeholder="Question"
//                 value={q.questionText}
//                 onChange={(e) =>
//                   handleQuestionChange(i, "questionText", e.target.value)
//                 }
//                 required
//               />
//               {q.options.map((opt, j) => (
//                 <input
//                   key={j}
//                   className="form-control mb-2"
//                   placeholder={`Option ${j + 1}`}
//                   value={opt}
//                   onChange={(e) => handleOptionChange(i, j, e.target.value)}
//                   required
//                 />
//               ))}
//               <input
//                 className="form-control"
//                 placeholder="Correct Answer"
//                 value={q.correctAnswer}
//                 onChange={(e) =>
//                   handleQuestionChange(i, "correctAnswer", e.target.value)
//                 }
//                 required
//               />
//             </div>
//           ))}

//           <button
//             type="button"
//             className="btn btn-outline-primary mb-3"
//             onClick={addQuestion}
//           >
//             ➕ Add Question
//           </button>

//           <button type="submit" className="btn btn-success w-100">
//             {editingId ? "Update Quiz" : "Submit Quiz"}
//           </button>
//         </form>
//         <div />
//       </div>

//       <h4 className="text-center mb-4">📚 All Quizzes</h4>
//       <div className="row">
//         {quizzes.length === 0 ? (
//           <p className="text-center text-muted">No quizzes found.</p>
//         ) : (
//           quizzes.map((q) => (
//             <div key={q._id} className="col-md-6 col-lg-4 mb-4">
//               <div className="dashboard-card card p-3 shadow-sm">
//                 <h5 className="text-primary mb-2">{q.title}</h5>
//                 <p className="mb-2">
//                   {q.questions.length} questions | ⏱ {q.timeLimit} min
//                 </p>
//                 <div className="d-flex gap-2 flex-wrap">
//                   <button
//                     className="btn btn-sm btn-outline-info"
//                     onClick={() => handleEdit(q)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => handleDelete(q._id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     onClick={() => toggleVisibility(q._id)}
//                   >
//                     {q.visible ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;









import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    questions: [],
    timeLimit: 1,
  });

  const [quizzes, setQuizzes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/quizzes");
      setQuizzes(res.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  const handleTitleChange = (e) => setQuiz({ ...quiz, title: e.target.value });

  const handleTimeChange = (e) =>
    setQuiz({ ...quiz, timeLimit: Number(e.target.value) });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...quiz.questions];
    updated[index][field] = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...quiz.questions];
    updated[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/quizzes/${editingId}`,
          quiz,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Quiz updated!");
      } else {
        await axios.post(
          "http://localhost:5000/api/quizzes",
          {
            ...quiz,
            createdBy: localStorage.getItem("userId"),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Quiz created!");
      }

      setQuiz({ title: "", questions: [], timeLimit: 1 });
      setEditingId(null);
      fetchQuizzes();
    } catch (err) {
      console.error(err);
      alert("Error saving quiz");
    }
  };

  const handleEdit = (quiz) => {
    setQuiz({
      title: quiz.title,
      timeLimit: quiz.timeLimit || 1,
      questions: quiz.questions,
    });
    setEditingId(quiz._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchQuizzes();
      alert("Quiz deleted successfully");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to delete quiz");
    }
  };

  const toggleVisibility = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/quizzes/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchQuizzes();
      localStorage.setItem("quizVisibilityChanged", Date.now());
    } catch (err) {
      console.error("Toggle error:", err.response?.data || err);
      alert("Failed to toggle quiz visibility");
    }
  };

  return (
    <div className="dashboard-wrapper px-2 px-md-4 py-4">
      <div className="dashboard-inner mx-auto">
        <h3 className="dashboard-title mb-4">
          {editingId ? "✏️ Edit Quiz" : "📝 Create Quiz"}
        </h3>

        {role === "admin" && (
          <div className="alert alert-warning">
            🔒 Admins are not allowed to create or update quizzes.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={handleTitleChange}
            required
            disabled={role === "admin"}
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Time Limit (in minutes)"
            value={quiz.timeLimit}
            onChange={handleTimeChange}
            min={1}
            required
          />

          {quiz.questions.map((q, i) => (
            <div key={i} className="dashboard-question card p-3 mb-3 shadow-sm">
              <input
                className="form-control mb-2"
                placeholder="Question"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(i, "questionText", e.target.value)
                }
                required
              />
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  className="form-control mb-2"
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  required
                />
              ))}
              <input
                className="form-control"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(i, "correctAnswer", e.target.value)
                }
                required
              />
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            onClick={addQuestion}
          >
            ➕ Add Question
          </button>

          <button type="submit" className="btn btn-success w-100">
            {editingId ? "Update Quiz" : "Submit Quiz"}
          </button>
        </form>
        <div />
      </div>

      <h4 className="text-center mb-4">📚 All Quizzes</h4>
      <div className="row">
        {quizzes.length === 0 ? (
          <p className="text-center text-muted">No quizzes found.</p>
        ) : (
          quizzes.map((q) => (
            <div key={q._id} className="col-md-6 col-lg-4 mb-4">
              <div className="dashboard-card card p-3 shadow-sm">
                <h5 className="text-primary mb-2">{q.title}</h5>
                <p className="mb-2">
                  {q.questions.length} questions | ⏱ {q.timeLimit} min
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => handleEdit(q)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(q._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => toggleVisibility(q._id)}
                  >
                    {q.visible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;


