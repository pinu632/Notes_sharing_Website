import './PostC.css';
import { SlLike } from "react-icons/sl";
import { BsSave } from "react-icons/bs";
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useEffect, useState,useMemo } from 'react';
import axios from 'axios';
const queryClient = new QueryClient();
import config from '../../config';
import io, { Socket } from 'socket.io-client';
import { set } from 'mongoose';



const socket = io(`${config.baseUrl}`);

export const Post = ({ ref,note, auhorDescription, suggestedNotes,setIsclicked }) => {
    const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    const [fileLink, setFileLink] = useState('');
    const [user, setUser] = useState(null);

    // Set the file link when the component mounts or when note changes
    useEffect(() => {
        if (note && note.DocUrl) {
            setFileLink(note.DocUrl);
        }
    }, [note]);

    // Get the file type from the file link
    const getFileType = (link) => {
        if (!link) return null;
        const type = link.split('/').pop().split('.').pop();
        return type || null;
    };

    const fileType = getFileType(fileLink);

    // Fetch the user data based on the note's userId
    const getUser = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/api/user/getUser/${note.userId}`, {
                withCredentials: true
            });

            setUser(res.data); // Assuming res.data is the user object
           
        } catch (error) {
            console.error("error: " + error);
        }
    };

    const [likes,setlikes] = useState(new Set(note.LikeCount));
    const [following,isfollowing] = useState(authUser?.user?.following.includes(user?.user?._id)||false)
    console.log(following);

    useEffect(() => {
        if (authUser && user) {
            isfollowing(authUser.user.following.includes(user.user._id));
        }
    }, [authUser, user]);
    
    
    useEffect(()=>{
        socket.on('response',(response)=>{

            if(response.success){
                isfollowing(prev => !prev);
            } else{
                console.log('error');
            }
        })
})

    const handleFollowClick = () => {
        AuthorId
        socket.emit('followAuthor', authUser?.user?._id, user?.user?._id);
        // Client-side code
     socket.emit('toggleFollow',authUser?.user?._id ,user?.user?._id , (response) => {
    if (response.success) {
      console.log(response.message);
      const followButton = document.getElementById('followButton');
  
      // Update the button text and style based on the follow/unfollow state
      if (response.following) {
        followButton.textContent = 'Unfollow';
        followButton.classList.add('following');
      } else {
        followButton.textContent = 'Follow';
        followButton.classList.remove('following');
      }
    } else {
      console.error(response.message);
      // Optionally show an error message to the user in the UI
    }
  });
  
        setIsclicked(true);
      };

    useEffect(()=>{
        socket.on('updatedPosts',(updatedPosts)=>{
            const updatedPost = updatedPosts.find(p=>p._id===note._id);
            if(updatedPost){
                setlikes(new Set(updatedPost.LikeCount));
              
                
                
                
            }
        });
        

        return ()=>{
            socket.off('updatedPosts');
        }
    },[note,user]);

 const toggleLikePost =()=>{
    if(!user || !user.user) return;
    const userId = user.user._id?user.user._id:"";
    socket.emit('likePost',note._id,userId);
    setIsclicked(e=>!e);
 }

 const isLiked = useMemo(() => {
    return likes.has(user?.user?._id); // Check if liked
}, [likes, user]);
    
  

    // Call getUser when the note and note.userId exist
    useEffect(() => {
        if (note && note.userId) {
            getUser();
        }
    }, [note]);

   

    return (
        <div className="outer-container" ref={ref}>
            <div className="author">
                <div className="auth-img">
                    {user && user.user.profileImg ? (
                        <img src={user.user.profileImg} alt={user.name} />
                    ) : (
                        <div className="placeholder-img">Image Unavailable</div> // Placeholder if image is not available
                    )}
                </div>
                <h4 onClick={() => auhorDescription(user)}>{note.Author}</h4>
                <div className="username">@{user && user.user.username?user.user.username:"user not found"}</div>
                <div className="follow" id='follow' onClick={handleFollowClick}>{following?"following":"follow"}</div>
            </div>
            <div className="main-post">
                <div className="thumbnail">
                    <iframe
                        src={note.DocUrl}
                        className="pdf-viewer"
                        loading="lazy"
                        scrolling=""
                        frameBorder="0"
                        title="Document Viewer"
                    ></iframe>
                </div>
                <div className="description">
                    <div className="post-title" onClick={() => suggestedNotes({ title: note.title, tags: note.tags })}>
                        <b>{note.Title}</b>
                    </div>
                    <div className="post-description">
                        <label>Description: </label>{note.Description}
                    </div>
                    <div className="post-description">
                        <label>Course: </label>{note.Course}
                    </div>
                    <div className="post-description">
                        <label>Subject: </label>{note.Subject}
                    </div>

                    <div className="tags">
                        {note.Tags && note.Tags.slice(0,5).map((tag, index) => (
                            <div className='tag-internal' key={index}>{tag}</div>
                        ))}
                    </div>

                    <div className="date-posted">
                        <label>Posted: </label>{note.createdAt}
                    </div>
                    <div className="download-count">
                        <label>Downloads: </label>{note.downloads}
                    </div>
                </div>
            </div>
            <div className="post-footer">
                <div className="like">
                    <SlLike className="posticons" style={{color:isLiked?"green":"white"}}  onClick={toggleLikePost}/> {likes.size>0 ? likes.size : ""} 
                </div>
                <div>
                    <BsSave className="posticons" />
                </div>
                <button>Open file</button>
                <button>Download File</button>
                <div className="filetype">.{fileType}</div>
            </div>
        </div>
    );
};
