import React, { useState } from 'react';
import { Download, FileText, Database } from 'lucide-react';

export default function ExportCenterPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Export Center</h1>
                    <p className="text-gray-600 mt-1">Export your data in various formats</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Users', 'Courses', 'Enrollments', 'Payments', 'Analytics', 'Activity Logs'].map((type) => (
                        <div key={type} className="bg-white rounded-xl shadow-lg p-6">
                            <Database className="w-12 h-12 text-blue-600 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{type} Data</h3>
                            <p className="text-gray-600 mb-4 text-sm">Export all {type.toLowerCase()} data</p>
                            <div className="flex space-x-2">
                                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm flex items-center justify-center space-x-1">
                                    <Download className="w-4 h-4" />
                                    <span>CSV</span>
                                </button>
                                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold text-sm flex items-center justify-center space-x-1">
                                    <Download className="w-4 h-4" />
                                    <span>JSON</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
