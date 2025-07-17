const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <nav className="flex flex-col space-y-4">
                <a href="/admin" className="hover:underline">Dashboard</a>
                <a href="/admin/users" className="hover:underline">Users</a>
                <a href="/admin/courses" className="hover:underline">Courses</a>
            </nav>
        </aside>
    );
};

export default Sidebar;