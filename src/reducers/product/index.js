import { GET_ALL_PRODUCT } from '../../actions/productAction';

const initialState = {
    getAllProductResult: false,
    getAllProductLoading: false,
    getAllProductError: false,
};

const product = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                getAllProductResult: action.payload.data,
                getAllProductLoading: action.payload.loading,
                getAllProductError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default product;
