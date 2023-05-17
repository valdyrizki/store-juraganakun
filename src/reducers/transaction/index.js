import {
    POST_TRANSACTION,
    MY_TRANSACTIONS,
} from '../../actions/transactionAction';

const initialState = {
    getPostTransactionResult: false,
    getPostTransactionLoading: false,
    getPostTransactionError: false,
    getMyTrxResult: false,
    getMyTrxLoading: false,
    getMyTrxError: false,
};

const transaction = (state = initialState, action) => {
    switch (action.type) {
        case POST_TRANSACTION:
            return {
                ...state,
                getPostTransactionResult: action.payload.data,
                getPostTransactionLoading: action.payload.loading,
                getPostTransactionError: action.payload.errorMessage,
            };
        case MY_TRANSACTIONS:
            return {
                ...state,
                getMyTrxResult: action.payload.data.data,
                getMyTrxLoading: action.payload.loading,
                getMyTrxError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default transaction;
