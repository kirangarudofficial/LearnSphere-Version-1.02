import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MyLearningPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'all' | 'inProgress' | 'completed'>('all');

    // Mock enrolled courses
    const enrolledCourses = [
        {
            id: '1',
            title: 'Complete React Development Bootcamp',
            instructor: 'Sarah Chen',
            progress: 68,
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
            lastWatched: '2 hours ago',
            nextLesson: 'React Hooks Deep Dive',
            totalLessons: 156,
            completedLessons: 106,
            timeSpent: '24h 15m',
            status: 'in-progress',
        },
        {
            id: '2',
            title: 'Advanced Node.js Backend Development',
            instructor: 'Michael Brown',
            progress: 35,
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
            lastWatched: '1 day ago',
            nextLesson: 'Express Middleware Patterns',
            totalLessons: 98,
            completedLessons: 34,
            timeSpent: '12h 30m',
            status: 'in-progress',
        },
        {
            id: '3',
            title: 'UI/UX Design Masterclass',
            instructor: 'Emily Davis',
            progress: 100,
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
            lastWatched: '3 days ago',
            completedDate: 'Jan 5, 2026',
            totalLessons: 75,
            completedLessons: 75,
            timeSpent: '18h 45m',
            status: 'completed',
            certificateAvailable: true,
        },
    ];

    const filteredCourses = enrolledCourses.filter(course => {
        if (activeTab === 'all') return true;
        if (activeTab === 'inProgress') return course.status === 'in-progress';
        if (activeTab === 'completed') return course.status === 'completed';
        return true;
    });

    const stats = {
        totalCourses: enrolledCourses.length,
        inProgress: enrolledCourses.filter(c => c.status === 'in-progress').length,
        completed: enrolledCourses.filter(c => c.status === 'completed').length,
        totalTimeSpent: '55h 30m',
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">My Learning</h1>
                    <p className="text-gray-600">Track your progress and continue your learning journey</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <BookOpen className="w-8 h-8 text-primary-600" />
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stats.totalCourses}</div>
                        <div className="text-sm text-gray-600">Total Courses</div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Play className="w-8 h-8 text-yellow-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stats.inProgress}</div>
                        <div className="text-sm text-gray-600">In Progress</div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stats.completed}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Clock className="w-8 h-8 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stats.totalTimeSpent}</div>
                        <div className="text-sm text-gray-600">Time Spent</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'all'
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            All Courses ({enrolledCourses.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('inProgress')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'inProgress'
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            In Progress ({stats.inProgress})
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'completed'
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Completed ({stats.completed})
                        </button>
                    </div>
                </div>

                {/* Course List */}
                <div className="space-y-6">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="flex">
                                {/* Thumbnail */}
                                <div className="w-64 h-48 flex-shrink-0">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                                            <p className="text-gray-600 text-sm">by {course.instructor}</p>
                                        </div>
                                        {course.certificateAvailable && (
                                            <button className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                                                <Award className="w-4 h-4" />
                                                <span>Get Certificate</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>{course.progress}% complete</span>
                                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-4 h-4" />
                                                <span>Last watched: {course.lastWatched}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-4 h-4" />
                                                <span>Time spent: {course.timeSpent}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/courses/${course.id}/learn`)}
                                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                                        >
                                            <Play className="w-4 h-4" />
                                            <span>{course.status === 'completed' ? 'Review' : 'Continue'}</span>
                                        </button>
                                    </div>

                                    {course.nextLesson && course.status === 'in-progress' && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">
                                                Next up: <span className="font-semibold text-gray-800">{course.nextLesson}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
                        <p className="text-gray-600 mb-6">Start learning by enrolling in a course</p>
                        <button
                            onClick={() => navigate('/courses')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
