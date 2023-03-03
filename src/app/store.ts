import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counter.slice';
import usersReducer from '../features/users/users.slice';
import createSagaMiddleware from '@redux-saga/core';
import textReducer from '../features/text/text.slice';
import rootSaga from '../saga/saga';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    text: textReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(saga),
});

saga.run(rootSaga);

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
