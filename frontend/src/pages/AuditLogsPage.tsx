import React, { useState, useEffect } from 'react';
import { Shield, Filter, Download, Eye } from 'lucide-react';
import { auditApi } from '../services/allServices';

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        try {
            const response = await auditApi.queryLogs({});
            setLogs(response.data || []);
        } catch (error) {
            console.error(error);
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
                            <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
                            <p className="text-gray-600 mt-1">System activity and security logs</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Download className="w-5 h-5" />
                            <span>Export Logs</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <div className="flex items-center space-x-4">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <select className="px-4 py-2 border border-gray-300 rounded-lg">
                                <option>All Events</option>
                                <option>User Actions</option>
                                <option>Admin Actions</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Event</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Resource</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {logs.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-600">
                                            No audit logs found
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
