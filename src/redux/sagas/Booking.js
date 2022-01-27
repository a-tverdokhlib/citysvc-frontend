import { all, takeEvery, put, fork, call, takeLatest } from 'redux-saga/effects';
import { DELETE_BOOKING, GET_BOOKINGS, GET_DBA_LISTING_DATA, GET_DBA_LISTING_DATA_SUCCESS, SAVE_NEW_BOOKING, UPDATE_BOOKING } from "../constants/Booking";
import { bookingsSuccess, getDBAListingDataSuccess, bookingUpdateSuccess, showBookingListMessage, showBookingMessage, getDBAListingDataError, bookingError, bookingSuccess, bookingsDeleteSuccess } from '../actions/Booking';

import BookingService from 'services/BookingService';
export function* getDBAListingData() {
    yield takeEvery(GET_DBA_LISTING_DATA, function* ({ url }) {
        try {
            const data = yield call(BookingService.getDBAListingData, url);
            yield put(getDBAListingDataSuccess(data));
            yield put(showBookingMessage(["URL succesfully scrapped."]));

        } catch (err) {
            yield put(getDBAListingDataError(err.message));
        }
    });
}

export function* saveNewBooking() {
    yield takeEvery(SAVE_NEW_BOOKING, function* (data) {
        try {

            const { details: pickup, deliveryDetails: shipping, url, images } = data;
            const res = yield call(BookingService.add, {
                shipping,
                pickup, url,
                images
            });
            yield put(bookingSuccess(res));
            yield put(showBookingMessage(["Booking saved."]));

        } catch (err) {
            yield put(bookingError(err.message));
        }
    });
}



export function* getBookings1() {
    yield takeEvery(GET_BOOKINGS, function* (data) {
        try {
            const res = yield call(BookingService.getBookings, data.data);
            yield put(bookingsSuccess(res));
        } catch (err) {
            console.log(err)
            //yield put(bookingError(err.message));
        }
    });
}
export function* updateBooking() {
    yield takeEvery(UPDATE_BOOKING, function* (data) {
        try {
            const res = yield call(BookingService.updateBooking, data.data);
            yield put(bookingUpdateSuccess(res));

        } catch (err) {
            yield put(bookingError(err.message));
        }
    });
}
export function* deleteBooking() {
    yield takeEvery(DELETE_BOOKING, function* (data) {
        try {

            const res = yield call(BookingService.deleteBooking, data.data.id);
            yield put(bookingsDeleteSuccess(data.data.id));
            yield put(showBookingListMessage("Booking deleted."));
        } catch (err) {
            if (err.message == 'Unauthorized')
                yield put(showBookingListMessage('You cannot delete this booking anymore.'));
            else
                yield put(showBookingListMessage(err.message));
        }
    });
}
export default function* rootSaga() {
    yield all([
        fork(getDBAListingData),
        fork(saveNewBooking),
        fork(updateBooking),
        fork(getBookings1),
        fork(deleteBooking)
    ]);
}
