import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import user from './User';
import cart from "../cart/reducers";
import booking, { bookingList } from "./Booking";
import calendar from "./Calendar";
import myCalendar from "./MyCalendar";
import routeCreator from "./routeCreator";
const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    user,
    cart,
    booking,
    bookingList,
    calendar, myCalendar, routeCreator
});

export default reducers;