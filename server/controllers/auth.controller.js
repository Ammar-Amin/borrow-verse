import User from "../models/user.model.js";
import { ApiError, ApiResponse, AsyncHandler } from "../utils/index.js";


export const register = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(400, "User already exists");
    }

    const newUser = await User.create({ name, email, password });
    await newUser.save();
    res.status(200).json(
        new ApiResponse(200, newUser, "User created successfully")
    );
})

export const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = user.generateToken();
    if (!token) {
        throw new ApiError(500, "Failed to generate token");
    }

    res
        .cookie('jwt_token', token, { httpOnly: true })
        .status(200)
        .json(
            new ApiResponse(200, user, "Logged in successfully")
        )
})

export const logout = AsyncHandler(async (req, res) => {
    res
        .clearCookie('jwt_token')
        .status(200)
        .json(
            new ApiResponse(200, null, "Logged out successfully")
        )
})
