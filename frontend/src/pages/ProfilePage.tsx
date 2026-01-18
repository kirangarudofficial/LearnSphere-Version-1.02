import React, { useState } from 'react';
import { User, Mail, MapPin, Globe, Calendar, Camera, Save, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        bio: 'Passionate learner focused on web development and cloud technologies.',
        location: 'San Francisco, CA',
        website: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        title: 'Full Stack Developer',
        company: 'Tech Innovations Inc.',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        console.log('Saving profile:', formData);
        setIsEditing(false);
        // TODO: API call to update profile
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 h-48"></div>

            <div className="container mx-auto px-6 -mt-32">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="p-8">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-6">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold">
                                        {formData.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <Camera className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="text-3xl font-bold text-gray-800 border-b-2 border-primary-500 focus:outline-none mb-2"
                                        />
                                    ) : (
                                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.name}</h1>
                                    )}

                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="text-lg text-gray-600 border-b border-gray-300 focus:outline-none mb-4"
                                        />
                                    ) : (
                                        <p className="text-lg text-gray-600 mb-4">{formData.title} at {formData.company}</p>
                                    )}

                                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="w-4 h-4" />
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="border-b border-gray-300 focus:outline-none"
                                                />
                                            ) : (
                                                <span>{formData.location}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Joined January 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Button */}
                            <div>
                                {isEditing ? (
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save Changes</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        <span>Edit Profile</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tabs and Content */}
                    <div className="border-t border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {/* Left Column - About */}
                            <div className="lg:col-span-2 p-8 border-r border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                ) : (
                                    <p className="text-gray-600 mb-6">{formData.bio}</p>
                                )}

                                <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">Links</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Globe className="w-5 h-5 text-gray-400" />
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                className="flex-1 border-b border-gray-300 focus:outline-none"
                                            />
                                        ) : (
                                            <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                                                {formData.website}
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                name="linkedin"
                                                value={formData.linkedin}
                                                onChange={handleInputChange}
                                                className="flex-1 border-b border-gray-300 focus:outline-none"
                                            />
                                        ) : (
                                            <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                                                LinkedIn Profile
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                name="github"
                                                value={formData.github}
                                                onChange={handleInputChange}
                                                className="flex-1 border-b border-gray-300 focus:outline-none"
                                            />
                                        ) : (
                                            <a href={formData.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                                                GitHub Profile
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Stats */}
                            <div className="p-8 bg-gray-50">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Stats</h2>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-primary-600 mb-1">12</div>
                                        <div className="text-sm text-gray-600">Courses Completed</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-secondary-600 mb-1">48h</div>
                                        <div className="text-sm text-gray-600">Time Spent Learning</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-accent-600 mb-1">8</div>
                                        <div className="text-sm text-gray-600">Certificates Earned</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-success-600 mb-1">156</div>
                                        <div className="text-sm text-gray-600">Day Streak</div>
                                    </div>
                                </div>              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
