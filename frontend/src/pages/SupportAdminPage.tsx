import React, { useState } from 'react';
import { Headphones, MessageCircle, Clock } from 'lucide-react';

export default function SupportAdminPage() {
    const [tickets, setTickets] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-3">
                        <Headphones className="w-8 h-8 text-green-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Support Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage support tickets and inquiries</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: 'Open Tickets', value: '0', icon: MessageCircle, color: 'bg-blue-600' },
                        { label: 'In Progress', value: '0', icon: Clock, color: 'bg-yellow-600' },
                        { label: 'Resolved Today', value: '0', icon: Headphones, color: 'bg-green-600' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-4 rounded-xl`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-900">Recent Tickets</h2>
                    </div>
                    {tickets.length === 0 && (
                        <div className="py-12 text-center text-gray-600">
                            No support tickets
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
