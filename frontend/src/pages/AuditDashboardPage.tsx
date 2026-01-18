import React from 'react';
import { Shield, Eye, Download, Filter } from 'lucide-react';

export default function AuditDashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Shield className="w-8 h-8 text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Audit Dashboard</h1>
                                <p className="text-gray-600 mt-1">Security and compliance monitoring</p>
                            </div>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Download className="w-5 h-5" />
                            <span>Export Report</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Events', value: '0' },
                        { label: 'Security Alerts', value: '0' },
                        { label: 'Failed Logins', value: '0' },
                        { label: 'API Calls', value: '0' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                            <p className="text-gray-600 text-sm">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                            <Filter className="w-5 h-5" />
                            <span>Filter</span>
                        </button>
                    </div>
                    <div className="p-12 text-center text-gray-600">
                        No audit events to display
                    </div>
                </div>
            </div>
        </div>
    );
}
