import { login } from "@/store/slice/authSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function useGetCurrUser() {
    const [user, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await axios('/api/user')
            // console.log(res.data)
            if (res.data.success) {
                dispatch(login(res.data.data))
                setUserData(res.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            setError(error.response.data.message || error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { user, isLoading, error }
}