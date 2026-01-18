import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-3">
                        <Bot className="w-8 h-8 text-blue-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
                            <p className="text-gray-600 mt-1">Get help with your learning journey</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
                    <div className="flex-1 p-6 overflow-y-auto">
                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">How can I help you today?</h3>
                                <p className="text-gray-500">Ask me anything about your courses</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
