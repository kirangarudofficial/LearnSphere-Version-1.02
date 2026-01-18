import React from 'react';
import { Activity, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ServiceHealthPage() {
    const services = [
        { name: 'API Gateway', status: 'healthy', uptime: '99.9%' },
        { name: 'Auth Service', status: 'healthy', uptime: '99.8%' },
        { name: 'Database', status: 'healthy', uptime: '100%' },
        { name: 'Cache Layer', status: 'degraded', uptime: '98.5%' },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy': return <CheckCircle className="w-6 h-6 text-green-600" />;
            case 'degraded': return <AlertCircle className="w-6 h-6 text-yellow-600" />;
            case 'down': return <XCircle className="w-6 h-6 text-red-600" />;
            default: return <Activity className="w-6 h-6 text-gray-600" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-3">
                        <Activity className="w-8 h-8 text-green-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Service Health</h1>
                            <p className="text-gray-600 mt-1">Monitor system health and uptime</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service) => (
                        <div key={service.name} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">Uptime: {service.uptime}</p>
                                </div>
                                {getStatusIcon(service.status)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
