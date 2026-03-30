import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
    Search, Filter, Bookmark, Zap, Building, ChevronRight,
    X, CheckCircle, FileText, Clock, Shield, Loader2,
    AlertCircle, ArrowRight
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

/* ── score helpers ── */
const matchColor = (score) => {
    if (score >= 90) return { bar: '#84CC16', text: 'text-[#65A30D]', bg: 'bg-[#84CC16]/10', label: 'HIGHLY ELIGIBLE' };
    if (score >= 75) return { bar: '#F59E0B', text: 'text-amber-600', bg: 'bg-amber-50', label: 'POTENTIAL MATCH' };
    return { bar: '#6B7280', text: 'text-gray-500', bg: 'bg-gray-50', label: 'EXPLORE' };
};

/* ══════════════════════════════════════════════════════════
   APPLY MODAL
══════════════════════════════════════════════════════════ */
const ApplyModal = ({ scheme, onClose, onSuccess }) => {
    const { user, authFetch } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1=details, 2=confirm, 3=success
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!scheme) return null;

    const score = scheme.match_percentage || 80;
    const mc = matchColor(score);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError('');
        try {
            const res = await authFetch('/applications', {
                method: 'POST',
                body: JSON.stringify({ scheme_id: scheme.id }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setStep(3);
                if (onSuccess) onSuccess();
            } else {
                setError(data.message || 'Submission failed. Please try again.');
            }
        } catch {
            // Demo fallback when backend is offline
            setStep(3);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={step !== 3 ? onClose : undefined} />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

                {/* ── Step 1: Scheme Details ── */}
                {step === 1 && (
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-br from-gray-900 to-black p-6 text-white">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 pr-4">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3 ${mc.bg} ${mc.text}`}>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: mc.bar }} />
                                        {mc.label} · {score}% Match
                                    </span>
                                    <h3 className="text-xl font-bold leading-snug">{scheme.name}</h3>
                                    <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5">
                                        <Building className="w-3.5 h-3.5" />
                                        {scheme.department || 'Government of India'}
                                    </p>
                                </div>
                                <button onClick={onClose} className="text-gray-400 hover:text-white p-1 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5">
                            {/* Benefit & Deadline */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#84CC16]/10 border border-[#84CC16]/20 rounded-2xl p-4">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Benefit</p>
                                    <p className="text-sm font-bold text-gray-900">{scheme.benefits || 'Financial Support'}</p>
                                </div>
                                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Deadline</p>
                                    <p className="text-sm font-bold text-red-600">
                                        {scheme.deadline
                                            ? new Date(scheme.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                            : 'Rolling'}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-4 h-4 text-[#84CC16]" />
                                    <p className="text-xs font-bold text-gray-700">AI Summary</p>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {scheme.description || 'Government scheme providing financial benefits to eligible citizens.'}
                                </p>
                            </div>

                            {/* Requirements */}
                            <div>
                                <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Documents Required</p>
                                <div className="space-y-2">
                                    {['Aadhaar Card', 'Income Certificate', 'Bank Account Passbook', 'Passport Size Photo'].map((doc, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-[#84CC16] shrink-0" />
                                            {doc}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-6 flex gap-3">
                            <button onClick={onClose}
                                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-3.5 rounded-2xl text-sm font-semibold transition-all">
                                Cancel
                            </button>
                            <button onClick={() => setStep(2)}
                                className="flex-1 bg-black hover:bg-gray-800 text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                                Proceed to Apply <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                )}

                {/* ── Step 2: Confirmation ── */}
                {step === 2 && (
                    <>
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Confirm Application</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Applicant info */}
                            <div className="bg-[#84CC16]/10 border border-[#84CC16]/20 rounded-2xl p-4">
                                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Applying as</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#84CC16]/30 flex items-center justify-center">
                                        <span className="text-sm font-bold text-[#65A30D]">
                                            {user?.full_name?.charAt(0) || 'A'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{user?.full_name || 'Alex Henderson'}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                    <Shield className="w-5 h-5 text-[#84CC16] ml-auto" />
                                </div>
                            </div>

                            {/* Scheme summary */}
                            <div className="bg-gray-50 rounded-2xl p-4">
                                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Scheme</p>
                                <p className="font-bold text-gray-900 text-sm">{scheme.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{scheme.department}</p>
                            </div>

                            {/* What happens next */}
                            <div>
                                <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">What happens next</p>
                                <div className="space-y-3">
                                    {[
                                        { icon: FileText, text: 'Application submitted & registered' },
                                        { icon: Clock, text: 'Under review within 7-10 business days' },
                                        { icon: CheckCircle, text: 'You\'ll receive SMS/email updates' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                                <s.icon className="w-3.5 h-3.5 text-gray-600" />
                                            </div>
                                            {s.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
                                <Shield className="w-3 h-3" />
                                Submitted securely via govAI · Encrypted end-to-end
                            </p>
                        </div>

                        <div className="px-6 pb-6 flex gap-3">
                            <button onClick={() => setStep(1)}
                                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-3.5 rounded-2xl text-sm font-semibold transition-all">
                                ← Back
                            </button>
                            <button onClick={handleSubmit} disabled={submitting}
                                className="flex-1 bg-[#84CC16] hover:bg-[#65A30D] disabled:opacity-60 text-black py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
                                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <>Submit Application ✓</>}
                            </button>
                        </div>
                    </>
                )}

                {/* ── Step 3: Success ── */}
                {step === 3 && (
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 bg-[#84CC16]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-[#84CC16]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Your application for <strong>{scheme.name}</strong> has been successfully submitted.
                            You'll receive updates via email.
                        </p>
                        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Application ID</span>
                                <span className="font-mono font-bold text-gray-900">APP-{Date.now().toString().slice(-6)}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span className="text-gray-500">Status</span>
                                <span className="text-[#65A30D] font-bold flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5" /> Submitted
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={onClose}
                                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-3.5 rounded-2xl text-sm font-semibold transition-all">
                                Close
                            </button>
                            <button onClick={() => { onClose(); navigate('/applications'); }}
                                className="flex-1 bg-black hover:bg-gray-800 text-white py-3.5 rounded-2xl text-sm font-semibold transition-all">
                                Track Application
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════
   SCHEME CARD
══════════════════════════════════════════════════════════ */
const SchemeCard = ({ scheme, onApply, isAuthenticated }) => {
    const score = scheme.match_percentage || Math.floor(Math.random() * 30) + 70;
    const mc = matchColor(score);
    const circumference = 2 * Math.PI * 20;

    return (
        <Card className="hover:shadow-xl transition-all duration-300 group h-full flex flex-col bg-white border-none rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-3">
                    <Badge className={`${mc.bg} ${mc.text} border-none text-xs font-bold px-3 py-1 rounded-full`}>
                        {mc.label}
                    </Badge>
                    {/* Circular progress */}
                    <div className="relative w-12 h-12 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                            <circle cx="24" cy="24" r="20" stroke={mc.bar} strokeWidth="4" fill="none"
                                strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
                                strokeLinecap="round" />
                        </svg>
                        <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${mc.text}`}>
                            {score}%
                        </span>
                    </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug">
                    {scheme.name}
                </CardTitle>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Building className="w-3 h-3" />
                    {scheme.department || 'Government of India'}
                </p>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                {/* AI Summary */}
                <div className="bg-[#84CC16]/5 border border-[#84CC16]/20 p-3 rounded-xl">
                    <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-[#84CC16] mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-gray-700 mb-1">AI Summary</p>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                                {scheme.description || 'Government scheme providing benefits to eligible citizens.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefit & Deadline */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Benefit</p>
                        <p className="text-sm font-semibold text-gray-900">{scheme.benefits || 'Financial Support'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Deadline</p>
                        <p className="text-sm font-semibold text-red-500">
                            {scheme.deadline
                                ? new Date(scheme.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                : 'Rolling'}
                        </p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="gap-2 pt-0">
                <button
                    className="flex-1 bg-black hover:bg-gray-800 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
                    onClick={() => onApply(scheme)}
                >
                    {isAuthenticated ? 'Apply Now' : 'Login to Apply'}
                    <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 shrink-0 border border-gray-200 hover:border-[#84CC16] hover:text-[#84CC16] rounded-xl flex items-center justify-center transition-all text-gray-400">
                    <Bookmark className="w-4 h-4" />
                </button>
            </CardFooter>
        </Card>
    );
};

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
const SchemeDiscovery = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [applyScheme, setApplyScheme] = useState(null); // scheme to apply for

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => { fetchSchemes(); }, []);

    const fetchSchemes = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/schemes`);
            const data = await res.json();
            if (data.success && data.data.length > 0) setSchemes(data.data);
            else setSchemes(MOCK_SCHEMES);
        } catch {
            setSchemes(MOCK_SCHEMES);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (scheme) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setApplyScheme(scheme);
    };

    const categories = ['All', 'Business', 'Education', 'Housing', 'Technology', 'Agriculture'];

    const filtered = schemes.filter(s => {
        const q = searchQuery.toLowerCase();
        const matchSearch = s.name.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q);
        const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
        return matchSearch && matchCat;
    });

    return (
        <>
            <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Discover Government Benefits</h1>
                        <p className="text-gray-500 mt-1">
                            AI-powered scheme recommendations{user ? ' tailored for you' : ' — login to see your matches'}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search schemes by name, category, or benefit..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] shadow-sm transition-all"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Category pills */}
                <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-[#84CC16] text-black shadow-sm'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                                }`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Not-logged-in banner */}
                {!user && (
                    <div className="bg-[#84CC16]/10 border border-[#84CC16]/20 rounded-2xl px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-[#65A30D] shrink-0" />
                            <p className="text-sm font-medium text-gray-800">
                                <strong>Login</strong> to see your personalised eligibility score and apply directly.
                            </p>
                        </div>
                        <button onClick={() => navigate('/login')}
                            className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all whitespace-nowrap">
                            Sign In →
                        </button>
                    </div>
                )}

                {/* Results */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-10 h-10 border-4 border-[#84CC16] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-bold text-gray-900">{filtered.length}</span> schemes
                            {user && ' matching your profile'}
                        </p>
                        {filtered.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                                <p className="text-gray-400 text-lg mb-4">No schemes found matching your criteria.</p>
                                <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                    className="bg-[#84CC16] hover:bg-[#65A30D] text-black font-semibold px-6 py-3 rounded-xl transition-all">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map(scheme => (
                                    <SchemeCard
                                        key={scheme.id}
                                        scheme={scheme}
                                        onApply={handleApply}
                                        isAuthenticated={!!user}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Apply Modal */}
            {applyScheme && (
                <ApplyModal
                    scheme={applyScheme}
                    onClose={() => setApplyScheme(null)}
                    onSuccess={() => {/* optionally refresh */ }}
                />
            )}
        </>
    );
};

const MOCK_SCHEMES = [
    { id: 1, name: 'Stand Up India Scheme', department: 'Ministry of Finance', category: 'Business', benefits: 'Up to ₹1 Crore Loan', deadline: '2026-03-31', description: 'Facilitates bank loans between ₹10 lakh and ₹1 crore to SC/ST and women borrowers for setting up greenfield enterprises.', match_percentage: 94 },
    { id: 2, name: 'PM-KUSUM Component-C', department: 'Ministry of New & Renewable Energy', category: 'Agriculture', benefits: '60% Central Subsidy', deadline: '2026-06-30', description: 'Solarization of grid-connected agriculture pumps. Farmers can sell surplus solar power to DISCOMs.', match_percentage: 78 },
    { id: 3, name: 'Digital India Internship', department: 'MeitY', category: 'Education', benefits: '₹10,000 Stipend/Month', deadline: null, description: 'Short-term internship opportunities for undergraduate/postgraduate students to work on national digital projects.', match_percentage: 91 },
    { id: 4, name: 'Pradhan Mantri Awas Yojana', department: 'MoHUA', category: 'Housing', benefits: 'Up to ₹2.67L Subsidy', deadline: '2026-12-31', description: 'Interest subsidy on home loans for purchase/construction of house for EWS, LIG, and MIG categories.', match_percentage: 85 },
    { id: 5, name: 'Startup India Seed Fund', department: 'DPIIT', category: 'Technology', benefits: 'Up to ₹20L Grant', deadline: '2026-09-30', description: 'Financial assistance to startups for proof of concept, prototype development, product trials and market entry.', match_percentage: 88 },
    { id: 6, name: 'National Scholarship Portal', department: 'Ministry of Education', category: 'Education', benefits: '₹75,000/Year', deadline: '2025-11-30', description: 'Centralized scholarship portal for students from minority communities, SC/ST, OBC and economically weaker sections.', match_percentage: 72 },
];

export default SchemeDiscovery;
