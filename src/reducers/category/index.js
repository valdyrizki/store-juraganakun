import { GET_CATEGORIES } from '../../actions/categoryAction';

const initialState = {
    getCategoriesResult: false,
    getCategoriesLoading: false,
    getCategoriesError: false,
};

const product = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                getCategoriesResult: action.payload.data,
                getCategoriesLoading: action.payload.loading,
                getCategoriesError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default product;
