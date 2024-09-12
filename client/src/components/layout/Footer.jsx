import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram, GitHub } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 py-8">
            <div className="container mx-auto px-4">
                <div className="pl-10 md:pl-20 lg:pl-32 xl:pl-40 flex flex-wrap justify-between">
                    {/* Navigation Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><Link to="/" className="hover:text-gray-300">Home</Link></li>
                            <li className="mb-2"><Link to="/books" className="hover:text-gray-300">Books</Link></li>
                            <li className="mb-2"><Link to="/" className="hover:text-gray-300">About Us</Link></li>
                            <li className="mb-2"><Link to="/" className="hover:text-gray-300">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="mb-2">123 Library Street</p>
                        <p className="mb-2">Bandra, Mumbai</p>
                        <p className="mb-2">Phone: (123) 456-7890</p>
                        <p>Email: borrow@verse.com</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link
                                to="https://facebook.com" className="hover:text-gray-300"
                                target='_blank'
                            >
                                <Facebook size={24} />
                            </Link>
                            <Link
                                to="https://twitter.com/@Ammar_Amin007" className="hover:text-gray-300"
                                target='_blank'
                            >
                                <Twitter size={24} />
                            </Link>
                            <Link
                                to="https://instagram.com" className="hover:text-gray-300"
                                target='_blank'
                            >
                                <Instagram size={24} />
                            </Link>
                            <Link
                                to="https://github.com/Ammar-Amin" className="hover:text-gray-300"
                                target='_blank'
                            >
                                <Github size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p>&copy; {currentYear} Your Library Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer
