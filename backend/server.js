import express from 'express';
import { ConnectMongoDB } from './ConnectDB/ConnectDB.js';
import cors from 'cors';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import cookieparser from 'cookie-parser';
import Post from './Models/post.model.js';
import mongoose from 'mongoose';





const app = express();
dotenv.config();
app.use(cookieparser());

app.use(express.json({limit:"50mb"})); //parse the req.body
app.use(express.urlencoded({extended:true}));

cloudinary.config({
  cloud_name:"dxgcq5wuz",
  api_key:177518487565398 ,
  api_secret:"ZLcFwu0QGZsbsRzz-jkC85cRr24",
  
})


app.use(cors({
    origin: 'http://localhost:5173',  // Only allow this origin
    credentials: true,  // Allow cookies to be sent
  }));
  

import authRoute from './Routes/auth.routes.js';
import profileCompletionRoute from './Routes/profileCompletion.routes.js'
import PostRoute from './Routes/Post.routes.js'
import userRoute from './Routes/user.route.js'


app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/profile/',profileCompletionRoute)
app.use('/api/post/',PostRoute);
app.use('/api/user',userRoute)

ConnectMongoDB();




//socket app
import http from 'http';
import { Socket,Server } from 'socket.io';
import { GetAllNotes } from './Controllers/Post.Controller.js';
import User from './Models/user.model.js';
const server = http.createServer(app);
let io = new Server(server);

 io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow the frontend to connect
    methods: ["GET", "POST"],
    credentials: true,
  },
});



io.on('connection',(socket)=>{
  console.log('socket started');
  

  socket.on('likePost', async (postId,userId)=>{
    try {
      // Fetch post from MongoDB
      const post = await Post.findById(postId)
      console.log(post)

      if (post) {
        const liked = post.LikeCount.includes(userId);
        
        // Update like count
        if (liked) {
          post.LikeCount = post.LikeCount.filter(id => id.toString() !== userId.toString());
         
        } else {
          post.LikeCount.push(userId);
         
        }

        
        // Save the updated post in the database
       await post.save();

        // Emit the updated post to all connected clients
        const posts = await Post.find();
        io.emit('updatedPosts', posts);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
});

socket.on('followAuthor', async (UserId, AuthorId) => {
  try {
    const user = await User.findById(UserId);
    const Author = await User.findById(AuthorId);

    // Ensure both users exist and prevent self-following
    if (user && Author && UserId !== AuthorId) {
      const isFollowing = user.following.includes(AuthorId);

      if (!isFollowing) {
        // Follow logic
        user.following.push(AuthorId);
        Author.follower.push(UserId);
        console.log(`${UserId} followed ${AuthorId}`);
      } else {
        // Unfollow logic
        user.following = user.following.filter(e => e !== AuthorId);
        Author.follower = Author.follower.filter(e => e !== UserId);
        console.log(`${UserId} unfollowed ${AuthorId}`);
      }

      // Save both users
      await user.save();
      await Author.save();
      
      // Emit success event back to the user
      socket.emit('followAction', { success: true, message: `Action complete for ${AuthorId}` });

    } else {
      // Emit failure event if user or author doesn't exist, or they tried to follow themselves
      socket.emit('followAction', { success: false, message: 'Invalid action or user not found' });
    }

  } catch (error) {
    console.error("Error follow/unfollow action:", error);

    // Emit error event to the user
    socket.emit('followAction', { success: false, message: 'An error occurred' });
  }
});


socket.on('disconnect',()=>{
  console.log('User disconnected');
});

});

server.listen(8000,()=>{
  console.log('server is running on port 8000');
})



