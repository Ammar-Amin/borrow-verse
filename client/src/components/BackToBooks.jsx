import React from 'react'
import { Link } from 'react-router-dom'

const BackToBooks = () => {
    return (
        <Link to='/books' className='my-4 flex items-center text-blue-500'>
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <line x1={19} y1={12} x2={5} y2={12} />
                <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to All books
        </Link>
    )
}

export default BackToBooks
