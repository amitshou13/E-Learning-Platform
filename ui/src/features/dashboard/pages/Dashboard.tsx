import { useState, useEffect } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';
import { TrendingUp, Users, UserCheck } from 'lucide-react';
import { DashboardSkeleton } from '../components/DashboardSkeleton';

// Mock data - replace with actual API data later
const mockData = {
    monthlyData: [
        { name: 'Jan', sales: 4000, users: 2400 },
        { name: 'Feb', sales: 3000, users: 1398 },
        { name: 'Mar', sales: 2000, users: 9800 },
        { name: 'Apr', sales: 2780, users: 3908 },
        { name: 'May', sales: 1890, users: 4800 },
        { name: 'Jun', sales: 2390, users: 3800 },
    ],
    topCourses: [
        { name: 'React Masterclass', sales: 1234, revenue: 24680 },
        { name: 'Python for Beginners', sales: 1000, revenue: 20000 },
        { name: 'Data Science Bootcamp', sales: 890, revenue: 17800 },
        { name: 'Web Development 101', sales: 750, revenue: 15000 },
    ],
    stats: {
        totalSales: 5234,
        newUsers: 320,
        activeUsers: 1250,
    }
};

type TimeRange = 'day' | 'month' | 'year';

const Dashboard = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('month');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(mockData);

    // Simulating API call when timeRange changes
    useEffect(() => {
        setLoading(true);
        // Simulate API delay
        const timer = setTimeout(() => {
            // In a real app, you would fetch data based on timeRange
            // For now, we'll just simulate different data for each range
            const multiplier = timeRange === 'day' ? 0.1 : timeRange === 'year' ? 12 : 1;
            setData({
                ...mockData,
                monthlyData: mockData.monthlyData.map(item => ({
                    ...item,
                    sales: Math.round(item.sales * multiplier),
                    users: Math.round(item.users * multiplier)
                })),
                stats: {
                    totalSales: Math.round(mockData.stats.totalSales * multiplier),
                    newUsers: Math.round(mockData.stats.newUsers * multiplier),
                    activeUsers: Math.round(mockData.stats.activeUsers * multiplier)
                }
            });
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeRange]);

    const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) => (
        <div className="p-6 rounded-lg bg-white dark:bg-darkCard shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 dark:text-white">{value.toLocaleString()}</h3>
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 -m-6 -mt-7 bg-gray-50 dark:bg-gray-900 min-h-screen px-4 py-8">
            {loading ? (
                <DashboardSkeleton />
            ) : (
                <>
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
                            <div className="flex gap-2">
                                {(['day', 'month', 'year'] as TimeRange[]).map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-4 py-2 rounded-lg font-semibold shadow-sm border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${timeRange === range
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white dark:bg-darkCard border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        {range.charAt(0).toUpperCase() + range.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatCard
                                title="Total Sales"
                                value={data.stats.totalSales}
                                icon={TrendingUp}
                                color="bg-primary"
                            />
                            <StatCard
                                title="New Users"
                                value={data.stats.newUsers}
                                icon={Users}
                                color="bg-secondary"
                            />
                            <StatCard
                                title="Active Users"
                                value={data.stats.activeUsers}
                                icon={UserCheck}
                                color="bg-green-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-darkCard p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-200">
                                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                    <span>Sales & Users Overview</span>
                                </h2>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data.monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                            <XAxis dataKey="name" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                                            <Legend />
                                            <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={3} activeDot={{ r: 8 }} />
                                            <Line type="monotone" dataKey="users" stroke="#F59E0B" strokeWidth={3} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-darkCard p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-200">
                                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Top Selling Courses</h2>
                                <div className="space-y-4">
                                    {data.topCourses.map((course, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-darkSurface rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{course.name}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{course.sales} sales</p>
                                            </div>
                                            <span className="text-primary dark:text-secondary font-bold text-lg">
                                                ${course.revenue.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-darkCard p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-200">
                            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Revenue Trends</h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                                        <Area
                                            type="monotone"
                                            dataKey="sales"
                                            stackId="1"
                                            stroke="#4F46E5"
                                            fill="#4F46E5"
                                            fillOpacity={0.15}
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

    );
};

export default Dashboard;