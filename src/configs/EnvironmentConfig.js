const dev = {
    // API_ENDPOINT_URL: 'http://52.86.242.174:5000/v1'
    API_ENDPOINT_URL: 'http://localhost:4000/v1'
    // API_ENDPOINT_URL: 'http://test.leosunservices.com:4000/v1'
    // API_ENDPOINT_URL: 'http://93.115.19.248:4000/v1'
};

const prod = {

    // API_ENDPOINT_URL: 'http://52.86.242.174:5000/v1'
    API_ENDPOINT_URL: 'http://localhost:4000/v1'
    // API_ENDPOINT_URL: 'http://test.leosunservices.com:4000/v1'
    // API_ENDPOINT_URL: 'http://localhost:4000/v1'
};

const test = {
    // API_ENDPOINT_URL: 'http://52.86.242.174:5000/v1'
    API_ENDPOINT_URL: 'http://localhost:4000/v1'
    // API_ENDPOINT_URL: 'http://test.leosunservices.com:4000/v1'
    // API_ENDPOINT_URL: 'http://93.115.19.248:4000/v1'
};

const getEnv = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return dev
        case 'production':
            return prod
        case 'test':
            return test
        default:
            break;
    }
}

export const env = getEnv()