import {
    GET_MY_LOCATION, GET_MY_LOCATION_ERROR, GET_MY_LOCATION_SUCCESS, UPDATE_ROUTE, DIRECTION_ERROR, DIRECTION_SUCCESS,
    SHOW_MESSAGE, HIDE_MESSAGE, ADD_DESTINATION, REMOVE_DESTINATION, DESTINATION_ERROR, DESTINATION_SUCCESS, GET_ROUTE_DATA, ROUTE_DATA_ERROR, ROUTE_DATA_SUCCESS
} from "../constants/routeCreator"

export const getMyLocation = () => {
    return {
        type: GET_MY_LOCATION,
    }
}

export const getMyLocationSuccess = (data) => {
    return {
        type: GET_MY_LOCATION_SUCCESS,
        data
    }
}

export const getMyLocationError = (data) => {
    return {
        type: GET_MY_LOCATION_ERROR,
        data
    }
}

export const showMessage = (data) => {
    return {
        type: SHOW_MESSAGE,
        data
    }
}

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    }
}
export const addDestination = (data) => {
    return {
        type: ADD_DESTINATION,
        data
    }
}
export const removeDestination = (data) => {
    return {
        type: REMOVE_DESTINATION,
        data
    }
}
export const destinationSuccess = (data) => {
    return {
        type: DESTINATION_SUCCESS,
        data
    }
}
export const destinationError = (data) => {
    return {
        type: DESTINATION_ERROR,
        data
    }
}
export const getRouteData = (data) => {
    return {
        type: GET_ROUTE_DATA,
        data
    }
}
export const routeDataSuccess = (data) => {
    return {
        type: ROUTE_DATA_SUCCESS,
        data
    }
}
export const routeDataError = (data) => {
    return {
        type: ROUTE_DATA_ERROR,
        data
    }
}
export const updateRoute = (id, data) => {
    return {
        type: UPDATE_ROUTE,
        data,
        id
    }
}
export const directionSuccess = (data) => {
    return {
        type: DIRECTION_SUCCESS,
        data,

    }
}
export const directionError = () => {
    return {
        type: DIRECTION_ERROR,

    }
}