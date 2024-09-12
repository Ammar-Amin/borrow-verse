import { BookCard } from '@/components'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Books = () => {
    const [search, setSearch] = useState('')
    const [openFilters, setOpenFilters] = useState(false)
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                let res = await axios.get('/api/book')
                // console.log(res.data)
                setBooks(res.data.data)
            } catch (error) {
                console.log(error)
                setError(error.response.data.message)
            }
        }
        fetchBooks()
    }, [search])


    return (
        <main className='px-3 w-full max-w-7xl mx-auto min-h-screen'>
            <div className='pt-20 md:pt-24 lg:pt-28 w-full max-w-md mx-auto flex justify-between items-center gap-3'>
                <Input
                    placeholder="Search Books"
                    className="w-full max-w-96"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Filter onClick={() => setOpenFilters(!openFilters)} />
            </div>
            {
                openFilters &&
                <div>
                    our FIlters here
                </div>
            }
            {error && <p className='text-center my-4 text-red-500'>{error}</p>}
            <section className='py-10 flex-center gap-5 flex-wrap'>
                {
                    books &&
                    books.length > 0 &&
                    books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))
                }
            </section>
        </main>
    )
}

export default Books
