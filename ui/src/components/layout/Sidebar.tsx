import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const navLinks = [
        {
            href: '/admin',
            label: 'Dashboard',
            icon:
                // Flow Bite icons 
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
            ,
        },
        {
            href: '/admin/users',
            label: 'Users',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
            ),
        },
        {
            href: '/admin/courses',
            label: 'Courses',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
            ),
        },
        {
            href: '/admin/help',
            label: 'Help Center',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 19 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3 6 2V1m5 2 1-1V1M9 7v11M9 7a5 5 0 0 1 5 5M9 7a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H12V6a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 9 7Zm-5 5H1m3 0v2a5 5 0 0 0 10 0v-2m3 0h-3m-9.975 4H2a1 1 0 0 0-1 1v2m13-3h2.025a1 1 0 0 1 1 1v2M13 9h2.025a1 1 0 0 0 1-1V6m-11 3H3a1 1 0 0 1-1-1V6" />
                </svg>
            ),
        },
        {
            href: '/admin/setting',
            label: 'Setting',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25" />
                </svg>
            ),
        },
    ];

    return (
        <aside
            className={`min-h-screen p-4 pt-5 bg-surface text-gray-900 dark:text-white dark:bg-darkSurface transition-all duration-300 relative ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Collapse Arrow Top-Right Outside  */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className='absolute -right-3 top-6 z-10 bg-white dark:bg-gray-800 border border-secondary rounded-full p-1 shadow-md'
            >
                <svg className={`w-3 h-3 transition-transform duration-300 fill-secondary ${collapsed ? "" : "rotate-180"}`} fill="none" viewBox="0 0 8 14">
                    <path d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                </svg>
            </button>

            {/* Company Logo and Name  */}
            <div className='flex items-center space-x-3'>
                <a href="/" className="flex items-center space-x-3">
                    <img src="/logo.svg" alt="KT" className="h-10 w-10" />
                    {!collapsed && (
                        <span className="text-2xl font-bold text-primary dark:text-secondary">KT</span>
                    )}
                </a>
            </div>

            {/* Side Bar Links  */}
            <nav className='mt-10 space-y-2'>
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`flex items-center p-2 rounded-lg group transition-colors duration-200 
                                ${isActive ? "bg-gray-200 dark:bg-gray-700 text-primary dark:text-secondary" : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary"}`}
                        >
                            <span>
                                {link.icon}
                            </span>
                            {!collapsed && <span className='ms-3'>{link.label}</span>}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;