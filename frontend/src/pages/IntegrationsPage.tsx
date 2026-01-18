import React, { useState } from 'react';
import { Link2, Plus } from 'lucide-react';
import { integrationApi } from '../services/allServices';

export default function IntegrationsPage() {
    const [integrations, setIntegrations] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
                            <p className="text-gray-600 mt-1">Connect third-party services</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Plus className="w-5 h-5" />
                            <span>Add Integration</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Slack', 'Zoom', 'Google Drive'].map((name) => (
                        <div key={name} className="bg-white rounded-xl shadow-lg p-6">
                            <Link2 className="w-12 h-12 text-blue-600 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
