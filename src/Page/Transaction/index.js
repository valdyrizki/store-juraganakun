import { useEffect, useState } from 'react';
import { Bars4Icon, CreditCardIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { getMyTransaction } from '../../actions/transactionAction';
import { showError } from '../../Components/Message';
import { decimalFormatter, getUserLogin } from '../../Helpers';
import { useNavigate } from 'react-router-dom';
import TransactionDetail from '../../Components/TransactionDetail';
import StatusTrx from '../../Components/StatusTrx';

export default function Transaction() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = getUserLogin();

    const { getMyTrxResult, getMyTrxError, getMyTrxLoading } = useSelector(
        (state) => state.TransactionReducer
    );

    const [showTransactionDetail, setShowTransactionDetail] = useState(false);
    const handleOnClose = () => setShowTransactionDetail(false);
    const [trx, setTrx] = useState(false);

    const showTrxDetail = (e, trx) => {
        e.preventDefault();
        setTrx(trx);
        setShowTransactionDetail(true);
    };

    useEffect(() => {
        dispatch(getMyTransaction());
    }, [dispatch]);

    useEffect(() => {
        if (!userLogin) {
            showError('You must be logged in to access this menu!');
            navigate('/login');
        }
    }, []);

    return (
        <>
            <div className='lg:flex lg:items-center lg:justify-between'>
                <div className='min-w-0 flex-1'>
                    <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
                        My Transactions
                    </h2>
                </div>
            </div>

            <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
                <table className='table-fixed w-full border-collapse bg-white text-left text-sm text-gray-500'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            >
                                Invoice
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            >
                                Status
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            ></th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                        {getMyTrxResult ? (
                            getMyTrxResult.length < 1 ? (
                                <tr className='hover:bg-gray-50'>
                                    <td colSpan={3} className='pl-2'>
                                        <p>No Data</p>
                                    </td>
                                </tr>
                            ) : (
                                getMyTrxResult.map((transaction) => (
                                    <tr
                                        className='hover:bg-gray-50'
                                        key={transaction.invoice_id}
                                    >
                                        <th className='flex gap-1 px-6 py-4 font-normal text-gray-900'>
                                            <div className='text-sm'>
                                                <div className='font-medium text-gray-700'>
                                                    {transaction.invoice_id}
                                                </div>
                                                <div className='text-gray-400'>
                                                    Total price : Rp{' '}
                                                    {decimalFormatter(
                                                        transaction.total_price
                                                    )}
                                                </div>
                                            </div>
                                        </th>
                                        <td className='px-6 py-4'>
                                            <StatusTrx
                                                transaction={transaction}
                                                className={'text-center'}
                                            />
                                        </td>

                                        <td className='px-6 py-4'>
                                            <span className='sm:ml-3'>
                                                <button
                                                    onClick={(e) =>
                                                        showTrxDetail(
                                                            e,
                                                            transaction
                                                        )
                                                    }
                                                    type='button'
                                                    className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                >
                                                    <Bars4Icon
                                                        className='-ml-0.5 mr-1.5 h-5 w-5'
                                                        aria-hidden='true'
                                                    />
                                                    Detail
                                                </button>

                                                {transaction.status == 0 ? (
                                                    <button
                                                        onClick={() =>
                                                            window.open(
                                                                'http://tripay.co.id/checkout/' +
                                                                    transaction.invoice_merchant,
                                                                '_blank',
                                                                'noreferrer'
                                                            )
                                                        }
                                                        type='button'
                                                        className='inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 lg:ml-2 sm:mt-2 xs:mt-2'
                                                    >
                                                        <CreditCardIcon
                                                            className='-ml-0.5 mr-1.5 h-5 w-5'
                                                            aria-hidden='true'
                                                        />
                                                        Bayar
                                                    </button>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )
                        ) : getMyTrxLoading ? (
                            <tr className='hover:bg-gray-50'>
                                <td>
                                    <p>Loading . . .</p>
                                </td>
                            </tr>
                        ) : getMyTrxError ? (
                            showError(getMyTrxError)
                        ) : (
                            <tr className='hover:bg-gray-50'>
                                <td>
                                    <p>Problem when error transaction data</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <TransactionDetail
                visible={showTransactionDetail}
                onClose={handleOnClose}
                transaction={trx}
            />
        </>
    );
}
