import Book from "../models/book.model.js";
import Transaction from "../models/transaction.model.js";
import { ApiError, ApiResponse, AsyncHandler } from "../utils/index.js";
import { sampleBooks } from "../utils/sampleBooks.js";

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

export const addBulkBooks = AsyncHandler(async (req, res) => {

    const validatedBooks = sampleBooks.map(async (book) => {

        if (!book.title || !book.description || !book.author || !book.image ||
            !book.category || !book.pages || !book.rentPerDay) {
            throw new ApiError(400, book, 'All fields are required');
        }

        // Convert category to array if it's not already
        const category = Array.isArray(book.category) ? book.category : [book.category];

        const newBook = new Book({
            title: book.title,
            description: book.description,
            author: book.author,
            image: book.image,
            category: category,
            pages: book.pages,
            rentPerDay: book.rentPerDay,
        });

        return await newBook.save();
    })
    // Insert all books into the database
    const result = await Book.insertMany(validatedBooks);

    res.status(200).json(
        new ApiResponse(200, result, "Books added successfully")
    )
})

export const getBookHistory = AsyncHandler(async (req, res) => {
    const { id } = req.params

    const BookTransactions = await Transaction.find({ id })
        .populate('userId', 'name email')

    if (!BookTransactions.length) {
        throw new ApiError(404, "No transactions found for this book")
    }

    res.status(200).json(
        new ApiResponse(200, BookTransactions, "Book transactions history retrieved successfully")
    )
})