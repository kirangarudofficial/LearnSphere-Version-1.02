import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseDetail from '../components/course/CourseDetail';
import { coursesService } from '../services/coursesService';

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Get course details
    const course = coursesService.getCourseById(id || '');

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
                    <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                    >
                        Browse Courses
                    </button>
                </div>
            </div>
        );
    }

    return <CourseDetail course={course} onBack={() => navigate(-1)} />;
}
