import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase, Calendar,
    Edit3, Save, X, Upload, Shield, CheckCircle,
    Award, Loader2
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const Profile = () => {
    const { user, authFetch, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState('');

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        mobile: '',
        department: '',
        location: 'New Delhi, India',
    });

    // Load profile from API
    useEffect(() => {
        (async () => {
            try {
                const res = await authFetch('/users/profile');
                const data = await res.json();
                if (data.success) {
                    const u = data.data;
                    setForm({
                        full_name: u.full_name || '',
                        email: u.email || '',
                        mobile: u.mobile || '',
                        department: u.department || '',
                        location: u.preferences?.location || 'India',
                    });
                }
            } catch {
                // Fallback to stored user
                setForm({
                    full_name: user?.full_name || '',
                    email: user?.email || '',
                    mobile: user?.mobile || '',
                    department: user?.department || '',
                    location: 'New Delhi, India',
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await authFetch('/users/profile', {
                method: 'PUT',
                body: JSON.stringify({
                    full_name: form.full_name,
                    mobile: form.mobile,
                    department: form.department,
                    preferences: { location: form.location },
                }),
            });
            const data = await res.json();
            if (data.success) {
                updateUser({ full_name: form.full_name, department: form.department });
                setToast('Profile updated successfully!');
                setIsEditing(false);
                setTimeout(() => setToast(''), 3000);
            }
        } catch {
            // Optimistic update even without backend
            updateUser({ full_name: form.full_name, department: form.department });
            setToast('Profile saved (demo mode).');
            setIsEditing(false);
            setTimeout(() => setToast(''), 3000);
        } finally {
            setSaving(false);
        }
    };

    const initials = form.full_name
        ? form.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'AH';

    const Field = ({ icon: Icon, label, field, type = 'text', editable = true }) => (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
            {isEditing && editable ? (
                <div className="relative">
                    <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type={type}
                        value={form[field] || ''}
                        onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all"
                    />
                </div>
            ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-900">{form[field] || '—'}</span>
                </div>
            )}
        </div>
    );

    if (loading) return (
        <div className="flex items-center justify-center min-h-64">
            <div className="w-10 h-10 border-4 border-[#84CC16] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-[#84CC16] text-black px-5 py-3 rounded-xl shadow-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your personal information</p>
                </div>
                {isEditing ? (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all text-sm font-semibold">
                            <X className="w-4 h-4" /> Cancel
                        </button>
                        <button onClick={handleSave} disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#65A30D] text-black text-sm font-semibold transition-all disabled:opacity-60">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 text-sm font-semibold transition-all">
                        <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                )}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-2xl bg-[#84CC16]/20 flex items-center justify-center">
                                <span className="text-4xl font-bold text-[#65A30D]">{initials}</span>
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#84CC16] hover:bg-[#65A30D] rounded-full flex items-center justify-center shadow-md transition-all">
                                    <Upload className="w-4 h-4 text-black" />
                                </button>
                            )}
                        </div>
                        <div className="text-center">
                            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                <CheckCircle className="w-3 h-3" /> Verified Citizen
                            </span>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Member since</p>
                            <p className="text-sm font-semibold text-gray-700">Oct 2023</p>
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="flex-1 grid md:grid-cols-2 gap-5">
                        <Field icon={User} label="Full Name" field="full_name" />
                        <Field icon={Mail} label="Email" field="email" editable={false} />
                        <Field icon={Phone} label="Mobile" field="mobile" type="tel" />
                        <Field icon={Briefcase} label="Department / Profession" field="department" />
                        <Field icon={MapPin} label="Location" field="location" />
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">User ID</label>
                            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                                <Shield className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900 font-mono">{user?.id || 'GOV-XXXX'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Connected Accounts</h2>
                <div className="space-y-3">
                    {[
                        { name: 'DigiLocker', desc: 'Connected Oct 2023', connected: true, color: 'bg-[#84CC16]' },
                        { name: 'Aadhaar', desc: 'Not connected', connected: false, color: 'bg-blue-500' },
                    ].map(a => (
                        <div key={a.name} className={`flex items-center justify-between p-4 rounded-xl border ${a.connected ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center`}>
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{a.name}</p>
                                    <p className="text-xs text-gray-500">{a.desc}</p>
                                </div>
                            </div>
                            {a.connected ? (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                                    <CheckCircle className="w-3 h-3" /> Active
                                </span>
                            ) : (
                                <button className="text-xs font-bold text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-full transition-all">
                                    Connect
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Skills & Certifications</h2>
                <div className="flex flex-wrap gap-2">
                    {['React Development', 'UI/UX Design', 'Project Management', 'Data Analysis', 'Cloud Computing', 'Cybersecurity'].map((s, i) => (
                        <span key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
                            <Award className="w-4 h-4 text-[#84CC16]" />
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
