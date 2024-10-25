import jwt from 'jsonwebtoken'
import JWT_SECRET from '../util/jwtSecret.js';
import User from '../Models/user.model.js';


export const ProtectedRoute = async (req,res,next) =>{

    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({error:"Unautorized user or token not provided"});
        }

        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"Invalid token"});

        }

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        req.user = user;
        next();


    } catch (error) {
        console.log("error in protected middleware",error.message);
        return res.status(500).json({error:"internal server error"});
    }
}