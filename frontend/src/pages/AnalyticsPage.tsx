import React from 'react';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-600 mt-1">Track platform performance and metrics</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Views', value: '0', icon: Eye, color: 'bg-blue-500' },
                        { label: 'Active Users', value: '0', icon: Users, color: 'bg-green-500' },
                        { label: 'Engagement Rate', value: '0%', icon: TrendingUp, color: 'bg-purple-500' },
                        { label: 'Completion Rate', value: '0%', icon: BarChart3, color: 'bg-orange-500' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-4 rounded-xl`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Usage Trends</h2>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        Chart visualization will appear here
                    </div>
                </div>
            </div>
        </div>
    );
}
