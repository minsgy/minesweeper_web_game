import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { control } from './modules/control';

const combinedReducer = combineReducers({
  control: control.reducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const store = configureStore({
  reducer: combinedReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
