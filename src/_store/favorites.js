import {
    fetchData,
    fetchDataFulfilled,
    fetchDataRejected,
} from '../_actions/favorites';
import { API } from '../config/api';
import { METHOD_GET, METHOD_POST, METHOD_DELETE } from '../config/constants';

const favorites = (method, user_id, webtoon_id) => {
    switch (method) {
        case METHOD_GET:
            return dispatch => {
                dispatch(fetchData(method, null, true));
                API.get(`/user/${user_id}/webtoon/favorites`)
                    .then(res => {
                        dispatch(fetchDataFulfilled(method, res.data));
                    })
                    .catch(error => {
                        dispatch(fetchDataRejected(method, error));
                    });
            };
        case METHOD_POST:
            return dispatch => {
                dispatch(fetchData(method, webtoon_id, true));
                API.post(`/user/${user_id}/webtoon/${webtoon_id}/favorites`)
                    .then(res => {
                        dispatch(fetchDataFulfilled(method, res.data));
                    })
                    .catch(error => {
                        dispatch(fetchDataRejected(method, error));
                    });
            };
        case METHOD_DELETE:
            return dispatch => {
                dispatch(fetchData(method, webtoon_id, true));
                API.delete(`/user/${user_id}/webtoon/${webtoon_id}/favorites`)
                    .then(res => {
                        dispatch(fetchDataFulfilled(method, res.data));
                    })
                    .catch(error => {
                        dispatch(fetchDataRejected(method, error));
                    });
            };
        default:
            return method;
    }
};

export default favorites;