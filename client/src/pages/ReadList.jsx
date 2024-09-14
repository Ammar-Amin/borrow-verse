import { BackToBooks, BookCard } from '@/components'
import { removeBook } from '@/store/slice/readListSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ReadList = () => {
    const readList = useSelector(state => state.readList)
    const dispatch = useDispatch()

    const remove = (id) => {
        dispatch(removeBook(id))
    }

    return (
        <main className='w-full max-w-7xl mx-auto min-h-screen flex-center'>
            <div className='pt-20 md:pt-24 lg:pt-28'>
                <BackToBooks />
                <h1 className='text-3xl lg:text-5xl text-center'>Your Read List Items</h1>
                <section className='py-10 flex-center gap-5 flex-wrap'>
                    {
                        readList.length === 0 ? "Read List is Empty"
                            : readList.map((book) => (
                                <BookCard book={book} key={book._id} remove={remove} />
                            ))
                    }
                </section>
            </div>
        </main>
    )
}

export default ReadList
