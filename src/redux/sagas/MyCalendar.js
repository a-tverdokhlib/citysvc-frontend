import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
    GET_MY_CALENDAR_BOOKINGS, MY_CALENDAR_ADD_BOOKING, MY_CALENDAR_DELETE_BOOKING
} from "../constants/MyCalendar";

import { myCalendarSuccess, getMyCalendarBookingsSuccess, myCalendarError } from '../actions/MyCalendar';
import MyCalendarService from '../../services/MyCalendarService';

export function* getBookings() {
    yield takeEvery(GET_MY_CALENDAR_BOOKINGS, function* (data) {
        try {
            const res = yield call(MyCalendarService.getBookings, data.data);
            yield put(getMyCalendarBookingsSuccess(res));
        } catch (err) {
            yield put(myCalendarError(err.message));
        }
    });

}
export function* addBooking() {

    yield takeEvery(MY_CALENDAR_ADD_BOOKING, function* (data) {
        try {
            const res = yield call(MyCalendarService.addBooking, data.data);

            yield put(myCalendarSuccess(res));
        } catch (err) {
            yield put(myCalendarError(err.message));
        }
    });
}
export function* deleteBooking() {

    yield takeEvery(MY_CALENDAR_DELETE_BOOKING, function* (data) {
        try {
            const res = yield call(MyCalendarService.deleteBooking, data.data);
            yield put(myCalendarSuccess(res, "delete"));
        } catch (err) {
            yield put(myCalendarError(err.message));
        }
    });
}
export default function* rootSaga() {
    yield all([
        fork(getBookings),
        fork(addBooking),
        fork(deleteBooking)
    ]);
}
