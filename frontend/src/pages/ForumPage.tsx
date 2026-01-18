import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageSquare, Plus, Pin, Lock, ArrowLeft, ThumbsUp, Reply, MoreVertical } from 'lucide-react';
import { forumApi } from '../../services/allServices';

interface Thread {
    id: string;
    title: string;
    content: string;
    author: { id: string; name: string; avatar: string };
    createdAt: Date;
    isPinned: boolean;
    isLocked: boolean;
    replyCount: number;
}

interface Post {
    id: string;
    content: string;
    author: { id: string; name: string; avatar: string };
    createdAt: Date;
}

export default function ForumPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [threads, setThreads] = useState<Thread[]>([]);
    const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateThread, setShowCreateThread] = useState(false);
    const [newThread, setNewThread] = useState({ title: '', content: '' });
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        if (courseId) {
            loadThreads();
        }
    }, [courseId]);

    const loadThreads = async () => {
        try {
            setLoading(true);
            const response = await forumApi.getCourseThreads(courseId!);
            setThreads(response.data || []);
        } catch (error) {
            console.error('Failed to load threads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateThread = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await forumApi.createThread(courseId!, newThread.title, newThread.content);
            setNewThread({ title: '', content: '' });
            setShowCreateThread(false);
            loadThreads();
        } catch (error) {
            console.error('Failed to create thread:', error);
        }
    };

    const handleSelectThread = async (thread: Thread) => {
        setSelectedThread(thread);
        try {
            const response = await forumApi.getThreadPosts(thread.id);
            setPosts(response.data || []);
        } catch (error) {
            console.error('Failed to load posts:', error);
        }
    };

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedThread) return;

        try {
            await forumApi.replyToThread(selectedThread.id, replyContent);
            setReplyContent('');
            handleSelectThread(selectedThread);
        } catch (error) {
            console.error('Failed to reply:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Course</span>
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Course Discussions</h1>
                            <p className="text-gray-600 mt-1">Ask questions and discuss with fellow students</p>
                        </div>
                        <button
                            onClick={() => setShowCreateThread(true)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            <span>New Thread</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Thread List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b">
                                <h2 className="font-semibold text-gray-800">All Threads</h2>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
                                {threads.map((thread) => (
                                    <button
                                        key={thread.id}
                                        onClick={() => handleSelectThread(thread)}
                                        className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedThread?.id === thread.id ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    {thread.isPinned && <Pin className="w-4 h-4 text-orange-500" />}
                                                    {thread.isLocked && <Lock className="w-4 h-4 text-gray-500" />}
                                                    <h3 className="font-semibold text-gray-900 truncate">{thread.title}</h3>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {thread.replyCount} {thread.replyCount === 1 ? 'reply' : 'replies'}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Thread Detail */}
                    <div className="lg:col-span-2">
                        {selectedThread ? (
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                {/* Thread Header */}
                                <div className="p-6 border-b">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            {selectedThread.isPinned && <Pin className="w-5 h-5 text-orange-500" />}
                                            {selectedThread.isLocked && <Lock className="w-5 h-5 text-gray-500" />}
                                            <h2 className="text-2xl font-bold text-gray-900">{selectedThread.title}</h2>
                                        </div>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <MoreVertical className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={selectedThread.author.avatar}
                                            alt={selectedThread.author.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">{selectedThread.author.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(selectedThread.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mt-4">{selectedThread.content}</p>
                                </div>

                                {/* Replies */}
                                <div className="p-6 bg-gray-50 max-h-[400px] overflow-y-auto">
                                    <h3 className="font-semibold text-gray-800 mb-4">Replies</h3>
                                    <div className="space-y-4">
                                        {posts.map((post) => (
                                            <div key={post.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                                <div className="flex items-start space-x-3">
                                                    <img
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold text-gray-900">{post.author.name}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {new Date(post.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <p className="text-gray-700 mt-2">{post.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reply Form */}
                                {!selectedThread.isLocked && (
                                    <div className="p-6 border-t">
                                        <form onSubmit={handleReply}>
                                            <textarea
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Write your reply..."
                                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                rows={4}
                                                required
                                            />
                                            <div className="flex justify-end mt-3">
                                                <button
                                                    type="submit"
                                                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                                                >
                                                    <Reply className="w-4 h-4" />
                                                    <span>Post Reply</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600">Select a thread to view discussion</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Thread Modal */}
            {showCreateThread && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Thread</h2>
                        <form onSubmit={handleCreateThread}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={newThread.title}
                                        onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter thread title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                                    <textarea
                                        value={newThread.content}
                                        onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        rows={6}
                                        placeholder="Describe your question or topic..."
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateThread(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Create Thread
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
