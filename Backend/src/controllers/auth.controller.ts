import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt , { JwtPayload } from "jsonwebtoken";
import type { Request, Response } from "express";

interface RefreshToken{
	accessToken:string
	refreshToken:string
}

interface jwtPayload extends JwtPayload{
	userId?: string
}

const generateTokens = (userId: string): RefreshToken => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET || "", {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET || "", {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId:string, refreshToken:string) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); 
};

const setCookies = (res:Response, accessToken:string, refreshToken:string) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, 
		secure: process.env.NODE_ENV === "production",//---baki 
		sameSite: "strict",
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, 
		secure: process.env.NODE_ENV === "production",////-----bakiii xa
		sameSite: "strict", 
		maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
	});
};

export const signup = async (req:Request , res:Response):Promise<any>=> {

	const { email, password, name ,phone } = req.body;

	if(!email || !password || !name || !phone){
		return res.status(400).json({ message: "All fields are required" , success:false });
	}

	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists",success:false });
		}

		const user = await User.create({ name, email, password , phone});

		const { accessToken, refreshToken } = generateTokens(user._id.toString());
		await storeRefreshToken(user._id.toString(), refreshToken);

		setCookies(res, accessToken, refreshToken);

		res.status(201).json({user:{
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			phone: user.phone
		},message:"user created successfully!!",success:true});
		
	} catch (error:any) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message ,success:false });
	}
};


export const logout = async (req:Request, res:Response):Promise<any> => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET||"") as jwtPayload
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully",success:true });
	} catch (error:any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message,success:false });
	}
};


export const login = async (req:Request, res:Response):Promise<any> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		console.log("password match>>>>",await (user as any).comparePassword(password))
		
		if (user && (await (user as any).comparePassword(password))) {
			const { accessToken, refreshToken } = generateTokens(user._id.toString());
			await storeRefreshToken(user._id.toString(), refreshToken);
			setCookies(res, accessToken, refreshToken);
			
			res.json({
				user:{
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phone:user.phone
				}
				,success:true
			});

		} else {
			res.status(400).json({ message: "Invalid email or password" , success: false });
		}
	} catch (error:any) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message , success:false});
	}
};



export const refreshToken = async (req:Request, res:Response):Promise<any> => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET||"") as JwtPayload
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`)

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET||"", { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error:any) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProfile = async (req:Request, res:Response) => {
	try {
		res.json((req as any).user);
	} catch (error:any) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};