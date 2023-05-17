import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getUserLogin } from '../Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { downloadAllFile, downloadFileByCode } from '../actions/downloadAction';
import Spinner from './Spinner';
import { clearUpdateUser, doUpdateUser } from '../actions/userAction';
import { doCheckPassword } from '../actions/authAction';
import { showError, showSuccess } from './Message';
import { useNavigate } from 'react-router-dom';
import { clearStore } from '../actions/globalAction';

export default function Verification({ visible, onClose, data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { getUpdateUserResult, getUpdateUserLoading, getUpdateUserError } =
        useSelector((state) => state.UserReducer);
    const {
        getCheckPasswordResult,
        getCheckPasswordLoading,
        getCheckPasswordError,
    } = useSelector((state) => state.AuthReducer);

    const [passwordVerification, setPasswordVerification] = useState('');
    const [open, setOpen] = useState(visible);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(doCheckPassword(passwordVerification));
    };

    //After check password
    useEffect(() => {
        if (getCheckPasswordResult) {
            console.log('AFTER CHECK PASSWORD');
            dispatch(doUpdateUser(data));
            setOpen(false);
            // navigate('/');
        } else if (getCheckPasswordError) {
            showError('Invalid Password!');
        }

        return () => {
            dispatch(clearStore('CHECK_PASSWORD'));
            dispatch(clearStore('UPDATE_USER'));
        };
    }, [getCheckPasswordResult, getCheckPasswordError]);

    useEffect(() => {
        setOpen(true);
    }, [visible]);

    return open ? (
        <Transition.Root show={visible} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
                            enterTo='opacity-100 translate-y-0 md:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 md:scale-100'
                            leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
                        >
                            <Dialog.Panel className='flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-2xl'>
                                <div className='relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
                                    <button
                                        type='button'
                                        className='absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8'
                                        onClick={onClose}
                                    >
                                        <span className='sr-only'>Close</span>
                                        <XMarkIcon
                                            className='h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    </button>

                                    <div className='w-full bg-white border-t border-b border-gray-200 px-5 py-5 text-gray-800'>
                                        <div className='w-full'>
                                            <div className='flex min-h-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
                                                <div className='w-full max-w-md space-y-8'>
                                                    <div>
                                                        <img
                                                            className='mx-auto h-12 w-auto'
                                                            src='/logo/Logo Non BG Purple.png'
                                                            alt='Your Company'
                                                        />
                                                        <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
                                                            Password
                                                            Verification
                                                        </h2>
                                                    </div>
                                                    <form
                                                        className='mt-8 space-y-6'
                                                        onSubmit={
                                                            onSubmitHandler
                                                        }
                                                    >
                                                        <div className='-space-y-px rounded-md shadow-sm'>
                                                            <div className='pt-2'>
                                                                <label
                                                                    htmlFor='passwordVerification'
                                                                    className='sr-only'
                                                                >
                                                                    Password
                                                                </label>
                                                                <input
                                                                    id='passwordVerification'
                                                                    name='passwordVerification'
                                                                    type='password'
                                                                    autoComplete='current-password'
                                                                    required
                                                                    className='relative pl-2 pr-2 block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                                    placeholder='Password'
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setPasswordVerification(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <button
                                                                disabled={
                                                                    getCheckPasswordLoading
                                                                }
                                                                type='submit'
                                                                className='group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                            >
                                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                                                    <LockClosedIcon
                                                                        className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                                                                        aria-hidden='true'
                                                                    />
                                                                </span>

                                                                {getCheckPasswordLoading ? (
                                                                    <Spinner />
                                                                ) : (
                                                                    <>Submit</>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    ) : (
        <></>
    );
}
