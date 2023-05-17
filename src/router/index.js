import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../Components/Main';
import Dashboard from '../Page/Dashboard';
import Login from '../Page/Login';
import Register from '../Page/Register';
import NotFound from '../Page/NotFound';
import Transaction from '../Page/Transaction';
import Profile from '../Page/Profile';
import Checkout from '../Page/Checkout';

function Router() {
    return (
        <Routes>
            {/* DASHBOARD */}
            <Route
                exact
                path='/'
                element={
                    <Main>
                        <Dashboard />
                    </Main>
                }
            />

            <Route
                exact
                path='/transaction'
                element={
                    <Main>
                        <Transaction />
                    </Main>
                }
            />

            <Route
                exact
                path='/profile'
                element={
                    <Main>
                        <Profile />
                    </Main>
                }
            />

            <Route
                exact
                path='/checkout'
                element={
                    <Main>
                        <Checkout />
                    </Main>
                }
            />

            <Route exact path='login/' element={<Login />} />
            <Route exact path='register/' element={<Register />} />
            <Route exact path='404' element={<NotFound />} />

            <Route exact path='*' element={<Navigate to='/404' replace />} />
        </Routes>
    );
}

export default Router;
