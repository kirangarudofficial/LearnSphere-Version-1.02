import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface Question {
    id: string;
    type: 'multiple_choice' | 'true_false' | 'short_answer';
    question: string;
    options?: string[];
    correctAnswer?: string;
}

interface QuizPlayerProps {
    quizId: string;
    questions: Question[];
    timeLimit?: number; // in minutes
    onComplete: (score: number, answers: Record<string, string>) => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
    quizId,
    questions,
    timeLimit,
    onComplete
}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { success, warning } = useToast();

    useEffect(() => {
        if (timeRemaining === null) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev === null || prev <= 0) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const handleAnswerSelect = (questionId: string, answer: string) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = () => {
        const answeredCount = Object.keys(answers).length;
        if (answeredCount < questions.length) {
            warning(`You have ${questions.length - answeredCount} unanswered questions.`);
        }

        // Calculate score (mock - should be done server-side)
        let correct = 0;
        questions.forEach((q) => {
            if (q.correctAnswer && answers[q.id] === q.correctAnswer) {
                correct++;
            }
        });

        const score = (correct / questions.length) * 100;
        setIsSubmitted(true);
        onComplete(score, answers);
        success(`Quiz submitted! Score: ${score.toFixed(0)}%`);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQ = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const isFirstQuestion = currentQuestion === 0;

    if (isSubmitted) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                <p className="text-gray-600">Your responses have been submitted.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Question {currentQuestion + 1} of {questions.length}</h3>
                        <div className="w-full bg-blue-500 rounded-full h-2 mt-2">
                            <div
                                className="bg-white h-2 rounded-full transition-all"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    {timeRemaining !== null && (
                        <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-lg">
                            <Clock className="w-5 h-5" />
                            <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Question */}
            <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">{currentQ.question}</h4>

                {/* Answer Options */}
                <div className="space-y-3">
                    {currentQ.type === 'multiple_choice' && currentQ.options?.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswerSelect(currentQ.id, option)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${answers[currentQ.id] === option
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`w-5 h-5 rounded-full border-2 ${answers[currentQ.id] === option
                                        ? 'border-blue-600 bg-blue-600'
                                        : 'border-gray-300'
                                    }`}>
                                    {answers[currentQ.id] === option && (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        </div>
                                    )}
                                </div>
                                <span className="text-gray-900">{option}</span>
                            </div>
                        </button>
                    ))}

                    {currentQ.type === 'true_false' && (
                        <>
                            {['True', 'False'].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswerSelect(currentQ.id, option)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${answers[currentQ.id] === option
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </>
                    )}

                    {currentQ.type === 'short_answer' && (
                        <textarea
                            value={answers[currentQ.id] || ''}
                            onChange={(e) => handleAnswerSelect(currentQ.id, e.target.value)}
                            placeholder="Type your answer here..."
                            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                            rows={4}
                        />
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="p-6 bg-gray-50 border-t flex items-center justify-between">
                <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    disabled={isFirstQuestion}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Previous</span>
                </button>

                {isLastQuestion ? (
                    <button
                        onClick={handleSubmit}
                        className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
                    >
                        <CheckCircle className="w-5 h-5" />
                        <span>Submit Quiz</span>
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};
