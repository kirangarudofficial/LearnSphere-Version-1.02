import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    action,
    secondaryAction
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
                <Icon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>

            {(action || secondaryAction) && (
                <div className="flex items-center space-x-3">
                    {action && (
                        <button
                            onClick={action.onClick}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            {action.label}
                        </button>
                    )}
                    {secondaryAction && (
                        <button
                            onClick={secondaryAction.onClick}
                            className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                        >
                            {secondaryAction.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
