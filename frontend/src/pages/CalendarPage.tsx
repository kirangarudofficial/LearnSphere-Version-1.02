import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { calendarApi } from '../../services/allServices';

interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
    status: string;
}

export default function CalendarPage() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, [selectedDate]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const response = await calendarApi.getUserEvents();
            setEvents(response.data || []);
        } catch (error) {
            console.error('Failed to load events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await calendarApi.createEvent(
                newEvent.title,
                newEvent.description,
                new Date(newEvent.startTime),
                new Date(newEvent.endTime)
            );
            setNewEvent({ title: '', description: '', startTime: '', endTime: '' });
            setShowCreateModal(false);
            loadEvents();
        } catch (error) {
            console.error('Failed to create event:', error);
        }
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const getEventsForDate = (date: Date | null) => {
        if (!date) return [];
        return events.filter(event => {
            const eventDate = new Date(event.startTime);
            return eventDate.toDateString() === date.toDateString();
        });
    };

    const navigateMonth = (direction: number) => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1));
    };

    const days = getDaysInMonth(selectedDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white  shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                            <p className="text-gray-600 mt-1">Manage your events and schedule</p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            <span>New Event</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Calendar */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Calendar Header */}
                            <div className="p-6 border-b">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => navigateMonth(-1)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                                    </button>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </h2>
                                    <button
                                        onClick={() => navigateMonth(1)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <ChevronRight className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="p-6">
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {weekDays.map(day => (
                                        <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {days.map((date, index) => {
                                        const dayEvents = date ? getEventsForDate(date) : [];
                                        const isToday = date && date.toDateString() === new Date().toDateString();

                                        return (
                                            <div
                                                key={index}
                                                className={`min-h-[80px] p-2 border rounded-lg ${date ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                                                    } ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}`}
                                            >
                                                {date && (
                                                    <>
                                                        <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'
                                                            }`}>
                                                            {date.getDate()}
                                                        </div>
                                                        <div className="space-y-1">
                                                            {dayEvents.slice(0, 2).map(event => (
                                                                <div
                                                                    key={event.id}
                                                                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate"
                                                                >
                                                                    {event.title}
                                                                </div>
                                                            ))}
                                                            {dayEvents.length > 2 && (
                                                                <div className="text-xs text-gray-600">
                                                                    +{dayEvents.length - 2} more
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                {events
                                    .filter(e => new Date(e.startTime) >= new Date())
                                    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                                    .slice(0, 10)
                                    .map(event => (
                                        <div key={event.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-start space-x-3">
                                                <div className="bg-blue-100 p-2 rounded-lg">
                                                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                                                        <Clock className="w-4 h-4" />
                                                        <span>
                                                            {new Date(event.startTime).toLocaleString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                            })}
                                                        </span>
                                                    </div>
                                                    {event.attendees.length > 0 && (
                                                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                                                            <Users className="w-4 h-4" />
                                                            <span>{event.attendees.length} attendees</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Event Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
                        <form onSubmit={handleCreateEvent}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                                    <input
                                        type="text"
                                        value={newEvent.title}
                                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter event title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={newEvent.description}
                                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        rows={3}
                                        placeholder="Event description"
                                        required
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                                        <input
                                            type="datetime-local"
                                            value={newEvent.startTime}
                                            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                                        <input
                                            type="datetime-local"
                                            value={newEvent.endTime}
                                            onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
