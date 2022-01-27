import { all, takeEvery, put, fork, call, takeLatest } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	SIGNIN_WITH_GOOGLE,
	SIGNIN_WITH_FACEBOOK,
	VERIFY_EMAIL
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	signOutSuccess,
	signUpSuccess,
	signInWithGoogleAuthenticated,
	signInWithFacebookAuthenticated
} from "../actions/Auth";

import FirebaseService from 'services/FirebaseService'
import JwtAuthService from 'services/JwtAuthService';
import StorageService from 'services/StorageService';
export function* verifyEmail() {
	yield takeEvery(VERIFY_EMAIL, function* ({ payload }) {

		try {
			const user = yield call(JwtAuthService.verifyEmail, payload);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {

				StorageService.save(AUTH_TOKEN, user.tokens);
				yield put(authenticated(user.user));
			}
		} catch (err) {
			yield put(showAuthMessage(err.message));
		}
	});
}
export function* signInWithFBEmail() {
	yield takeEvery(SIGNIN, function* ({ payload }) {

		try {
			const user = yield call(JwtAuthService.login, payload);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {

				StorageService.save(AUTH_TOKEN, user.tokens);
				yield put(authenticated(user.user));
			}
		} catch (err) {
			yield put(showAuthMessage(err.message));
		}
	});
}

export function* signOut() {
	yield takeEvery(SIGNOUT, function* () {
		try {
			const signOutUser = yield call(FirebaseService.signOutRequest);
			if (signOutUser === undefined) {
				localStorage.removeItem(AUTH_TOKEN);
				yield put(signOutSuccess(signOutUser));
			} else {
				yield put(showAuthMessage(signOutUser.message));
			}
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export function* signUpWithFBEmail() {
	yield takeEvery(SIGNUP, function* ({ payload }) {
		try {
			delete payload.confirm;
			const user = yield call(JwtAuthService.signUp, payload);
			yield put(showAuthMessage("Registration Succesful"));
			yield put(signUpSuccess(user.tokens))

		} catch (err) {
			yield put(showAuthMessage(err.message));
		}
	}
	);
}

export function* signInWithFBGoogle() {
	yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
		try {
			const user = yield call(FirebaseService.signInGoogleRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(signInWithGoogleAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signInWithFacebook() {
	yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
		try {
			const user = yield call(FirebaseService.signInFacebookRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(signInWithFacebookAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(signInWithFBEmail),
		fork(signOut),
		fork(signUpWithFBEmail),
		fork(signInWithFBGoogle),
		fork(signInWithFacebook)
	]);
}
