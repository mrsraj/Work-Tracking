import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../LogIn/Register';
import LogIn from '../LogIn/LogIn';
import style from './Router.module.css'
import DragDrop from '../DragDropComponent/DragDrop';
import ShowGroup from '../components/ShowGroup';
import Header from '../Header/Header';

function RouterPage() {
    return (
        <div className={style.router_container}>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/showgroup" element={<ShowGroup />} />
                    <Route path="/workpage" element={<DragDrop />} />
                </Routes>
            </Router>
        </div>
    );
}

export default RouterPage;