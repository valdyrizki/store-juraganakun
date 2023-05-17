import axios from 'axios';
import { ipApi } from '../setting';
import { getToken } from '../Helpers';
import { showError, showSuccess } from '../Components/Message';
import { AUTHENTICATION } from './authAction';

export const UPDATE_USER = 'UPDATE_USER';

export const doUpdateUser = (data) => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: UPDATE_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        //get from API
        axios({
            method: 'PUT',
            url: ipApi + '/user/updateme',
            timeout: '120000',
            data: data,
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                //2. berhasil call API
                showSuccess(response.data.msg);
                const token = response.data.token;
                const auth = {
                    isAuth: true,
                    data: response.data,
                    user: response.data.data,
                    token: token ? token : getToken(),
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

                dispatch({
                    type: UPDATE_USER,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                //gagal
                showError(error.message);
                dispatch({
                    type: UPDATE_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};
