import { takeEvery, all, call, put } from 'redux-saga/effects';
import {
  fetchUsersFullFilled,
  fetchUsersPadding,
  fetchUsersReject,
} from '../features/users/users.slice';
import axios from 'axios';
import { IUser } from '../features/users/users.slice';

interface ResponseGenerator {
  config?: string;
  data: IUser[];
  headers?: string;
  request?: string;
  status?: string;
  statusText?: string;
}

const fetchUser = async (url: string) => {
  return await axios.get(url);
};

function* getUsersWorker(action: { type: string; payload: string }) {
  try {
    const response: ResponseGenerator = yield call(fetchUser, action.payload);
    yield put(fetchUsersFullFilled(response.data));
  } catch (err) {
    yield put(fetchUsersReject('Something went wrong'));
  }
}

function* getUsers() {
  yield takeEvery(fetchUsersPadding.type, getUsersWorker);
}

export default function* rootSaga() {
  yield all([call(getUsers)]);
}
