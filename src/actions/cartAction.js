import { showError, showSuccess } from '../Components/Message';

export const GET_CART = 'GET_CART';

function getTotalPrice(carts) {
    let total_price = 0;
    carts.forEach((cart) => {
        total_price += parseInt(cart.price) * parseInt(cart.qty);
    });
    return total_price;
}

function getCarts() {
    return localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
}

export const addCart = (product, qty) => {
    return (dispatch) => {
        if (product.stock > 0) {
            //existing cart
            const CARTS = getCarts();
            let isExist = false;
            let isOutOfStock = false;
            //check is product already add to cart
            CARTS.forEach((cart) => {
                if (cart.product_id === product.product_id) {
                    isExist = true;
                    if (parseInt(product.stock) > parseInt(cart.qty)) {
                        cart.qty = parseInt(cart.qty) + parseInt(qty);
                    } else {
                        isOutOfStock = true;
                    }
                }
            });

            if (isOutOfStock) {
                showError(
                    'Stock only ' + product.stock + ', Checkout your cart!'
                );
                return;
            }

            if (!isExist) {
                // if product not in cart, add the product to cart
                let newCart = {
                    product_id: product.product_id,
                    product_name: product.product_name,
                    price: product.price,
                    stock: product.stock,
                    path: product.path,
                    qty: parseInt(qty),
                };
                CARTS.push(newCart);
            }

            let totalPrice = getTotalPrice(CARTS);

            //update localstorage
            localStorage.setItem('cart', JSON.stringify(CARTS));
            localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));

            //dispatch
            dispatch({
                type: GET_CART,
                payload: {
                    data: CARTS,
                    totalPrice: totalPrice,
                    errorMessage: false,
                },
            });

            showSuccess('Success add product to cart!');
        }
    };
};

export const editCartQty = (product_id, qty) => {
    return (dispatch) => {
        const CARTS = getCarts();
        let isOutOfStock = false;
        let stock = 0;
        //update qty & validate if qty > stock
        CARTS.forEach((cart) => {
            if (cart.product_id === product_id) {
                if (cart.stock >= qty) {
                    cart.qty = parseInt(qty);
                } else {
                    isOutOfStock = true;
                    cart.qty = cart.stock;
                }
                stock = cart.stock;
            }
        });

        if (isOutOfStock) {
            showError('Stock only ' + stock + ', Checkout your cart!');
            return;
        }

        let totalPrice = getTotalPrice(CARTS);

        //update localstorage
        localStorage.setItem('cart', JSON.stringify(CARTS));
        localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));

        //dispatch
        dispatch({
            type: GET_CART,
            payload: {
                data: CARTS,
                totalPrice: totalPrice,
                errorMessage: false,
            },
        });
    };
};

export const removeCartItem = (product_id) => {
    return (dispatch) => {
        const CARTS = getCarts();
        let filteredCarts = CARTS.filter(function (cart) {
            return cart.product_id !== product_id;
        });
        let totalPrice = getTotalPrice(filteredCarts);

        //update localstorage
        localStorage.setItem('cart', JSON.stringify(filteredCarts));
        localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));

        //dispatch
        dispatch({
            type: GET_CART,
            payload: {
                data: filteredCarts,
                totalPrice: totalPrice,
                errorMessage: false,
            },
        });
    };
};
export const removeAllCart = () => {
    return (dispatch) => {
        //update localstorage
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('cartTotalPrice', JSON.stringify(0));

        //dispatch
        dispatch({
            type: GET_CART,
            payload: {
                data: [],
                totalPrice: 0,
                errorMessage: false,
            },
        });
    };
};

export const increaseQty = (product_id) => {
    return (dispatch) => {
        const CARTS = getCarts();
        //existing cart
        let isOutOfStock = false;
        //check is product already add to cart
        CARTS.forEach((cart) => {
            if (cart.product_id === product_id) {
                if (parseInt(cart.stock) > parseInt(cart.qty)) {
                    cart.qty = parseInt(cart.qty) + 1;
                } else {
                    isOutOfStock = true;
                }
            }
        });

        if (isOutOfStock) {
            return null;
        }

        let totalPrice = getTotalPrice(CARTS);

        //update localstorage
        localStorage.setItem('cart', JSON.stringify(CARTS));
        localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));

        //dispatch
        dispatch({
            type: GET_CART,
            payload: {
                data: CARTS,
                totalPrice: totalPrice,
                errorMessage: false,
            },
        });
    };
};

export const decreaseQty = (product_id) => {
    const CARTS = getCarts();
    return (dispatch) => {
        //check is product already add to cart
        CARTS.forEach((cart) => {
            if (cart.product_id === product_id) {
                if (parseInt(cart.qty) > 1) {
                    cart.qty = parseInt(cart.qty) - 1;
                } else {
                    return null;
                }
            }
        });

        let totalPrice = getTotalPrice(CARTS);

        //update localstorage
        localStorage.setItem('cart', JSON.stringify(CARTS));
        localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));

        //dispatch
        dispatch({
            type: GET_CART,
            payload: {
                data: CARTS,
                totalPrice: totalPrice,
                errorMessage: false,
            },
        });
    };
};
