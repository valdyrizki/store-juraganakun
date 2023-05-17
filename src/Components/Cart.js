import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { ipBe } from '../setting';
import { useDispatch, useSelector } from 'react-redux';
import {
    decreaseQty,
    editCartQty,
    increaseQty,
    removeCartItem,
} from '../actions/cartAction';
import { decimalFormatter } from '../Helpers';

export default function Cart({ visible, onClose }) {
    const { getCartResult, getCartTotalPrice } = useSelector(
        (state) => state.CartReducer
    );
    const dispatch = useDispatch();

    return (
        <Transition.Root show={visible} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500 sm:duration-700'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500 sm:duration-700'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                        <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                                            <div className='flex items-start justify-between'>
                                                <Dialog.Title className='text-lg font-medium text-gray-900'>
                                                    Shopping cart
                                                </Dialog.Title>
                                                <div className='ml-3 flex h-7 items-center'>
                                                    <button
                                                        type='button'
                                                        className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                                                        onClick={onClose}
                                                    >
                                                        <span className='sr-only'>
                                                            Close panel
                                                        </span>
                                                        <XMarkIcon
                                                            className='h-6 w-6'
                                                            aria-hidden='true'
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='mt-8'>
                                                <div className='flow-root'>
                                                    <ul className='-my-6 divide-y divide-gray-200'>
                                                        {getCartResult ? (
                                                            getCartResult.map(
                                                                (cart) => (
                                                                    <li
                                                                        key={
                                                                            cart.product_id
                                                                        }
                                                                        className='flex py-6'
                                                                    >
                                                                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                                                            <img
                                                                                src={
                                                                                    ipBe +
                                                                                    '/' +
                                                                                    cart.path
                                                                                }
                                                                                alt={
                                                                                    cart.path
                                                                                }
                                                                                className='h-full w-full object-cover object-center'
                                                                            />
                                                                        </div>

                                                                        <div className='ml-4 flex flex-1 flex-col'>
                                                                            <div>
                                                                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                                                                    <h3>
                                                                                        <NavLink
                                                                                            to={
                                                                                                '/'
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                cart.product_name
                                                                                            }
                                                                                        </NavLink>
                                                                                    </h3>
                                                                                    <p className='ml-4'>
                                                                                        Rp
                                                                                        {decimalFormatter(
                                                                                            cart.price
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                                <p className='mt-1 text-sm text-gray-500'>
                                                                                    Stock
                                                                                    :{' '}
                                                                                    {
                                                                                        cart.stock
                                                                                    }{' '}
                                                                                    pcs
                                                                                </p>
                                                                            </div>
                                                                            <div className='flex flex-1 items-end justify-between text-sm'>
                                                                                <nav
                                                                                    className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                                                                                    aria-label='Pagination'
                                                                                >
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            dispatch(
                                                                                                decreaseQty(
                                                                                                    cart.product_id
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                        className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                                                        disabled={
                                                                                            cart.qty <
                                                                                            2
                                                                                        }
                                                                                    >
                                                                                        <span className='sr-only'>
                                                                                            Previous
                                                                                        </span>
                                                                                        <ChevronLeftIcon
                                                                                            className='h-5 w-5'
                                                                                            aria-hidden='true'
                                                                                        />
                                                                                    </button>
                                                                                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                                                                    <input
                                                                                        type='number'
                                                                                        className='rounded lg:w-10'
                                                                                        name={
                                                                                            'qty' +
                                                                                            cart.product_id
                                                                                        }
                                                                                        value={
                                                                                            cart.qty
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            dispatch(
                                                                                                editCartQty(
                                                                                                    cart.product_id,
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            textAlign:
                                                                                                'center',
                                                                                        }}
                                                                                    />

                                                                                    <button
                                                                                        onClick={() =>
                                                                                            dispatch(
                                                                                                increaseQty(
                                                                                                    cart.product_id
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                        className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                                                        disabled={
                                                                                            cart.qty ===
                                                                                            cart.stock
                                                                                        }
                                                                                    >
                                                                                        <span className='sr-only'>
                                                                                            Add
                                                                                        </span>
                                                                                        <ChevronRightIcon
                                                                                            className='h-5 w-5'
                                                                                            aria-hidden='true'
                                                                                        />
                                                                                    </button>
                                                                                </nav>

                                                                                <div className='flex pl-2'>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            dispatch(
                                                                                                removeCartItem(
                                                                                                    cart.product_id
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                        type='button'
                                                                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                                                                    >
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            )
                                                        ) : (
                                                            <>Empty Cart</>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                                            <div className='flex justify-between text-base font-medium text-gray-900'>
                                                <p>Subtotal</p>
                                                <p>
                                                    Rp{' '}
                                                    {decimalFormatter(
                                                        getCartTotalPrice
                                                    )}
                                                </p>
                                            </div>
                                            <p className='mt-0.5 text-sm text-gray-500'>
                                                Shipping and taxes calculated at
                                                checkout.
                                            </p>
                                            <div className='mt-6'>
                                                <NavLink
                                                    to='/checkout'
                                                    className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                                                    onClick={onClose}
                                                >
                                                    Checkout
                                                </NavLink>
                                            </div>
                                            <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                                                <p>
                                                    or &nbsp;
                                                    <button
                                                        type='button'
                                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                                        onClick={onClose}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden='true'>
                                                            {' '}
                                                            &rarr;
                                                        </span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
