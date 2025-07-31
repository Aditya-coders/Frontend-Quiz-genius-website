

import React from 'react';
import { Link } from 'react-router-dom';
import './QuizCard.css'; // make sure to import the CSS file

const QuizCard = ({ quiz }) => (
  <div className="quiz-card-genius d-flex flex-column justify-content-center align-items-center text-center p-4 shadow-lg">
    <h3 className="quiz-card-genius-title mb-3">{quiz.title}</h3>
    <Link to={`/quiz/${quiz._id}`}>
      <button className="quiz-card-genius-btn btn btn-outline-light rounded-pill px-4">
        Start Quiz
      </button>
    </Link>
  </div>
);

export default QuizCard;


