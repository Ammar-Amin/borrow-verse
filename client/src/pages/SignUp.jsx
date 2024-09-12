import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        // console.log(formData)
        try {
            const res = await axios.post('/api/auth/register', formData)
            // console.log(res.data)
            if (res.data.success) {
                setLoading(false)
                navigate('/login')
            }
        } catch (error) {
            // console.log(error.response.data.message)
            setError(error.response.data.message)
            setLoading(false)
        }

    }

    return (
        <main className='h-screen flex-center mx-8'>
            <div className='w-full max-w-[350px] p-5 mt-16 bg-slate-900 rounded-md'>
                <h1 className='ml-2 mb-4 text-xl font-medium'>Sign Up</h1>
                <form onSubmit={handleSubmit}
                    className='space-y-2'>
                    <Input
                        name='name'
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        name='email'
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        name='password'
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Input
                        name='phone'
                        type="number"
                        max="9999999999"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Textarea
                        name='address'
                        placeholder="Your Address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {error && <p className='text-center text-red-500'>{error}</p>}
                    <Button className="w-full" disabled={loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </Button>
                </form>
                <div className='mt-3 text-xs text-center'>Already have an account? <Link to='/login' className='text-blue-400 underline'>Log In</Link></div>
            </div>
        </main>
    )
}

export default SignUp
