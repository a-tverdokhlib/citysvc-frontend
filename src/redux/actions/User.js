import { GET_USER, USER_SUCCESS } from "../constants/User";

export function getUser() {
    return {
        type: GET_USER
    };
}

export function userSuccess(user) {
    return {
        type: USER_SUCCESS,
        user
    }
}