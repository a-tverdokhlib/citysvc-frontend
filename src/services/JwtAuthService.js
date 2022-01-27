import fetch from 'auth/FetchInterceptor'

const JwtAuthService = {}

JwtAuthService.login = function (data) {
    return fetch({
        url: '/auth/login',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data: data
    })
}

JwtAuthService.signUp = function (data) {
    return fetch({
        url: '/auth/register',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data: data
    })
}

JwtAuthService.forgotPassword = function (payload) {
    return fetch({
        url: '/auth/forgot-password',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data: payload

    })
}

JwtAuthService.verifyEmail = function (token) {
    return fetch({
        url: '/auth/verify-email?token=' + token,
        method: 'get',
        headers: {
            'public-request': 'true'
        }
    })
}
JwtAuthService.resetPasswordToken = function (token) {
    return fetch({
        url: '/auth/reset-password?token=' + token,
        method: 'get',
        headers: {
            'public-request': 'true'
        }
    })
}
JwtAuthService.resetPassword = function (data) {
    return fetch({
        url: '/auth/reset-password',
        method: 'post',
        headers: {
            'public-request': 'true'
        },
        data
    })
}

export default JwtAuthService