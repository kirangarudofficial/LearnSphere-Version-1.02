import React from 'react';
import { Server, Cpu, HardDrive, Wifi } from 'lucide-react';

export default function SystemStatusPage() {
    const metrics = [
        { label: 'CPU Usage', value: '45%', icon: Cpu, color: 'text-blue-600' },
        { label: 'Memory', value: '6.2 GB / 16 GB', icon: HardDrive, color: 'text-green-600' },
        { label: 'Network', value: '125 Mbps', icon: Wifi, color: 'text-purple-600' },
        { label: 'Active Services', value: '48/48', icon: Server, color: 'text-orange-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-3">
                        <Server className="w-8 h-8 text-blue-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">System Status</h1>
                            <p className="text-gray-600 mt-1">Real-time system metrics and performance</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <metric.icon className={`w-12 h-12 ${metric.color}`} />
                            </div>
                            <p className="text-gray-600 text-sm">{metric.label}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
