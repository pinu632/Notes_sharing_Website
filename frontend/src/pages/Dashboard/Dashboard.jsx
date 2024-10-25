import'./Dashboard.css'
import { IoSearchSharp } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { SiBookstack } from "react-icons/si";
import { LiaBookSolid } from "react-icons/lia";
import { BsSave } from "react-icons/bs";
import { IoMdHelpCircle } from "react-icons/io";
import { LuContact } from "react-icons/lu";
import { FcAbout } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";
import { Post } from '../../component/PostComponent.jsx';
import { IoCloudUploadOutline } from "react-icons/io5";
import {authors} from '../../sampledata/sampledata.jsx'
import { useEffect, useRef, useState } from 'react';
import { Author } from '../../component/author_description/Author-description.jsx';
import { SuggestedNotes } from '../../component/SuggestedNotes/SuggestedNotes.jsx';
import { CgProfile } from "react-icons/cg";
import { FollowAuthor } from '../../component/followAuthor/followAuthor.jsx';
import { UploadNotes } from '../../component/Post-notes/Upload-Notes.jsx';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { ContactUs } from '../../component/contactU/contactUs.jsx';
import AboutUs from '../../component/AboutUs/Aboutus.jsx';
import HelpFAQ from '../../component/FAQ/faq.jsx';
import { useNavigate } from 'react-router-dom';



export function Dashboard(){

    const firstPostref = useRef(null);
    const navigate = useNavigate();
    
    const [notes,setNotes] = useState([]);
    const {data:authUser} = useQuery({queryKey:['authUser']});
    const [isclicked,setIsclicked] = useState(false);
    const [myNotes,setMyNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerms,setSearchTerms] = useState("");
    const [filteredNotes,setFilteredNotes] = useState([]);


    const[selectedAuthor, setSelectedAuthor] = useState(null);
    const[selectedOption,ssetSelectedOption] = useState(0);
    const[selectedSubject,setSelectedSubject] = useState(null);
    const[selectedContent,setSelectedContent] = useState(0);

    const scrollToTop = ()=>{
      if(firstPostref.current){
       const topPos = firstPostref.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: topPos,
      behavior: "smooth"
    });
      }
    }

