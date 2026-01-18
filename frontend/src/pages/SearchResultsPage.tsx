import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Star, Clock, Users } from 'lucide-react';
import { coursesService } from '../services/coursesService';
import { Course } from '../types';

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';

    const [searchQuery, setSearchQuery] = useState(query);
    const [results, setResults] = useState<Course[]>([]);
    const [filters, setFilters] = useState({
        level: 'all',
        category: 'all',
        duration: 'all',
        rating: 'all',
    });
    const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'students' | 'newest'>('relevance');

    useEffect(() => {
        if (query) {
            performSearch(query);
        }
    }, [query]);

    const performSearch = (searchTerm: string) => {
        const searchResults = coursesService.searchCourses(searchTerm);
        setResults(searchResults);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const filteredResults = results.filter(course => {
        if (filters.level !== 'all' && course.level.toLowerCase() !== filters.level) return false;
        if (filters.category !== 'all' && course.category.toLowerCase() !== filters.category) return false;
        // Add more filter logic as needed
        return true;
    });

    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'students':
                return parseInt(b.students.replace(/\D/g, '')) - parseInt(a.students.replace(/\D/g, ''));
            case 'newest':
                return 0; // Would use actual date if available
            default:
                return 0; // Relevance (default order)
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-8">
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for courses..."
                                className="w-full px-6 py-4 pl-14 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {query && (
                        <div className="text-gray-600">
                            Found <span className="font-semibold text-gray-800">{sortedResults.length}</span> results for "<span className="font-semibold text-gray-800">{query}</span>"
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Level Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                    <select
                                        value={filters.level}
                                        onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="all">All Levels</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="development">Development</option>
                                        <option value="design">Design</option>
                                        <option value="business">Business</option>
                                        <option value="marketing">Marketing</option>
                                    </select>
                                </div>

                                {/* Rating Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                    <select
                                        value={filters.rating}
                                        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="all">All Ratings</option>
                                        <option value="4.5">4.5 & up</option>
                                        <option value="4.0">4.0 & up</option>
                                        <option value="3.5">3.5 & up</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => setFilters({ level: 'all', category: 'all', duration: 'all', rating: 'all' })}
                                    className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        {/* Sort Options */}
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">Sort by:</span>
                            <div className="flex space-x-2">
                                {(['relevance', 'rating', 'students', 'newest'] as const).map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setSortBy(option)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === option
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results List */}
                        {sortedResults.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your search or filters to find what you're looking for
                                </p>
                                <button
                                    onClick={() => setFilters({ level: 'all', category: 'all', duration: 'all', rating: 'all' })}
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {sortedResults.map((course) => (
                                    <div
                                        key={course.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                    >
                                        <div className="flex">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-64 h-48 object-cover"
                                            />
                                            <div className="flex-1 p-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-xl font-bold text-gray-800 hover:text-primary-600 transition-colors">
                                                        {course.title}
                                                    </h3>
                                                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                        {course.level}
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                                                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="font-semibold">{course.rating}</span>
                                                        <span>({course.reviews.toLocaleString()})</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="w-4 h-4" />
                                                        <span>{course.students}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{course.duration}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <p className="text-gray-600 text-sm">by {course.instructor.name}</p>
                                                    <div className="text-2xl font-bold text-gray-800">
                                                        ${course.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
