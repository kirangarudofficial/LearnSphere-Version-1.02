import React, { useState } from 'react';
import { Tag, Plus, Percent } from 'lucide-react';

export default function CouponsPage() {
    const [coupons, setCoupons] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Coupon Management</h1>
                            <p className="text-gray-600 mt-1">Create and manage discount coupons</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            <Plus className="w-5 h-5" />
                            <span>Create Coupon</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {coupons.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No coupons yet</h3>
                        <p className="text-gray-500">Create your first discount coupon</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coupons.map((coupon) => (
                            <div key={coupon.id} className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{coupon.code}</h3>
                                        <p className="text-gray-600 text-sm">{coupon.description}</p>
                                    </div>
                                    <Percent className="w-8 h-8 text-green-600" />
                                </div>
                                <div className="text-3xl font-bold text-green-600 mb-2">{coupon.discount}% OFF</div>
                                <p className="text-sm text-gray-600">Used {coupon.used} times</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
