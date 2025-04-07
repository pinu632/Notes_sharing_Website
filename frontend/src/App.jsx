
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/Authentication/SignUp.jsx'
import { Auth } from './pages/Authentication/Auth.jsx'
import { CompleteProfile } from './pages/profileCompletion/ProfileCompletion.jsx'
import { Dashboard } from './pages/Dashboard/Dashboard.jsx'
import { useQuery } from '@tanstack/react-query'
import { UnAuthenticatedDashboard } from './pages/Dashboard/unauthenticatedDashboard/UnauthenticatedDashoard.jsx'
import { useEffect } from 'react'
import Spinner from './component/LoaderSpinner/LoaderSpinner.jsx'
import { Profile } from './pages/Profile/Profile.jsx'
import config from '../config.js'

function App() {
   const navigate = useNavigate();
  const {data:authUser,isLoading,error,isError} = useQuery({
    queryKey:['authUser'],
    queryFn: async ()=>{
      try {

         const res = await fetch(`${config.baseUrl}/api/auth/me`,{
          method:'GET',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          },
          
         })

         const data = await res.json();
         if(data.error) return null;
         if(!res.ok){
           throw new Error(data.error || "somethign went wrong ");
           navigate('/Dashboard')
           
         }
         console.log("authUser is here: ",data);
      
         return data;
         
        
      } catch (error) {
        throw new Error(error);
      }
    },
    retry:false
    
  })

 



  return <div className='main-container'>
     {isLoading && <Spinner/>} {/* Handle loading state */}
        {isError && <div>Error: {error.message}</div>} {/* Handle error state */}
        {!isLoading && !isError && ( // Only render routes if not loading or error
            <Routes>
                <Route path='/' element={ authUser?<Dashboard/>:<UnAuthenticatedDashboard/>}  />
                <Route path='/Auth' element={authUser?<Dashboard/>:<Auth />} />
                <Route path='/completeProfile' element={authUser&&<CompleteProfile />} />
                <Route path='/Dashboard' element={authUser?<Dashboard />:<UnAuthenticatedDashboard/>} />
                <Route path ='/profile' element={authUser&&<Profile/>}/>
                
                

                


                
            </Routes>
        )}
  </div>
}

export default App
