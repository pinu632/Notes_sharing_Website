import React from 'react';
import './AboutUs.css'; // Assuming you create an AboutUs.css for styling

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-header">
        <h1>About NotesVault</h1>
      </div>

      <section className="aboutus-section">
        <h2>Our Aim</h2>
        <p>
          At NotesVault, our goal is to ease the access to quality notes for students and professionals alike, reducing the effort needed to find reliable study materials. We strive to create a platform where users can easily share, discover, and utilize well-crafted notes for their educational journey.
        </p>
      </section>

      <section className="aboutus-section">
        <h2>Our Agenda</h2>
        <ul>
          <li>Provide a user-friendly platform for sharing academic notes.</li>
          <li>Enable easy access to high-quality notes across various subjects and fields.</li>
          <li>Encourage a collaborative learning environment through note suggestions and reviews.</li>
          <li>Minimize the effort students put into searching for trustworthy resources.</li>
        </ul>
      </section>

      <section className="aboutus-section">
        <h2>Our Services</h2>
        <ul>
          <li>Upload and share notes: Users can upload their notes and share them with others.</li>
          <li>Browse by categories: Easily find notes by subjects, authors, and tags.</li>
          <li>Note suggestions: Receive personalized suggestions based on your interests.</li>
          <li>Collaborate: Users can suggest improvements to notes and collaborate with others.</li>
        </ul>
      </section>

      <section className="aboutus-section">
        <h2>Why Choose NotesVault?</h2>
        <p>
          We understand the challenges of academic life. That’s why we’ve built NotesVault to serve as a community-driven platform where you can effortlessly find, share, and access a wide range of quality notes, saving time and reducing the effort spent on gathering resources. Whether you're a student preparing for exams or a professional looking to brush up on key topics, NotesVault has something for everyone.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
