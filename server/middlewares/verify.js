import User from "../models/user.model.js";
import { ApiError, AsyncHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const verifyUser = AsyncHandler(async (req, res, next) => {
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

})

export const verifyAdmin = AsyncHandler(async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        throw new ApiError(401, "Access denied, Admins only");
    }
})