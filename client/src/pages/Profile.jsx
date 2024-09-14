import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { user } = useSelector(state => state.auth)
    const [allRentals, setAllRentals] = useState([])

    useEffect(() => {
        async function allRentedBooks() {
            try {
                let res = await axios('/api/transaction')
                console.log(res.data.data)
                setAllRentals(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        allRentedBooks()
    }, [])

    return (
        <main className='w-full max-w-7xl mx-auto min-h-screen flex-center'>
            <div className='space-y-4'>
                <h1 className='text-3xl lg:text-5xl xl:text-6xl text-center'>Profile Page</h1>
                <p className='text-xl lg:text-3xl xl:text-4xl'>Welcome, {user.name}</p>
                <p className='text-xl lg:text-3xl xl:text-4xl'>Id : {user._id}</p>
                <p className='text-xl lg:text-3xl xl:text-4xl'>Email : {user.email}</p>
                <p className='text-xl lg:text-3xl xl:text-4xl'>Phone : {user.phone}</p>
                <p className='text-xl lg:text-3xl xl:text-4xl'>Address : {user.address}</p>
            </div>
            <div className='flex-center bg-red-500 flex-wrap gap-3'>
                {
                    allRentals.length !== 0 &&
                    allRentals.map((book) => (
                        <div key={book._id}>{book.bookId.name}</div>
                    ))
                }
            </div>
        </main>
    )
}

export default Profile
