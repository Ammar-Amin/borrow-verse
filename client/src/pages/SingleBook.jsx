import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from '@/hooks/use-toast'



const SingleBook = () => {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [error, setError] = useState(null)
    const { toast } = useToast()

    const addToBookList = () => {
        toast({
            title: "Book added to Book List",
        })
    }
    const addToCart = () => {
        toast({
            title: "Book added to Cart",
        })
    }

    useEffect(() => {
        const fetchBook = async () => {
            try {
                let res = await axios.get('/api/book/' + id)
                setBook(res.data.data)
            } catch (error) {
                console.log(error)
                setError(error.response.data.message)
            }
        }
        fetchBook()
    })
    return (
        <main className='px-3 w-full max-w-7xl mx-auto min-h-screen flex-center'>
            <div className='pt-20 md:pt-24 lg:pt-28 pb-10'>
                {
                    book &&
                    <div className='w-full md:flex md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto md:space-x-10'>
                        <div className='w-[300px] md:w-1/2 mx-auto flex-center'>
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
                                <div className='flex gap-3'>
                                    <div>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger onClick={addToBookList}>
                                                    <Button>
                                                        Book List
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Add to Book List</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger onClick={addToCart}>
                                                    <Button>
                                                        Rent Now
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Add to Cart</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
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
