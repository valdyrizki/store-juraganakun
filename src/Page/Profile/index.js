/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { NavLink, useNavigate } from 'react-router-dom';
import { getToken, getUserLogin } from '../../Helpers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showError } from '../../Components/Message';
import Verification from '../../Components/Verification';

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = getUserLogin();

    const [formProfile, setFormProfile] = useState({
        email: userLogin.email,
        first_name: userLogin.firstname,
        last_name: userLogin.lastname,
        username: userLogin.name,
        phone: userLogin.phone,
        password: null,
    });

    const [showVerification, setShowVerification] = useState(false);
    const handleOnClose = () => setShowVerification(false);

    const setInputs = (e) => {
        setFormProfile({
            ...formProfile,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setShowVerification(true);
    };

    useEffect(() => {
        if (!userLogin) {
            showError('You must be logged in to access this menu!');
            navigate('/login');
        }
    }, []);

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div className=''>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Personal Information
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Use a permanent address where you can receive mail.
                        </p>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-4'>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Email address
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        autoComplete='email'
                                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        defaultValue={userLogin.email}
                                        onChange={(e) => setInputs(e)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='first_name'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    First name
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        name='first_name'
                                        id='first_name'
                                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        onChange={(e) => setInputs(e)}
                                        defaultValue={userLogin.firstname}
                                    />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='last_name'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Last name
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        name='last_name'
                                        id='last_name'
                                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 '
                                        onChange={(e) => setInputs(e)}
                                        defaultValue={userLogin.lastname}
                                    />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='username'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Username
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        name='username'
                                        id='username'
                                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        onChange={(e) => setInputs(e)}
                                        defaultValue={userLogin.name}
                                    />
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='phone'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Phone
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        name='phone'
                                        id='phone'
                                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 '
                                        onChange={(e) => setInputs(e)}
                                        defaultValue={userLogin.phone}
                                    />
                                </div>
                            </div>

                            <div className='col-span-full'>
                                <label
                                    htmlFor='street-address'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    New Password
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='password'
                                        name='password'
                                        id='street-address'
                                        placeholder='Fill if you wanna change password'
                                        onChange={(e) => setInputs(e)}
                                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <NavLink
                        to={'/'}
                        type='button'
                        className='text-sm font-semibold leading-6 text-gray-900'
                    >
                        Cancel
                    </NavLink>
                    <button
                        type='submit'
                        className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Save
                    </button>
                </div>
            </form>
            <Verification
                visible={showVerification}
                onClose={handleOnClose}
                data={formProfile}
            />
        </>
    );
}
