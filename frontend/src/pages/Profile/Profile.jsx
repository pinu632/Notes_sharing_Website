import React, { useEffect, useState } from 'react';
import './Profile.css'; // Create and style this CSS file as per your design
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // Assuming you're using react-query for fetching user data
import { MdDeleteOutline } from "react-icons/md";



export function Profile() {
    // Use react-query to fetch profile data
    const {data:authUser} = useQuery({queryKey:['authUser']});
    


    if (!authUser || !authUser.user) {
        return <div>No user data available</div>; // Handle case where data is not available
    }

    const [myNotes,setMyNotes] = useState([]);
    useEffect(() => {
        const fetchNotes = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/user/uploadedNotes',{
                withCredentials: true, // Ensures credentials like cookies are sent
                headers: {
                    'Content-Type': 'application/json',
                },
            }); // API endpoint
            setMyNotes(response.data); // Set the retrieved notes
            
          } catch (err) {
            setError("Unable to fetch notes");
            
          }
        };
        fetchNotes();
      }, []);
   
    

 


   
    // Destructure user data for easy access
   

    return (<div className="profile-outer-container">
         <div className="profile-container">
            
            <div className="profile-header">
                           
                           <div className='profile-details1'>
                                   <div className="profile-img1">
                                         <img src={authUser.user.profileImg} alt="User profile" />
                                   </div>
                                   <div>
                                    <div className='username-section'>
                                    {authUser.user.fullname}
                                    <small>@{authUser.user.username}</small>
                                    </div>
                                  
                                   </div>
                                 
                                  <div className="followers-info">
                                         <div className="followers-count">
                                         <span className='headings'>Followers:</span>  {authUser.user.follower.length}
                                         </div>
                                         <div className="following-count">
                                         <span className='headings'>Following:</span>  {authUser.user.following.length}
                                         </div>
                                       </div>                  
                           </div>
                           <div className="profile-details">
                   
                               {authUser.user.bio}

                               <div className="college-info">
                               <span className='headings'>college:</span>  {authUser.user.college}
                               </div>
                               <div>
                                 <span className='headings'>course:</span>   {authUser.user.course}
                               </div>
                               <div className="semester-info">
                                    <div><span className='headings'>Semester:</span>  {authUser.user.semester}</div>
                                     <div> <span className='headings'>Uploaded Notes:</span>  {myNotes.length}</div>
                               </div>
                               <div>
                               <span className='headings'>E-mail:</span> {authUser.user.email}
                               </div>
                              
                           
                          </div>
            </div>
          

           

            <div className="uploaded-notes-section">
                <h2>Uploaded Notes</h2>
                <ul>
                    {myNotes.map((note, index) => (
                        <li key={index}>
                            <div>
                            <span className='headings'>Title:</span> {note.Title}<br/>
                            <span className='headings'>Description:</span> {note.Description}
                            </div>
                            <div>
                                <MdDeleteOutline className='delete-icon'/>
                            </div>
                           
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
       
    );
}
