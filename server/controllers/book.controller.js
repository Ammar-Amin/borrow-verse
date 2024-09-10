import Book from "../models/book.model.js";
import { ApiResponse, AsyncHandler } from "../utils/index.js";

export const allBooks = AsyncHandler(async (req, res) => {
    const books = await Book.find();

    res.status(200).json(
        new ApiResponse(200, books, "Books retrieved successfully")
    )
})

export const getBook = AsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
    res.status(200).json(
        new ApiResponse(200, book, "Book retrieved successfully")
    )
})

export const addBook = AsyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    await book.save();

    res.status(200).json(
        new ApiResponse(200, book, "Book added successfully")
    )
})

export const updateBook = AsyncHandler(async (req, res) => {
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(
        new ApiResponse(200, book, "Book updated successfully")
    )
})

export const deleteBook = AsyncHandler(async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(
        new ApiResponse(200, null, "Book deleted successfully")
    )
})