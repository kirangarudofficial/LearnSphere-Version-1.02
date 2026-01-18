import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function RecommendationCenterPage() {
    const recommendations = [
        { id: 1, title: 'Advanced React Patterns', reason: 'Based on your React course progress' },
        { id: 2, title: 'TypeScript Mastery', reason: 'Popular among students like you' },
        { id: 3, title: 'Next.js Complete Guide', reason: 'Complements your current learning path' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-3">
                        <Sparkles className="w-8 h-8 text-purple-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Recommendations</h1>
                            <p className="text-gray-600 mt-1">Personalized course suggestions for you</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((rec) => (
                        <div key={rec.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-start space-x-3 mb-4">
                                <TrendingUp className="w-6 h-6 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{rec.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                                </div>
                            </div>
                            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-semibold">
                                View Course
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
