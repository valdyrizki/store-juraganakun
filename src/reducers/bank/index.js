import { GET_BANKS } from '../../actions/bankAction';

const initialState = {
    getBankResult: false,
    getBankLoading: false,
    getBankError: false,
};

const bank = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANKS:
            return {
                ...state,
                getBankResult: action.payload.data,
                getBankLoading: action.payload.loading,
                getBankError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default bank;
