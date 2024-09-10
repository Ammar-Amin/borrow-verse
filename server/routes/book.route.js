import { Router } from "express";
import { addBook, allBooks, deleteBook, getBook, updateBook } from "../controllers/book.controller.js";
import { verifyAdmin } from "../middlewares/verify.js";

const router = Router()

router.get("/", allBooks)
router.get("/:id", getBook)
router.post("/", verifyAdmin, addBook)
router.put("/:id", verifyAdmin, updateBook)
router.delete("/:id", verifyAdmin, deleteBook)

export default router