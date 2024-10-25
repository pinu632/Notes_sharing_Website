import { useState } from "react"
import courseSubjects from "../../sampledata/sampledata.jsx";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import './UploadN.css'




export const UploadNotes = ()=>{

    const {data:authUser} = useQuery({queryKey:['authUser']});

    const [selectedCourse, setselectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');


    const [formData,setFormData] = useState({
        Title:"",
        Description:"",
        Tags:[],
        Course:"",
        Subject:"",
        Visibility:"",

    })
    console.log(formData);

    const[notesFile,setNotesfile] = useState(null)

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("http://localhost:8000/api/post/uploadNotes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formData),
                });

                const responseData = await res.json(); // Avoid naming conflict
                if (responseData.error) throw new Error(responseData.error);

                if (res.ok) {
                    console.log("success")
                } else {
                    throw new Error("Something went wrong");
                }

                return responseData;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        onSuccess:(()=>{
            alert("File Uploaded Successfully");
            setFormData({
                Title:"",
                  Description:"",
                 Tags:[],
                 Course:"",
                 Subject:"",
                Visibility:"",
            })

        })
    });

    const handleCourseChange = (e)=>{
        setselectedCourse(e.target.value);
        setFormData({ ...formData, Course:e.target.value});
        
    }
    const handleSubjectChange = (e)=>{
        setSelectedSubject(e.target.value);
        setFormData({ ...formData, Subject:e.target.value});
        
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value});
    };

   const handleTagsChange = (e) =>{
        const value = e.target.value;
        const tags = value.split(",").map(tag => tag.trim()).filter(tag => tag !== ""); 
        setFormData({...formData,Tags:tags});
    }

    const handleFileChange =(e) =>{
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, DocUrl: reader.result }); // Sets base64 string
            };
            reader.readAsDataURL(file);
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        mutate(formData);
    }

    const findCourse = (coursetofind) =>{
        const course = courseSubjects.find((data)=>data.course === coursetofind);
        return course? course:"course not found";
    }
    // console.log(selectedCourse);
    
    return (
        <div className="upload-main">
            <h1>Upload the Document</h1>
            <form>

                <input type="text" className="title"  name="Title" spellCheck='false' placeholder="Title for your Notes" value={formData.Title}  onChange={handleInputChange}/>
                 
                 <div className="selet-course center-content">
                    <label htmlFor="">Select Course:</label>
                    <select name="course" id="course" value={selectedCourse} onChange={handleCourseChange}>
                        <option value="">--select a Course--</option>
                        {
                            courseSubjects.map((data,index)=>(

                                <option value={data.course} key={index} >{data.course}</option>

                        ))
                        }
                    </select>
                 </div>
                 <div className="selet-subject center-content">
                    <label htmlFor="">Select Subject:</label>
                    <select name="subject" id="subject" value={selectedSubject} onChange={handleSubjectChange} >
                        <option value="">--select a subject--</option>
                        {
                        selectedCourse && findCourse(selectedCourse).subjects.map((subject, index) => (
                         <option value={subject} key={index} >{subject}</option>
                          ))
                   }
                    </select>
                 </div>

                 <div className="file-upload center-content">
                 <label for="fileUpload">Upload a document (PDF/DOC):</label>
                    <input type="file" accept=".pdf, .doc, .docx" placeholder="Upload the Notes" className="file-input" onChange={handleFileChange} />
                 </div>

                 <textarea name="Description" id="description" placeholder="Describe your Notes" rows={4} cols={30} onChange={handleInputChange} ></textarea>

                 <input type="text" className="tags" name="Tags" onChange={handleTagsChange}  spellCheck='false' placeholder="Tags (comma-separated)"/>
                 <select name="Visibility" className="visibility" value={formData.Visibility} onChange={handleInputChange}>
                <option value="">--select visibility----</option>
                 <option value="public">Public</option>
                 <option value="private">Private</option>
                </select>
                <div className="author-name-upload center-content">
                    <label htmlFor="author-name">Author:   </label>
                <input type="text" name="author" spellCheck='false' value={authUser.user.fullname} readOnly />
                </div>
                
                <button type="submit" onClick={handleSubmit} >{isPending?"Uploading....":"Upload"}</button>

            </form>
        </div>
    )
}