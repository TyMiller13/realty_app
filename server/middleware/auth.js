import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js"

export const requireLogin = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, JWT_SECRET);
        req.user = decoded; // will has access to user id
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({error: "Invalid or expired token"})
    }
}