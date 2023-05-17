import axios from 'axios';
import { ipApi } from '../setting';
import { getToken } from '../Helpers';

export const POST_TRANSACTION = 'POST_TRANSACTION';
export const MY_TRANSACTIONS = 'MY_TRANSACTIONS';

export const postTransaction = (data) => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: POST_TRANSACTION,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });
        //get from API
        axios({
            method: 'POST',
            url: ipApi + '/transaction/store',
            timeout: '120000',
            data: data,
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                //berhasil
                dispatch({
                    type: POST_TRANSACTION,
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
                    type: POST_TRANSACTION,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const getMyTransaction = () => {
    return (dispatch) => {
        dispatch({
            type: MY_TRANSACTIONS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });
        //get from API
        axios({
            method: 'GET',
            url: ipApi + '/transaction/getmy',
            timeout: '120000',
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                //berhasil
                dispatch({
                    type: MY_TRANSACTIONS,
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
                    type: MY_TRANSACTIONS,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const clearTransaction = () => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: POST_TRANSACTION,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });
    };
};
