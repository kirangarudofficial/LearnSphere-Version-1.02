import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, FileText, Download } from 'lucide-react';

export default function BillingPage() {
    const [invoices, setInvoices] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
                    <p className="text-gray-600 mt-1">Manage your billing and payment history</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <CreditCard className="w-12 h-12 text-blue-600 mb-4" />
                        <p className="text-gray-600 text-sm">Current Balance</p>
                        <p className="text-3xl font-bold text-gray-900">$0.00</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <Calendar className="w-12 h-12 text-green-600 mb-4" />
                        <p className="text-gray-600 text-sm">Next Billing Date</p>
                        <p className="text-lg font-bold text-gray-900">--</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <FileText className="w-12 h-12 text-purple-600 mb-4" />
                        <p className="text-gray-600 text-sm">Total Invoices</p>
                        <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-900">Invoice History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Invoice</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {invoices.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-600">
                                            No invoices yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
