import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './user.slice.ts';

const rootReducer = combineReducers({
	user: userReducer
});

const store = configureStore({
	reducer: rootReducer 
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;