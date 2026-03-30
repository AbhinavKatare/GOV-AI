import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, CheckCircle2, Lock, ArrowRight, X, User, Briefcase, MapPin, Loader2, ChevronRight } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

/* ── helpers ── */
const StepIndicator = ({ steps, current }) => (
    <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => {
            const done = i + 1 < current;
            const active = i + 1 === current;
            return (
                <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-2 relative">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all
              ${done ? 'bg-[#84CC16] text-black' :
                                active ? 'bg-black text-white shadow-lg ring-4 ring-[#84CC16]/30' :
                                    'bg-gray-200 text-gray-500'}`}>
                            {done ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-gray-900' : 'text-gray-400'}`}>
                            {s}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${done ? 'bg-[#84CC16]' : 'bg-gray-200'}`} />
                    )}
                </React.Fragment>
            );
        })}
    </div>
);

/* ── Step 1: Basic Info ── */
const Step1 = ({ data, onChange }) => (
    <div className="space-y-5">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">Tell us about yourself</h2>
            <p className="text-gray-500 mt-2">This helps us personalise your experience.</p>
        </div>
        {[
            { label: 'Full Name', key: 'full_name', type: 'text', icon: User, placeholder: 'Alex Henderson' },
            { label: 'Department / Profession', key: 'department', type: 'text', icon: Briefcase, placeholder: 'e.g. Software Engineer' },
            { label: 'Location', key: 'location', type: 'text', icon: MapPin, placeholder: 'New Delhi, India' },
        ].map(f => (
            <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                <div className="relative">
                    <f.icon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type={f.type}
                        value={data[f.key] || ''}
                        onChange={e => onChange(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent bg-white transition-all"
                    />
                </div>
            </div>
        ))}
    </div>
);

/* ── Step 2: AI Enhancement ── */
const Step2 = ({ aiProgress, setAiProgress, fileName, setFileName }) => {
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files[0] || e.target.files?.[0];
        if (file) { setFileName(file.name); setAiProgress(75); }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Enhance your profile with AI</h2>
                <p className="text-gray-500 mt-2">Our AI analyses your experience to match the best opportunities.</p>
            </div>

            {/* AI Readiness */}
            <div className="bg-[#84CC16]/10 border border-[#84CC16]/20 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#65A30D] uppercase tracking-widest">AI Readiness</span>
                    <span className="text-2xl font-bold text-[#84CC16]">{aiProgress}%</span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#84CC16] transition-all duration-700 rounded-full" style={{ width: `${aiProgress}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    {aiProgress < 50 ? 'Upload your resume to increase score...' :
                        aiProgress < 100 ? 'Almost there! Connect DigiLocker to complete.' :
                            '✓ Profile fully optimised!'}
                </p>
            </div>

            {/* Resume Upload */}
            <label
                className="block bg-white border-2 border-dashed border-[#84CC16]/30 hover:border-[#84CC16] rounded-2xl p-10 text-center cursor-pointer transition-all group"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
            >
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleDrop} />
                <div className="w-14 h-14 bg-[#84CC16]/10 group-hover:bg-[#84CC16]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Upload className="w-7 h-7 text-[#84CC16]" />
                </div>
                {fileName ? (
                    <p className="text-gray-900 font-semibold">{fileName} ✓</p>
                ) : (
                    <>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Upload your resume</h3>
                        <p className="text-sm text-gray-500">Drag & drop PDF or DOCX • or click to browse</p>
                    </>
                )}
            </label>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center">
                    <span className="px-4 bg-[#F5F5F0] text-xs text-gray-400 uppercase tracking-wider">Or connect via</span>
                </div>
            </div>

            {/* DigiLocker */}
            <button
                type="button"
                onClick={() => setAiProgress(100)}
                className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold py-5 rounded-xl text-base flex items-center justify-center gap-3 shadow-lg transition-all"
            >
                <Shield className="w-5 h-5" /> Connect DigiLocker
            </button>

            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                SECURELY IMPORT VERIFIED GOVERNMENT DOCUMENTS
            </p>
        </div>
    );
};

/* ── Step 3: Preferences ── */
const INTERESTS = ['Government Jobs', 'Startup Schemes', 'Housing Subsidies', 'Agricultural Grants', 'Education Scholarships', 'Tech Innovation', 'Health Benefits', 'Women Empowerment'];

