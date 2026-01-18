import React, { useState } from 'react';
import { Play, Code, Terminal, CheckCircle, XCircle } from 'lucide-react';
import { codeExecApi } from '../services/allServices';

export default function CodePlaygroundPage() {
    const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState('');

    const handleRun = async () => {
        setIsRunning(true);
        setError('');
        setOutput('');

        try {
            const result = await codeExecApi.executeCode(code, language);
            setOutput(result.data?.output || 'Code executed successfully');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Execution failed');
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Code Playground</h1>
                            <p className="text-gray-600 mt-1">Write and test your code</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
                            >
                                <Play className="w-5 h-5" />
                                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Code Editor */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 bg-gray-800 text-white flex items-center space-x-2">
                            <Code className="w-5 h-5" />
                            <span className="font-semibold">Editor</span>
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-[600px] p-4 font-mono text-sm bg-gray-900 text-gray-100 focus:outline-none resize-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* Output Console */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 bg-gray-800 text-white flex items-center space-x-2">
                            <Terminal className="w-5 h-5" />
                            <span className="font-semibold">Output</span>
                        </div>
                        <div className="p-4 h-[600px] bg-gray-900 text-gray-100 font-mono text-sm overflow-y-auto">
                            {isRunning && <p className="text-yellow-400">Running code...</p>}
                            {error && (
                                <div className="flex items-start space-x-2 text-red-400">
                                    <XCircle className="w-5 h-5 mt-0.5" />
                                    <pre className="whitespace-pre-wrap">{error}</pre>
                                </div>
                            )}
                            {output && !error && (
                                <div className="flex items-start space-x-2 text-green-400">
                                    <CheckCircle className="w-5 h-5 mt-0.5" />
                                    <pre className="whitespace-pre-wrap">{output}</pre>
                                </div>
                            )}
                            {!isRunning && !output && !error && (
                                <p className="text-gray-500">Output will appear here...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
