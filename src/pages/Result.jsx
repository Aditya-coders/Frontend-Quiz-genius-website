

import React from "react";
import { useLocation } from "react-router-dom";
import "./Result.css"; // Import the scoped CSS

const Result = () => {
  const { state } = useLocation();
  const { name, email, title, total } = state || {};

  return (
    <div className="result-container py-5">
      <div className="result-card shadow-lg rounded-4 p-4 p-md-5 mx-auto">
        <div className="result-header mb-4 text-center">
          <h1 className="result-title mb-3">🎉 Thank You!</h1>
          <p className="result-subtitle fs-5 fw-semibold">
            Dear <span className="result-name">{name || "Participant"}</span>, you
            have successfully completed the quiz:
          </p>
        </div>

        <div className="result-details text-center mb-4">
          <h3 className="result-quiz-title mb-3">{title || "Quiz Title"}</h3>
          <div className="result-info d-flex justify-content-center flex-wrap gap-4">
            <div className="result-info-item">
              <span className="info-label">Email:</span>{" "}
              <span className="info-value">{email || "N/A"}</span>
            </div>
            <div className="result-info-item">
              <span className="info-label">Total Questions:</span>{" "}
              <span className="info-value">{total || 0}</span>
            </div>
          </div>
        </div>

        <div className="result-footer text-center">
          <p className="result-message">
            We appreciate your participation! <span className="rocket-emoji">🚀</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
