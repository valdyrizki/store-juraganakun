import {
    DOWNLOAD_FILE,
    DOWNLOAD_ALL_FILES,
} from '../../actions/downloadAction';

const initialState = {
    getDownloadFileResult: false,
    getDownloadFileLoading: false,
    getDownloadFileError: false,
    getDownloadAllFileResult: false,
    getDownloadAllFileLoading: false,
    getDownloadAllFileError: false,
};

const transaction = (state = initialState, action) => {
    switch (action.type) {
        case DOWNLOAD_FILE:
            return {
                ...state,
                getDownloadFileResult: action.payload.data,
                getDownloadFileLoading: action.payload.loading,
                getDownloadFileError: action.payload.errorMessage,
            };
        case DOWNLOAD_ALL_FILES:
            return {
                ...state,
                getDownloadAllFileResult: action.payload.data,
                getDownloadAllFileLoading: action.payload.loading,
                getDownloadAllFileError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default transaction;
