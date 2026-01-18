import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function PaymentsPage() {
    const [transactions, setTransactions] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
                    <p className="text-gray-600 mt-1">View all your transactions</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transaction ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {transactions.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-600">No transactions yet</p>
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
