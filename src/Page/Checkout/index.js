import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { decimalFormatter, getUserLogin } from '../../Helpers';
import { showError, showSuccess } from '../../Components/Message';
import {
    clearTransaction,
    postTransaction,
} from '../../actions/transactionAction';
import { removeAllCart } from '../../actions/cartAction';
import { ipBe } from '../../setting';
import Spinner from '../../Components/Spinner';

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { getCartResult, getCartTotalPrice } = useSelector(
        (state) => state.CartReducer
    );
    const {
        getPostTransactionResult,
        getPostTransactionError,
        getPostTransactionLoading,
    } = useSelector((state) => state.TransactionReducer);

    const setInputs = (e) => {
        setCheckoutForm({
            ...checkoutForm,
            [e.target.name]: e.target.value,
        });
    };

    const userLogin = getUserLogin();

    const [checkoutForm, setCheckoutForm] = useState({
        client_name: userLogin.name,
        phone_number: userLogin.phone,
        email: userLogin.email,
        bank: 77,
        coupon: '',
        description: '',
        products: getCartResult,
    });

    //Checkout
    const onCheckoutHandler = () => {
        //validate input
        let errorMsg = '';
        if (
            checkoutForm.client_name == null ||
            checkoutForm.client_name == ''
        ) {
            errorMsg = 'Client Name is mandatory!';
        } else if (
            checkoutForm.phone_number == null ||
            checkoutForm.phone_number == ''
        ) {
            errorMsg = 'Phone Number is mandatory!';
        } else if (checkoutForm.email == null || checkoutForm.email == '') {
            errorMsg = 'Email is mandatory!';
        }

        if (errorMsg != '') {
            showError(errorMsg);
        } else {
            dispatch(postTransaction(checkoutForm));
        }
    };

    useEffect(() => {
        if (getPostTransactionResult) {
            showSuccess(getPostTransactionResult.msg);
            //Set data to local storage
            // window.open(
            //     getPostTransactionResult.redirect,
            //     '_blank',
            //     'noreferrer'
            // );
            dispatch(removeAllCart());
            dispatch(clearTransaction());
            navigate('/transaction');
        } else if (getPostTransactionError) {
            showError(getPostTransactionError);
        }
    }, [getPostTransactionResult, getPostTransactionError, dispatch, navigate]);

    //Validate must login
    useEffect(() => {
        if (!userLogin) {
            showError('You must be logged in to access this menu!');
            navigate('/login');
        }
    }, []);

    return (
        <>
            {getCartTotalPrice > 0 ? (
                <div className='w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800'>
                    <div className='w-full'>
                        <div className='-mx-3 md:flex items-start'>
                            <div className='px-3 md:w-7/12 lg:pr-10'>
                                {getCartResult.map((cart, index) => (
                                    <div
                                        className='w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6'
                                        key={index}
                                    >
                                        <div className='w-full flex items-center'>
                                            <div className='overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200'>
                                                <img
                                                    src={ipBe + '/' + cart.path}
                                                    alt={cart.path}
                                                />
                                            </div>
                                            <div className='flex-grow pl-3'>
                                                <h6 className='font-semibold uppercase text-gray-600'>
                                                    {cart.product_name}
                                                </h6>
                                                <p className='text-gray-400'>
                                                    Rp{' '}
                                                    {decimalFormatter(
                                                        cart.price
                                                    )}{' '}
                                                    x {cart.qty}pcs
                                                </p>
                                            </div>
                                            <div>
                                                <span className='font-semibold text-gray-600 text-xl'>
                                                    Rp{' '}
                                                    {decimalFormatter(
                                                        parseInt(cart.price) *
                                                            parseInt(cart.qty)
                                                    )}
                                                </span>
                                                <span className='font-semibold text-gray-600 text-sm'>
                                                    .00
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className='mb-6 pb-6 border-b border-gray-200'>
                                    <div className='-mx-2 flex items-end justify-end'>
                                        <div className='flex-grow px-2 lg:max-w-xs'>
                                            <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                                Discount code
                                            </label>
                                            <div>
                                                <input
                                                    className='w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                                    placeholder='XXXXXX'
                                                    type='text'
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
                                                    getCartTotalPrice
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
                                                    getCartTotalPrice
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
                                                defaultValue={userLogin.name}
                                                disabled={userLogin}
                                                onChange={(e) => setInputs(e)}
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
                                                defaultValue={userLogin.email}
                                                disabled={userLogin}
                                                onChange={(e) => setInputs(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                            Phone Number / WA
                                        </label>
                                        <div>
                                            <input
                                                className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                                placeholder='Phone / WA ...'
                                                type='text'
                                                defaultValue={userLogin.phone}
                                                name='phone_number'
                                                onChange={(e) => setInputs(e)}
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
                                                onChange={(e) => setInputs(e)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    {/* <div className='w-full flex mb-3 items-center'>
                                    <div className='w-32'>
                                        <span className='text-gray-600 font-semibold'>
                                            Contact
                                        </span>
                                    </div>
                                    <div className='flex-grow pl-3'>
                                        <span>Scott Windon</span>
                                    </div>
                                </div>
                                <div className='w-full flex items-center'>
                                    <div className='w-32'>
                                        <span className='text-gray-600 font-semibold'>
                                            Billing Address
                                        </span>
                                    </div>
                                    <div className='flex-grow pl-3'>
                                        <span>
                                            123 George Street, Sydney, NSW 2000
                                            Australia
                                        </span>
                                    </div>
                                </div> */}
                                </div>
                                {/* <div className='w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6'>
                                    <div className='w-full p-3 border-b border-gray-200'>
                                        <label
                                            htmlFor='type2'
                                            className='flex items-center cursor-pointer'
                                        >
                                            <input
                                                type='radio'
                                                className='form-radio h-5 w-5 text-indigo-500'
                                                name='paymentType'
                                                value='00'
                                                onChange={(e) =>
                                                    bankViaOnChange(e)
                                                }
                                                defaultChecked
                                            />
                                            <h1 className='h-6 ml-3'>
                                                Bank Transfer (Manual)
                                            </h1>
                                        </label>
                                    </div>
                                    <div className='w-full p-3'>
                                        <div>
                                            <label
                                                htmlFor='type1'
                                                className='flex items-center cursor-pointer'
                                            >
                                                <input
                                                    type='radio'
                                                    className='form-radio h-5 w-5 text-indigo-500'
                                                    name='paymentType'
                                                    value='77'
                                                    onChange={(e) =>
                                                        bankViaOnChange(e)
                                                    }
                                                />
                                                <h1 className='h-6 ml-3'>
                                                    QRIS
                                                </h1>
                                            </label>
                                        </div>

                                        <RadioGroup
                                            className='mt-4'
                                            name='rdBankTf'
                                        >
                                            <div className='grid grid-cols-4 gap-4'>
                                                {banks ? (
                                                    banks.map((bank) => (
                                                        <RadioGroup.Option
                                                            key={bank.id}
                                                            value={bank.id}
                                                            disabled={
                                                                bank.status !==
                                                                1
                                                            }
                                                            className={({
                                                                active,
                                                            }) =>
                                                                classNames(
                                                                    bank.status ===
                                                                        1
                                                                        ? 'cursor-pointer text-gray-900 shadow-sm hover:bg-gray-50'
                                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200 hover:bg-gray-50',
                                                                    active
                                                                        ? 'ring-2 ring-indigo-500 bg-indigo-300 hover:bg-indigo-300'
                                                                        : '',
                                                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                                                                )
                                                            }
                                                            onClick={(e) =>
                                                                setBank(bank.id)
                                                            }
                                                        >
                                                            {({
                                                                active,
                                                                checked,
                                                            }) => (
                                                                <>
                                                                    <RadioGroup.Label as='span'>
                                                                        {
                                                                            bank.name
                                                                        }
                                                                    </RadioGroup.Label>
                                                                    {bank.status ===
                                                                    1 ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'border'
                                                                                    : 'border-2',
                                                                                checked
                                                                                    ? 'border-indigo-500'
                                                                                    : 'border-transparent',
                                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                                            )}
                                                                            aria-hidden='true'
                                                                        />
                                                                    ) : (
                                                                        <span
                                                                            aria-hidden='true'
                                                                            className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                                                                        >
                                                                            <svg
                                                                                className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                                                                                viewBox='0 0 100 100'
                                                                                preserveAspectRatio='none'
                                                                                stroke='currentColor'
                                                                            >
                                                                                <line
                                                                                    x1={
                                                                                        0
                                                                                    }
                                                                                    y1={
                                                                                        100
                                                                                    }
                                                                                    x2={
                                                                                        100
                                                                                    }
                                                                                    y2={
                                                                                        0
                                                                                    }
                                                                                    vectorEffect='non-scaling-stroke'
                                                                                />
                                                                            </svg>
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))
                                                ) : getBankLoading ? (
                                                    <p>Loading ...</p>
                                                ) : (
                                                    <p></p>
                                                )}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div> */}
                                <div>
                                    <button
                                        onClick={() => onCheckoutHandler()}
                                        className='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold'
                                        disabled={getPostTransactionLoading}
                                    >
                                        {getPostTransactionLoading ? (
                                            <Spinner />
                                        ) : (
                                            <>
                                                <i className='mdi mdi-lock-outline mr-1'></i>{' '}
                                                PAY NOW
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className='text-center'>
                        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                            Your Cart Is Empty
                        </h1>
                        <p className='mt-6 text-base leading-7 text-gray-600'>
                            Add your product to cart and checkout again in here.
                        </p>
                        <div className='mt-10 flex items-center justify-center gap-x-6'>
                            <NavLink
                                to='/'
                                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Go back home
                            </NavLink>
                            <a
                                href='https://wa.me/6283818213645?text=I%20have%20problem'
                                className='text-sm font-semibold text-gray-900'
                                target='_blank'
                                rel='noreferrer'
                            >
                                Contact support{' '}
                                <span aria-hidden='true'>&rarr;</span>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
