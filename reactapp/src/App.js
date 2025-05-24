import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import ErrorPage from './Components/ErrorPage';
import './App.css';
import Signup from './Components/Signup';
// import {useSelector} from 'react-redux';

const App = () => {
    // const isAuthenticated=useSelector((state)=>state.userData.email);
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;