import {
    AUTHENTICATION,
    USER_REGISTER,
    CHECK_PASSWORD,
} from '../../actions/authAction';

const initialState = {
    getAuthResult:
        localStorage.getItem('auth') !== null
            ? JSON.parse(localStorage.getItem('auth'))
            : false,
    getAuthLoading: false,
    getAuthError: false,
    getUserRegisterResult: false,
    getUserRegisterLoading: false,
    getUserRegisterError: false,
    getCheckPasswordResult: false,
    getCheckPasswordLoading: false,
    getCheckPasswordError: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION:
            return {
                ...state,
                getAuthResult: action.payload.data,
                getAuthLoading: action.payload.loading,
                getAuthError: action.payload.errorMessage,
            };
        case USER_REGISTER:
            return {
                ...state,
                getUserRegisterResult: action.payload.data,
                getUserRegisterLoading: action.payload.loading,
                getUserRegisterError: action.payload.errorMessage,
            };
        case CHECK_PASSWORD:
            return {
                ...state,
                getCheckPasswordResult: action.payload.data,
                getCheckPasswordLoading: action.payload.loading,
                getCheckPasswordError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default auth;
