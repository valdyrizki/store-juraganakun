import axios from 'axios';
import { ipApi } from '../setting';
import { getToken } from '../Helpers';

export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';

export const getAllProduct = () => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        //get from API
        axios({
            method: 'GET',
            url: ipApi + '/product/get',
            timeout: '120000',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                //berhasil
                dispatch({
                    type: GET_ALL_PRODUCT,
                    payload: {
                        loading: false,
                        data: response.data.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                //gagal
                dispatch({
                    type: GET_ALL_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};
