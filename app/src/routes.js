import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HelloWorld from './pages/HelloWord';


function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HelloWorld/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
