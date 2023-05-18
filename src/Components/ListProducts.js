import { useEffect, useState } from 'react';
import ProductDetail from './ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../actions/productAction';
import { ipBe } from '../setting';
import { addCart } from '../actions/cartAction';
import { decimalFormatter } from '../Helpers';
import {
    BanknotesIcon,
    CircleStackIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { RadioGroup } from '@headlessui/react';
import { getCategories } from '../actions/categoryAction';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ListProducts() {
    const [showProductDetail, setShowProductDetail] = useState(false);
    const handleOnClose = () => setShowProductDetail(false);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const doShowProduct = (e, product) => {
        e.preventDefault();
        setProduct(product);
        setShowProductDetail(true);
    };

    const dispatch = useDispatch();
    const { getAllProductResult, getAllProductLoading, getAllProductError } =
        useSelector((state) => state.ProductReducer);
    const { getCategoriesResult, getCategoriesLoading } = useSelector(
        (state) => state.CategoryReducer
    );

    const addToCart = (e, product, qty = 1) => {
        e.preventDefault();
        dispatch(addCart(product, qty));
    };

    const filterByCategory = (value) => {
        if (value !== '00') {
            setProducts(
                getAllProductResult.filter((prod) => prod.category_id == value)
            );
        } else {
            setProducts(getAllProductResult);
        }
    };

    //debounce search
    useEffect(() => {
        if (getAllProductResult) {
            const timeOutId = setTimeout(
                () =>
                    setProducts(
                        getAllProductResult.filter(
                            (prod) =>
                                prod.product_name
                                    .toUpperCase()
                                    .indexOf(search.toUpperCase()) !== -1
                        )
                    ),
                500
            );
            return () => clearTimeout(timeOutId);
        }
    }, [search]);

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (getAllProductResult) {
            setProducts(getAllProductResult);
        }
    }, [getAllProductResult]);

    return (
        <>
            <div className='pt-4 flex items-center'>
                <label htmlFor='voice-search' className='sr-only'>
                    Search
                </label>
                <div className='relative w-full'>
                    <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                        <svg
                            aria-hidden='true'
                            className='w-5 h-5 text-gray-500 dark:text-gray-400'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                clipRule='evenodd'
                            ></path>
                        </svg>
                    </div>
                    <input
                        type='text'
                        id='search'
                        className='bg-white-50 border border-white-300 text-white-900 text-sm focus:ring-indigo-700 focus:border-indigo-700 block w-full pl-10 p-2.5 '
                        placeholder='Search Product By Name...'
                        onChange={(e) => setSearch(e.target.value)}
                        autoComplete={'false'}
                    />
                </div>
            </div>

            <div className='w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mt-2'>
                <h4 className='text-1xl font-bold tracking-tight text-gray-900 ml-4 mt-2'>
                    Category :
                </h4>
                <div className='w-full p-3'>
                    <RadioGroup
                        name='rdBankTf'
                        onChange={(e) => filterByCategory(e)}
                    >
                        <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4'>
                            <RadioGroup.Option
                                value={'00'}
                                className={({ active }) =>
                                    classNames(
                                        active
                                            ? 'ring-2 ring-indigo-500 bg-indigo-300 hover:bg-indigo-300'
                                            : '',
                                        ' cursor-pointer text-gray-900 shadow-sm hover:bg-gray-50 group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                                    )
                                }
                            >
                                <RadioGroup.Label as='span'>
                                    ALL
                                </RadioGroup.Label>
                                <span
                                    className={classNames(
                                        'border-indigo-500 border pointer-events-none absolute -inset-px rounded-md'
                                    )}
                                />
                            </RadioGroup.Option>
                            {getCategoriesResult ? (
                                getCategoriesResult.map((category) => (
                                    <RadioGroup.Option
                                        key={category.category_id}
                                        value={category.category_id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? 'ring-2 ring-indigo-500 bg-indigo-300 hover:bg-indigo-300'
                                                    : '',
                                                ' cursor-pointer text-gray-900 shadow-sm hover:bg-gray-50 group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase focus:outline-none sm:flex-1'
                                            )
                                        }
                                    >
                                        <RadioGroup.Label as='span'>
                                            {category.category_name}
                                        </RadioGroup.Label>
                                        <span
                                            className={classNames(
                                                'border-indigo-500 border pointer-events-none absolute -inset-px rounded-md'
                                            )}
                                        />
                                    </RadioGroup.Option>
                                ))
                            ) : getCategoriesLoading ? (
                                <p>Loading ...</p>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {getAllProductResult ? (
                    products.map((product) => (
                        <div
                            key={product.product_id}
                            className='group relative'
                        >
                            <div className='min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 '>
                                <img
                                    src={ipBe + '/' + product.path}
                                    alt={product.imageAlt}
                                    className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                                />
                            </div>
                            <div className='mt-4 flex justify-between'>
                                <div>
                                    <div className='box-border h-10 border-12'>
                                        <h3 className='text-sm text-gray-700'>
                                            <span aria-hidden='true' />
                                            {product.product_name}
                                        </h3>
                                    </div>

                                    <div className='mt-2 flex items-center text-sm text-gray-500'>
                                        <CurrencyDollarIcon className='h-5 w-5 text-indigo-500' />
                                        Price : Rp{' '}
                                        {decimalFormatter(product.price)}
                                    </div>
                                    <div className='mt-2 flex items-center text-sm text-gray-500'>
                                        <CircleStackIcon className='h-5 w-5 text-indigo-500' />
                                        Stock : {product.stock}
                                    </div>
                                    <div className='mt-2 flex items-center text-sm text-gray-500'>
                                        <BanknotesIcon className='h-5 w-5 text-indigo-500' />
                                        Sold : {product.sold}
                                    </div>

                                    <p className='mt-1 text-sm text-gray-500'></p>
                                </div>
                            </div>
                            <div className='mt-2 flex items-center justify-center gap-x-12'>
                                <button
                                    onClick={(e) => addToCart(e, product)}
                                    className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                >
                                    Add to cart
                                </button>
                                <p
                                    className='text-sm font-semibold text-gray-900'
                                    onClick={(e) => doShowProduct(e, product)}
                                >
                                    Detail{' '}
                                    <span aria-hidden='true'>&rarr;</span>
                                </p>
                            </div>
                        </div>
                    ))
                ) : getAllProductLoading ? (
                    <p>Loading ...</p>
                ) : (
                    <p>
                        {getAllProductError
                            ? getAllProductError
                            : 'Data Kosong'}
                    </p>
                )}
            </div>
            <ProductDetail
                visible={showProductDetail}
                onClose={handleOnClose}
                product={product}
            />
        </>
    );
}
