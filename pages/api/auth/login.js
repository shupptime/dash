import { dbConnect } from "utils/mongoose";
import User from 'models/User';
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

dbConnect();

export default async function singIn(req, res) {
    const { body, method } = req;
   
    const email = 'email'; // sethardcore
   
   try {
        const userFound = await User.findOne({ email });
        
        
        const token = userFound.generateToken();
        const serialized = serialize("myTokenName", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
            });

        res.setHeader("Set-Cookie", serialized);
       
        return res.status(200).json({
        message: "Login successful",
        });
   } catch (error) {
    
        console.log(error.message);
        return res.status(500).json({
        message: "Internal server error",
        error: error.message,
        });
   }

    // return res.status(401).json({ error: "Invalid credentials" });

}