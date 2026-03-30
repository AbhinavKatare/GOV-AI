import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    User,
    FileText,
    Briefcase,
    Settings,
    Bell,
    Menu,
    X,
    LogOut,
    Shield,
    Search,
    Bot,
    Newspaper
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const NAV_ITEMS = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/applications', icon: FileText, label: 'Applications', badge: '3' },
    { to: '/schemes', icon: Briefcase, label: 'Schemes' },
    { to: '/news', icon: Newspaper, label: 'News Feed' },
    { to: '/assistant', icon: Bot, label: 'AI Assistant' },
    { to: '/notifications', icon: Bell, label: 'Notifications', badge: '2' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

const SidebarItem = ({ to, icon: Icon, label, badge }) => (
    <NavLink
        to={to}
        end={to === '/dashboard'}
        className={({ isActive }) =>
            `flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                ? 'bg-[#84CC16]/10 text-gray-900 font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`
        }
    >
        {({ isActive }) => (
            <>
                <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#84CC16]' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span className="text-sm">{label}</span>
                </div>
                {badge && (
                    <span className="bg-[#84CC16] text-black text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {badge}
                    </span>
                )}
            </>
        )}
    </NavLink>
);

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const initials = user?.full_name
        ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : user?.name?.charAt(0)?.toUpperCase() || 'AH';

    return (
        <div className="min-h-screen flex bg-[#F5F5F0]">

            {/* ── SIDEBAR ── */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-white border-r border-gray-200 flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="w-9 h-9 bg-[#84CC16] rounded-full flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 leading-none text-sm">govAI</p>
                            <p className="text-[9px] text-gray-400 tracking-widest mt-0.5">CITIZEN PORTAL</p>
                        </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg">
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
                    {NAV_ITEMS.map(item => <SidebarItem key={item.to} {...item} />)}
                </nav>

                {/* User + Logout */}
                <div className="p-3 border-t border-gray-100 space-y-1">
                    <button
                        onClick={() => navigate('/profile')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="w-9 h-9 rounded-full bg-[#84CC16]/20 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-[#65A30D]">{initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {user?.full_name || user?.name || 'Alex Henderson'}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{user?.email || 'citizen'}</p>
                        </div>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ── MAIN AREA ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Search */}
                    <div className="hidden md:flex flex-1 max-w-sm">
                        <div className="relative w-full">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={() => navigate('/notifications')}
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Notifications"
                        >
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-9 h-9 rounded-full bg-[#84CC16]/20 flex items-center justify-center hover:bg-[#84CC16]/30 transition-colors"
                            title="Profile"
                        >
                            <span className="text-sm font-bold text-[#65A30D]">{initials}</span>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
