import User from "../models/user.model.js";
import { ApiError } from "../utils/index.js";

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt_token || '';

        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded._id)
        if (!user) {
            throw new ApiError(401, "Invalid jwt token");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(500, error.message || "Failed to verify user token");
    }
}

export const verifyAdmin = async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        throw new ApiError(401, "Access denied, Admins only");
    }
}