import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoursePlayer from '../components/course/CoursePlayer';
import { coursesService } from '../services/coursesService';

export default function CoursePlayerPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

    // Get course details
    const course = coursesService.getCourseById(id || '');

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
                    <p className="text-gray-600 mb-4">The course you're trying to access doesn't exist.</p>
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

    // Mock lessons - in real app this would come from course data
    const lessons = [
        { id: '1', title: 'Introduction to the Course', duration: '5:30', videoUrl: 'https://example.com/video1.mp4' },
        { id: '2', title: 'Getting Started', duration: '12:45', videoUrl: 'https://example.com/video2.mp4' },
        { id: '3', title: 'Core Concepts', duration: '18:20', videoUrl: 'https://example.com/video3.mp4' },
    ];

    const currentLesson = lessons[currentLessonIndex] || lessons[0];

    const handleLessonComplete = () => {
        console.log('Lesson completed:', currentLesson.id);
        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    return (
        <CoursePlayer
            course={course}
            currentLesson={currentLesson}
            onBack={() => navigate(`/courses/${id}`)}
            onLessonComplete={handleLessonComplete}
        />
    );
}
