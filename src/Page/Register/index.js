import './../../App.css';
import React, { useEffect, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { NavLink, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../Components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegister, userRegister } from '../../actions/authAction';
import Spinner from '../../Components/Spinner';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formRegister, setFormRegister] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    });

    const {
        getUserRegisterResult,
        getUserRegisterError,
        getUserRegisterLoading,
    } = useSelector((state) => state.AuthReducer);

    const onChangeHandler = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value,
        });
    };

    const doRegister = async (e) => {
        e.preventDefault();
        dispatch(userRegister(formRegister));
    };

    //Component Did Update (Setelah Login)
    useEffect(() => {
        if (getUserRegisterResult) {
            showSuccess(getUserRegisterResult.msg);
            dispatch(clearRegister());
            //Set data to local storage
            navigate('/login');
        } else if (getUserRegisterError) {
            showError(getUserRegisterError);
        }
    }, [getUserRegisterResult, getUserRegisterError, navigate, dispatch]);

    return (
        <>
            <div className='flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md space-y-8'>
                    <div>
                        <img
                            className='mx-auto h-24 w-auto'
                            src='/logo/Logo Non BG Purple.png'
                            alt='Your Company'
                        />
                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                            Register / Daftar User
                        </h2>
                        <p className='mt-2 text-center text-sm text-gray-600'>
                            <NavLink
                                to='/login'
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                                Login
                            </NavLink>{' '}
                            Or{' '}
                            <NavLink
                                to='/'
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                                Buy without login
                            </NavLink>
                        </p>
                    </div>
                    <form
                        className='mt-8 space-y-6'
                        action='#'
                        onSubmit={doRegister}
                    >
                        <input
                            type='hidden'
                            name='remember'
                            defaultValue='true'
                        />
                        <div className='-space-y-px rounded-md shadow-sm'>
                            <div>
                                <label htmlFor='firstname' className='sr-only'>
                                    Firstname
                                </label>
                                <input
                                    id='firstname'
                                    name='firstname'
                                    type='text'
                                    required
                                    className='relative pl-2 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Firstname ...'
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <div className='pt-2'>
                                <label htmlFor='lastname' className='sr-only'>
                                    Lastname
                                </label>
                                <input
                                    id='lastname'
                                    name='lastname'
                                    type='text'
                                    required
                                    className='relative pl-2 pr-2 block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Lastname ...'
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <div className='pt-2'>
                                <label htmlFor='phone' className='sr-only'>
                                    Phone Number
                                </label>
                                <input
                                    id='phone'
                                    name='phone'
                                    type='text'
                                    required
                                    className='relative pl-2 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Phone Number (WA) ...'
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <div className='pt-2'>
                                <label htmlFor='username' className='sr-only'>
                                    Username
                                </label>
                                <input
                                    id='username'
                                    name='username'
                                    type='text'
                                    required
                                    className='relative pl-2 pr-2 block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Username ...'
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>

                            <div className='pt-2'>
                                <label
                                    htmlFor='email-address'
                                    className='sr-only'
                                >
                                    Email address
                                </label>
                                <input
                                    id='email-address'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='relative pl-2 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Email address'
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <div className='pt-2'>
                                <label htmlFor='password' className='sr-only'>
                                    Password
                                </label>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='relative pl-2 pr-2 block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Password'
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                disabled={getUserRegisterLoading}
                            >
                                {getUserRegisterLoading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                            <LockClosedIcon
                                                className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                                                aria-hidden='true'
                                            />
                                        </span>
                                        Register
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
