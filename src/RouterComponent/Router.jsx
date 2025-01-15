import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../LogIn/Register';
import LogIn from '../LogIn/LogIn';
import style from './Router.module.css'
import DragDrop from '../DragDropComponent/DragDrop';
import ShowGroup from '../components/ShowGroup';
import ProtectedRoute from '../ProtectedRouter/ProtectRout';
import NotFound from '../NotificationCom/NotFound';

function RouterPage() {
    return (
        <div className={style.router_container}>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<LogIn />} />

                    <Route path="/showgroup" element={
                        <ProtectedRoute>
                            <ShowGroup />
                        </ProtectedRoute>} />

                    <Route path="/workpage" element={<ProtectedRoute>
                        <DragDrop />
                    </ProtectedRoute>} />

                    <Route path="*" element={<NotFound />} />

                </Routes>
            </Router>
        </div>
    );
}

export default RouterPage;