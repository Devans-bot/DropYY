import jwt from "jsonwebtoken"
import User from "../models/usermodel.js"


export const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies?.token

        if(!token) return res.status(404).json({message:"Please login"})

        const decodedData=jwt.verify(token,process.env.JWT_SEC)

        if(!decodedData) return res.status(404).json({message:"Please login"})

        const user= await User.findById(decodedData.id).select("-password")

        if (!user) {
         return res.status(401).json({ message: "User not found" });
         }

         req.user=user

         next()
    } catch (error) {
        console.log(error)
    }
}