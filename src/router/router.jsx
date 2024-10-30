import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404 from '../components/404';
import Error500 from '../components/500';
import Homepage from '../components/homepage';
import '../App.css';

function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <>
                    <Homepage></Homepage>
                </>
            ),
            errorElement: (
                <>
                    <Error500 isRouter={true}></Error500>
                </>
            ),
        },
        {
            path: '*',
            element: (
                <>
                    <Error404></Error404>
                </>
            ),
        },
        { path: '500', element: <Error500 isRouter={true}></Error500> },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
