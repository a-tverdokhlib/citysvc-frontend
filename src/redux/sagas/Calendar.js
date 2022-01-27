import { all, takeEvery, put, fork, call, takeLatest } from 'redux-saga/effects';
import { calendarError, calendarSuccess, ON, onGetDatesError, onGetDatesSuccess } from '../actions/Calendar';
import CalendarService from '../../services/CalendarService';
import { CREATE_CALENDAR_DATE, CREATE_CALENDAR_HOUR, DELETE_CALENDAR_HOUR, GET_CALENDAR_DATES } from '../constants/Calendar';
import { rest } from 'lodash';
export function* getCalendarDates() {
    yield takeEvery(GET_CALENDAR_DATES, function* () {
        try {
            const data = yield call(CalendarService.getDates);
            yield put(onGetDatesSuccess(data));
        } catch (err) {
            yield put(onGetDatesError(err.message));
        }
    });
}

export function* createCalendarDate() {
    yield takeEvery(CREATE_CALENDAR_DATE, function* ({ data: { date, available } }) {
        try {
            const res = yield call(CalendarService.createDate, { date, available });
            yield put(calendarSuccess(res));
        } catch (err) {
            yield put(calendarError(err.message));
        }
    });

}

export function* createCalendarHour() {
    yield takeEvery(CREATE_CALENDAR_HOUR, function* (data) {
        try {
            const res = yield call(CalendarService.createHour, data);
            res.type = "hour";
            res.dateId = data.dateId;
            yield put(calendarSuccess(res));
        } catch (err) {
            yield put(calendarError(err.message));
        }
    });

}
export function* deleteCalendarHour() {
    yield takeEvery(DELETE_CALENDAR_HOUR, function* (data) {
        try {
            const res = yield call(CalendarService.deleteHour, data);
            res.type = "hour";
            res.action = "delete";
            yield put(calendarSuccess(res));
        } catch (err) {
            yield put(calendarError(err.message));
        }
    });
}
export default function* rootSaga() {
    yield all([
        fork(createCalendarDate),
        fork(getCalendarDates),
        fork(createCalendarHour),
        fork(deleteCalendarHour),
    ]);
}