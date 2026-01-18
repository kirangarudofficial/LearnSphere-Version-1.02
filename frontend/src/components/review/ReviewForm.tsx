import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StarRating } from './StarRating';
import { useToast } from '../../contexts/ToastContext';

interface ReviewFormProps {
    courseId: string;
    existingReview?: {
        rating: number;
        comment: string;
    };
    onSubmit: (rating: number, comment: string) => Promise<void>;
    onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
    courseId,
    existingReview,
    onSubmit,
    onCancel
}) => {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [comment, setComment] = useState(existingReview?.comment || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { success, error } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            error('Please select a rating');
            return;
        }

        if (comment.trim().length < 10) {
            error('Review must be at least 10 characters');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(rating, comment);
            success(existingReview ? 'Review updated!' : 'Review submitted!');
            onCancel();
        } catch (err) {
            error('Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {existingReview ? 'Edit Review' : 'Write a Review'}
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Rating */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Your Rating
                        </label>
                        <div className="flex items-center space-x-4">
                            <StarRating value={rating} onChange={setRating} size="lg" />
                            {rating > 0 && (
                                <span className="text-gray-600">
                                    {rating === 1 && 'Poor'}
                                    {rating === 2 && 'Fair'}
                                    {rating === 3 && 'Good'}
                                    {rating === 4 && 'Very Good'}
                                    {rating === 5 && 'Excellent'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Your Review
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this course..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={6}
                            required
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Minimum 10 characters ({comment.length}/10)
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 text-gray-700 hover:text-gray-900 font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
