import './Auth.css';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast"
import Notification from '../../Notification/Notification.jsx';

export function SignUp({onToggle}){
    const [formData,setFormData] = useState({

        email: "",
		username: "",
		fullname: "",
		password: "",
        confirmPassword:""
    });

    const [notification,setNotification ] = useState(null);

	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email, username, fullname, password ,confirmPassword}) => {
			try {
				const res = await fetch("http://localhost:8000/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, username, fullname, password,confirmPassword }),
				});
				const data = await res.json();
	
				if (!res.ok) throw new Error(data.error);
				
				if (data.error) throw new Error(data.error);
				setNotification("Account Created successFully");

				return data;
	
			} catch (error) {
				console.log(error);
				setNotification(error.message);
				throw error; 
			}
		},
        
		onSuccess: () =>{
			toast.success("Account created successfully");
            setFormData({

                
        email: "",
		username: "",
		fullname: "",
		password: "",
        confirmPassword:""

            })
		}
	});

    const handleCloseNotification = () => {
        setNotification(null); // Close the notification
    };
    const handleSubmit = (e) => {
		e.preventDefault();
		mutate(formData);
        
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
   
    

    return (<div>
        <form className='form signup-form '>

<h2 className='gradient-text'>Sign Up</h2>

<input type="text" name='fullname' spellCheck='false' required value={formData.fullname} onChange={handleInputChange} placeholder='Enter fullname'/>



<input type="text" name='username' spellCheck='false' value={formData.username} onChange={handleInputChange} required placeholder='choose username'/>



<input type="email" name='email' spellCheck='false'  value={formData.email} onChange={handleInputChange} required placeholder='E-mail'/>





<input type="password" name='password' spellCheck='false' value={formData.password} onChange={handleInputChange}  required placeholder='Enter Password'/>




<input type="password" name='confirmPassword' spellCheck='false' value={formData.confirmPassword} onChange={handleInputChange} required placeholder='Confirm Password'/>


<button type='submit' className='signUp-submit' onClick={handleSubmit}>{isPending? "loading...": "Sign up"}</button>


<p>
    Already have an account? <span  className="already"  onClick={onToggle} style={{color:"#29bdf3"}}> Sign In</span>
</p>










</form>
{notification && (
<Notification message={notification} onClose={handleCloseNotification} />
)}


    </div>
    )
        
    


    
}