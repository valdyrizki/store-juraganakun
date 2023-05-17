import { useEffect, useState } from 'react';
import ProductDetail from './ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../actions/productAction';
import { ipBe } from '../setting';
import { addCart } from '../actions/cartAction';
import { decimalFormatter } from '../Helpers';
export default function ListProducts() {
    const [showProductDetail, setShowProductDetail] = useState(false);
    const handleOnClose = () => setShowProductDetail(false);
    const [product, setProduct] = useState({});

    const doShowProduct = (e, product) => {
        e.preventDefault();
        setProduct(product);
        setShowProductDetail(true);
    };

    const dispatch = useDispatch();
    const { getAllProductResult, getAllProductLoading, getAllProductError } =
        useSelector((state) => state.ProductReducer);

    const addToCart = (e, product, qty = 1) => {
        e.preventDefault();
        dispatch(addCart(product, qty));
    };

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    return (
        <>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                Happy Advertising !
            </h2>

            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {getAllProductResult ? (
                    getAllProductResult.map((product) => (
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
                                    <p className='text-sm font-medium text-gray-900'>
                                        Price : Rp{' '}
                                        {decimalFormatter(product.price)}
                                    </p>
                                    <div className='box-border h-12 border-12'>
                                        <h3 className='text-sm text-gray-700'>
                                            <span aria-hidden='true' />
                                            {product.product_name}
                                        </h3>
                                    </div>

                                    <p className='mt-1 text-sm text-gray-500'>
                                        Stock : {product.stock}
                                    </p>
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
