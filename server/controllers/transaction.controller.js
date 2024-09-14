import Book from "../models/book.model.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import { ApiError, ApiResponse, AsyncHandler } from "../utils/index.js";

export const issueTransaction = AsyncHandler(async (req, res) => {
    const { userId, bookId, issueDate } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const updateBook = await Book.findByIdAndUpdate(
        bookId,
        { isAvailable: false },
        { new: true }
    );
    if (!updateBook) {
        throw new ApiError(404, "Book not found");
    }

    const transaction = new Transaction({ bookId, userId, issueDate });
    await transaction.save();
    res.status(200).json(
        new ApiResponse(200, transaction, "Book issued successfully")
    )
})

export const returnTransaction = AsyncHandler(async (req, res) => {
    const { bookId, userId, returnDate } = req.body;
    const transaction = await Transaction.findOne({ bookId, userId, returnDate: null });
    if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
    }

    const book = await Book.findByIdAndUpdate(
        { _id: bookId },
        { isAvailable: true },
        { new: true }
    );
    const daysRented = Math.ceil((new Date(returnDate) - transaction.issueDate) / (1000 * 60 * 60 * 24));
    const rentPaid = daysRented * book.rentPerDay;

    transaction.returnDate = returnDate;
    transaction.rentAmount = rentPaid;
    transaction.status = 'RETURNED';
    await transaction.save();

    res.status(200).json(
        new ApiResponse(200, transaction, "Book returned successfully")
    )
})


export const getUserTransactions = AsyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ userId: req.user._id })
        .populate('bookId', 'title category author image rentPerDay')
        .populate('userId', 'name email')

    if (!transactions.length) {
        throw new ApiError(404, "No transactions found for this user")
    }

    res.status(200).json(
        new ApiResponse(200, transactions, "Transactions retrieved successfully")
    )
})
