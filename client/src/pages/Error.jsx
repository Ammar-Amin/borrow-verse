import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <section className="mx-auto w-full max-w-7xl min-h-screen flex justify-center items-center pt-10 px-2 md:px-4">
            <div className="mx-auto my-12 flex max-w-6xl flex-col px-2 md:my-24 lg:my-32 lg:flex-row lg:items-center gap-10">
                <div className="lg:w-1/2">
                    <p className="text-sm lg:text-xl font-semibold">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold md:text-3xl lg:text-5xl">
                        We can't find that page
                    </h1>
                    <p className="mt-4">
                        Sorry, the page you are looking for doesn't exist or has been
                        moved.
                    </p>
                    <Link to='/' className="mt-6 flex items-center gap-x-3">
                        <Button>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <line x1={19} y1={12} x2={5} y2={12} />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back to Home page
                        </Button>
                    </Link>
                </div>
                <div className="hidden lg:block w-1/2">
                    <img src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8NDA0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt={404} className="h-full w-full rounded-md object-cover" />
                </div>
            </div>
        </section>
    )
}

export default Error
