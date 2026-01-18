import React, { useState } from 'react';
import { Webhook, Plus, Activity } from 'lucide-react';
import { webhookApi } from '../services/allServices';

export default function WebhooksPage() {
    const [webhooks, setWebhooks] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Webhooks</h1>
                            <p className="text-gray-600 mt-1">Manage webhook integrations</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Plus className="w-5 h-5" />
                            <span>Add Webhook</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {webhooks.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <Webhook className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No webhooks configured</h3>
                        <p className="text-gray-500">Add your first webhook endpoint</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
