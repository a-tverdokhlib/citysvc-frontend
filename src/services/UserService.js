import fetch from 'auth/FetchInterceptor'

const UserService = {};

UserService.me = function () {
    return fetch({
        url: '/users/me',
        method: 'get',
        headers: {
            'public-request': 'true'
        },
    })
}
UserService.latest = function () {
    return fetch({
        url: '/users',
        method: 'get',
        headers: {
            'public-request': 'true'
        },
    })
}

UserService.list = function (options) {
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
        url: '/users?' + queryString,
        method: 'get',
        headers: {
            'public-request': "true"
        }
    })
}
UserService.delete = function (id) {
    return fetch({
        url: '/users/' + id,
        method: 'delete',
        headers: {
            'public-request': "true"
        },
        data: { id }
    })
}
UserService.getData = function (id) {
    return fetch({
        url: '/users/' + id,
        method: 'get',
        headers: {
            'public-request': "true"
        },

    })
}
UserService.update = function (id, data) {
    return fetch({
        url: '/users/' + id,
        method: 'put',
        headers: {
            'public-request': "true"
        },
        data
    })
}
export default UserService;