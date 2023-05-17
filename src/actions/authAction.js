import axios from 'axios';
import { ipApi } from '../setting';
import { getToken } from '../Helpers';

export const USER_REGISTER = 'USER_REGISTER';
export const AUTHENTICATION = 'AUTHENTICATION';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';

export const doLogin = (data) => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: AUTHENTICATION,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        //get from API
        axios({
            method: 'POST',
            url: ipApi + '/auth/login',
            timeout: '120000',
            data: data,
        })
            .then((response) => {
                //2. berhasil call API

                const auth = {
                    isAuth: true,
                    data: response.data,
                    user: response.data.data,
                    token: response.data.token,
                };

                localStorage.setItem('auth', JSON.stringify(auth));

                dispatch({
                    type: AUTHENTICATION,
                    payload: {
                        loading: false,
                        data: auth,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                //gagal
                dispatch({
                    type: AUTHENTICATION,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const doCheckPassword = (data) => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: CHECK_PASSWORD,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        //get from API
        axios({
            method: 'POST',
            url: ipApi + '/auth/checkpassword',
            timeout: '120000',
            data: { password: data },
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                dispatch({
                    type: CHECK_PASSWORD,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                //gagal
                dispatch({
                    type: CHECK_PASSWORD,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const userRegister = (data) => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: USER_REGISTER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        //get from API
        axios({
            method: 'POST',
            url: ipApi + '/auth/register',
            timeout: '120000',
            data: data,
        })
            .then((response) => {
                //2. berhasil call API
                dispatch({
                    type: USER_REGISTER,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                //gagal
                dispatch({
                    type: USER_REGISTER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const doLogOut = () => {
    return (dispatch) => {
        localStorage.removeItem('auth');

        dispatch({
            type: AUTHENTICATION,
            payload: {
                loading: false,
                data: false,
                errorMessage: false,
            },
        });
    };
};

export const clearRegister = (type) => {
    return (dispatch) => {
        dispatch({
            type: USER_REGISTER,
            payload: {
                loading: false,
                data: false,
                errorMessage: false,
            },
        });
    };
};
