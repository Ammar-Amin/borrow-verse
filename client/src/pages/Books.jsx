import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Filter } from 'lucide-react'
import { BookCard } from '@/components'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { bookCategories } from "../../../server/utils/bookCategories.js"

const Books = () => {
    const [search, setSearch] = useState('')
    const [openFilters, setOpenFilters] = useState(false)
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)
    const [filteredBooks, setFilteredBooks] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                let res = await axios.get('/api/book')
                setBooks(res.data.data)
                setFilteredBooks(res.data.data)
            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message || "An error occurred while fetching books")
            }
        }
        fetchBooks()
    }, [])

    useEffect(() => {
        filterBooks()
    }, [search, categories, books])

    const filterBooks = () => {
        let filtered = books

        if (search) {
            const query = search.toLowerCase()
            filtered = filtered.filter((book) => (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.category.some(cat => cat.toLowerCase().includes(query))
            ))
        }

        if (categories.length > 0) {
            filtered = filtered.filter(book =>
                book.category.some(cat => categories.includes(cat))
            )
        }

        setFilteredBooks(filtered)
    }

    const handleCategoryChange = (category) => {
        setCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

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
            {openFilters && (
                <>
                    <div className='w-full max-w-7xl mx-auto pt-4 px-10 grid grid-cols-2 lg:grid-cols-4 gap-1'>
                        {Object.values(bookCategories).map((category) => (
                            <div key={category} className="flex space-x-2">
                                <Checkbox
                                    id={category}
                                    checked={categories.includes(category)}
                                    onCheckedChange={() => handleCategoryChange(category)}
                                />
                                <label
                                    htmlFor={category}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() => setOpenFilters(false)} className="mt-4 block mx-auto">Apply Filters</Button>
                </>
            )}
            {error && <p className='text-center my-4 text-red-500'>{error}</p>}
            <section className='py-10 flex-center gap-5 flex-wrap'>
                {filteredBooks.length > 0
                    ? filteredBooks.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))
                    : <h1>No Books Found</h1>
                }
            </section>
        </main>
    )
}

export default Books