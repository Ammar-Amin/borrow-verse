import { Router } from "express";
import { allUsers, currentUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/verify.js";

const router = Router()

router.get("/", verifyUser, currentUser)
router.put("/", verifyUser, updateUser)
router.delete("/", verifyUser, deleteUser)

router.get("/all", verifyUser, verifyAdmin, allUsers)

export default router