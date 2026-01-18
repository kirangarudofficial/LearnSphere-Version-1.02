import React, { useState } from 'react';
import { Bell, BellOff, Users } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface WaitlistWidgetProps {
    courseId: string;
    isOnWaitlist: boolean;
    waitlistCount: number;
    onJoin: () => Promise<void>;
    onLeave: () => Promise<void>;
}

export const WaitlistWidget: React.FC<WaitlistWidgetProps> = ({
    courseId,
    isOnWaitlist,
    waitlistCount,
    onJoin,
    onLeave
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const { success, error } = useToast();

    const handleToggleWaitlist = async () => {
        setIsLoading(true);
        try {
            if (isOnWaitlist) {
                await onLeave();
                success('Removed from waitlist');
            } else {
                await onJoin();
                success('Added to waitlist! We\'ll notify you when spots open up.');
            }
        } catch (err) {
            error('Failed to update waitlist status');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">Course Full</h3>
                    <p className="text-orange-100 text-sm">Join the waitlist to be notified when spots become available</p>
                </div>
                <Users className="w-8 h-8 opacity-80" />
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">People on waitlist:</span>
                    <span className="text-2xl font-bold">{waitlistCount}</span>
                </div>
            </div>

            {!isOnWaitlist ? (
                <button
                    onClick={handleToggleWaitlist}
                    disabled={isLoading}
                    className="w-full bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    <Bell className="w-5 h-5" />
                    <span>{isLoading ? 'Joining...' : 'Join Waitlist'}</span>
                </button>
            ) : (
                <div>
                    <div className="bg-green-500 bg-opacity-30 border border-green-300 rounded-lg p-4 mb-3">
                        <p className="text-sm font-medium flex items-center space-x-2">
                            <Bell className="w-4 h-4" />
                            <span>You're on the waitlist!</span>
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailNotifications}
                                onChange={(e) => setEmailNotifications(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-white"
                            />
                            <span className="text-sm">Email notifications</span>
                        </label>
                    </div>

                    <button
                        onClick={handleToggleWaitlist}
                        disabled={isLoading}
                        className="w-full bg-white bg-opacity-20 text-white px-6 py-2 rounded-lg hover:bg-opacity-30 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        <BellOff className="w-5 h-5" />
                        <span>{isLoading ? 'Leaving...' : 'Leave Waitlist'}</span>
                    </button>
                </div>
            )}
        </div>
    );
};
