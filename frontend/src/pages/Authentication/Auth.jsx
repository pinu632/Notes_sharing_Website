import { useState,useEffect } from "react";
import { LogIn } from "./SignIn";
import { SignUp } from "./SignUp";
import notesimage from './authimage/Student giving test to teacher.jpg'

export  function Auth(){

    const [isSignUp, setSignUp] = useState(false);

   
    // Toggle between sign-up and sign-in forms
    const toggleForm = () => {
      setSignUp(!isSignUp); // Flip the value of isSignUp
    };


    return <div className="auth-container">   


        <div className="img-container">
           <div className="text-container">
            <div>
              Digital <br /> Platform for  <br />
              <span className="gradient-text">Sharing Notes.
              </span>

              <p className="tagline">"Connect, Collaborate, and Ace Your Studies."</p>
               
              
            </div>
              
           </div>
        </div>
       
       <div className={`main-container ${isSignUp ? 'signup-form' : ''}`}>
       
        {isSignUp ? (
          <SignUp onToggle={toggleForm} />
        ) : (
          <LogIn onToggle={toggleForm} />
        )}
      
            
        </div>
        
       

       </div>
    
}