import { GET_CART } from '../../actions/cartAction';

const initialState = {
    getCartResult: JSON.parse(localStorage.getItem('cart')),
    getCartTotalPrice: localStorage.getItem('cartTotalPrice')
        ? JSON.parse(localStorage.getItem('cartTotalPrice'))
        : 0,
    getCartError: false,
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                getCartResult: action.payload.data,
                getCartTotalPrice: action.payload.totalPrice,
                getCartError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default cart;
