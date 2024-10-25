




import React, { useState } from 'react';
import './HelpFAQ.css'; // Assuming you have a CSS file for styling

const HelpFAQ = () => {
    // Sample FAQs data
    const faqs = [
        {
            question: "How do I create an account?",
            answer: "To create an account, click on the 'Sign Up' button on the homepage and fill in the required details."
        },
        {
            question: "How can I upload notes?",
            answer: "Once you're logged in, go to the 'Upload Notes' section and fill out the form with your note details."
        },
        {
            question: "Can I delete my uploaded notes?",
            answer: "Yes, you can delete your uploaded notes from your profile page."
        },
        {
            question: "How can I search for notes?",
            answer: "Use the search bar located at the top of the dashboard. You can search by title, description, or tags."
        },
        {
            question: "What should I do if I forget my password?",
            answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password."
        },
        {
            question: "How do I contact support?",
            answer: "You can reach out to our support team through the 'Contact Us' section in the app."
        },
    ];

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleFAQ = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="help-faq-container">
            <h2 style={{color:"green"}}>Help & FAQ</h2>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            <h3>{faq.question}</h3>
                            <span>{expandedIndex === index ? '-' : '+'}</span>
                        </div>
                        {expandedIndex === index && <p className="faq-answer">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpFAQ;
