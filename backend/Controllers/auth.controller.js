import express from "express";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { GenerateTokenandSetCookies } from "../util/jwtCookies.js";
import bodyparser from 'body-parser';


const app = express();
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



export const signup = async (req,res)=>{


    try {
        
        const  { fullname,username,email,password,confirmPassword } = req.body;

        


        if(!fullname || !username || !email || !password ||!confirmPassword){

            return res.status(400).json({
                error:'All Fields reqired',
            })

        }

        if(!(password === confirmPassword) ){
            return res.status(400).json({
                 error: "Password and confirm password do not match" 
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Check valid email format

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        GenerateTokenandSetCookies(newUser._id,res);

        return res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const login = async (req,res) =>{

    try {
        
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");

        if(!user || !isPasswordCorrect)
            {
                return res.status(400).json({error:"invalid username and password"});
            }

        GenerateTokenandSetCookies(user._id,res);

        if(!user.isCompleteProfile){
            return res.status(200).json({
                user,
                redirectTo:"/completeProfile"
            })
        }
        return res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }

}


export const GetMe = async (req,res) =>{

  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }

}

export const logout = async (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out succesfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}