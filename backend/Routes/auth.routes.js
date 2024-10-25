import express from "express";

const router = express.Router();


import { GetMe, login, logout, signup } from "../Controllers/auth.controller.js";
import { ProtectedRoute } from "../middleware/ProtectedRoute.js";

router.post('/signup',signup);
router.post('/signin',login);
router.get('/me',ProtectedRoute,GetMe)
router.post('/logout',logout);

export default router;