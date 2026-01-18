import React, { useState, useEffect } from 'react';
import { Users, BookOpen, DollarSign, Activity, ChevronRight, Search, Ban, Check, X } from 'lucide-react';
import { adminApi } from '../../services/allServices';

interface SystemStats {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    enrollmentCount: number;
}

interface Course {
    id: string;
    title: string;
    status: string;
    instructor: { name: string };
    enrollmentCount: number;
    reviewCount: number;
}

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'revenue'>('overview');
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, usersRes, coursesRes] = await Promise.all([
                adminApi.getSystemStats(),
                adminApi.getUsers({ page: 1, limit: 10 }),
                adminApi.getCourses({ page: 1, limit: 10 }),
            ]);

            setStats(statsRes.data);
            setUsers(usersRes.data?.users || []);
            setCourses(coursesRes.data?.courses || []);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove Course = async (courseId: string) => {
        try {
            await adminApi.approveCourse(courseId);
            loadDashboardData();
        } catch (error) {
            console.error('Failed to approve course:', error);
        }
    };

    const handleBanUser = async (userId: string) => {
        const reason = prompt('Enter ban reason:');
        if (!reason) return;

        try {
            await adminApi.banUser(userId, reason);
            loadDashboardData();
        } catch (error) {
            console.error('Failed to ban user:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Users', value: stats?.totalUsers.toLocaleString(), icon: Users, color: 'bg-blue-500' },
        { label: 'Total Courses', value: stats?.totalCourses.toLocaleString(), icon: BookOpen, color: 'bg-green-500' },
        { label: 'Enrollments', value: stats?.totalEnrollments.toLocaleString(), icon: Activity, color: 'bg-purple-500' },
        { label: 'Revenue', value: `$${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'bg-orange-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage your platform</p>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            System Health
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Grid */}
                {activeTab === 'overview' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {statCards.map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                        </div>
                                        <div className={`${stat.color} p-4 rounded-xl`}>
                                            <stat.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Recent Users */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6 border-b">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                                        <button
                                            onClick={() => setActiveTab('users')}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center space-x-1"
                                        >
                                            <span>View All</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {users.slice(0, 5).map((user) => (
                                        <div key={user.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                                    <p className="text-sm text-gray-600">{user.email}</p>
                                                </div>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                                    {user.role}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pending Courses */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6 border-b">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-gray-900">Pending Courses</h2>
                                        <button
                                            onClick={() => setActiveTab('courses')}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center space-x-1"
                                        >
                                            <span>View All</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {courses.filter(c => c.status === 'PENDING').slice(0, 5).map((course) => (
                                        <div key={course.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-900">{course.title}</p>
                                                    <p className="text-sm text-gray-600">by {course.instructor.name}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleApproveCourse(course.id)}
                                                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold"
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Enrollments</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Joined</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                                    <p className="text-sm text-gray-600">{user.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">{user.enrollmentCount}</td>
                                            <td className="px-6 py-4 text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleBanUser(user.id)}
                                                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                                                >
                                                    <Ban className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Instructor</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Students</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {courses.map((course) => (
                                        <tr key={course.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">{course.title}</p>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">{course.instructor.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                                                        course.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">{course.enrollmentCount}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    {course.status === 'PENDING' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApproveCourse(course.id)}
                                                                className="text-green-600 hover:text-green-700"
                                                            >
                                                                <Check className="w-5 h-5" />
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-700">
                                                                <X className="w-5 h-5" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl shadow-lg p-2 mb-8 mt-8 flex space-x-2">
                    {['overview', 'users', 'courses', 'revenue'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${activeTab === tab
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
