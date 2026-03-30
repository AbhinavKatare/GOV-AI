import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, CheckCircle, Upload, Shield, Sparkles, TrendingUp, Calendar } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F5F5F0]">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-left space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Your AI-Powered<br />
                                Gateway to<br />
                                Government
                            </h1>
                            <p className="text-3xl font-serif italic text-gray-600">
                                Modernizing Governance
                            </p>
                            <p className="text-lg text-gray-600 max-w-lg">
                                Discover personalized schemes, find exceptional government schemes designed for your future with our AI-driven matching engine. Secure, efficient, and citizen-first.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button
                                    size="lg"
                                    className="bg-[#84CC16] hover:bg-[#65A30D] text-black font-semibold px-8 py-6 rounded-full text-lg shadow-lg"
                                    onClick={() => navigate('/schemes')}
                                >
                                    Explore Opportunities <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-black hover:bg-gray-800 text-white border-black px-8 py-6 rounded-full text-lg"
                                    onClick={() => navigate('/about')}
                                >
                                    How it works
                                </Button>
                            </div>
                        </div>

                        {/* Right Images */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop"
                                        alt="Professional 1"
                                        className="w-full h-72 object-cover rounded-3xl shadow-2xl"
                                    />
                                </div>
                                <div className="space-y-4 pt-12">
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop"
                                        alt="Professional 2"
                                        className="w-full h-72 object-cover rounded-3xl shadow-2xl"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop"
                                        alt="Professional 3"
                                        className="w-full h-48 object-cover rounded-3xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Resume Analysis Section */}
            <section className="bg-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <Badge className="bg-[#84CC16] text-black px-4 py-2 rounded-full font-semibold">
                                SMART MATCHING
                            </Badge>
                            <h2 className="text-4xl font-bold">
                                AI Resume Analysis &<br />
                                Direct Role Matching
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Upload your resume and let our neural networks parse your skills and match thousands of active job positions and scheme level opportunities with you.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#84CC16]" />
                                    <span>Parse all skill and career path 'match-to'</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#84CC16]" />
                                    <span>Secure AI-driven skill matching</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#84CC16]" />
                                    <span>AI-automated pre-filtering before high ranking roles</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Upload Box */}
                        <div className="bg-gray-800 rounded-3xl p-12 text-center border border-gray-700">
                            <div className="w-20 h-20 bg-[#84CC16] rounded-full flex items-center justify-center mx-auto mb-6">
                                <Upload className="w-10 h-10 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Upload Resume</h3>
                            <p className="text-gray-400 mb-6">PDF, DOCX, TXT up to 10MB</p>
                            <Button
                                className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-6 rounded-full w-full"
                                onClick={() => navigate('/login')}
                            >
                                Browse Files or Acc.connect
                            </Button>
                            <p className="text-xs text-gray-500 mt-6">
                                Browse files or connect to Acc.connect
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Updates Section */}
            <section className="py-20 bg-[#F5F5F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">Trending Updates</h2>
                            <p className="text-gray-600">Stay informed about every new GovT development</p>
                        </div>
                        <Button
                            variant="link"
                            className="text-black font-semibold"
                            onClick={() => navigate('/news')}
                        >
                            View all updates →
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                badge: 'POLICY',
                                badgeColor: 'bg-[#84CC16]',
                                title: 'New Digital Governance Act 2024',
                                description: 'Comprehensive legislation for digital transformation of government services has been enacted.',
                                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
                                date: '1 hour ago'
                            },
                            {
                                badge: 'OPPORTUNITY',
                                badgeColor: 'bg-[#84CC16]',
                                title: 'National Tech Grant Program Open',
                                description: 'Apply funding for students pursing breakthrough tech projects at postgraduate level.',
                                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
                                date: '2 hours ago'
                            },
                            {
                                badge: 'HIRING',
                                badgeColor: 'bg-[#84CC16]',
                                title: 'Civil Service India Surge 2024',
                                description: 'New facilities in new centers has resulted in more career paths for budding bureaucracy.',
                                image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
                                date: '5 hours ago'
                            }
                        ].map((update, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={update.image}
                                        alt={update.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className={`${update.badgeColor} text-black px-3 py-1 rounded-full text-xs font-bold`}>
                                            {update.badge}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                        {update.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                        {update.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{update.date}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-16 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Shield, label: 'Govt Grade', value: 'A+ES' },
                            { icon: CheckCircle, label: 'GDPR Trust #', value: 'GDPR Trust #' },
                            { icon: Sparkles, label: 'DigiLocker', value: 'DigiLocker' },
                            { icon: TrendingUp, label: 'AES-256', value: 'AES-256' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2">
                                <item.icon className="w-6 h-6 text-gray-400" />
                                <span className="text-sm text-gray-600">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#84CC16] rounded-full flex items-center justify-center">
                                    <span className="text-black font-bold text-sm">G</span>
                                </div>
                                <span className="text-xl font-bold">govAI</span>
                            </div>
                            <p className="text-sm text-gray-400">
                                AI-transforming how you access & utilize govt services & aid access aid.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Platform</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="/jobs" className="hover:text-white">Find Jobs</a></li>
                                <li><a href="/schemes" className="hover:text-white">Public Schemes</a></li>
                                <li><a href="/news" className="hover:text-white">Portal Analytics</a></li>
                                <li><a href="#" className="hover:text-white">API Access</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Security Audit</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Newsletter</h4>
                            <p className="text-sm text-gray-400 mb-4">Get weekly updates on new government schemes</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
                                />
                                <Button className="bg-[#84CC16] hover:bg-[#65A30D] text-black px-6 rounded-full">
                                    →
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>© 2024 govAI. All rights reserved. Powered by National Infrastructure Platform Infrastructure Platform & AI Ecosystem.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
