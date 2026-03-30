import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const PublicLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navItems = [
        { to: '/', label: 'Info' },
        { to: '/schemes', label: 'Schemes' },
        { to: '/jobs', label: 'Positions' },
        { to: '/news', label: 'Updates' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
        setDropdownOpen(false);
    };

    const initials = user?.full_name
        ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'AH';

    return (
        <div className="min-h-screen bg-[#F5F5F0]">
            {/* Navigation */}
            <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo */}
                        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#84CC16] rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-black" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">govAI</span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map(item => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#84CC16] group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </div>

                        {/* Right side — Auth aware */}
                        <div className="hidden md:flex items-center gap-3">
                            {user ? (
                                /* ── LOGGED IN: show avatar + dropdown ── */
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(o => !o)}
                                        className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-3 py-2 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#84CC16]/20 flex items-center justify-center">
                                            <span className="text-sm font-bold text-[#65A30D]">{initials}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {user.full_name?.split(' ')[0] || 'User'}
                                        </span>
                                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown */}
                                    {dropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                                            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-bold text-gray-900">{user.full_name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <button onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <LayoutDashboard className="w-4 h-4 text-gray-400" />
                                                    Dashboard
                                                </button>
                                                <button onClick={() => { navigate('/profile'); setDropdownOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    My Profile
                                                </button>
                                                <div className="border-t border-gray-100 mt-1 pt-1">
                                                    <button onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                                        <LogOut className="w-4 h-4" />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                /* ── NOT LOGGED IN: Sign In + Get Started ── */
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-gray-700 hover:text-gray-900 font-semibold px-5 py-2 rounded-full hover:bg-gray-100 transition-all"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="bg-[#84CC16] hover:bg-[#65A30D] text-black font-semibold px-6 py-2.5 rounded-full shadow-md transition-all"
                                    >
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(o => !o)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map(item => (
                                <Link key={item.to} to={item.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-gray-700 hover:text-gray-900 font-medium py-2">
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-3 border-t border-gray-200">
                                {user ? (
                                    <>
                                        <button onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                                            className="w-full flex items-center gap-2 bg-[#84CC16] hover:bg-[#65A30D] text-black font-semibold py-3 rounded-xl justify-center">
                                            <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                                        </button>
                                        <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                            className="w-full text-red-500 border border-red-200 hover:bg-red-50 font-semibold py-3 rounded-xl">
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                                            className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl">
                                            Sign In
                                        </button>
                                        <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                                            className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-semibold py-3 rounded-xl">
                                            Get Started
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
