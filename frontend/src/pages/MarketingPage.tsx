import React, { useState } from 'react';
import { Megaphone, Plus, TrendingUp } from 'lucide-react';
import { marketingApi } from '../services/allServices';

export default function MarketingPage() {
    const [campaigns, setCampaigns] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
                            <p className="text-gray-600 mt-1">Manage your marketing efforts</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Plus className="w-5 h-5" />
                            <span>New Campaign</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {campaigns.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No campaigns yet</h3>
                        <p className="text-gray-500">Create your first marketing campaign</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{campaign.name}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>{campaign.clicks} clicks</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
