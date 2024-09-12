import User from "../models/user.model.js";
import { ApiResponse, AsyncHandler } from "../utils/index.js";

export const currentUser = AsyncHandler(async (req, res) => {
    const { password: pass, ...rest } = req.user._doc
    res.status(200).json(
        new ApiResponse(200, rest, "User retrieved successfully")
    )
})

export const updateUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        { name, email, password },
        { new: true }
    )

    res.status(200).json(
        new ApiResponse(200, updateUser, "User updated successfully")
    )
})

export const deleteUser = AsyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id)
    res.status(200).json(
        new ApiResponse(200, null, "User deleted successfully")
    )
})

export const allUsers = AsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(
        new ApiResponse(200, users, "Users retrieved successfully")
    )
})