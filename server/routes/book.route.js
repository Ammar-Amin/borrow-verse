import { Router } from "express";
import { addBook, addBulkBooks, allBooks, deleteBook, getBook, getBookHistory, updateBook } from "../controllers/book.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/verify.js";

const router = Router()

router.get("/", allBooks)
router.get("/:id", getBook)
router.post("/", verifyUser, verifyAdmin, addBook)
router.put("/:id", verifyUser, verifyAdmin, updateBook)
router.delete("/:id", verifyUser, verifyAdmin, deleteBook)

router.post('/bulk-books', verifyUser, verifyAdmin, addBulkBooks)
router.get('/:id/history', getBookHistory);

export default router