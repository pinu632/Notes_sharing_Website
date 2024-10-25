import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },
   Author:{
    type:String,
    required:true,

   },
   Title:{
    type:String,
    required:true,
   },

   DocUrl:{
    type:String,
    
   },
   Description:{
    type:String,
    required:true,
   }
   ,
   Tags:[{
    type:String,
    required:true
   }],
   LikeCount:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   }],
   Course:{
    type:String,
    required:true,
   },
   Subject:{
    type:String,
    required:true,
   },
   visibility:{
    type:String,
    required:true,
   }
   
   


},{timestamps:true})

const Post = mongoose.model("Post",postSchema);
export default Post;