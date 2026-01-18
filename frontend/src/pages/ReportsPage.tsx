import React, { useState } from 'react';
import { FileBarChart, Plus, Download } from 'lucide-react';
import { reportingApi } from '../services/allServices';

export default function ReportsPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                            <p className="text-gray-600 mt-1">Generate and manage reports</p>
                        </div>
                        <button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Plus className="w-5 h-5" />
                            <span>Generate Report</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['User Activity', 'Revenue', 'Course Performance'].map((type) => (
                        <div key={type} className="bg-white rounded-xl shadow-lg p-6">
                            <FileBarChart className="w-12 h-12 text-blue-600 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{type} Report</h3>
                            <p className="text-gray-600 mb-4">Download the latest {type.toLowerCase()} report</p>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center space-x-2">
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
