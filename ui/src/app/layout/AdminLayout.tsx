import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const AdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <aside className={`fixed inset-y-0 z-50 transition-all duration-300 ease-in-out`}>
                <Sidebar onCollapse={setSidebarCollapsed} />
            </aside>
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
                <Header />
                <main className='p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;