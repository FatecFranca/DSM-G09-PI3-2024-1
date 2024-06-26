import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import About from './pages/About/About';
import HomeRoteiros from './pages/Roteiro/Home';
import Roteiros from './pages/Roteiro/Roteiro';
import HomePosts from './pages/Post/Home';
import Post from './pages/Post/Post';



function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/homeroteiros" element={<HomeRoteiros/>} />
                <Route path="/roteiro" element={<Roteiros/>} />
                <Route path="/publicacoes" element={<HomePosts/>} />
                <Route path="/post/:id" element={<Post/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default RoutesApp;
