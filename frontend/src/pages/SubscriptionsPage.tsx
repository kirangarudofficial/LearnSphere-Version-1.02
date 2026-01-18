import React, { useState, useEffect } from 'react';
import { CreditCard, Check, X, DollarSign } from 'lucide-react';
import { subscriptionApi } from '../services/allServices';

interface Plan {
    id: string;
    name: string;
    price: number;
    interval: string;
    features: string[];
}

export default function SubscriptionsPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [currentSubscription, setCurrentSubscription] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSubscriptionData();
    }, []);

    const loadSubscriptionData = async () => {
        try {
            setLoading(true);
            const sub = await subscriptionApi.getMySubscription();
            setCurrentSubscription(sub.data);

            // Mock plans
            setPlans([
                {
                    id: '1',
                    name: 'Basic',
                    price: 9.99,
                    interval: 'month',
                    features: ['Access to basic courses', 'Community support', 'Mobile app access'],
                },
                {
                    id: '2',
                    name: 'Pro',
                    price: 29.99,
                    interval: 'month',
                    features: ['All Basic features', 'Premium courses', 'Certificate of completion', '1-on-1 mentoring'],
                },
                {
                    id: '3',
                    name: 'Enterprise',
                    price: 99.99,
                    interval: 'month',
                    features: ['All Pro features', 'Custom learning paths', 'Priority support', 'Analytics dashboard', 'Team management'],
                },
            ]);
        } catch (error) {
            console.error('Failed to load subscription data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (planId: string) => {
        try {
            await subscriptionApi.subscribe(planId);
            loadSubscriptionData();
        } catch (error) {
            console.error('Failed to subscribe:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
                    <p className="text-gray-600 mt-1">Choose the perfect plan for you</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {currentSubscription && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Current Plan: {currentSubscription.plan?.name}</h3>
                                <p className="text-gray-600 mt-1">
                                    ${currentSubscription.plan?.price}/{currentSubscription.plan?.interval}
                                </p>
                            </div>
                            <button className="text-red-600 hover:text-red-700 font-semibold">Cancel Subscription</button>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-xl shadow-lg overflow-hidden ${plan.name === 'Pro' ? 'border-2 border-blue-600 transform scale-105' : ''
                                }`}
                        >
                            {plan.name === 'Pro' && (
                                <div className="bg-blue-600 text-white text-center py-2 font-semibold text-sm">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                                    <span className="text-gray-600 ml-2">/{plan.interval}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <Check className="w-5 h-5 text-green-600 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleSubscribe(plan.id)}
                                    className={`w-full py-3 rounded-lg font-semibold ${plan.name === 'Pro'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                        }`}
                                >
                                    {currentSubscription?.plan?.id === plan.id ? 'Current Plan' : 'Subscribe'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
