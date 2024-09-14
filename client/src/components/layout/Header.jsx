import { WEB_NAME } from '@/constant'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { RiMenu2Fill } from "react-icons/ri";
import useGetCurrUser from '@/hooks/useGetCurrUser'
import { FaShoppingCart } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {

    const { user, isLoading, error } = useGetCurrUser()
    const { status } = useSelector(state => state.auth)

    const leftNav = [
        {
            name: 'Home',
            path: '/',
            active: true
        },
        {
            name: 'Books',
            path: '/books',
            active: true
        },
        {
            name: 'Create Book',
            path: '/create-book',
            active: user?.isAdmin
        },
        {
            name: 'Profile',
            path: '/profile',
            active: status
        },
    ]

    const rightNav = [
        {
            name: <MdAccountCircle />,
            path: '/login',
            active: !status
        },
        {
            name: <FaClipboardList />,
            path: '/read-list',
            active: status
        },
        {
            name: <FaShoppingCart />,
            path: '/cart',
            active: status
        }
    ]

    return (
        <header className='w-full fixed top-0 z-50 bg-slate-900 py-4 md:py-6'>
            <nav className='px-4 sm:px-8 w-full max-w-7xl mx-auto flex justify-between items-center'>
                {/* LEFT NAV  */}
                <div className='text-xs space-x-4'>
                    <Sheet>
                        <SheetTrigger>
                            <span className='text-base sm:text-lg lg:text-xl'>
                                <RiMenu2Fill />
                            </span>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle></SheetTitle>
                                <SheetDescription>
                                    <SheetClose asChild>
                                        <span className="h-full flex flex-col gap-2 pt-4">
                                            {leftNav.map((item) => (
                                                item.active &&
                                                <SheetClose key={item.name} asChild>
                                                    <Link key={item.name} to={item.path}
                                                        className='pl-4 py-1 text-left lg:text-center text-sm md:text-base font-medium hover:underline'
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </span>
                                    </SheetClose>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                {/* MIDDLE NAV  */}
                <Link to='/' className='text-xl lg:text-2xl'>{WEB_NAME}</Link>
                {/* RIGHT NAV  */}
                <div className='text-xs sm:text-sm lg:text-base flex-center gap-1 md:gap-3'>
                    {rightNav.map((item, index) => (
                        item.active && <Link key={index} to={item.path} className={` ${item.path == '/login' ? 'text-lg md:text-xl' : ''}`}>{item.name}</Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Header
