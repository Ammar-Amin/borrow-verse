import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ book, remove = "", rent = "" }) => {
    return (
        <div className="w-[150px] lg:w-[230px] h-[] rounded-md border">
            <img
                src={book.image}
                alt={book.title}
                className="h-[200px] bg-blue-300 w-full object-contain rounded-t-md px-4"
            />
            <div className="p-2 lg:p-4">
                <Link to={`/books/${book._id}`}>
                    <h1 className="inline-flex items-center text-sm lg:text-lg font-semibold">
                        {book.title} {" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </h1>
                </Link>
                <div className="my-2 text-xs lg:text-sm flex flex-col gap-1">
                    <span>
                        Author : {book.author}
                    </span>
                    <span>
                        Pages : {book.pages}
                    </span>
                    <span>
                        Rent Per Day : {book.rentPerDay}rs
                    </span>
                </div>
                <div className="my-2 flex flex-wrap gap-1">
                    {
                        book.category.map((item) => (
                            <span key={item} className="inline-block rounded-full bg-blue-300 px-2 py-0.5 text-[10px] lg:text-xs font-semibold text-gray-900">
                                #{item}
                            </span>
                        ))
                    }
                </div>
                {remove
                    ? <button onClick={() => remove(book._id)} className="mt-1 ml-1 text-xs lg:text-sm py-1 px-3 bg-red-600 rounded-md" >Remove</button>
                    : <Link to={`/books/${book._id}`}>
                        <button className="text-xs lg:text-sm py-1 px-3 bg-blue-600 rounded-md">
                            View Details
                        </button>
                    </Link>
                }
                {rent && <button className="text-xs m-1 lg:text-sm py-1 px-3 bg-blue-600 rounded-md" onClick={() => rent(book._id)}>
                    Confirm Rent
                </button>}
            </div>
        </div>
    )
}

export default BookCard
