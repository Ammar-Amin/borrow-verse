import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login } from '@/store/slice/authSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const res = await axios.post('/api/auth/login', formData)

            if (res.data.success) {
                dispatch(login(res.data.data))
                setLoading(false)
                navigate('/')
            }
        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }

    }

    return (
        <main className='h-screen flex-center mx-8'>
            <div className='w-full max-w-[350px] p-5 mt-16 bg-slate-900 rounded-md'>
                <h1 className='ml-2 mb-4 text-xl font-medium'>Log In</h1>
                <form onSubmit={handleSubmit}
                    className='space-y-4'>
                    <Input
                        name='email'
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        name='password'
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {error && <p className='text-center text-red-500'>{error}</p>}
                    <Button className="w-full" disabled={loading}>
                        {loading ? "Loading..." : "Log In"}
                    </Button>
                </form>
                <div className='mt-3 text-xs text-center'>Don't have an account? <Link to='/signup' className='text-blue-400 underline'>Sign Up</Link></div>
            </div>
        </main>
    )
}

export default Login