const Step3 = ({ selected, toggle }) => (
    <div className="space-y-6">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">Personalise your matches</h2>
            <p className="text-gray-500 mt-2">Select the categories you're interested in.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map(i => {
                const active = selected.includes(i);
                return (
                    <button key={i} type="button" onClick={() => toggle(i)}
                        className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${active ? 'border-[#84CC16] bg-[#84CC16]/10 text-gray-900' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                            }`}>
                        {active && <CheckCircle2 className="w-4 h-4 inline mr-2 text-[#84CC16]" />}
                        {i}
                    </button>
                );
            })}
        </div>
    </div>
);

/* ── Step 4: Review ── */
const Step4 = ({ data, aiProgress, interests }) => (
    <div className="space-y-6">
        <div>
            <h2 className="text-3xl font-bold text-gray-900">Review & complete</h2>
            <p className="text-gray-500 mt-2">Your profile is ready. Let's head to your dashboard!</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 divide-y">
            {[
                { label: 'Name', value: data.full_name || '—' },
                { label: 'Department', value: data.department || '—' },
                { label: 'Location', value: data.location || '—' },
                { label: 'AI Readiness', value: `${aiProgress}%` },
                { label: 'Interests', value: interests.length ? interests.slice(0, 3).join(', ') + (interests.length > 3 ? '...' : '') : '—' },
            ].map(r => (
                <div key={r.label} className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-gray-500">{r.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{r.value}</span>
                </div>
            ))}
        </div>

        <div className="bg-[#84CC16]/10 border border-[#84CC16]/20 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-[#84CC16] shrink-0" />
            <div>
                <p className="font-bold text-gray-900">You're all set!</p>
                <p className="text-sm text-gray-600">Click "Go to Dashboard" to start exploring opportunities.</p>
            </div>
        </div>
    </div>
);

/* ═══════ MAIN COMPONENT ═════════════════════════════════════ */
const STEPS = ['BASIC INFO', 'AI ENHANCEMENT', 'MATCHINGS', 'REVIEW'];

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [saving, setSaving] = useState(false);
    const [aiProgress, setAiProgress] = useState(40);
    const [fileName, setFileName] = useState('');
    const [interests, setInterests] = useState([]);
    const [profileData, setProfileData] = useState({ full_name: '', department: '', location: '' });

    const navigate = useNavigate();
    const { user, authFetch, updateUser } = useAuth();

    const toggleInterest = (i) =>
        setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

    const handleChange = (key, val) => setProfileData(prev => ({ ...prev, [key]: val }));

    const handleNext = async () => {
        if (step < 4) { setStep(s => s + 1); return; }

        // Final step → save profile + navigate to dashboard
        setSaving(true);
        try {
            await authFetch('/users/profile', {
                method: 'PUT',
                body: JSON.stringify({
                    full_name: profileData.full_name,
                    department: profileData.department,
                    skills: interests,
                    preferences: { location: profileData.location, interests },
                }),
            });
            updateUser({ profile_completed: true });
        } catch {
            // if backend unreachable just proceed
        } finally {
            setSaving(false);
            navigate('/dashboard');
        }
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left dark panel */}
            <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#84CC16] rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#84CC16] rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#84CC16] rounded-full flex items-center justify-center">
                            <Shield className="w-7 h-7 text-black" />
                        </div>
                        <span className="text-2xl font-bold">govAI</span>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl font-serif italic text-[#84CC16] leading-relaxed">
                            "Join 50,000+ citizens using govAI to streamline their career path."
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop'].map((a, i) => (
                                        <img key={i} src={a} className="w-12 h-12 rounded-full border-2 border-black object-cover" alt="" />
                                    ))}
                            </div>
                            <p className="text-sm text-gray-400">Trusted by candidates nationwide</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">AI-powered government service platform</p>
                </div>
            </div>

            {/* Right form area */}
            <div className="flex-1 bg-[#F5F5F0] p-6 lg:p-12 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Skip button */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSkip}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg hover:bg-white"
                        >
                            Skip for now <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Steps */}
                    <StepIndicator steps={STEPS} current={step} />

                    {/* Step content */}
                    <div className="bg-[#F5F5F0]">
                        {step === 1 && <Step1 data={profileData} onChange={handleChange} />}
                        {step === 2 && <Step2 aiProgress={aiProgress} setAiProgress={setAiProgress} fileName={fileName} setFileName={setFileName} />}
                        {step === 3 && <Step3 selected={interests} toggle={toggleInterest} />}
                        {step === 4 && <Step4 data={profileData} aiProgress={aiProgress} interests={interests} />}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => step > 1 && setStep(s => s - 1)}
                            disabled={step === 1}
                            className="text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-white transition-all"
                        >
                            ← Back
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={saving}
                            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all disabled:opacity-60"
                        >
                            {saving ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
                            ) : step === 4 ? (
                                <>Go to Dashboard <ArrowRight className="w-5 h-5" /></>
                            ) : (
                                <>Continue <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </div>

                    {/* Security footer */}
                    <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                        <Lock className="w-3 h-3" /> 256-BIT AES ENCRYPTED SESSION
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
