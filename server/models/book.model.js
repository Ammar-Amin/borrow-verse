import mongoose from "mongoose";
import { bookCategories } from "../utils/bookCategories.js";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: [String],  // Array of strings
        enum: Object.values(bookCategories),  // Restrict values to enum
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

export default Book;