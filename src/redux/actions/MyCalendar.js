import {
    MY_CALENDAR_ADD_BOOKING, GET_MY_CALENDAR_BOOKINGS_ERROR,
    MY_CALENDAR_SUCCESS,
    MY_CALENDAR_ERROR, GET_MY_CALENDAR_BOOKINGS_SUCCESS, GET_MY_CALENDAR_BOOKINGS, SHOW_MESSAGE, MY_CALENDAR_DELETE_BOOKING
} from "../constants/MyCalendar";

export const getMyCalendarBookings = (data) => {
    return {
        type: GET_MY_CALENDAR_BOOKINGS,
        data
    }
};
export const getMyCalendarBookingsSuccess = (data) => {
    return {
        type: GET_MY_CALENDAR_BOOKINGS_SUCCESS,
        data
    }
};
export const myCalendarAddBooking = (data) => {
    return {
        type: MY_CALENDAR_ADD_BOOKING,
        data

    }
};
export const myCalendarDeleteBooking = (data) => {
    return {
        type: MY_CALENDAR_DELETE_BOOKING,
        data

    }
};
export const myCalendarSuccess = (data, action) => {
    return {
        type: MY_CALENDAR_SUCCESS,
        data,
        action

    }
};
export const myCalendarError = (message) => {
    return {
        type: MY_CALENDAR_ERROR,
        message

    }
};
export const myCalendarShowMessage = (showMessage) => {
    return {
        type: SHOW_MESSAGE,
        showMessage

    }
};