import axios from 'axios';
import { ipApi } from '../setting';
import { downloadFile, getToken } from '../Helpers';

export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
export const DOWNLOAD_ALL_FILES = 'DOWNLOAD_ALL_FILES';

export const downloadFileByCode = (product_file) => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: DOWNLOAD_FILE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });
        //get from API
        axios({
            method: 'POST',
            url: ipApi + '/product/downloadbycode',
            timeout: '120000',
            data: { code: product_file.code },
            responseType: 'arraybuffer',
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                downloadFile(response, product_file.filename);
                //berhasil
                dispatch({
                    type: DOWNLOAD_FILE,
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
                    type: DOWNLOAD_FILE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const downloadAllFile = (invoice_id) => {
    return (dispatch) => {
        //default dispatch
        dispatch({
            type: DOWNLOAD_ALL_FILES,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });
        //get from API
        axios({
            method: 'POST',
            url: ipApi + '/product/downloadbyinvoice',
            timeout: '120000',
            data: { invoice_id: invoice_id },
            responseType: 'arraybuffer',
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                downloadFile(response, `${invoice_id}.zip`);
                //berhasil
                dispatch({
                    type: DOWNLOAD_ALL_FILES,
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
                    type: DOWNLOAD_ALL_FILES,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};
