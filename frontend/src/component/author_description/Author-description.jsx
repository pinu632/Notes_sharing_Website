
import './authord.css'

export const Author = ({author}) =>{

    if (!author) {
        return <div>No author selected</div>;
    }


    return(
        <div className="author-main">
          <div className="profileImg"><img src={author.user.profileImg} alt="Author profile" /></div>
         <div className="center"><label htmlFor="">Name:</label>{author.user.fullname}</div>

         <div className="center"><label>Class/Degree:</label> {author.user.course}</div>
         <div className="bio"><label htmlFor="">Bio:</label>{author.bio}</div>

         {/* <div className="tags center"><label htmlFor="">Strong Subjects:</label><div className="center1">{author.strongSubjects.map((e)=>(
                        <div className='tag-internal'>{e}</div>
                    ))}</div></div> */}
        </div>
       
        

    )
}