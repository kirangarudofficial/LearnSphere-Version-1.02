import React from 'react';
import { Award, Download, Share2, Linkedin, Twitter, Facebook, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CertificatesPage() {
    const navigate = useNavigate();

    const certificates = [
        {
            id: '1',
            title: 'Complete React Development Bootcamp',
            instructor: 'Sarah Chen',
            completionDate: 'January 5, 2026',
            certificateId: 'CERT-2026-001234',
            skills: ['React', 'JavaScript', 'Web Development'],
            verified: true,
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        },
        {
            id: '2',
            title: 'UI/UX Design Masterclass',
            instructor: 'Emily Davis',
            completionDate: 'December 20, 2025',
            certificateId: 'CERT-2025-005678',
            skills: ['UI Design', 'UX Research', 'Figma'],
            verified: true,
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
        },
        {
            id: '3',
            title: 'AWS Cloud Practitioner',
            instructor: 'Michael Brown',
            completionDate: 'November 15, 2025',
            certificateId: 'CERT-2025-009012',
            skills: ['AWS', 'Cloud Computing', 'DevOps'],
            verified: true,
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        },
    ];

    const handleDownload = (certId: string) => {
        console.log('Downloading certificate:', certId);
        // TODO: Implement certificate download
    };

    const handleShare = (platform: string, certId: string) => {
        console.log(`Sharing certificate ${certId} on ${platform}`);
        // TODO: Implement social sharing
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Award className="w-12 h-12" />
                        <h1 className="text-4xl font-bold">My Certificates</h1>
                    </div>
                    <p className="text-primary-100 text-lg">
                        Showcase your achievements and share your success with the world
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Award className="w-8 h-8 text-primary-600" />
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{certificates.length}</div>
                        <div className="text-sm text-gray-600">Certificates Earned</div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{certificates.filter(c => c.verified).length}</div>
                        <div className="text-sm text-gray-600">Verified Certificates</div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Share2 className="w-8 h-8 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">24</div>
                        <div className="text-sm text-gray-600">Times Shared</div>
                    </div>
                </div>

                {/* Certificates List */}
                <div className="space-y-6">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row">
                                {/* Certificate Preview */}
                                <div className="md:w-80 h-56 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden flex-shrink-0">
                                    <div className="absolute inset-0 opacity-10 pattern-grid"></div>
                                    <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                                        <Award className="w-16 h-16 mb-4" />
                                        <h3 className="text-xl font-bold text-center mb-2">{cert.title}</h3>
                                        <p className="text-primary-100 text-sm">Certificate of Completion</p>
                                        {cert.verified && (
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-green-500 rounded-full p-2">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Certificate Details */}
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{cert.title}</h3>
                                            <p className="text-gray-600">Instructor: {cert.instructor}</p>
                                        </div>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            Verified
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-semibold mr-2">Completion Date:</span>
                                            <span>{cert.completionDate}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-semibold mr-2">Certificate ID:</span>
                                            <span className="font-mono text-sm">{cert.certificateId}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-600 mr-2">Skills:</span>
                                            <div className="inline-flex flex-wrap gap-2 mt-1">
                                                {cert.skills.map((skill) => (
                                                    <span key={skill} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-md text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => handleDownload(cert.id)}
                                            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Download PDF</span>
                                        </button>

                                        <button className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                                            <span>View Certificate</span>
                                        </button>

                                        {/* Share Buttons */}
                                        <div className="flex items-center space-x-2 ml-auto">
                                            <span className="text-sm text-gray-600 mr-2">Share:</span>
                                            <button
                                                onClick={() => handleShare('linkedin', cert.id)}
                                                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                                            >
                                                <Linkedin className="w-4 h-4 text-white" />
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter', cert.id)}
                                                className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-colors"
                                            >
                                                <Twitter className="w-4 h-4 text-white" />
                                            </button>
                                            <button
                                                onClick={() => handleShare('facebook', cert.id)}
                                                className="w-9 h-9 rounded-full bg-blue-800 hover:bg-blue-900 flex items-center justify-center transition-colors"
                                            >
                                                <Facebook className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {certificates.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No certificates yet</h3>
                        <p className="text-gray-600 mb-6">Complete courses to earn your first certificate</p>
                        <button
                            onClick={() => navigate('/courses')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
