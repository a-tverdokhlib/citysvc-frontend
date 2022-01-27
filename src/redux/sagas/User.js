import { all, takeEvery, put, fork, call, takeLatest } from 'redux-saga/effects';
import { GET_USER } from '../constants/User';
import { getUser, userSuccess } from '../actions/User';
import UserService from 'services/UserService';
export function* fetchUser() {
    yield takeLatest(GET_USER, function* (payload) {
        try {
            const user = yield call(UserService.me);
            yield put(userSuccess(user))
        } catch (err) {
            console.log(err);
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(fetchUser),
    ]);
}