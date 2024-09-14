import { UserTransactions } from '@/components'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { user } = useSelector(state => state.auth)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTransactions = async () => {
        try {
            const res = await axios('/api/transaction')
            console.log(res.data.data)
            setTransactions(res.data.data);
            setLoading(false)
        } catch (err) {
            setError(err.message);
            setLoading(false)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchTransactions();
    }, []);

    const returnBook = async (bookId) => {
        try {
            let res = await axios.put('/api/transaction',
                { bookId, userId: user._id, returnDate: new Date() },
            )
            console.log(res.data)
            toast({ title: res.data.message })
            fetchTransactions()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className='w-full max-w-7xl mx-auto min-h-screen flex-center'>
            <div className='px-3 space-y-4 text-center'>
                <h1 className='text-3xl lg:text-5xl xl:text-6xl text-center'>Profile Page</h1>
                <p className='text-lg lg:text-2xl'>Welcome, {user.name}</p>
                <p className='text-lg lg:text-2xl'>Id : {user._id}</p>
                <p className='text-lg lg:text-2xl'>Email : {user.email}</p>
                <p className='text-lg lg:text-2xl'>Phone : {user.phone}</p>
                <p className='text-lg lg:text-2xl'>Address : {user.address}</p>
                <UserTransactions
                    transactions={transactions}
                    loading={loading}
                    error={error}
                    returnBook={returnBook}
                />
            </div>
        </main>
    )
}

export default Profile
