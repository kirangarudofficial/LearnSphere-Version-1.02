import React, { useState } from 'react';
import { Users, UserPlus, Settings } from 'lucide-react';

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Users className="w-8 h-8 text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                                <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
                            </div>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <UserPlus className="w-5 h-5" />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-600">
                                            No users found
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
