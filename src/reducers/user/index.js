import { UPDATE_USER } from '../../actions/userAction';

const initialState = {
    getUpdateUserResult: false,
    getUpdateUserLoading: false,
    getUpdateUserError: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                getUpdateUserResult: action.payload.data,
                getUpdateUserLoading: action.payload.loading,
                getUpdateUserError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default user;
