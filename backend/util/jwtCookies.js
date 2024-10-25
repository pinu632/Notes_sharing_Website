import jwt from 'jsonwebtoken';
import JWT_SECRET from './jwtSecret.js';

export const GenerateTokenandSetCookies = (userId,res) =>{
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn:"15d"
    });

    return res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,//ms
        httpOnly:true,
        sameSite:"strict",
        secure: "developement" != "developement",
    })
}