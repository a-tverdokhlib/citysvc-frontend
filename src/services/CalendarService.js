import fetch from 'auth/FetchInterceptor'

const CalendarService = {};

CalendarService.getDates = function (url) {
    return fetch({
        url: '/calendar',
        method: 'get',
        headers: {
            'public-request': 'true'
        },
    })
}

CalendarService.createDate = function (data) {
    return fetch({
        url: '/calendar',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
CalendarService.createHour = function (data) {
    return fetch({
        url: '/calendar/hour',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
CalendarService.deleteHour = function ({ id, dateId }) {
    return fetch({
        url: '/calendar/hour/' + id,
        method: 'delete',
        headers: {
            'public-request': 'true'
        },
        data: {
            dateId
        }

    })
}
export default CalendarService;