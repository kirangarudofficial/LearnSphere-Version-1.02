import React from 'react';

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
        ))}
    </>
);

export const TableSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        {[1, 2, 3, 4].map((i) => (
                            <th key={i} className="px-6 py-3">
                                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {[1, 2, 3, 4, 5].map((row) => (
                        <tr key={row}>
                            {[1, 2, 3, 4].map((col) => (
                                <td key={col} className="px-6 py-4">
                                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="p-4 animate-pulse">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const FormSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i}>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            ))}
            <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
    </div>
);

export const DashboardSkeleton: React.FC = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
            ))}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-64 bg-gray-200 rounded"></div>
        </div>
    </div>
);

export const PageSkeleton: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b animate-pulse">
            <div className="container mx-auto px-4 py-6">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8">
            <DashboardSkeleton />
        </div>
    </div>
);
