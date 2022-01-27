import { all } from 'redux-saga/effects';
import Auth from './Auth';
import User from './User';
import Booking from './Booking';
import Calendar from './Calendar';
import MyCalendar from './MyCalendar';
import RouteCreator from './RouteCreator';
export default function* rootSaga(getState) {
  yield all([
    Auth(), User(), Booking(), Calendar(), MyCalendar(), RouteCreator()
  ]);
}
