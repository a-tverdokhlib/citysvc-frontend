import fetch from 'auth/FetchInterceptor'

const MyCalendarService = {};

MyCalendarService.addBooking = function (data) {
    return fetch({
        url: '/myCalendar',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
MyCalendarService.deleteBooking = function (id) {
    return fetch({
        url: '/myCalendar/' + id,
        method: 'delete',
        headers: {
            'public-request': 'true'
        }
    })
}
MyCalendarService.getBookings = function (options) {
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
        url: '/myCalendar?' + queryString,
        method: 'get',
        headers: {
            'public-request': 'true'
        },
    })
}

export default MyCalendarService;