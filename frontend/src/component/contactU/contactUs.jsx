import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';
import config from '../../../config';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [isPending, setIsPending] = useState(false); // State to track if request is pending

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.message) formErrors.message = "Feedback message is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setIsPending(true);  // Set pending state to true when request starts
      try {
        // Replace this with actual token

        const response = await axios.post(
          `${config.baseUrl}/api/user/feedback`,
          formData,
          {
            headers: {
             
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          }
        );
        console.log('Form submitted:', response.data);
        setSubmitStatus('Thank you for your feedback!');
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        console.error('Error submitting the form:', error);
        setSubmitStatus('Failed to send feedback. Please try again.');
      } finally {
        setIsPending(false);  // Set pending state to false after request finishes
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="contact-outer-container">
     

      {/* Feedback Form */}
      <div className="feedback-form">
        <h3>We'd love to hear your feedback!</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isPending}  // Disable input while request is pending
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isPending}  // Disable input while request is pending
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              disabled={isPending}  // Disable input while request is pending
            ></textarea>
            {errors.message && <p className="error-text">{errors.message}</p>}
          </div>

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
        {submitStatus && <p className="submit-status">{submitStatus}</p>}
      </div>


      <div className="contact-header">
        <h2>Contact Us</h2>
      </div>
      <div className="contact-details">
        <p className="color-green"><strong>Phone Number:</strong></p>
        <p>9693135466</p>
        <p>8084873784</p>
        <p className="color-green"><strong>Email:</strong></p>
        <p>pinu632@gmail.com</p>
      </div>
    </div>
  );
};


