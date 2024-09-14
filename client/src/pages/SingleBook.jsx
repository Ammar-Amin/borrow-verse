import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from '@/hooks/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { addBook } from '@/store/slice/readListSlice'
import { addBookToCart } from '@/store/slice/cartSlice'
import { BackToBooks } from '@/components'




const SingleBook = () => {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [error, setError] = useState(null)
    const { toast } = useToast()

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const addToBookList = () => {
        dispatch(addBook(book))
        toast({
            title: "Book added to Book List",
        })
    }
    const addToCart = () => {
        dispatch(addBookToCart(book))
        toast({
            title: "Book added to Cart",
        })
    }

    const updateBook = () => {
    }

    const deleteBook = () => {
    }

    useEffect(() => {
        const fetchBook = async () => {
            try {
                let res = await axios.get('/api/book/' + id)
                setBook(res.data.data)
            } catch (error) {
                console.log(error)
                setError(error.response.data.message || error.message)
            }
        }
        fetchBook()
    })
    return (
        <main className='px-3 w-full max-w-7xl mx-auto min-h-screen flex-center'>
            <div className='pt-20 md:pt-24 lg:pt-28 pb-10'>
                <BackToBooks />
                {
                    book &&
                    <div className='w-full md:flex md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto md:space-x-10'>
                        <div className='w-[300px] md:w-1/2 mx-auto flex-center relative'>
                            <div className={`absolute top-0 right-0 py-1 px-3 ${book.isAvailable ? "bg-green-600" : "bg-red-700"}`}>{book.isAvailable ? "Available" : "Not Available"}</div>
                            <img src={book.image} alt={book.title} />
                        </div>
                        <div className='md:w-1/2 px-4 pt-4 flex-center md:pt-0'>
                            <div className='space-y-4'>
                                <h1 className='text-2xl lg:text-4xl xl:text-5xl'>{book.title}</h1>
                                <p className='text-sm lg:text-base xl:text-lg'>
                                    {book.description}
                                </p>
                                <div className='text-sm lg:text-base xl:text-lg'>
                                    <p>Author : <span className='font-semibold'>
                                        {book.author}
                                    </span>
                                    </p>
                                    <p>Pages : <span className='font-semibold'>
                                        {book.pages}
                                    </span>
                                    </p>
                                    <p>Rent Per Day : <span className='font-semibold'>
                                        {book.rentPerDay}rs
                                    </span>
                                    </p>
                                </div>
                                {
                                    user ? <div className='flex gap-3'>
                                        <div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger onClick={user?.isAdmin
                                                        ? updateBook
                                                        : addToBookList}>
                                                        <Button>
                                                            {user?.isAdmin
                                                                ? "Edit Book"
                                                                : "Book List"}
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            {user?.isAdmin
                                                                ? "Edit Book Details"
                                                                : "Add to Book List"}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger onClick={!user?.isAdmin && book.isAvailable && addToCart}>
                                                        {user?.isAdmin
                                                            ? <AlertDialog>
                                                                <AlertDialogTrigger>Delete Book</AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will permanently delete your account
                                                                            and remove your data from our servers.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={deleteBook}>Continue</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                            : <Button disable={!book.isAvailable}>{book.isAvailable ? "Rent Now" : "UnAvailable"}</Button>
                                                        }
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{user?.isAdmin
                                                            ? "Delete Book Details"
                                                            : book.isAvailable ? "Add to Cart" : "Book already rented"}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                        : <div className='m-3'>
                                            <Link to='/login'>
                                                <Button>Login to Add to Cart</Button>
                                            </Link>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {error && <p className='text-center my-4 text-red-500'>{error}</p>}
            </div>
        </main >
    )
}

export default SingleBook
