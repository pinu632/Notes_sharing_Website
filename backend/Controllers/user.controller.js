import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";



export const getUser = async (req,res) =>{

    const {userId} = req.params;
    console.log(userId);

    try {
          const user = await User.findOne({_id:userId}).select("-password");
          if(!user) {
            return res.status(400).json({error:"User not found"})
          };

          return res.status(200).json({user});

    } catch (error) {
        console.error(error);

    }
}

export const saveNotes = async (req,res) =>{

  const {postId} = req.params;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if(!post){
       
      return res.status(400).json({error:"note not found"});
    } 
 if (!Array.isArray(user.savedNotes)) {
      user.savedNotes = [];
    }

    // Check if the note is already saved
    if (!user.savedNotes.includes(postId)) {
      user.savedNotes.push(postId);
      await user.save();
    } else {
      return res.status(400).json({ message: "Note already saved" });
    }

    res.status(200).json({ message: "Note saved successfully" });

  } catch (error) {
    console.error(error);
  }
}


export const getUploadedNotes = async (req,res)=>{
  const userId = req.user._id;

  try {
    
    
    const post = await Post.find({userId:userId});
    if(!post){
      return res.status(400).json({error:"no notes found"});
    }

    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
  }
}