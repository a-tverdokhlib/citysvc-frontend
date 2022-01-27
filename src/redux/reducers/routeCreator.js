import {
    ADD_DESTINATION, DESTINATION_SUCCESS, GET_MY_LOCATION, GET_MY_LOCATION_ERROR, GET_MY_LOCATION_SUCCESS,
    HIDE_MESSAGE, REMOVE_DESTINATION, SHOW_MESSAGE, DESTINATION_ERROR, ROUTE_DATA_ERROR, ROUTE_DATA_SUCCESS, DIRECTION_ERROR, DIRECTION_SUCCESS
} from "../constants/routeCreator";
const initialState = {
    success: false,
    loading: false,
    message: "",
    myLocation: {},
    isShowMessage: false,
    destinations: [],
    routeData: undefined,
    directions: {}
}

export const RouteCreator = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_LOCATION:
            return {
                ...state,
                loading: true
            }
        case GET_MY_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                myLocation: action.data
            }
        case GET_MY_LOCATION_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                message: action.data
            }
        case SHOW_MESSAGE:
            return {
                ...state,
                message: action.data,
                loading: false,
                isShowMessage: true,
            }
        case HIDE_MESSAGE:
            return {
                ...state,
                loading: false,
                success: false,
                isShowMessage: false,
            }
        case ADD_DESTINATION:

            return {
                ...state,
                loading: true,

            }
        case REMOVE_DESTINATION:
            state.destinations = state.destinations.filter(item => {
                return item.id != action.data
            })
            return {
                ...state,
                loading: true,
            }
        case DESTINATION_SUCCESS:
            // state.destinations.push(action.data);
            state.destinations = action.data;
            return {
                ...state,
                loading: false,
                success: true
            }
        case DESTINATION_ERROR:
            return {
                ...state,
                loading: false,
                success: false
            }
        case ROUTE_DATA_ERROR:
            return {
                ...state,
                loading: false,
                success: false
            }
        case ROUTE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                routeData: action.data,
                destinations: action.data.destination,
                myLocation: action.data.myLocation ? action.data.myLocation : {}
            }
        case DIRECTION_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                directions: {}
            }
        case DIRECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                directions: action.data
            }
        default:
            return state
    }
}

export default RouteCreator;