import fetch from 'auth/FetchInterceptor'

const RouteCreatorService = {};
RouteCreatorService.getMyLocation = function (navSuccess, navError) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(navSuccess, navError, {
            timeout: 60000
        });
    }
    else
        navError({ message: "Error" });
}

RouteCreatorService.addDestination = function (data) {
    return fetch({
        url: '/myRoute/destination',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
RouteCreatorService.geoCodeAddress = function (data) {
    return fetch({
        url: '/myRoute/geoCode',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data: {
            address: data
        }
    })
}
RouteCreatorService.removeDestination = function (data) {
    return fetch({
        url: '/myRoute/destination',
        method: 'delete',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
RouteCreatorService.list = function (options) {
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
        url: '/myRoute?' + queryString,
        method: 'get',
        headers: {
            'public-request': "true"
        }
    })
}
RouteCreatorService.add = function (data) {
    return fetch({
        url: '/myRoute',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
RouteCreatorService.delete = function (id) {
    return fetch({
        url: '/myRoute/' + id,
        method: 'delete',
        headers: {
            'public-request': 'true'
        },

    })
}
RouteCreatorService.data = function (id) {
    return fetch({
        url: '/myRoute/' + id,
        method: 'get',
        headers: {
            'public-request': 'true'
        },

    })
}
RouteCreatorService.update = function (data) {
    return fetch({
        url: '/myRoute',
        method: 'put',
        headers: {
            'public-request': 'true'
        },
    })
}
RouteCreatorService.updateRoute = function (id, data, type = "myLocation") {
    return fetch({
        url: '/myRoute/' + id + "/myLocation",
        method: 'put',
        headers: {
            'public-request': 'true'
        },
        data
    })
}
export default RouteCreatorService;