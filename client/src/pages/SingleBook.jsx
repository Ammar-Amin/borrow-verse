import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBook = () => {
    const { id } = useParams()
    return (
        <div>
            SingleBook {id}
        </div>
    )
}

export default SingleBook
