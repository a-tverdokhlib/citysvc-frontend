import moment from "moment"
import {
    CREATE_CALENDAR_DATE, HIDE_CALENDAR_MESSAGE, GET_CALENDAR_DATES, CALENDAR_SUCCESS, CALENDAR_ERROR,
    GET_CALENDAR_DATES_ERROR, GET_CALENDAR_DATES_SUCCESS, CREATE_CALENDAR_HOUR, SELECT_DATE, DELETE_CALENDAR_HOUR
} from "../constants/Calendar"
const initialState = {
    date: {},
    loading: false,
    success: false,
    message: "",
    dates: undefined,
    selectedDate: moment(),
    availableDate: undefined
}

const calendar = (state = initialState, action) => {
    switch (action.type) {
        case GET_CALENDAR_DATES:
            return {
                ...state,
                loading: true,
                data: action.data
            }
        case GET_CALENDAR_DATES_SUCCESS:
            const availableDate = action.data.find(item => item.date == moment().format('YYYY-MM-DD'))
            return {
                ...state,
                dates: action.data,
                loading: false,
                success: true,
                availableDate
            }
        case GET_CALENDAR_DATES_ERROR:
            return {
                ...state,
                dates: undefined,
                loading: false,
                success: false,
                showMessage: true,
                message: action.message
            }
        case CREATE_CALENDAR_DATE:
            return {
                ...state,
                loading: true
            }
        case CREATE_CALENDAR_HOUR:
            return {
                ...state,
                loading: true
            }
        case DELETE_CALENDAR_HOUR:
            return {
                ...state,
                loading: true
            }

        case CALENDAR_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                showMessage: true,
                date: {},
                message: action.message
            }
        case CALENDAR_SUCCESS:
            if (action.data.type == "hour") {
                state = updateDateHours(state, action.data);
            }

            else {
                state = updateCalendarDates(state, action.data);
                state.availableDate = action.data;
            }

            return {
                ...state,
                loading: false,
                success: true,

            }
        case HIDE_CALENDAR_MESSAGE:
            return {
                ...state,
                showMessage: false,
            }
        case SELECT_DATE:
            return {
                ...state,
                selectedDate: action.selectedDate,
                availableDate: action.availableDate
            }
        default:
            return state;
    }

}

function updateCalendarDates(state, date) {
    let found = false;
    state.dates = state.dates.map(element => {

        if (element.id == date.id) {
            found = true;
            return date;
        }
        else {
            found = false
            return element;
        }

    });
    if (found == false)
        state.dates.push(date);
    return state;
}

function updateDateHours(state, data) {
    state.dates = state.dates.map(item => {
        if (item.id === data.dateId) {
            const { from, to, id, _id } = data;
            if (data.action == "delete") {
                item.hours = item.hours.filter(hour => {
                    return hour._id != id
                })
            }
            else {
                item.hours.push({
                    from, to, _id
                })
            }
        }
        return item;
    })
    return state;

}
export default calendar;