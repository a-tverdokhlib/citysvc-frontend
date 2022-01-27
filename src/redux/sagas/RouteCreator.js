import { all, takeEvery, put, fork, call, takeLatest } from 'redux-saga/effects';
import {
    ADD_DESTINATION, DESTINATION_SUCCESS, GET_MY_LOCATION, GET_MY_LOCATION_ERROR, GET_MY_LOCATION_SUCCESS,
    HIDE_MESSAGE, REMOVE_DESTINATION, SHOW_MESSAGE, DESTINATION_ERROR, GET_ROUTE_DATA, UPDATE_ROUTE
} from "../constants/routeCreator";
import { destinationError, destinationSuccess, showMessage, routeDataSuccess, routeDataError } from "../actions/RouteCreator";
import RouteCreatorService from "services/RouteCreator";
export function* addDestination() {
    yield takeEvery(ADD_DESTINATION, function* ({ data }) {
        try {

            const res = yield call(RouteCreatorService.addDestination, data);
            yield put(destinationSuccess(res));
            yield put(showMessage("Destination added"));

        } catch (err) {
            yield put(destinationError(err.message));
            yield put(showMessage(err.message));
        }
    });
}
export function* updateRoute() {
    yield takeEvery(UPDATE_ROUTE, function* ({ id, data }) {
        try {

            const res = yield call(RouteCreatorService.updateRoute, id, data);
            yield put(routeDataSuccess(res));
            yield put(showMessage("Updated"));

        } catch (err) {
            yield put(routeDataError(err.message));
            yield put(showMessage(err.message));
        }
    });
}
export function* getData() {
    yield takeEvery(GET_ROUTE_DATA, function* ({ data }) {
        try {

            const res = yield call(RouteCreatorService.data, data);
            yield put(routeDataSuccess(res));
            //   yield put(showMessage("Destination added"));

        } catch (err) {
            yield put(routeDataError(err.message));
            yield put(showMessage(err.message));
        }
    });
}
export function* removeDestination() {
    yield takeEvery(REMOVE_DESTINATION, function* ({ data }) {
        try {

            const res = yield call(RouteCreatorService.removeDestination, data);
            yield put(destinationSuccess(res));
            yield put(showMessage("Destination removed"));

        } catch (err) {
            yield put(destinationError(err.message));
            yield put(showMessage(err.message));
        }
    });
}
export default function* rootSaga() {
    yield all([

        fork(addDestination),
        fork(removeDestination),
        fork(updateRoute),
        fork(getData)
    ]);
}