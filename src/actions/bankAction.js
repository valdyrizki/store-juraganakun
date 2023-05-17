import axios from 'axios';
import { ipApi } from '../setting';
import { getToken } from '../Helpers';

export const GET_BANKS = 'GET_BANKS';

export const getBanks = () => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: GET_BANKS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        //get from API
        axios({
            method: 'GET',
            url: ipApi + '/bank',
            timeout: '120000',
            headers: {
                Authorization: getToken,
            },
        })
            .then((response) => {
                //2. berhasil call API
                dispatch({
                    type: GET_BANKS,
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
                    type: GET_BANKS,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};
