import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular',
    width,
    height,
    count = 1,
}) => {
    const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer';

    const variantClasses = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const style = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                    style={style}
                />
            ))}
        </>
    );
};

export const CourseCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Image skeleton */}
            <Skeleton height={192} className="w-full" />

            <div className="p-6 space-y-4">
                {/* Title */}
                <Skeleton height={24} className="w-3/4" />

                {/* Instructor */}
                <Skeleton height={16} className="w-1/2" />

                {/* Rating */}
                <div className="flex space-x-2">
                    <Skeleton variant="circular" width={16} height={16} />
                    <Skeleton height={16} className="w-20" />
                </div>

                {/* Meta info */}
                <div className="flex space-x-4">
                    <Skeleton height={14} className="w-16" />
                    <Skeleton height={14} className="w-16" />
                    <Skeleton height={14} className="w-16" />
                </div>

                {/* Price and button */}
                <div className="flex items-center justify-between">
                    <Skeleton height={24} className="w-20" />
                    <Skeleton height={40} className="w-28 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl p-6">
                <Skeleton height={32} className="w-1/3 mb-4" />
                <Skeleton height={20} className="w-1/2" />
            </div>

            {/* Stats cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center space-x-4">
                            <Skeleton variant="circular" width={48} height={48} />
                            <div className="flex-1">
                                <Skeleton height={28} className="w-16 mb-2" />
                                <Skeleton height={16} className="w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <Skeleton height={28} className="w-1/4 mb-6" />
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex space-x-4">
                                <Skeleton width={80} height={80} className="rounded-lg" />
                                <div className="flex-1 space-y-3">
                                    <Skeleton height={20} className="w-full" />
                                    <Skeleton height={16} className="w-3/4" />
                                    <Skeleton height={8} className="w-full" />
                                    <Skeleton height={40} className="w-32 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
    rows = 5,
    cols = 4
}) => {
    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex space-x-4 pb-4 border-b">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={`header-${i}`} height={16} className="flex-1" />
                ))}
            </div>

            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex space-x-4 py-3">
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Skeleton key={`cell-${rowIndex}-${colIndex}`} height={16} className="flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
