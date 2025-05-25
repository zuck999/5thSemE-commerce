import jwt , { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";

interface CustomRequest extends Request {
    user?:any
}


export const protectRoute = async (req:CustomRequest , res:Response, next:NextFunction):Promise<any> => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized no access token" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET||"") as JwtPayload
			const user = await (User as any).findById(decoded.userId).select("-password")

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user

			next();
		} catch (error:any) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error:any) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token",success:false });
	}
};

export const adminRoute = (req:CustomRequest, res:Response, next:NextFunction):any => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};


