
import express from "express";

const router = express.Router();


import { ProfileCompletion } from "../Controllers/profileCompletion.cotroller.js";
import { ProtectedRoute } from "../middleware/ProtectedRoute.js";

router.post('/profileCompletion',ProtectedRoute,ProfileCompletion);

export default router;