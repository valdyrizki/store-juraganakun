export const clearStore = (type) => {
    return (dispatch) => {
        dispatch({
            type: type,
            payload: {
                loading: false,
                data: false,
                errorMessage: false,
            },
        });
    };
};
