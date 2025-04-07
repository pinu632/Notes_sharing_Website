
import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";
import {v2 as cloudinary} from 'cloudinary'








export const UploadNotes = async (req,res) =>{



    const {Title,Description,Tags,Course,Subject,Visibility} = req.body;
    let {DocUrl} = req.body;

    const userId = req.user._id; 

   try {
    console.log(req.body);

    if(!Title || !Description || !Tags || !Course || !Subject || !Visibility){
        return res.status(400).json({
            error:'All Fields reqired',
        })
    }
    

    let user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (DocUrl) {
        const response = await cloudinary.uploader.upload(DocUrl, {
          folder: "Notes_file",  // Organize in a folder in Cloudinary
          allowed_formats: ["pdf", "doc", "docx"],
          chunk_size:6000000,
           // Optional: Resize the image
        });

        if(!response){
          return res.status(400).json({error:"file not uploaded"});
        }
  
        DocUrl = response.secure_url;  // Get the URL of the uploaded image
        console.log(DocUrl);
      }

      const post = new Post({
        userId:user._id,
        Author:user.fullname,
        Title:Title,
        DocUrl:DocUrl,
        Description:Description,
        Tags:Tags,
        Course:Course,
        Subject:Subject,
        visibility:Visibility,

      })
      



      await post.save();
      return res.status(200).json({post});
    
   } catch (error) {
    console.error("Error in UploadNotesController: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
   }
    
}

export const GetAllNotes = async (req,res) =>{
  try {
    
    const data = await Post.find({});
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
}

export const likePost = async (req,res) =>{
  const user = req.user._id;
  const postId = req.params.postId;

  try {

    const post = await Post.findById(postId);
    if(!post){
      return res.status(400).json({error:"Server Error"});

    }

    if (post.LikeCount.includes(user)) {
      post.LikeCount = post.LikeCount.filter(id => id.toString() !== user.toString());
      await post.save();
      return res.status(200).json({msg:"post unliked"})
    }else{
      post.LikeCount.push(user);
      await post.save();
      return res.status(200).json({ message: "Post liked successfully" });

    }

    // Push the user ID into the LikeCount array
   

    // Save the post after updating
    

    

    
    
  } catch (error) {
    console.error(error);
  }
}