import {
    MY_CALENDAR_ADD_BOOKING, GET_MY_CALENDAR_BOOKINGS_ERROR,
    MY_CALENDAR_SUCCESS,
    MY_CALENDAR_ERROR, GET_MY_CALENDAR_BOOKINGS_SUCCESS, GET_MY_CALENDAR_BOOKINGS, SHOW_MESSAGE
} from "../constants/MyCalendar";
import { getBookings } from "redux/actions";
const initialState = {
    success: false,
    loading: false,
    message: "",
    showMessage: false,
    myCalendarBookings: []
}

export const myCalendar = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_CALENDAR_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                myCalendarBookings: action.data.results
            }
        case MY_CALENDAR_SUCCESS:
            if (action.action == "delete") {
                state.myCalendarBookings = state.myCalendarBookings.filter(item => item.id != action.data.id);
            }
            else
                state.myCalendarBookings.push(action.data);
            return {
                ...state,
                loading: false,
                success: true,
            }
        case MY_CALENDAR_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                message: action.message,
                showMessage: true
            }
        case GET_MY_CALENDAR_BOOKINGS:
            return {
                ...state,
                loading: true,
            }
        case MY_CALENDAR_ADD_BOOKING:
            return {
                ...state,
                loading: true,
            }
        case SHOW_MESSAGE:
            return {
                ...state,
                showMessage: action.showMessage,
                success: false
            }
        default:
            return state
    }
}

export default myCalendar;