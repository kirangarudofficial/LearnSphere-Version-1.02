import React, { useState } from 'react';
import { Flag, ToggleLeft, ToggleRight, Plus } from 'lucide-react';

export default function FeatureRolloutPage() {
    const [features, setFeatures] = useState([
        { id: 1, name: 'New Dashboard', enabled: true, rollout: 100 },
        { id: 2, name: 'AI Recommendations', enabled: true, rollout: 50 },
        { id: 3, name: 'Dark Mode', enabled: false, rollout: 0 },
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Flag className="w-8 h-8 text-purple-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Feature Rollout</h1>
                                <p className="text-gray-600 mt-1">Control feature flags and gradual rollouts</p>
                            </div>
                        </div>
                        <button className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold">
                            <Plus className="w-5 h-5" />
                            <span>New Feature</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4">
                    {features.map((feature) => (
                        <div key={feature.id} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">Rollout: {feature.rollout}%</p>
                                    <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{ width: `${feature.rollout}%` }}
                                        />
                                    </div>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-gray-100">
                                    {feature.enabled ? (
                                        <ToggleRight className="w-10 h-10 text-green-600" />
                                    ) : (
                                        <ToggleLeft className="w-10 h-10 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
