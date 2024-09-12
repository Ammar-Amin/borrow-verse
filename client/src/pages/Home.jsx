import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main className='w-full min-h-screen '>
            <div className='pt-16 lg:pt-20'>
                <img src='https://img.freepik.com/free-vector/bookstore-library-interior-with-books-racks_107791-30393.jpg?w=1380&t=st=1726119770~exp=1726120370~hmac=dca694a06e4eb8e8d87ec47ba04487e41eaa6674f96a8b722dc3211a96900d66'
                    alt='banner image'
                    className='w-full'
                />
                <div className='px-4 md:pt-5 lg:pt-0 lg:flex-center'>
                    <div className='my-4 space-y-4 md:max-w-xl mx-auto lg:w-1/2 lg:pl-20'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-medium'>Find & Borrow<br /> your next Good Read</h1>
                        <p className='text-sm md:text-base xl:text-lg'>Discover a world of stories at your fingertips. Borrow, enjoy, and immerse yourself in the next chapter of your reading journey.</p>
                        <div>
                            <Link to='/books'>
                                <Button className="text-sm md:text-base xl:text-lg rounded-full text-white">
                                    View Books
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <img src='https://www.btes.co.in/skin/images/btes-upload/uspLogo/5fb68bb9cae31.png' alt='book image' className='md:w-1/2 lg:w-1/3 mx-auto' />
                </div>
            </div>
        </main>
    )
}

export default Home
