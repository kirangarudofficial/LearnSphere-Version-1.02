import React, { useState } from 'react';
import { Bell, Check, Trash2, MessageSquare, BookOpen, Award, Users, X } from 'lucide-react';

interface Notification {
    id: string;
    type: 'course' | 'message' | 'achievement' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
    icon: any;
    color: string;
}

export default function NotificationsPage() {
    const [filter, setFilter] = useState<'all' | 'unread'>('all');
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'course',
            title: 'New lesson available',
            message: 'Chapter 5: Advanced React Patterns is now available in React Masterclass',
            time: '2 hours ago',
            read: false,
            icon: BookOpen,
            color: 'blue',
        },
        {
            id: '2',
            type: 'achievement',
            title: 'Congratulations! 🎉',
            message: 'You've earned the "Fast Learner" badge for completing 5 courses this month!',
      time: '5 hours ago',
            read: false,
            icon: Award,
            color: 'yellow',
        },
        {
            id: '3',
            type: 'message',
            title: 'New message from Sarah Chen',
            message: 'Great question! Let me explain the difference between useState and useReducer...',
            time: '1 day ago',
            read: true,
            icon: MessageSquare,
            color: 'green',
        },
        {
            id: '4',
            type: 'course',
            title: 'Course update',
            message: 'Your course "Node.js Backend" has been updated with new content',
            time: '2 days ago',
            read: true,
            icon: BookOpen,
            color: 'blue',
        },
        {
            id: '5',
            type: 'system',
            title: 'Live session starting soon',
            message: 'Your live session "Advanced React Patterns" starts in 30 minutes',
            time: '3 days ago',
            read: true,
            icon: Users,
            color: 'purple',
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => !n.read);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
        if (window.confirm('Are you sure you want to clear all notifications?')) {
            setNotifications([]);
        }
    };

    const getIconColor = (color: string) => {
        const colors: { [key: string]: string } = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            purple: 'bg-purple-100 text-purple-600',
            red: 'bg-red-100 text-red-600',
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">Notifications</h1>
                            <p className="text-gray-600">Stay updated with your learning activity</p>
                        </div>
                        {notifications.length > 0 && (
                            <div className="flex items-center space-x-3">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        <Check className="w-4 h-4" />
                                        <span>Mark all as read</span>
                                    </button>
                                )}
                                <button
                                    onClick={clearAll}
                                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Clear all</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Stats and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Bell className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">{notifications.length}</div>
                                    <div className="text-sm text-gray-600">Total Notifications</div>
                                </div>
                            </div>

                            {unreadCount > 0 && (
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl font-bold text-yellow-600">{unreadCount}</span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-800">{unreadCount}</div>
                                        <div className="text-sm text-gray-600">Unread</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${filter === 'all'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                All ({notifications.length})
                            </button>
                            <button
                                onClick={() => setFilter('unread')}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${filter === 'unread'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                Unread ({unreadCount})
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                            </h3>
                            <p className="text-gray-600">
                                {filter === 'unread'
                                    ? "You're all caught up! No unread notifications at the moment."
                                    : "You don't have any notifications yet. Keep learning and they'll appear here!"}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                                <div
                                    key={notification.id}
                                    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${!notification.read ? 'border-l-4 border-primary-500' : ''
                                        }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start space-x-4">
                                            {/* Icon */}
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.color)}`}>
                                                <Icon className="w-6 h-6" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
                                                    {!notification.read && (
                                                        <span className="ml-2 w-3 h-3 bg-primary-500 rounded-full flex-shrink-0"></span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 mb-3">{notification.message}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">{notification.time}</span>
                                                    <div className="flex items-center space-x-2">
                                                        {!notification.read && (
                                                            <button
                                                                onClick={() => markAsRead(notification.id)}
                                                                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                                <span>Mark as read</span>
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => deleteNotification(notification.id)}
                                                            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
