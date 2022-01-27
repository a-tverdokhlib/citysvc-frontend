export const rulesPickup = {
    dbaLink: [
        {
            required: true,
            message: 'Please input valid dba listing link.'
        }
    ],
    title: [
        {
            required: true,
            message: 'Please description.'
        },
        {
            max: 200,
            message: 'maximum allowed length (200)',

        },
    ],
    location: [
        {
            required: true,
            message: 'Please input address.'
        },
        {
            max: 200,
            message: 'maximum allowed length (200)',

        },
    ],
    name: [
        {
            required: true,
            message: 'Please input name.'
        },
        {
            max: 100,
            message: 'maximum allowed length (200)',

        },
    ],
    id: [
        {
            required: true,
            message: 'Please input ID.'
        },
        {
            max: 100,
            message: 'maximum allowed length (200)',

        },
    ],
    zip: [
        {
            required: true,
            message: 'Please input zip.'
        }
    ],
    phone: [
        {
            required: true,
            message: 'Please input phone.'
        },
        {
            max: 50,
            message: 'maximum allowed length (50)',

        },
    ],
}
export const rulesDelivery = {
    location: [
        {
            required: true,
            message: 'Please input address.'
        },
        {
            max: 200,
            message: 'maximum allowed length (200)',

        },
    ],
    name: [
        {
            required: true,
            message: 'Please input name.'
        },
        {
            max: 100,
            message: 'maximum allowed length (200)',

        },
    ],
    zip: [
        {
            required: true,
            message: 'Please input zip.'
        },
        {
            max: 50,
            message: 'maximum allowed length (50)',

        },
    ],
    phone: [
        {
            required: true,
            message: 'Please input phone.'
        },
        {
            max: 50,
            message: 'maximum allowed length (50)',

        },
    ],
}
export default rulesPickup;

