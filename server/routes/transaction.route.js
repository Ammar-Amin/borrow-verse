import { Router } from "express";
import { verifyUser } from "../middlewares/verify.js";
import { getUserTransactions, issueTransaction, returnTransaction } from "../controllers/transaction.controller.js";

const router = Router()

router.post("/", issueTransaction)
router.put("/", returnTransaction)
router.get("/", verifyUser, getUserTransactions)

export default router