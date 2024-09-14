import { BackToBooks, BookCard } from '@/components'
import { toast } from '@/hooks/use-toast'
import { removeBookFromCart } from '@/store/slice/cartSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [rentSuccess, setRentSuccess] = useState(false)

    const remove = (id) => {
        dispatch(removeBookFromCart(id))
    }

    const rentBook = async (bookId) => {
        try {
            let res = await axios.post(
                '/api/transaction/',
                {
                    userId: user._id,
                    bookId,
                    issueDate: new Date()
                }
            )
            // console.log(res)
            setRentSuccess(true)
            toast({ title: res.data.message })
            remove(bookId)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className='w-full max-w-7xl mx-auto min-h-screen flex-center'>
            <div className='pt-20 md:pt-24 lg:pt-28'>
                <BackToBooks />
                <h1 className='text-3xl lg:text-5xl text-center'>Your Cart Items</h1>
                <section className='py-10 flex-center gap-5 flex-wrap'>
                    {
                        cart.length === 0 ? "Cart is Empty"
                            : cart.map((book) => (
                                <BookCard book={book} key={book._id} remove={remove} rent={rentBook} />
                            ))
                    }
                </section>
                {setRentSuccess && <p className='text-center underline text-green-600'>
                    <Link to='/profile'>Check Your Profile</Link>
                </p>}
                {cart.length > 0 && <p className='text-center'>You total Rent would be {cart.reduce((acc, book) => acc + book.rentPerDay, 0)}rs per day</p>}
            </div>
        </main>
    )
}

export default Cart
