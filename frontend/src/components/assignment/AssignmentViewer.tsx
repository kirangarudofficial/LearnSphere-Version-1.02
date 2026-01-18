import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    maxPoints: number;
    submission?: {
        submittedAt: Date;
        status: 'pending' | 'graded';
        grade?: number;
        feedback?: string;
    };
}

interface AssignmentViewerProps {
    assignment: Assignment;
    onSubmit: (file: File, text: string) => Promise<void>;
}

export const AssignmentViewer: React.FC<AssignmentViewerProps> = ({
    assignment,
    onSubmit
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [textSubmission, setTextSubmission] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { success, error } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file && !textSubmission.trim()) {
            error('Please provide a file or text submission');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(file!, textSubmission);
            success('Assignment submitted successfully!');
        } catch (err) {
            error('Failed to submit assignment');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isOverdue = new Date() > assignment.dueDate;
    const isSubmitted = !!assignment.submission;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">{assignment.title}</h2>
                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Max Points: {assignment.maxPoints}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
                    <p className="text-gray-700">{assignment.description}</p>
                </div>

                {/* Submission Status */}
                {isSubmitted && (
                    <div className={`mb-6 p-4 rounded-lg ${assignment.submission?.status === 'graded' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
                        } border`}>
                        <div className="flex items-start space-x-3">
                            {assignment.submission?.status === 'graded' ? (
                                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                            ) : (
                                <Clock className="w-6 h-6 text-blue-600 mt-0.5" />
                            )}
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">
                                    {assignment.submission?.status === 'graded' ? 'Graded' : 'Submitted'}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Submitted on {assignment.submission?.submittedAt.toLocaleDateString()}
                                </p>
                                {assignment.submission?.status === 'graded' && (
                                    <>
                                        <div className="mt-2">
                                            <span className="text-2xl font-bold text-green-600">
                                                {assignment.submission.grade}/{assignment.maxPoints}
                                            </span>
                                        </div>
                                        {assignment.submission.feedback && (
                                            <div className="mt-3 p-3 bg-white rounded">
                                                <p className="text-sm font-semibold text-gray-900 mb-1">Instructor Feedback:</p>
                                                <p className="text-sm text-gray-700">{assignment.submission.feedback}</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Overdue Warning */}
                {isOverdue && !isSubmitted && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                        <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-red-900">Assignment Overdue</h4>
                            <p className="text-sm text-red-700">This assignment is past its due date.</p>
                        </div>
                    </div>
                )}

                {/* Submission Form */}
                {!isSubmitted && (
                    <>
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Your Submission</h3>

                            {/* File Upload */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload File
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        {file ? (
                                            <p className="text-sm text-gray-900 font-medium">{file.name}</p>
                                        ) : (
                                            <>
                                                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Text Submission */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Or Write Your Answer
                                </label>
                                <textarea
                                    value={textSubmission}
                                    onChange={(e) => setTextSubmission(e.target.value)}
                                    placeholder="Type your answer here..."
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={8}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || (!file && !textSubmission.trim())}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <span>Submitting...</span>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Submit Assignment</span>
                                </>
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
