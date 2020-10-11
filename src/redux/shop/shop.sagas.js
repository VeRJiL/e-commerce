import { takeEvery, put, call, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailur } from './shop.actions';

export function* fetchCollectionsAsync() {
    
    try {
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get();
        console.log(snapShot);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        console.log(error);
        yield put(fetchCollectionsFailur(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart),
    ]);
}