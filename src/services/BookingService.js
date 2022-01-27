import fetch from 'auth/FetchInterceptor'

const BookingService = {};

BookingService.getDBAListingData = function (url) {
    return fetch({
        url: '/dba?url=' + url,
        method: 'get',
        headers: {
            'public-request': 'true'
        },
    })
}
BookingService.add = function (data) {
    return fetch({
        url: '/booking',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
BookingService.getBookings = function (options) {
    var queryString = Object.keys(options).filter(
        key => options[key]
    )
        .map(
            key => {
                if (options[key])
                    return key + '=' + options[key]
                else
                    return "";
            }
        ).join("&");

    return fetch({
        url: '/booking?' + queryString,
        method: 'get',
        headers: {
            'public-request': 'true'
        },
        qs: JSON.stringify(options)
    })
}
BookingService.updateBooking = function (data) {
    return fetch({
        url: '/booking',
        method: 'put',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
BookingService.deleteBooking = function (id) {
    return fetch({
        url: '/booking/' + id,
        method: 'delete',
        headers: {
            'public-request': 'true'
        },

    })
}
BookingService.updatePickup = function (id, data) {
    return fetch({
        url: '/booking/' + id + "/pickup",
        method: 'put',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
BookingService.updateShipping = function (id, data) {
    return fetch({
        url: '/booking/' + id + "/shipping",
        method: 'put',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
BookingService.getData = function (id) {
    return fetch({
        url: '/booking/' + id,
        method: 'get',
        headers: {
            'public-request': 'true'
        },

    })
}
export default BookingService;