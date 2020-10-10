import { takeLatest, put, call, all } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { singInSuccess, signInFailure } from './user.actions';

import { auth, googleProvider ,createUserProfileDocument } from '../../firebase/firebase.utils';

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapShot = yield userRef.get();
        yield put(
            singInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
        );

    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ]);
}