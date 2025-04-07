import { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Spinner from '../../component/LoaderSpinner/LoaderSpinner';
import config from '../../../config';



export function LogIn({onToggle}){


    const [formData,setFormData] = useState({
        username:"",
        password:""
    })
    const navigate = useNavigate();

    const { mutate, isLoading, isPending, error } = useMutation({
		mutationFn: async ({  username, password }) => {
			try {
				const res = await fetch(`${config.baseUrl}/api/auth/signin`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
                    credentials:"include",
					body: JSON.stringify({ username ,password}),
				});

                const data = await res.json();
                if (data.error) throw new Error(data.error);
	
				if (res.ok){
                    if(data.redirectTo){
                        navigate(data.redirectTo)

                    }else{
                        navigate('/Dashboard');
                        window.location.reload();
                    }
                    if(res.cookies){
                        localStorage.setItem(cookies);
                    }
                }else{
                    throw new Error("Something went wrong");
                }
				
				
			

				return data;
	
			} catch (error) {
				console.log(error);
				setNotification(error.message);
				throw error; 
			}
		},
        
		
	});

   
    const handleSubmit = (e) => {
		e.preventDefault();
		mutate(formData);
        
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

    if(isLoading)
    {
        return(
            <Spinner/>
        )
    }
   

    return(
        <form className='form signin-form'>

            <h2 className='gradient-text'>Sign In</h2>
           

            
            <input type="text" name='username' spellCheck='false' value={formData.username} onChange={handleInputChange} placeholder='Username' required/>
            

           

            
           
            <input type="password" name='password' spellCheck='false' value={formData.password} onChange={handleInputChange} placeholder='password'  required/>
            


            <button type='submit' className='signUp-submit' onClick={handleSubmit}>{isPending? "loading...": "Sign up"}</button>

            <p>
                Don't have an account? <span className="already" onClick = {onToggle} style={{color:"#29bdf3"}}> Sign Up</span>
            </p>

           

           

            




        </form>
    )
    
}