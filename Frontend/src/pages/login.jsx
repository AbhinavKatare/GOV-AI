import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle2, User, Phone, Loader2 } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register fields
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  /* ── helpers ── */
  const redirectAfterLogin = (userData) => {
    // If profile not completed → onboarding, else → dashboard
    if (!userData.profile_completed) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  /* ── Login ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        login(data.data.user, data.data.token);
        redirectAfterLogin(data.data.user);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      // Fallback demo login when backend is down
      if (email === 'alex@govai.com' && password === 'password123') {
        const demoUser = { id: 'demo-1', email, full_name: 'Alex Henderson', department: 'Technology', profile_completed: false };
        login(demoUser, 'demo-token');
        redirectAfterLogin(demoUser);
      } else {
        setError('Backend offline. Use alex@govai.com / password123 for demo.');
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Register ── */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (regPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail, password: regPassword, full_name: fullName, mobile }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        login(data.data.user, data.data.token);
        navigate('/onboarding'); // New users always go to onboarding
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Backend offline. Cannot register without server.');
    } finally {
      setLoading(false);
    }
  };

  /* ── OAuth (demo) ── */
  const handleOAuth = (provider) => {
    const demoUser = {
      id: `oauth-${Date.now()}`,
      email: `${provider.toLowerCase()}user@govai.com`,
      full_name: `${provider} User`,
      department: 'Digital Innovation',
      profile_completed: false,
    };
    login(demoUser, 'oauth-demo-token');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left hero ────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1600&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#84CC16] rounded-full flex items-center justify-center">
              <Shield className="w-7 h-7 text-black" />
            </div>
            <span className="text-2xl font-bold">GOVAI</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              {isLogin ? 'Welcome Back' : 'Get Started'}<br />to govAI
            </h1>
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-4 rounded-full border border-white/20 w-fit">
              <Shield className="w-5 h-5 text-[#84CC16]" />
              <span className="text-sm font-medium">SECURE. ENCRYPTED. GOVERNMENT-GRADE.</span>
            </div>
          </div>
          <p className="text-sm text-gray-300">Trusted by citizens nationwide for secure access to government services.</p>
        </div>
      </div>

      {/* ── Right form ───────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-7">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-[#84CC16] rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold">GOVAI</span>
          </div>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Login to Your Account' : 'Create Your Account'}
            </h2>
            <p className="mt-2 text-gray-500">
              {isLogin ? 'Access your secure government portal' : 'Join thousands of citizens using govAI'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#84CC16]" />
                  Remember me
                </label>
                <button type="button" className="text-sm font-semibold text-gray-800 hover:text-[#84CC16]">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-black hover:bg-gray-800 disabled:opacity-60 text-white py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing In...</> : <>Sign In →</>}
              </button>
            </form>
          ) : (
            /* ── REGISTER FORM ── */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Alex Henderson"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" required value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="name@email.com"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} required value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="Min. 6 characters"
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-black hover:bg-gray-800 disabled:opacity-60 text-white py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</> : <>Create Account →</>}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 uppercase tracking-wider text-xs">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'DigiLocker', color: 'text-[#84CC16]', border: 'hover:border-[#84CC16]', bg: 'hover:bg-[#84CC16]/5' },
              { name: 'Aadhaar', color: 'text-blue-500', border: 'hover:border-blue-500', bg: 'hover:bg-blue-50' },
            ].map(p => (
              <button key={p.name} type="button" onClick={() => handleOAuth(p.name)}
                className={`flex items-center justify-center gap-2 py-3.5 border-2 border-gray-200 ${p.border} ${p.bg} rounded-xl transition-all`}>
                <div className={`w-5 h-5 rounded-full ${p.name === 'DigiLocker' ? 'bg-[#84CC16]' : 'bg-blue-500'} flex items-center justify-center`}>
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">{p.name}</span>
              </button>
            ))}
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="font-semibold text-gray-900 hover:text-[#84CC16]">
              {isLogin ? 'Register now' : 'Sign in'}
            </button>
          </p>

          {/* Footer */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
