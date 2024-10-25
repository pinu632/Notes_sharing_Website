import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Unauthd.css'
import logoimg from './dashboardimages/logo-no-background.png'
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from 'react';



export const UnAuthenticatedDashboard = () =>{

   const navigate = useNavigate();


  

   



    return(
        <div className="mainD-conatiner">
            <header>
                <div className="logo">NotesVault.</div>
                <div className="searchbar"><input type="text" placeholder='Browse Notes' spellCheck:false />
                <div className="search-btn"><button>Search</button></div>
                </div>
            </header>
            <section className='main-section'>
                <div className="hero-section">

                <h1 className="hero-title gradient-font">Unlock the Power of Knowledge.</h1>
                    <p className="hero-subtitle">
                        "Discover, share, and access notes from students all over the world. 
                        Simplify your study process with <span className='company'>  NotesVault."</span>
                    </p>
                    <div className="button-container">
                        <button className="button-85" onClick={()=>navigate('/Auth')}>Join Now</button>
                        
                    </div>
                </div>
            </section>

        </div>
    )
}