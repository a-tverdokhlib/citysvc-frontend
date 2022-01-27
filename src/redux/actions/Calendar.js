import { CALENDAR_SUCCESS, CREATE_CALENDAR_DATE, CREATE_CALENDAR_HOUR, GET_CALENDAR_DATES, CALENDAR_ERROR, GET_CALENDAR_DATES_ERROR, GET_CALENDAR_DATES_SUCCESS, SELECT_DATE, DELETE_CALENDAR_HOUR } from "../constants/Calendar"
export const getCalendarDates = (data) => {
    return {
        type: GET_CALENDAR_DATES,
        data
    }
}

export const createCalendarDate = (data) => {
    return {
        type: CREATE_CALENDAR_DATE,
        data
    }
}

export const createCalendarHour = ({ dateId, from, to }) => {
    return {
        type: CREATE_CALENDAR_HOUR,
        dateId, from, to
    }
}
export const deleteCalendarHour = ({ dateId, id }) => {
    return {
        type: DELETE_CALENDAR_HOUR,
        dateId, id
    }
}
export const calendarSuccess = (data) => {
    return {
        type: CALENDAR_SUCCESS,
        data
    }
}
export const calendarError = (data) => {
    return {
        type: CALENDAR_ERROR,

    }
}
export const onGetDatesError = (message) => {
    return {
        type: GET_CALENDAR_DATES_ERROR,
        message
    }
}
export const onGetDatesSuccess = (data) => {
    return {
        type: GET_CALENDAR_DATES_SUCCESS,
        data
    }
}
export const onSelectDate = ({ selectedDate, availableDate }) => {
    return {
        type: SELECT_DATE,
        selectedDate,
        availableDate
    }
}