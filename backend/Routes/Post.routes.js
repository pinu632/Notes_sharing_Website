   import express from 'express'
import { ProtectedRoute } from '../middleware/ProtectedRoute.js';
import { GetAllNotes, likePost, UploadNotes } from '../Controllers/Post.Controller.js';


const router = express.Router();


router.post('/uploadNotes',ProtectedRoute,UploadNotes);
router.get('/getNotes',ProtectedRoute,GetAllNotes);
router.post('/likepost/:postId',ProtectedRoute,likePost);



export default router;