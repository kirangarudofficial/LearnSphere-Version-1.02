import React, { useState, useEffect } from 'react';
import { DollarSign, Share2, TrendingUp } from 'lucide-react';
import { affiliateApi } from '../services/allServices';

export default function AffiliatePage() {
    const [earnings, setEarnings] = useState<any>(null);
    const [affiliateCode, setAffiliateCode] = useState('');

    useEffect(() => {
        loadAffiliateData();
    }, []);

    const loadAffiliateData = async () => {
        try {
            const earningsData = await affiliateApi.getEarnings();
            setEarnings(earningsData.data);
            setAffiliateCode('AFFILIATE123'); // Mock
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Affiliate Program</h1>
                    <p className="text-gray-600 mt-1">Earn money by referring students</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <DollarSign className="w-12 h-12 text-green-600 mb-4" />
                        <p className="text-gray-600 text-sm">Total Earnings</p>
                        <p className="text-3xl font-bold text-gray-900">${earnings?.totalEarnings || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <Share2 className="w-12 h-12 text-blue-600 mb-4" />
                        <p className="text-gray-600 text-sm">Total Referrals</p>
                        <p className="text-3xl font-bold text-gray-900">{earnings?.totalReferrals || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
                        <p className="text-gray-600 text-sm">Conversion Rate</p>
                        <p className="text-3xl font-bold text-gray-900">{earnings?.conversionRate || 0}%</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Your Affiliate Link</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={`https://platform.com/ref/${affiliateCode}`}
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                            Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
