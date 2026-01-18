import React, { useState } from 'react';
import { Shield, AlertTriangle, Check, X } from 'lucide-react';

export default function ModerationPage() {
    const [pendingItems, setPendingItems] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-3">
                        <Shield className="w-8 h-8 text-orange-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
                            <p className="text-gray-600 mt-1">Review and moderate user-generated content</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-900">Pending Reviews</h2>
                    </div>
                    {pendingItems.length === 0 ? (
                        <div className="py-12 text-center">
                            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">No items pending moderation</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {pendingItems.map((item) => (
                                <div key={item.id} className="p-6 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <AlertTriangle className="w-5 h-5 text-orange-600" />
                                                <span className="font-semibold text-gray-900">{item.type}</span>
                                            </div>
                                            <p className="text-gray-700">{item.content}</p>
                                            <p className="text-sm text-gray-600 mt-2">Reported by {item.reporter}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
                                                <Check className="w-5 h-5" />
                                            </button>
                                            <button className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
