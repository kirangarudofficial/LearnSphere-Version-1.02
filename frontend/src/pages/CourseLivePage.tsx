import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, MessageSquare, Users, Hand, Share2, FileText, Settings, Monitor, X } from 'lucide-react';

export default function CourseLivePage() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [showChat, setShowChat] = useState(true);
    const [showParticipants, setShowParticipants] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [chatMessage, setChatMessage] = useState('');

    // Mock data
    const session = {
        title: 'Advanced React Patterns - Live Session',
        instructor: 'Sarah Chen',
        participants: 42,
        duration: '1:30:00',
        startTime: new Date().toLocaleTimeString(),
    };

    const chatMessages = [
        { id: 1, user: 'John Doe', message: 'Great explanation!', time: '10:23 AM' },
        { id: 2, user: 'Jane Smith', message: 'Can you explain Redux again?', time: '10:25 AM' },
        { id: 3, user: 'Instructor', message: 'Sure! Let me cover that now.', time: '10:26 AM', isInstructor: true },
    ];

    const participants = [
        { id: 1, name: 'Sarah Chen', role: 'Instructor', isPresenting: true },
        { id: 2, name: 'John Doe', role: 'Student', handRaised: false },
        { id: 3, name: 'Jane Smith', role: 'Student', handRaised: true },
        { id: 4, name: 'Mike Johnson', role: 'Student', handRaised: false },
    ];

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            console.log('Sending message:', chatMessage);
            setChatMessage('');
        }
    };

    const handleLeaveSession = () => {
        if (window.confirm('Are you sure you want to leave this live session?')) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Top Bar */}
            <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div>
                            <h1 className="text-white font-semibold text-lg">{session.title}</h1>
                            <p className="text-gray-400 text-sm">Instructor: {session.instructor}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Users className="w-5 h-5" />
                            <span className="text-sm">{session.participants} participants</span>
                        </div>
                        <div className="text-gray-300 text-sm">
                            Started: {session.startTime}
                        </div>
                        <button
                            onClick={handleLeaveSession}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Leave
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Video Area */}
                <div className="flex-1 flex flex-col bg-gray-900 p-6">
                    {/* Main Video */}
                    <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                                <Video className="w-32 h-32 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg">Live Video Stream</p>
                                <p className="text-gray-500 text-sm mt-2">Session ID: {sessionId}</p>
                            </div>
                        </div>

                        {/* Video Controls Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-white">
                                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-semibold">
                                        SC
                                    </div>
                                    <span className="font-medium">Sarah Chen (Presenting)</span>
                                </div>

                                {/* Center Controls */}
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setIsAudioOn(!isAudioOn)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                                            }`}
                                    >
                                        {isAudioOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                                    </button>

                                    <button
                                        onClick={() => setIsVideoOn(!isVideoOn)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                                            }`}
                                    >
                                        {isVideoOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                                    </button>

                                    <button
                                        onClick={() => setHandRaised(!handRaised)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${handRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 hover:bg-gray-600'
                                            }`}
                                    >
                                        <Hand className="w-5 h-5 text-white" />
                                    </button>

                                    <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
                                        <Share2 className="w-5 h-5 text-white" />
                                    </button>

                                    <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
                                        <Monitor className="w-5 h-5 text-white" />
                                    </button>

                                    <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
                                        <Settings className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setShowParticipants(!showParticipants)}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center space-x-2"
                                    >
                                        <Users className="w-5 h-5" />
                                        <span>{session.participants}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Participant Thumbnails */}
                    <div className="grid grid-cols-6 gap-4">
                        {participants.slice(0, 6).map((participant) => (
                            <div key={participant.id} className="relative bg-gray-800 rounded-lg aspect-video overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        {participant.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                                {participant.handRaised && (
                                    <div className="absolute top-2 right-2">
                                        <Hand className="w-5 h-5 text-yellow-400" />
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                                    <p className="text-white text-xs truncate">{participant.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Side Panel */}
                {showChat && (
                    <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-700">
                            <button className="flex-1 px-4 py-3 text-white bg-gray-700 font-medium flex items-center justify-center space-x-2">
                                <MessageSquare className="w-4 h-4" />
                                <span>Chat</span>
                            </button>
                            <button className="flex-1 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>Notes</span>
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {chatMessages.map((msg) => (
                                <div key={msg.id} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-medium ${msg.isInstructor ? 'text-yellow-400' : 'text-gray-300'}`}>
                                            {msg.user}
                                            {msg.isInstructor && <span className="ml-2 text-xs bg-yellow-600 px-2 py-0.5 rounded">Instructor</span>}
                                        </span>
                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-400">{msg.message}</p>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
