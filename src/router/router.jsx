import { Routes, Route } from 'react-router-dom';
import Error404 from '../components/404';
import Error500 from '../components/500';
import Homepage from '../components/homepage';
import '../App.css';

function Router() {
    return (
        <Routes>
            <Route index element={<Homepage />} />
            <Route path='/500' element={<Error500 isRouter={true} />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
    );
}

export default Router;
