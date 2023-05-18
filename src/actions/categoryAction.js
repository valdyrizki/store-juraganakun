import axios from 'axios';
import { ipApi } from '../setting';
import { getToken } from '../Helpers';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = () => {
    return (dispatch) => {
        //get from API
        axios({
            method: 'GET',
            url: ipApi + '/category',
            timeout: '120000',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                //berhasil
                dispatch({
                    type: GET_CATEGORIES,
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
                    type: GET_CATEGORIES,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};
