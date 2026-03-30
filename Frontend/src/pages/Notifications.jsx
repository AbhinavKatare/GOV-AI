import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
    Bell,
    CheckCircle,
    AlertCircle,
    Info,
    Briefcase,
    FileText,
    Award,
    Clock,
    X
} from 'lucide-react';

const Notifications = () => {
    const [filter, setFilter] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            icon: CheckCircle,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-50',
            title: 'Application Approved',
            message: 'Your Business Visa Application (#VISA-2024-9982) has moved to verification stage.',
            time: '2 hours ago',
            read: false,
            category: 'application'
        },
        {
            id: 2,
            type: 'info',
            icon: Briefcase,
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-50',
            title: 'New Job Match',
            message: 'A Senior UI/UX Designer position at Digital Innovation Department matches your profile (98% match).',
            time: '5 hours ago',
            read: false,
            category: 'job'
        },
        {
            id: 3,
            type: 'warning',
            icon: AlertCircle,
            iconColor: 'text-yellow-600',
            iconBg: 'bg-yellow-50',
            title: 'Document Required',
            message: 'Please upload your tax certificate to proceed with Digital Innovation Grant application.',
            time: '1 day ago',
            read: true,
            category: 'application'
        },
        {
            id: 4,
            type: 'info',
            icon: Award,
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-50',
            title: 'New Scheme Available',
            message: 'National Tech Startup Grant 2024 is now open. You qualify based on your verified credentials.',
            time: '2 days ago',
            read: true,
            category: 'scheme'
        },
        {
            id: 5,
            type: 'info',
            icon: Info,
            iconColor: 'text-gray-600',
            iconBg: 'bg-gray-50',
            title: 'Policy Update',
            message: 'New regulations for small business digital transformation tax credits are now in effect.',
            time: '3 days ago',
            read: true,
            category: 'policy'
        },
        {
            id: 6,
            type: 'success',
            icon: FileText,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-50',
            title: 'Documents Verified',
            message: 'Your DigiLocker documents have been successfully verified and updated in your profile.',
            time: '5 days ago',
            read: true,
            category: 'account'
        }
    ]);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const filteredNotifications = filter === 'all'
        ? notifications
        : filter === 'unread'
            ? notifications.filter(n => !n.read)
            : notifications.filter(n => n.category === filter);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            Notifications
                            {unreadCount > 0 && (
                                <Badge className="bg-[#84CC16] text-black rounded-full px-3 py-1">
                                    {unreadCount} new
                                </Badge>
                            )}
                        </h1>
                        <p className="text-gray-600 mt-1">Stay updated with your applications and opportunities</p>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            onClick={markAllAsRead}
                            variant="outline"
                            className="border-gray-300"
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { value: 'all', label: 'All' },
                        { value: 'unread', label: 'Unread' },
                        { value: 'application', label: 'Applications' },
                        { value: 'job', label: 'Jobs' },
                        { value: 'scheme', label: 'Schemes' },
                        { value: 'policy', label: 'Policies' }
                    ].map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value)}
                            className={`px-4 py-2 rounded-full font-medium transition-all ${filter === value
                                    ? 'bg-[#84CC16] text-black'
                                    : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-12 text-center">
                            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredNotifications.map((notif) => (
                        <Card
                            key={notif.id}
                            className={`border-none shadow-sm hover:shadow-md transition-all cursor-pointer ${!notif.read ? 'bg-blue-50/50 border-l-4 border-l-[#84CC16]' : 'bg-white'
                                }`}
                        >
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-xl ${notif.iconBg} flex items-center justify-center flex-shrink-0`}>
                                        <notif.icon className={`w-6 h-6 ${notif.iconColor}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="font-bold text-gray-900">{notif.title}</h3>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {!notif.read && (
                                                    <button
                                                        onClick={() => markAsRead(notif.id)}
                                                        className="text-xs text-[#84CC16] hover:text-[#65A30D] font-semibold"
                                                    >
                                                        Mark read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notif.id)}
                                                    className="p-1 hover:bg-gray-100 rounded"
                                                >
                                                    <X className="w-4 h-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{notif.message}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            <span>{notif.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Empty State for Filtered Results */}
            {filteredNotifications.length === 0 && filter !== 'all' && (
                <div className="mt-8 text-center">
                    <Button
                        onClick={() => setFilter('all')}
                        variant="outline"
                    >
                        View all notifications
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Notifications;
