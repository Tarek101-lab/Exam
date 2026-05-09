import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"]
    console.log(authHeader)

    if(!authHeader){
        // No authorization header present
        return res.status(401).json({error: "Missing Authorization header"})
    }

    // expected format: Bearer <token>
    const parts = authHeader.split(" ");
    if(parts.length !== 2 || parts[0] !== "Bearer"){
        return res.status(401).json({error: "Invalid authorization format."})
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // attach safe user directly;
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({error: "Invalid or expired token"})
    }
    
}