import React from 'react';

const StatCardSkeleton = () => (
    <div className="p-6 rounded-lg bg-white dark:bg-darkCard shadow-md animate-pulse">
        <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
    </div>
);

const ChartSkeleton = () => (
    <div className="bg-white dark:bg-darkCard p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
);

const CourseCardSkeleton = () => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-darkSurface rounded-lg animate-pulse">
        <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
);

interface DashboardSkeletonProps {
    className?: string;
}

const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({ className = '' }) => {
    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            {/* Charts and Course List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSkeleton />
                <div className="bg-white dark:bg-darkCard p-6 rounded-lg shadow-md">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <CourseCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <ChartSkeleton />
        </div>
    );
};

export { DashboardSkeleton, StatCardSkeleton, ChartSkeleton, CourseCardSkeleton };
