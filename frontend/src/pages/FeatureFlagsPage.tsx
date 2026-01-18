import React, { useState } from 'react';
import { Flag, ToggleLeft, ToggleRight } from 'lucide-react';
import { featureFlagApi } from '../services/allServices';

export default function FeatureFlagsPage() {
    const [flags, setFlags] = useState<any[]>([]);

    const handleToggle = async (key: string) => {
        try {
            await featureFlagApi.toggleFlag(key);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Feature Flags</h1>
                    <p className="text-gray-600 mt-1">Control feature rollouts</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {flags.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <Flag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600">No feature flags</h3>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
