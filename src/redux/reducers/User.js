
import { GET_USER, USER_SUCCESS } from "../constants/User";
const initUser = {

}

const user = (state = initUser, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state
            }
        case USER_SUCCESS:
            return {
                ...state,
                userData: action.user
            }
        default:
            return state;
    }
}
export default user;