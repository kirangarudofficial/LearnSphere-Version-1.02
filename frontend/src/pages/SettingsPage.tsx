import React, { useState } from 'react';
import { User, Bell, Lock, CreditCard, Globe, Shield, Eye, EyeOff, Save } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'billing'>('account');
    const [showPassword, setShowPassword] = useState(false);

    const [accountSettings, setAccountSettings] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        language: 'en',
        timezone: 'America/Los_Angeles',
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        courseUpdates: true,
        promotions: false,
        weeklyDigest: true,
        messageNotifications: true,
        discussionReplies: true,
    });

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'public',
        showProgress: true,
        showCertificates: true,
        allowMessages: true,
    });

    const handleSave = () => {
        console.log('Saving settings...');
        alert('Settings saved successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <button
                                onClick={() => setActiveTab('account')}
                                className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${activeTab === 'account' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <User className="w-5 h-5" />
                                <span className="font-medium">Account</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${activeTab === 'notifications' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Bell className="w-5 h-5" />
                                <span className="font-medium">Notifications</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('privacy')}
                                className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${activeTab === 'privacy' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Shield className="w-5 h-5" />
                                <span className="font-medium">Privacy</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('billing')}
                                className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${activeTab === 'billing' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <CreditCard className="w-5 h-5" />
                                <span className="font-medium">Billing</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            {/* Account Settings */}
                            {activeTab === 'account' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
                                        <p className="text-gray-600 mb-6">Update your account information and password</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={accountSettings.name}
                                                onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={accountSettings.email}
                                                onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>

                                        <div className="pt-6 border-t border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={accountSettings.currentPassword}
                                                            onChange={(e) => setAccountSettings({ ...accountSettings, currentPassword: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                        />
                                                        <button
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                        >
                                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={accountSettings.newPassword}
                                                        onChange={(e) => setAccountSettings({ ...accountSettings, newPassword: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={accountSettings.confirmPassword}
                                                        onChange={(e) => setAccountSettings({ ...accountSettings, confirmPassword: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                                    <select
                                                        value={accountSettings.language}
                                                        onChange={(e) => setAccountSettings({ ...accountSettings, language: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                    >
                                                        <option value="en">English</option>
                                                        <option value="es">Spanish</option>
                                                        <option value="fr">French</option>
                                                        <option value="de">German</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                                    <select
                                                        value={accountSettings.timezone}
                                                        onChange={(e) => setAccountSettings({ ...accountSettings, timezone: e.target.value })}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                    >
                                                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                                        <option value="America/New_York">Eastern Time (ET)</option>
                                                        <option value="Europe/London">London (GMT)</option>
                                                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notification Settings */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Notification Preferences</h2>
                                        <p className="text-gray-600 mb-6">Choose how you want to be notified</p>
                                    </div>

                                    <div className="space-y-4">
                                        {Object.entries({
                                            emailNotifications: 'Email Notifications',
                                            courseUpdates: 'Course Updates',
                                            promotions: 'Promotions and Offers',
                                            weeklyDigest: 'Weekly Digest',
                                            messageNotifications: 'Message Notifications',
                                            discussionReplies: 'Discussion Replies',
                                        }).map(([key, label]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-gray-800">{label}</div>
                                                    <div className="text-sm text-gray-600">Receive notifications about {label.toLowerCase()}</div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notificationSettings[key as keyof typeof notificationSettings]}
                                                        onChange={(e) => setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Privacy Settings */}
                            {activeTab === 'privacy' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy Settings</h2>
                                        <p className="text-gray-600 mb-6">Control your privacy and data sharing preferences</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                                            <select
                                                value={privacySettings.profileVisibility}
                                                onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="public">Public - Anyone can view</option>
                                                <option value="students">Students Only - Only enrolled students</option>
                                                <option value="private">Private - Only you</option>
                                            </select>
                                        </div>

                                        {Object.entries({
                                            showProgress: 'Show Learning Progress',
                                            showCertificates: 'Show Certificates',
                                            allowMessages: 'Allow Direct Messages',
                                        }).map(([key, label]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-gray-800">{label}</div>
                                                    <div className="text-sm text-gray-600">Allow others to see your {label.toLowerCase()}</div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={privacySettings[key as keyof typeof privacySettings]}
                                                        onChange={(e) => setPrivacySettings({ ...privacySettings, [key]: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Billing Settings */}
                            {activeTab === 'billing' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Billing & Subscription</h2>
                                        <p className="text-gray-600 mb-6">Manage your payment methods and subscription</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg border border-primary-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">Free Plan</h3>
                                                <p className="text-gray-600">Access to basic courses and features</p>
                                            </div>
                                            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                                                Upgrade to Pro
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
                                        <p className="text-gray-600">No payment methods added yet</p>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="pt-6 border-t border-gray-200 mt-8">
                                <button
                                    onClick={handleSave}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