const handleSearch =(e) =>{
        const keyword = e.target.value.toLowerCase();
        setSelectedContent(0);
        setSearchTerms(keyword);

        const filtered = notes.filter(note => 
            note.Title.toLowerCase().includes(keyword) || 
            note.Description.toLowerCase().includes(keyword) || 
            (note.Tags && note.Tags.some(tag => tag.toLowerCase().includes(keyword)))||
            note.Subject.toLowerCase().includes(keyword)
          );
          setFilteredNotes(filtered);
    }
     console.log(filteredNotes);
    const displayedNotes = searchTerms ? filteredNotes : notes;

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
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch notes");
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

    
   

    const Getnote = async () =>{
        try {
             
            const res = await axios.get("http://localhost:8000/api/post/getNotes",{
                withCredentials: true, // Ensures credentials like cookies are sent
                headers: {
                    'Content-Type': 'application/json',
                },
            })

           

            setNotes(res.data);
           



        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
     }

    
  
    useEffect(()=>{
        Getnote();
    },[isclicked])

    const logOut = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
            if (res.status !== 200) throw new Error("Logout failed");
            console.log("Logout successful");
            // Perform any additional actions like redirecting to login page here
            window.location.reload();
        } catch (error) {
            console.error("Logout error: ", error.response ? error.response.data : error.message);
        }
    }



    


    



    const handleAuthorclick = (e) => {
       
        ssetSelectedOption(1)
       
       setSelectedAuthor(e);

    }
    function findMactchingNotes(e){

        const inputTags = e.tags;

        return notes.filter( note =>{
            return note.tags.some(tag=>inputTags.includes(tag));
        })

        
    }

    const handleSuggestedClick = (e) =>{
        ssetSelectedOption(2);
        console.log(findMactchingNotes(e));
        setSelectedSubject(findMactchingNotes(e));
        

        
    }

    const renderInExtraDiv = (selectedOption)=>{

        switch(selectedOption) {
            case 0:
                return(<>
                 <div className='welcome-user rainbow-text'>Hello! {authUser.user.fullname},<span className=''>Welcome to NotesVault.</span></div>
                 <FollowAuthor/>
                </>
                   
                    
                )
            case 1:
                return(
                    <Author author={selectedAuthor} />
                )
            case 2:
                return (
                    <div>
                      <div className="suggested">Suggested Notes</div>
                      {selectedSubject && selectedSubject.length > 0 ? (
                        selectedSubject.map((subject, index) => (
                          <SuggestedNotes key={index} suggest={subject} />
                        ))
                      ) : (
                        <div>No suggested notes available</div>
                      )}
                    </div>
                  );
            
        }


    } 

    const renderPostContent = (selectedContent) =>{
        

        switch(selectedContent){

            case 0:
                return(
                <>
                <div className="post-notes" onClick={()=>{
                    setSelectedContent(1);
                }}>

                       Upload Notes  &nbsp; <IoCloudUploadOutline className='post-icon'/>

                </div>
                 {(
                  displayedNotes.map((notes,index)=>(
                     <Post ref = {index === 0? firstPostref:null} key={index} note={notes} auhorDescription={handleAuthorclick} suggestedNotes={handleSuggestedClick} setIsclicked={setIsclicked} />
                       ))
                    )}

                </>
                    

                )
            case 1:
                return(
                <UploadNotes/>
                )
            case 2:
                return(
                    <>
                      <div className="post-notes cursor-none" >

                       Uploaded Notes  

                </div>
                    {(
                         myNotes.map((notes,index)=>(
                            <Post key={index} note={notes} auhorDescription={handleAuthorclick} suggestedNotes={handleSuggestedClick} setIsclicked={setIsclicked} />
                              ))
                    )}
                    </>
                )
            case 3:
                return(
                    <ContactUs/>
                )
            case 4:
                return(
                    <AboutUs/>
                )
            case 5:
                return (
                    <HelpFAQ/>
                )
        }
    }
   
      
    return (
        <div className='mainDB-container'>

            <div className="navbar-container">
                <div className="logo-container">
                    NotesVault.
                </div>
                <div className="search-container">

                    <div className="search-input"><div className='search-btn-1'><IoSearchSharp/></div><input type="text" name="" id="" placeholder='search' spellCheck="false" value={searchTerms} onChange={handleSearch} /></div>

                </div>
                <div className="account-container">
                   <div className='profile-img'> <img src={authUser.user.profileImg} alt="" onClick={()=>{
                    navigate('/profile');
                   }}/></div>
                </div>

            </div>
            <div className="content-container ">
                <div className="menu-container ">
                    <div className="inner-menu">
                        <ul>
                            <li onClick={()=>{
                                setSelectedContent(0);
                                scrollToTop();
                            }}><CiHome/>Home</li>
                            <li> <SiBookstack/>Browse Notes</li>
                            <li onClick={()=>{
                                setSelectedContent(2)
                                scrollToTop
                            }}><LiaBookSolid/>My Notes</li>
                            <li><BsSave/>Favorites/Saved Notes</li>
                            <li
                             onClick={()=>{
                                setSelectedContent(5)
                                scrollToTop();
                            }}
                            ><IoMdHelpCircle/>Help/FAQ</li>
                            <li onClick={()=>{
                                setSelectedContent(3)
                                scrollToTop();
                            }}
                            ><LuContact/>Contact Us</li>
                            <li  onClick={()=>{
                                setSelectedContent(4)
                                scrollToTop();
                            }}><FcAbout/>About Us</li>

                            

                        </ul>
                        <div className='log-out'><button onClick={logOut}><IoIosLogOut className='log-out-logo'/>Log Out</button></div>
                    </div>

                    


                </div>
                <div className="post-container">
                   
                    {
                        renderPostContent(selectedContent)
                    }


                </div>
                <div className="extra-container">
                    <div className="inner-extra">
                  {
                    renderInExtraDiv(selectedOption)
                  }
                    </div>
                    
                </div>
            </div>




            

        </div>
    )
}