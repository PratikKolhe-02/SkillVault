import jwt from "jsonwebtoken";
// ✅ FIXED: Removed { } around User because it is a default export
import User from "../models/userModel.js"; 

const isAuth = async (req, res, next) => {
    try {
        // 1. Try getting token from Cookies
        let token = req.cookies.token;

        // 2. If not in cookies, check the 'token' header
        if (!token) {
            token = req.headers.token;
        }

        // 3. If still not found, check standard 'Authorization' header
        if (!token && req.headers.authorization) {
             // Removes "Bearer " from string
             token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(400).json({ message: "User doesn't have token" });
        }

        // 4. Verify Token
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(400).json({ message: "User doesn't have valid token" });
        }

        // 5. Attach User ID to request
        // We use 'await' because findById is an async database operation
        req.user = await User.findById(verifyToken.userId || verifyToken._id); 
        req.userId = verifyToken.userId || verifyToken._id; 

        if(!req.user) {
             return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `isAuth error: ${error.message}` });
    }
};

export default isAuth;