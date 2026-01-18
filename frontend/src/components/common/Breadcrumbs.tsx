import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
                <Home className="w-4 h-4" />
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <React.Fragment key={index}>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        {item.path && !isLast ? (
                            <Link
                                to={item.path}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? 'text-gray-900 font-medium' : ''}>
                                {item.label}
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};
