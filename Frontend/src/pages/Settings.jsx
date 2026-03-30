import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
    Bell, Shield, Lock, Eye, EyeOff, Globe, Smartphone,
    CheckCircle, ChevronRight, Moon, Sun, Trash2, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Toggle = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-[#84CC16]' : 'bg-gray-200'
            }`}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
    </button>
);

const SettingRow = ({ icon: Icon, title, description, children }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gray-500" />
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
            </div>
        </div>
        <div className="shrink-0 ml-4">{children}</div>
    </div>
);

const Settings = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        schemeAlerts: true,
        jobAlerts: true,
        policyUpdates: false,
        twoFactor: true,
        biometric: false,
        sessionTimeout: true,
        darkMode: false,
        language: 'English',
        dataSharing: false,
    });

    const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            logout();
            navigate('/');
        }
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account preferences and security</p>
            </div>

            {/* Account Info */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#84CC16]" />
                        Account Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                    <SettingRow icon={Globe} title="Full Name" description={user?.full_name || 'Alex Henderson'}>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} className="text-[#84CC16] hover:text-[#65A30D]">
                            Edit <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </SettingRow>
                    <SettingRow icon={Globe} title="Email Address" description={user?.email || 'alex@govai.com'}>
                        <Badge className="bg-green-100 text-green-700 border-none text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" /> Verified
                        </Badge>
                    </SettingRow>
                    <SettingRow icon={Smartphone} title="Mobile Number" description="+91 98765 43210">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} className="text-[#84CC16] hover:text-[#65A30D]">
                            Edit <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </SettingRow>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Bell className="w-5 h-5 text-[#84CC16]" />
                        Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                    <SettingRow icon={Bell} title="Email Notifications" description="Receive updates via email">
                        <Toggle enabled={settings.emailNotifications} onChange={() => toggle('emailNotifications')} />
                    </SettingRow>
                    <SettingRow icon={Smartphone} title="SMS Notifications" description="Receive updates via SMS">
                        <Toggle enabled={settings.smsNotifications} onChange={() => toggle('smsNotifications')} />
                    </SettingRow>
                    <SettingRow icon={Bell} title="Push Notifications" description="Browser push notifications">
                        <Toggle enabled={settings.pushNotifications} onChange={() => toggle('pushNotifications')} />
                    </SettingRow>
                    <SettingRow icon={CheckCircle} title="Scheme Alerts" description="New schemes matching your profile">
                        <Toggle enabled={settings.schemeAlerts} onChange={() => toggle('schemeAlerts')} />
                    </SettingRow>
                    <SettingRow icon={CheckCircle} title="Job Alerts" description="New job opportunities">
                        <Toggle enabled={settings.jobAlerts} onChange={() => toggle('jobAlerts')} />
                    </SettingRow>
                    <SettingRow icon={CheckCircle} title="Policy Updates" description="Government policy changes">
                        <Toggle enabled={settings.policyUpdates} onChange={() => toggle('policyUpdates')} />
                    </SettingRow>
                </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#84CC16]" />
                        Security & Privacy
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                    <SettingRow icon={Lock} title="Two-Factor Authentication" description="Add an extra layer of security">
                        <Toggle enabled={settings.twoFactor} onChange={() => toggle('twoFactor')} />
                    </SettingRow>
                    <SettingRow icon={Shield} title="Biometric Login" description="Use fingerprint or face ID">
                        <Toggle enabled={settings.biometric} onChange={() => toggle('biometric')} />
                    </SettingRow>
                    <SettingRow icon={Lock} title="Auto Session Timeout" description="Logout after 30 minutes of inactivity">
                        <Toggle enabled={settings.sessionTimeout} onChange={() => toggle('sessionTimeout')} />
                    </SettingRow>
                    <SettingRow icon={Eye} title="Data Sharing" description="Share anonymized data to improve services">
                        <Toggle enabled={settings.dataSharing} onChange={() => toggle('dataSharing')} />
                    </SettingRow>
                    <SettingRow icon={Lock} title="Change Password" description="Update your account password">
                        <Button variant="outline" size="sm" className="border-gray-200 rounded-lg">
                            Update
                        </Button>
                    </SettingRow>
                </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Sun className="w-5 h-5 text-[#84CC16]" />
                        Preferences
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                    <SettingRow icon={settings.darkMode ? Moon : Sun} title="Dark Mode" description="Switch to dark theme">
                        <Toggle enabled={settings.darkMode} onChange={() => toggle('darkMode')} />
                    </SettingRow>
                    <SettingRow icon={Globe} title="Language" description="Select your preferred language">
                        <select
                            value={settings.language}
                            onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40"
                        >
                            {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati'].map(lang => (
                                <option key={lang}>{lang}</option>
                            ))}
                        </select>
                    </SettingRow>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border border-red-100 shadow-sm bg-red-50/30">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                    <SettingRow icon={Trash2} title="Delete Account" description="Permanently delete your account and all data">
                        <Button
                            onClick={handleDeleteAccount}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                        >
                            Delete Account
                        </Button>
                    </SettingRow>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end pb-8">
                <Button className="bg-[#84CC16] hover:bg-[#65A30D] text-black font-semibold px-8 rounded-xl">
                    Save All Changes
                </Button>
            </div>
        </div>
    );
};

export default Settings;
