import React from "react";
import "./TermsAndPolicy.css";
import { Container } from "react-bootstrap";

const TermsAndPolicy = () => {
  return (
    <Container className="quiz-terms-container my-5 p-4 shadow-lg rounded">
      <h1 className="quiz-terms-title text-center mb-4">Terms and Privacy Policy</h1>

      <section className="quiz-terms-section mb-5">
        <h2 className="quiz-section-heading">1. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>QuizGenius</strong>, you agree to abide by these Terms and our Privacy Policy.
          Please read them carefully before participating in any quizzes.
        </p>
      </section>

      <section className="quiz-terms-section mb-5">
        <h2 className="quiz-section-heading">2. User Registration & Responsibilities</h2>
        <ul className="quiz-policy-list">
          <li>Users must provide accurate username and email information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>Sharing account credentials or impersonation is strictly prohibited.</li>
        </ul>
      </section>

      <section className="quiz-terms-section mb-5">
        <h2 className="quiz-section-heading">3. Quiz Participation & Scoring</h2>
        <ul className="quiz-policy-list">
          <li>Each quiz may have a time limit; leaving or switching tabs may result in auto-submission.</li>
          <li>Scores are calculated instantly upon submission and stored temporarily.</li>
          <li>You must not use unfair means (e.g., bots or scripts) during quizzes.</li>
        </ul>
      </section>

      <section className="quiz-terms-section mb-5">
        <h2 className="quiz-section-heading">4. Sharing and Public Quizzes</h2>
        <ul className="quiz-policy-list">
          <li>You may share quiz links, but you are responsible for how they are distributed.</li>
          <li>Quiz content must not be copied or redistributed without permission.</li>
        </ul>
      </section>

      <section className="quiz-terms-section mb-5">
        <h2 className="quiz-section-heading">5. Privacy Policy</h2>
        <ul className="quiz-policy-list">
          <li><strong>Data Collection:</strong> We collect usernames, emails, quiz responses, and score history.</li>
          <li><strong>Cookies:</strong> Cookies are used for session management and quiz timing features.</li>
          <li><strong>Analytics:</strong> We may use tools like Google Analytics to improve the platform.</li>
          <li><strong>Data Protection:</strong> We use modern security practices to protect your data.</li>
        </ul>
      </section>

      <section className="quiz-terms-section mb-5">
        <h2 className="quiz-section-heading">6. Changes to Terms</h2>
        <p>
          We may revise these Terms and Privacy Policy from time to time. Any changes will be reflected on this page.
          Continued use of the platform constitutes acceptance.
        </p>
      </section>

      <section className="quiz-terms-section">
        <h2 className="quiz-section-heading">7. Contact Information</h2>
        <p>
          For questions or complaints, contact us at:
          <br />
          <a href="mailto:support@quizgenius.com" className="quiz-contact-link">
            support@quizgenius.com
          </a>
        </p>
      </section>
    </Container>
  );
};

export default TermsAndPolicy;
