import {
    GET_ALL_TOONS_PENDING,
    GET_ALL_TOONS_FULFILLED,
    GET_ALL_TOONS_REJECTED,
} from '../config/constants';

export const fetchData = bool => {
    return {
        type: GET_ALL_TOONS_PENDING,
        payload: bool,
    };
};

export const fetchDataFulfilled = data => {
    return {
        type: GET_ALL_TOONS_FULFILLED,
        payload: data,
        isLoading: false,
    };
};

export const fetchDataRejected = error => {
    return {
        type: GET_ALL_TOONS_REJECTED,
        payload: error,
        isLoading: false,
    };
};