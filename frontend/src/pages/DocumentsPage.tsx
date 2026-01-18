import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Clock, FileIcon, Trash2, Search, Filter } from 'lucide-react';
import { documentApi } from '../services/allServices';

interface Document {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadedAt: Date;
    version: number;
    courseId: string;
    courseName: string;
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadDocuments();
    }, [selectedCourse]);

    const loadDocuments = async () => {
        try {
            setLoading(true);
            // Mock data - replace with actual API call
            setDocuments([]);
        } catch (error) {
            console.error('Failed to load documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Documents Library</h1>
                            <p className="text-gray-600 mt-1">Course materials and resources</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Upload className="w-5 h-5" />
                            <span>Upload Document</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1">
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Courses</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Document</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Uploaded</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {documents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-600">No documents found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    documents.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <FileIcon className="w-8 h-8 text-blue-600" />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{doc.fileName}</p>
                                                        <p className="text-sm text-gray-600">v{doc.version}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">{doc.courseName}</td>
                                            <td className="px-6 py-4 text-gray-700">{formatFileSize(doc.fileSize)}</td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(doc.uploadedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-700">
                                                        <Download className="w-5 h-5" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-700">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
