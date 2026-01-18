import React, { useState, useEffect } from 'react';
import { ClipboardList, Plus, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { surveyApi } from '../services/allServices';

interface Survey {
    id: string;
    title: string;
    description: string;
    questions: any[];
    status: string;
    responseCount: number;
}

export default function SurveysPage() {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        loadSurveys();
    }, []);

    const loadSurveys = async () => {
        try {
            setLoading(true);
            // Mock data
            setSurveys([]);
        } catch (error) {
            console.error('Failed to load surveys:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Surveys</h1>
                            <p className="text-gray-600 mt-1">Collect feedback and insights</p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Survey</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {surveys.length === 0 ? (
                        <div className="col-span-full bg-white rounded-xl shadow-lg p-12 text-center">
                            <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No surveys yet</h3>
                            <p className="text-gray-500">Create your first survey to start collecting feedback</p>
                        </div>
                    ) : (
                        surveys.map((survey) => (
                            <div key={survey.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">{survey.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${survey.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {survey.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{survey.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{survey.questions.length} questions</span>
                                    <span className="text-gray-600">{survey.responseCount} responses</span>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                                        View Results
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
