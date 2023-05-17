import React from 'react';
import './../App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import WAFloating from './WAFloating';

function Main({ children }) {
    return (
        <>
            <Navbar />

            <div className='bg-white'>
                <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8'>
                    {children}
                </div>
            </div>
            <WAFloating />
            <Footer />
        </>
    );
}

export default Main;
