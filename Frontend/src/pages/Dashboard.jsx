import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Briefcase, Shield, Bell, ArrowRight } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
    const userName = user?.full_name?.split(' ')[0] || 'Alex';

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-serif italic text-gray-900 mb-2">
                    {greeting}, <span className="font-bold not-italic">{userName}</span>
                </h1>
                <p className="text-gray-600">
                    Here is what's happening with your government services today.
                </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                    {
                        icon: Briefcase,
                        iconBg: 'bg-green-50',
                        iconColor: 'text-green-600',
                        title: '3 New Jobs Matching You',
                        description: 'Based on your verified software engineering skills and location.',
                        buttonText: 'View All',
                        route: '/jobs'
                    },
                    {
                        icon: Shield,
                        iconBg: 'bg-purple-50',
                        iconColor: 'text-purple-600',
                        title: '2 Schemes You Qualify For',
                        description: 'New energy subsidies and regional development grants are available.',
                        buttonText: 'Check Eligibility',
                        route: '/schemes'
                    },
                    {
                        icon: Bell,
                        iconBg: 'bg-blue-50',
                        iconColor: 'text-blue-600',
                        title: '1 Important Policy Update',
                        description: 'Updated regulations for small business digital transformation tax credits.',
                        buttonText: 'Read Update',
                        route: '/news'
                    }
                ].map((card, idx) => (
                    <Card
                        key={idx}
                        className="bg-white hover:shadow-lg transition-all duration-300 border-none"
                    >
                        <CardContent className="p-6 space-y-4">
                            <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                            <Button
                                variant="link"
                                className="text-gray-900 font-semibold p-0 h-auto hover:text-[#84CC16] flex items-center gap-2"
                                onClick={() => navigate(card.route)}
                            >
                                {card.buttonText}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Application Tracker */}
            <Card className="bg-white border-none">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-2xl font-bold">Application Tracker</CardTitle>
                    <Button
                        variant="link"
                        className="text-[#84CC16] font-semibold flex items-center gap-1"
                        onClick={() => navigate('/applications')}
                    >
                        View History
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Application 1 */}
                    <div className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">ID: #VISA-2024-9982</p>
                                <h4 className="text-lg font-bold text-gray-900">Business Visa Application</h4>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-700 border-none px-3 py-1">
                                UNDER REVIEW
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Estimated: 4 days remaining
                        </p>
                        {/* Progress Bar */}
                        <div className="relative">
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#84CC16] w-2/3"></div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                {['Submitted', 'Verification', 'Review', 'Decision'].map((step, idx) => (
                                    <div key={idx} className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full ${idx < 3 ? 'bg-[#84CC16]' : 'bg-gray-300'
                                            }`}></div>
                                        <span className={`text-xs mt-1 ${idx < 3 ? 'text-gray-900 font-semibold' : 'text-gray-400'
                                            }`}>
                                            {step}
                                        </span>
                                        {idx < 3 && (
                                            <span className="text-xs text-gray-400">
                                                Oct {12 + idx}, 2024
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Application 2 */}
                    <div className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">ID: #GRANT-DK-012</p>
                                <h4 className="text-lg font-bold text-gray-900">Digital Innovation Grant</h4>
                            </div>
                            <Badge className="bg-gray-100 text-gray-600 border-none px-3 py-1">
                                DRAFT
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500 italic">
                            Finish uploading your tax certificate to proceed.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
