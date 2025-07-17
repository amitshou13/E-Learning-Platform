import { Route, Routes } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Dashboard from '../features/dashboard/pages/Dashboard';
import UserManagement from '../features/users/pages/UserManagement';
import CourseManagement from '../features/courses/pages/CourseManagement';

const App = () => {
    return (
        <Routes>
            <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="courses" element={<CourseManagement />} />
            
            </Route>
        </Routes>
    );
};

export default App;