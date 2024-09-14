import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserProtected = () => {
    const { user } = useSelector(state => state.auth)

    return user ? <Outlet /> : <Navigate to='/login' />
}

export default UserProtected
