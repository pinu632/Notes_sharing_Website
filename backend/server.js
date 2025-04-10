import express from 'express';
import { ConnectMongoDB } from './ConnectDB/ConnectDB.js';
import cors from 'cors';

import {v2 as cloudinary} from 'cloudinary';
import cookieparser from 'cookie-parser';
import Post from './Models/post.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config({
  path:'./.env'
})


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files





const app = express();
dotenv.config();
app.use(cookieparser());

app.use(express.json({limit:"100mb"})); //parse the req.body
app.use(express.urlencoded({extended:true}));

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY ,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  
})




app.use(cors({
    origin: 'https://euphonious-naiad-7f184c.netlify.app',  // Only allow this origin
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



app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

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
    origin: 'https://euphonious-naiad-7f184c.netlify.app', // Allow the frontend to connect
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

socket.on('toggleFollow', async (UserId, AuthorId, callback) => {
  console.log("Folllow toggle")
  try {
    const user = await User.findById(UserId);
    const author = await User.findById(AuthorId);

    // Ensure both users exist and prevent self-following
    if (user && author && UserId !== AuthorId) {
      const isFollowing = user.following.includes(AuthorId);

      if (!isFollowing) {
        // Follow logic
        user.following.push(AuthorId);
        author.follower.push(UserId);
        console.log(`${UserId} followed ${AuthorId}`);
        callback({ success: true, following: true, message: `You are now following ${AuthorId}` });
      } else {
        // Unfollow logic
        user.following = user.following.filter(e => e.toString() !== AuthorId.toString());
        author.follower = author.follower.filter(e => e.toString() !== UserId.toString());
        console.log(`${UserId} unfollowed ${AuthorId}`);
        callback({ success: true, following: false, message: `You have unfollowed ${AuthorId}` });
      }

      // Save both users
      await user.save();
      await author.save();
    
    } else {
      // Send error if user or author doesn't exist or they attempted to follow themselves
      callback({ success: false, message: 'Invalid action or user not found' });
    }
  } catch (error) {
    console.error("Error in follow/unfollow action:", error);

    // Send generic error response to client
    callback({ success: false, message: 'An error occurred while processing the follow/unfollow action' });
  }
});


socket.on('SaveNotes', async (UserId, postId) => {
  try {
    const user = await User.findById(UserId);
    const post = await Post.findById(postId);

    if (user && post && post.userId.toString() !== user._id.toString()) {
      const isSaved = user.savedNotes.includes(postId);

      if (!isSaved) {
        user.savedNotes.push(postId);
        console.log('Post Saved Successfully');
        socket.emit('SaveNotesResponse', { success: true, message: 'Post saved successfully' });
      } else {
        user.savedNotes = user.savedNotes.filter(e => e.toString() !== postId.toString());
        console.log('Notes unsaved');
        socket.emit('SaveNotesResponse', { success: true, message: 'Post unsaved successfully' });
      }

      await user.save();
    } else {
      socket.emit('SaveNotesResponse', { success: false, message: 'User or post not found, or invalid request' });
    }
  } catch (error) {
    console.error('Error saving post:', error);
    socket.emit('SaveNotesResponse', { success: false, message: 'An error occurred while saving the post' });
  }
});



socket.on('disconnect',()=>{
  console.log('User disconnected');
});

});

server.listen(8000,()=>{
  console.log('server is running on port 8000');
})



