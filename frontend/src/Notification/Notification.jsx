// Notification.js
import React from 'react';
import './Notification.css'; // Create a CSS file for styling

const Notification = ({ message, onClose }) => {
    return (
        <div>

<div className="notification-overlay"></div>
<div className="notification-content">

           <div className="notification ">
            
                {message == "Account created successfully" ?<p style={{color:'green'}}>{message}</p>:<p style={{color:'red'}}>{message}</p>}
                <button onClick={onClose}>Close</button>
            </div>
        </div>

        </div>
        
        
    );
};

export default Notification;
