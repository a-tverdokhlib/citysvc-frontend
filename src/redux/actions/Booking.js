import {
    HIDE_BOOKING_MESSAGE, GET_DBA_LISTING_DATA,
    GET_DBA_LISTING_DATA_SUCCESS, SHOW_BOOKING_MESSAGE,
    GET_DBA_DATA_ERROR, SAVE_DELIVERY_DETAILS, RESET_BOOKING_DATA, REMOVE_BOOKING_ITEM, ADD_BOOKING_ITEM, ADD_TAG_TO_BOOKING_ITEM, REMOVE_TAG_TO_BOOKING_ITEM,
    SAVE_PICKUP_DETAILS, SAVE_NEW_BOOKING, BOOKING_ERROR, BOOKING_SUCCESS, UPDATE_BOOKING, BOOKING_UPDATE_SUCCESS, GET_BOOKINGS, BOOKINGS_SUCCESS, DELETE_BOOKING, BOOKING_DELETE_SUCCESS, HIDE_BOOKING_LIST_MESSAGE, SHOW_BOOKING_LIST_MESSAGE
} from "../constants/Booking";

export const getDBAListingData = (url) => {
    return {
        type: GET_DBA_LISTING_DATA,
        url
    }
}

export const saveDeliveryDetails = (details) => {
    return {
        type: SAVE_DELIVERY_DETAILS,
        details

    };
};

export const showBookingMessage = (message) => {
    return {
        type: SHOW_BOOKING_MESSAGE,
        message

    };
};
export const showBookingListMessage = (message) => {
    return {
        type: SHOW_BOOKING_LIST_MESSAGE,
        message

    };
};
export const hideBookingMessage = () => {
    return {
        type: HIDE_BOOKING_MESSAGE,

    }
}
export const hideBookingListMessage = () => {
    return {
        type: HIDE_BOOKING_LIST_MESSAGE,

    }
}
export const getDBAListingDataSuccess = (data) => {
    return {
        type: GET_DBA_LISTING_DATA_SUCCESS,
        data
    }
}
export const getDBAListingDataError = (message) => {
    return {
        type: GET_DBA_DATA_ERROR,
        message
    }
}



export const savePickUpDetails = (details) => {
    return {
        type: SAVE_PICKUP_DETAILS,
        details

    }
}

export const saveNewBooking = ({ details, deliveryDetails, url, images }) => {
    return {
        type: SAVE_NEW_BOOKING,
        details,
        deliveryDetails,
        url,
        images

    }
}
export const updateBooking = (data) => {
    return {
        type: UPDATE_BOOKING,
        data

    }
}
export const deleteBooking = (data) => {
    return {
        type: DELETE_BOOKING,
        data
    }
}
export const bookingError = (message) => {
    return {
        type: BOOKING_ERROR,
        message

    }
}
export const bookingSuccess = (message) => {
    return {
        type: BOOKING_SUCCESS,
        message

    }
}
export const bookingUpdateSuccess = (data) => {
    return {
        type: BOOKING_UPDATE_SUCCESS,
        data

    }
}

export const getBookings = (data) => {
    return {
        type: GET_BOOKINGS,
        data

    }
}
export const bookingsSuccess = (data) => {
    return {
        type: BOOKINGS_SUCCESS,
        ...data

    }
}
export const bookingsDeleteSuccess = (data) => {
    return {
        type: BOOKING_DELETE_SUCCESS,
        data

    }
}
export const resetBookingData = (data) => {
    return {
        type: RESET_BOOKING_DATA

    }
}

export const removeBookingItem = (data) => {
    return {
        type: REMOVE_BOOKING_ITEM,
        data
    }
}
export const addBookingItem = (data) => {
    return {
        type: ADD_BOOKING_ITEM,
        data
    }
}
export const addTagBookingItem = (data) => {
    return {
        type: ADD_TAG_TO_BOOKING_ITEM,
        data
    }
}
export const removeTagBookingItem = (data) => {
    return {
        type: REMOVE_TAG_TO_BOOKING_ITEM,
        data
    }
}