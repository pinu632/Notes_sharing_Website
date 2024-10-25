import { useState } from "react"
import { authors } from "../../sampledata/sampledata.jsx"
import './followA.css'




export const FollowAuthor = () =>{

   
    

   return(
    <div className="follow-outer">
        <div className="follow">Follow Author</div>
        {
            authors.map((author,index)=>(<div className="follow-wrap">
             <div key={index}>{author.name}</div>
             <button>Follow</button>
            </div>
               
            ))
        }
    </div>
   )
}