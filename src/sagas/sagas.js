import { put, takeEvery, call } from 'redux-saga/effects'


export function* getUsers() {
  yield put({ type: 'GET_PROCESSES'})
}


export function* watchGetUsers() {
  yield takeEvery('GET_PROCESSES', fetchGetAsync);
}

function* fetchGetAsync() {
  try {
    const data = yield call(() => {
      console.log('asd');
      return fetch('https://api.myjson.com/bins/pm3s5')
              .then(res => res.json())
      }
    );
    yield put({ type: 'REF_PROCESSES', data: data});
  } catch (error) {

  }
}
