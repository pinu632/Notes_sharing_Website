

import express from 'express'
import { ProtectedRoute } from '../middleware/ProtectedRoute.js';
import { getUser, saveNotes,getUploadedNotes } from '../Controllers/user.controller.js';
import { sendFeedback } from '../Controllers/feedback.controller.js';

const router = express.Router();


router.get('/getUser/:userId',ProtectedRoute,getUser)
router.post('/saveNotes/:postId',ProtectedRoute,saveNotes);
router.get('/uploadedNotes',ProtectedRoute,getUploadedNotes);
router.post('/feedback',ProtectedRoute,sendFeedback);


export default router;