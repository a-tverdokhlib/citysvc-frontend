export const UserProfileRules = {
    email: [
        {
            required: true,
            message: 'Please input your email address'
        },
        {
            type: 'email',
            message: 'Please enter a validate email!'
        }
    ],
    password: [
        {
            required: true,
            message: 'Please input your password'
        },
        {
            min: 5,
            message: 'minimum allowed length (5)',

        },
        {
            max: 20,
            message: 'maximum allowed length (20)',

        }
    ],
    name: [
        {
            required: true,
            message: 'Please input your full name'
        },
        {
            min: 5,
            message: 'minimum allowed length (5)',

        },
        {
            max: 20,
            message: 'maximum allowed length (50)',

        }
    ],
    confirm: [
        {
            required: true,
            message: 'Please confirm your password!'
        },
        ({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
            },
        })
    ]
}