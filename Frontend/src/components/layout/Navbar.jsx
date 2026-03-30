import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                GA
                            </div>
                            <span className="font-bold text-xl text-gray-900">govAI</span>
                        </Link>
                        <div className="hidden md:flex ml-10 space-x-8">
                            <Link to="/schemes" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Schemes</Link>
                            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Jobs</Link>
                            <Link to="/news" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">News</Link>
                            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                    </div>
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/schemes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Schemes</Link>
                        <Link to="/jobs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Jobs</Link>
                        <Link to="/news" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">News</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">About</Link>
                        <div className="mt-4 flex flex-col gap-2">
                            <Link to="/login">
                                <Button variant="ghost" className="w-full justify-start">Login</Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button variant="primary" className="w-full justify-center">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
