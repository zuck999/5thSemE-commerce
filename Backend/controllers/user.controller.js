
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import path from 'path';
path.resolve('../model/user.model.js');



export const register = async (req,res)=>{
    try{
        
        const {username,email,password} = req.body;
        console.log("req.body>>",req.body);
        if(!email||!password||!username){
            return res.status(401).json({
                message:"All fields are required",
                success:false
            });
        };


        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"username already exist",
                success:false
            });
        };

        let hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            username,
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            message: "user created successfully",
            success:true,
        });

    }catch(err){
        console.log("error:",err);
    }
    }


export const login = async(req,res)=>{
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }


        let user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message:"email doesnot exixt",
                success:false
            });
        }

        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            console.log("passoord milena");
            res.status(401).json({
                message:"invalid email or password",
                success:false
            });
        }
        

        user = {
            _id:user._id,
            username:user.username,
            email:user.email,
        }
        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        

        return res.cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge: 1*24*60*60*1000}).json({
            message:`hello ${user.username} 👋`,
            success: true,
            user
        });
 
    }catch(err){
        console.log("error:",err);
    }
}

export const logout  = async (_,res) => {
    try{
        return res.cookie("token","",{maxAge:0}).json({
            message: "logged out successfully",
            success:true,
        });
        
    }catch(err){
        console.log("error:",err);
    }
}

