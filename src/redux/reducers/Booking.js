import {
    GET_DBA_LISTING_DATA, HIDE_BOOKING_MESSAGE, BOOKINGS_SUCCESS, RESET_BOOKING_DATA,
    GET_DBA_LISTING_DATA_SUCCESS, SHOW_BOOKING_MESSAGE, UPDATE_BOOKING, BOOKING_UPDATE_SUCCESS, ADD_BOOKING_ITEM, REMOVE_TAG_TO_BOOKING_ITEM,
    GET_DBA_DATA_ERROR, SAVE_DELIVERY_DETAILS, SAVE_PICKUP_DETAILS, SAVE_NEW_BOOKING, BOOKING_ERROR, BOOKING_SUCCESS, GET_BOOKINGS, DELETE_BOOKING, BOOKING_DELETE_SUCCESS, SHOW_BOOKING_LIST_MESSAGE, HIDE_BOOKING_LIST_MESSAGE, REMOVE_BOOKING_ITEM, ADD_TAG_TO_BOOKING_ITEM
} from "../constants/Booking";
const initialState = {
    details: undefined,
    images: [],
    message: "",
    url: "",
    showMessage: false,
    success: false,
    loading: false,
    deliveryDetails: undefined,
    newBookingData: undefined
}
const listInitialState = {
    results: [],
    loading: false,
    success: false,
    totalResults: 0,
    showMessage: false,
    message: ""

}
export const bookingList = (state = listInitialState, action) => {
    switch (action.type) {
        case BOOKING_UPDATE_SUCCESS:
            state.results = state.results.map(item => {
                return item.id == action.data.id ? action.data : item;
            })
            return {
                ...state,
                loading: false,
                success: true
            }
        case BOOKING_DELETE_SUCCESS:
            state.results = state.results.filter(item => {
                return item.id != action.data
            })
            return {
                ...state,
                loading: false,
                success: true
            }
        case UPDATE_BOOKING:
            return {
                ...state,
                loading: true,
            }
        case DELETE_BOOKING:
            return {
                ...state,
                loading: true,
            }
        case GET_BOOKINGS:
            return {
                ...state,
                loading: true,
            }
        case BOOKINGS_SUCCESS:
            return {
                ...state,
                results: action.results,
                limit: action.limit,
                totalResults: action.totalResults,
                loading: false,
            }
        case SHOW_BOOKING_LIST_MESSAGE:
            return {
                ...state,
                message: action.message,
                showMessage: true,

            }
        case HIDE_BOOKING_LIST_MESSAGE:
            return {
                ...state,
                message: '',
                showMessage: false,
                loading: false,
                success: false

            }
        case RESET_BOOKING_DATA:
            return {
                ...initialState
            }
        case ADD_TAG_TO_BOOKING_ITEM:
            state.results = state.results.map(item => {
                if (item.id === action.data.id) {
                    const tag = action.data.tag;
                    item = { ...item, ...tag };
                }
                return item;
            })
            return {
                ...state,
                totalResults: state.results.length
            }
        default:
            return state;
    }
}


const booking = (state = initialState, action) => {
    switch (action.type) {
        case GET_DBA_LISTING_DATA_SUCCESS:
            return {
                ...state,
                ...action.data,
                loading: false,
                success: true
            }
        case GET_DBA_DATA_ERROR:
            return {
                ...state,
                ...{
                    details: undefined,
                    images: [],
                    url: "",
                },
                message: action.message,
                loading: false,
                success: false,
                showMessage: true
            }
        case SHOW_BOOKING_MESSAGE:
            return {
                ...state,
                message: action.message,
                showMessage: true,

            }
        case HIDE_BOOKING_MESSAGE:
            return {
                ...state,
                message: '',
                showMessage: false,
                loading: false,
                success: false

            }
        case GET_DBA_LISTING_DATA:
            return {
                ...state,
                url: action.url,
                loading: true
            }
        case SAVE_DELIVERY_DETAILS:
            return {
                ...state,
                deliveryDetails: action.details
            }
        case SAVE_PICKUP_DETAILS:
            return {
                ...state,
                details: action.details
            }
        case SAVE_NEW_BOOKING:
            return {
                ...state,
                loading: true,

            }
        case BOOKING_ERROR:
            return {
                ...state,
                message: action.message,
                loading: false,
                success: false,
                showMessage: true
            }
        case BOOKING_SUCCESS:
            return {
                ...state,
                message: action.message,
                loading: false,
                success: true
            }

        default: return {
            ...state
        }

    }
}

export default booking;