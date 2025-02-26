import { createBrowserRouter, Navigate } from 'react-router';
import ReportList from './pages/ReportList.tsx';
import ReportForm from './pages/ReportForm.tsx';
import NotFound from './pages/NotFound.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/reports'} replace />
    },
    {
        path: '/reports',
        element: <ReportList />
    },
    {
        path: 'report/new',
        element: <ReportForm />
    },
    {
        path: '/report/:reportId',
        element: <ReportForm />
    },
    {
        path: '/*',
        element: <NotFound />
    }
]);