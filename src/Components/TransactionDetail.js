import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ipBe } from '../setting';
import { decimalFormatter, getUserLogin } from '../Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { downloadAllFile, downloadFileByCode } from '../actions/downloadAction';
import Spinner from './Spinner';

export default function TransactionDetail({ visible, onClose, transaction }) {
    const dispatch = useDispatch();
    const userLogin = getUserLogin();

    const { getDownloadFileLoading, getDownloadAllFileLoading } = useSelector(
        (state) => state.DownloadReducer
    );

    return (
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
                            <Dialog.Panel className='flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl'>
                                <div className='relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
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

                                    <div className='w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800'>
                                        <div className='w-full'>
                                            <div className='-mx-3 md:flex items-start'>
                                                <div className='px-3 md:w-7/12 lg:pr-10'>
                                                    {transaction ? (
                                                        transaction.transaction_details.map(
                                                            (
                                                                transaction_detail,
                                                                index
                                                            ) => (
                                                                <div
                                                                    className='w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6'
                                                                    key={index}
                                                                >
                                                                    <div className='w-full flex items-center'>
                                                                        <div className='overflow-hidden rounded-lg w-16 bg-gray-50 border border-gray-200'>
                                                                            <img
                                                                                src={
                                                                                    ipBe +
                                                                                    '/' +
                                                                                    transaction_detail.path_img_product
                                                                                }
                                                                                alt={
                                                                                    transaction_detail.path_img_product
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className='flex-grow pl-3'>
                                                                            <h6 className='font-semibold uppercase text-gray-600'>
                                                                                {
                                                                                    transaction_detail
                                                                                        .product
                                                                                        .product_name
                                                                                }
                                                                            </h6>
                                                                            <p className='text-gray-400'>
                                                                                Rp{' '}
                                                                                {decimalFormatter(
                                                                                    transaction_detail.price
                                                                                )}{' '}
                                                                                x{' '}
                                                                                {
                                                                                    transaction_detail.qty
                                                                                }
                                                                                pcs
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <span className='font-semibold text-gray-600 text-xl'>
                                                                                Rp{' '}
                                                                                {decimalFormatter(
                                                                                    parseInt(
                                                                                        transaction_detail.price
                                                                                    ) *
                                                                                        parseInt(
                                                                                            transaction_detail.qty
                                                                                        )
                                                                                )}
                                                                            </span>
                                                                            <span className='font-semibold text-gray-600 text-sm'>
                                                                                .00
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <p>Loading . . .</p>
                                                    )}

                                                    <div className='mb-6 pb-6 border-b border-gray-200'>
                                                        <div className='-mx-2 flex items-end justify-end'>
                                                            <div className='flex-grow px-2 lg:max-w-xs'>
                                                                <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                                                    Discount
                                                                    code
                                                                </label>
                                                                <div>
                                                                    <input
                                                                        className='w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                                                        placeholder='XXXXXX'
                                                                        type='text'
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='px-2'>
                                                                <button className='block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold'>
                                                                    APPLY
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mb-6 pb-6 border-b border-gray-200 text-gray-800'>
                                                        <div className='w-full flex mb-3 items-center'>
                                                            <div className='flex-grow'>
                                                                <span className='text-gray-600'>
                                                                    Subtotal
                                                                </span>
                                                            </div>
                                                            <div className='pl-3'>
                                                                <span className='font-semibold'>
                                                                    Rp{' '}
                                                                    {decimalFormatter(
                                                                        transaction
                                                                            ? transaction.total_price
                                                                            : 0
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='w-full flex items-center'>
                                                            <div className='flex-grow'>
                                                                <span className='text-gray-600'>
                                                                    TAX
                                                                </span>
                                                            </div>
                                                            <div className='pl-3'>
                                                                <span className='font-semibold'>
                                                                    Rp 0
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl'>
                                                        <div className='w-full flex items-center'>
                                                            <div className='flex-grow'>
                                                                <span className='text-gray-600'>
                                                                    Total
                                                                </span>
                                                            </div>
                                                            <div className='pl-3'>
                                                                <span className='font-semibold text-gray-400 text-sm'>
                                                                    IDR
                                                                </span>{' '}
                                                                <span className='font-semibold'>
                                                                    Rp{' '}
                                                                    {decimalFormatter(
                                                                        transaction
                                                                            ? transaction.total_price
                                                                            : 0
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='px-3 md:w-5/12'>
                                                    <div className='w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6'>
                                                        <div className='mb-3'>
                                                            <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                                                Username
                                                            </label>
                                                            <div>
                                                                <input
                                                                    className='required:border-red-500 w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                                                    placeholder='Username ...'
                                                                    type='text'
                                                                    name='client_name'
                                                                    defaultValue={
                                                                        userLogin.name
                                                                    }
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                                                Email
                                                            </label>
                                                            <div>
                                                                <input
                                                                    className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                                                    placeholder='Email ...'
                                                                    type='text'
                                                                    name='email'
                                                                    defaultValue={
                                                                        userLogin.email
                                                                    }
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                                                Phone Number /
                                                                WA
                                                            </label>
                                                            <div>
                                                                <input
                                                                    className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                                                    placeholder='Phone / WA ...'
                                                                    type='text'
                                                                    defaultValue={
                                                                        userLogin.phone
                                                                    }
                                                                    name='phone_number'
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                                                Description
                                                            </label>
                                                            <div>
                                                                <textarea
                                                                    className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                                                    placeholder='Description / Request ...'
                                                                    name='description'
                                                                    disabled
                                                                    defaultValue={
                                                                        transaction.description
                                                                    }
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* DOWNLOAD FILE */}
                                            {transaction.product_files ? (
                                                <div className='w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6'>
                                                    <div className='w-full p-3'>
                                                        <p>
                                                            *Click to download
                                                        </p>
                                                        <div
                                                            className='mt-2'
                                                            name='rdFile'
                                                        >
                                                            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-6 gap-4'>
                                                                {transaction.product_files ? (
                                                                    transaction.product_files.map(
                                                                        (
                                                                            product_file
                                                                        ) => (
                                                                            <button
                                                                                type='button'
                                                                                key={
                                                                                    product_file.id
                                                                                }
                                                                                value={
                                                                                    product_file.id
                                                                                }
                                                                                className={
                                                                                    'cursor-pointer text-gray-900 shadow-sm hover:bg-gray-50 group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                                                                                }
                                                                                onClick={() =>
                                                                                    dispatch(
                                                                                        downloadFileByCode(
                                                                                            product_file
                                                                                        )
                                                                                    )
                                                                                }
                                                                                disabled={
                                                                                    getDownloadFileLoading
                                                                                }
                                                                            >
                                                                                <label as='span'>
                                                                                    {getDownloadFileLoading ? (
                                                                                        <Spinner />
                                                                                    ) : (
                                                                                        product_file.filename
                                                                                    )}
                                                                                </label>

                                                                                <span
                                                                                    className={
                                                                                        'border border-transparent pointer-events-none absolute -inset-px rounded-md'
                                                                                    }
                                                                                    aria-hidden='true'
                                                                                />
                                                                            </button>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    <p>
                                                                        Loading
                                                                        ...
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        downloadAllFile(
                                                                            transaction.invoice_id
                                                                        )
                                                                    )
                                                                }
                                                                className='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold'
                                                                disabled={
                                                                    getDownloadAllFileLoading
                                                                }
                                                            >
                                                                {getDownloadAllFileLoading ? (
                                                                    <center>
                                                                        <Spinner />
                                                                    </center>
                                                                ) : (
                                                                    <>
                                                                        DOWNLOAD
                                                                        ALL FILE
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
