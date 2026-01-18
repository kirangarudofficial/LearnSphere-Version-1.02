import React, { useState } from 'react';
import { HelpCircle, Search, Mail, Phone, MessageSquare, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

    const faqs = [
        {
            id: '1',
            category: 'Getting Started',
            question: 'How do I create an account?',
            answer: 'Click on the "Sign Up" button in the top right corner. Fill in your name, email, and password. You\'ll receive a confirmation email to verify your account.',
        },
        {
            id: '2',
            category: 'Getting Started',
            question: 'How do I enroll in a course?',
            answer: 'Browse our course catalog, click on a course you\'re interested in, and click the "Enroll Now" button. Free courses are instantly accessible, while paid courses require payment completion.',
        },
        {
            id: '3',
            category: 'Courses',
            question: 'Can I download course videos?',
            answer: 'Yes! Premium course videos can be downloaded for offline viewing through our mobile app. Look for the download icon next to each video lesson.',
        },
        {
            id: '4',
            category: 'Courses',
            question: 'How long do I have access to a course?',
            answer: 'Once enrolled, you have lifetime access to all course materials, including future updates. You can learn at your own pace without time restrictions.',
        },
        {
            id: '5',
            category: 'Certificates',
            question: 'How do I get my certificate?',
            answer: 'Complete all course lessons and pass the final assessment with at least 70%. Your certificate will be automatically generated and available in your Certificates page.',
        },
        {
            id: '6',
            category: 'Certificates',
            question: 'Are certificates recognized by employers?',
            answer: 'Yes! Our certificates are industry-recognized and can be shared on LinkedIn, added to your resume, or presented to employers as proof of skill acquisition.',
        },
        {
            id: '7',
            category: 'Payment',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region.',
        },
        {
            id: '8',
            category: 'Payment',
            question: 'Do you offer refunds?',
            answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied with a course, request a refund within 30 days of purchase - no questions asked.',
        },
        {
            id: '9',
            category: 'Technical',
            question: 'What are the system requirements?',
            answer: 'LearnHub works on any modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, we recommend a stable internet connection of at least 5 Mbps.',
        },
        {
            id: '10',
            category: 'Technical',
            question: 'I\'m having video playback issues. What should I do?',
            answer: 'Try clearing your browser cache, using a different browser, or lowering the video quality. If issues persist, contact our support team with details about your device and browser.',
        },
    ];

    const categories = Array.from(new Set(faqs.map(faq => faq.category)));

    const filteredFAQs = searchQuery
        ? faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqs;

    const toggleFAQ = (id: string) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
                    <p className="text-primary-100 text-lg mb-8">Search our help center or browse categories below</p>

                    {/* Search */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for help..."
                                className="w-full px-6 py-4 pl-14 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Quick Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
                        <p className="text-gray-600 text-sm mb-4">Chat with our support team</p>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                            Start Chat
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
                        <p className="text-gray-600 text-sm mb-4">support@learnhub.com</p>
                        <a
                            href="mailto:support@learnhub.com"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Send Email
                        </a>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Support</h3>
                        <p className="text-gray-600 text-sm mb-4">1-800-LEARN-HUB</p>
                        <a
                            href="tel:1-800-537-6482"
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Call Now
                        </a>
                    </div>
                </div>

                {/* FAQs by Category */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>

                    {categories.map((category) => {
                        const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
                        if (categoryFAQs.length === 0) return null;

                        return (
                            <div key={category} className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-200">
                                    {category}
                                </h3>
                                <div className="space-y-4">
                                    {categoryFAQs.map((faq) => (
                                        <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => toggleFAQ(faq.id)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                                                {expandedFAQ === faq.id ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                )}
                                            </button>
                                            {expandedFAQ === faq.id && (
                                                <div className="px-4 pb-4 text-gray-600 bg-gray-50">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No FAQ results found for "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-primary-600 hover:text-primary-700 font-medium mt-2"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>

                {/* Additional Resources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Documentation</h3>
                        <p className="text-gray-600 mb-4">Browse our comprehensive documentation and guides</p>
                        <a
                            href="#"
                            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                            <span>View Documentation</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Forum</h3>
                        <p className="text-gray-600 mb-4">Join our community and get help from other learners</p>
                        <a
                            href="#"
                            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                            <span>Visit Forum</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
