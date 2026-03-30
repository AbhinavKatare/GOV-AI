import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText, Clock, CheckCircle, XCircle, AlertCircle,
    ChevronRight, Plus, Search, Filter, RefreshCw, Eye
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const STATUS_CONFIG = {
    submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700', icon: Clock },
    under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
    pending: { label: 'Pending', color: 'bg-gray-100 text-gray-600', icon: Clock },
};

const MOCK_APPLICATIONS = [
    {
        id: 1,
        application_number: 'APP-2024-001',
        scheme_name: 'Business Visa Application',
        scheme_department: 'Ministry of Home Affairs',
        status: 'under_review',
        submitted_at: '2024-10-12T10:00:00Z',
        stage: 'Verification',
        timeline: [
            { stage: 'Submitted', timestamp: '2024-10-12T10:00:00Z' },
            { stage: 'Verification', timestamp: '2024-10-14T14:00:00Z' },
        ],
    },
    {
        id: 2,
        application_number: 'APP-2024-002',
        scheme_name: 'Digital Innovation Grant',
        scheme_department: 'DPIIT',
        status: 'submitted',
        submitted_at: '2024-10-18T09:00:00Z',
        stage: 'Initial Review',
        timeline: [
            { stage: 'Submitted', timestamp: '2024-10-18T09:00:00Z' },
        ],
    },
    {
        id: 3,
        application_number: 'APP-2024-003',
        scheme_name: 'PM-KUSUM Solar Scheme',
        scheme_department: 'MNRE',
        status: 'approved',
        submitted_at: '2024-09-05T08:00:00Z',
        stage: 'Completed',
        timeline: [
            { stage: 'Submitted', timestamp: '2024-09-05T08:00:00Z' },
            { stage: 'Approved', timestamp: '2024-09-20T12:00:00Z' },
        ],
    },
];

const ApplicationCard = ({ app, onView }) => {
    const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
    const Icon = status.icon;
    const date = new Date(app.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group border border-gray-100">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-[#84CC16]/10 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-[#84CC16]" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400 mb-1 font-mono">#{app.application_number || `APP-${app.id}`}</p>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">{app.scheme_name}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{app.scheme_department || 'Government of India'}</p>
                    </div>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${status.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {status.label}
                </span>
            </div>

            {/* Progress */}
            <div className="mt-5">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Stage: <strong className="text-gray-800">{app.stage || 'Processing'}</strong></span>
                    <span>Submitted: {date}</span>
                </div>
                {app.timeline && (
                    <div className="flex gap-2">
                        {['Submitted', 'Verification', 'Review', 'Decision'].map((s, i) => {
                            const done = app.timeline.length > i;
                            return (
                                <div key={s} className="flex-1 flex flex-col items-center gap-1">
                                    <div className={`w-full h-1.5 rounded-full ${done ? 'bg-[#84CC16]' : 'bg-gray-100'}`} />
                                    <span className={`text-[9px] font-medium ${done ? 'text-[#65A30D]' : 'text-gray-300'}`}>{s}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onView(app)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all"
                >
                    <Eye className="w-4 h-4" /> View Details
                </button>
                {app.status === 'approved' && (
                    <button className="flex items-center gap-2 text-sm font-semibold text-[#65A30D] bg-[#84CC16]/10 hover:bg-[#84CC16]/20 px-4 py-2 rounded-lg transition-all">
                        <CheckCircle className="w-4 h-4" /> Download Letter
                    </button>
                )}
            </div>
        </div>
    );
};

const DetailModal = ({ app, onClose }) => {
    if (!app) return null;
    const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="bg-[#84CC16]/10 p-6 border-b border-[#84CC16]/20">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">{app.scheme_name}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">#{app.application_number}</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>{status.label}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Department</span>
                        <span className="font-medium text-sm text-gray-900">{app.scheme_department}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Submitted</span>
                        <span className="font-medium text-sm text-gray-900">
                            {new Date(app.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-3">Timeline</p>
                        <div className="space-y-3">
                            {(app.timeline || []).map((t, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#84CC16] rounded-full shrink-0" />
                                    <div className="flex-1 flex justify-between">
                                        <span className="text-sm font-medium text-gray-800">{t.stage}</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(t.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="px-6 pb-6">
                    <button onClick={onClose}
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Applications = () => {
    const { authFetch } = useAuth();
    const navigate = useNavigate();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await authFetch('/applications');
                const data = await res.json();
                if (data.success && data.data.length > 0) setApps(data.data);
                else setApps(MOCK_APPLICATIONS);
            } catch { setApps(MOCK_APPLICATIONS); }
            finally { setLoading(false); }
        })();
    }, [authFetch]);

    const filtered = apps.filter(a => {
        const q = search.toLowerCase();
        const matchSearch = a.scheme_name?.toLowerCase().includes(q) || a.application_number?.toLowerCase().includes(q);
        const matchFilter = filter === 'all' || a.status === filter;
        return matchSearch && matchFilter;
    });

    const counts = apps.reduce((acc, a) => ({ ...acc, [a.status]: (acc[a.status] || 0) + 1 }), {});

    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                    <p className="text-gray-500 mt-1">Track all your government scheme applications</p>
                </div>
                <button
                    onClick={() => navigate('/schemes')}
                    className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
                >
                    <Plus className="w-4 h-4" /> New Application
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: apps.length, color: 'text-gray-900' },
                    { label: 'Under Review', value: counts.under_review || 0, color: 'text-yellow-600' },
                    { label: 'Approved', value: counts.approved || 0, color: 'text-green-600' },
                    { label: 'Rejected', value: counts.rejected || 0, color: 'text-red-500' },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16]"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['all', 'submitted', 'under_review', 'approved', 'rejected'].map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${filter === s ? 'bg-[#84CC16] text-black' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}>
                            {s.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <div className="w-10 h-10 border-4 border-[#84CC16] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                    <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-4">No applications found</p>
                    <button onClick={() => navigate('/schemes')}
                        className="bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold px-6 py-3 rounded-xl transition-all">
                        Browse Schemes
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map(app => (
                        <ApplicationCard key={app.id} app={app} onView={setSelected} />
                    ))}
                </div>
            )}

            {selected && <DetailModal app={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

export default Applications;
