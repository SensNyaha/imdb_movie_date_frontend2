import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {
	IUserSliceState,
	LoginCredits,
	AuthResponse,
	RegisterCredits,
	AuthResponseUser,
	AccessTokenCredits
} from './user.types.ts';

const initialState: IUserSliceState = {
	userInfo: null,
	status: 'idle',
	error: null
};

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (credits: LoginCredits, {rejectWithValue}) => {
		try {
			const backendAddress = import.meta.env.VITE_BACKEND_URL;
			const response = await axios.post(`${backendAddress}/users/login`, credits);
			return response.data;
		}
		catch (error) {
			if (error instanceof AxiosError)
				return rejectWithValue({
					message: error.response?.data?.message || error.message
				});

			return (error as Error).message;
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (credits: RegisterCredits, {rejectWithValue}) => {
		try {
			const backendAddress = import.meta.env.VITE_BACKEND_URL;
			const response = await axios.post(`${backendAddress}/users/register`, credits);
			return response.data;
		}
		catch (error) {
			if (error instanceof AxiosError)
				return rejectWithValue({
					message: error.response?.data?.message || error.message
				});

			return (error as Error).message;
		}
	}
);

export const getUserInfoByAccessToken = createAsyncThunk(
	'user/getUserInfoByAccessToken',
	async (credits: AccessTokenCredits, {rejectWithValue}) => {
		try {
			const backendAddress = import.meta.env.VITE_BACKEND_URL;
			const response = await axios.get(`${backendAddress}/users/my`, {
				headers: {
					Authorization: `Bearer ${credits.accessToken}`
				}
			});
			return response.data;
		}
		catch (error) {
			// localStorage.removeItem('accessToken');

			if (error instanceof AxiosError)
				return rejectWithValue({
					message: error.response?.data?.message || error.message
				});

			return (error as Error).message;
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (credits: AccessTokenCredits, {rejectWithValue}) => {
		try {
			const backendAddress = import.meta.env.VITE_BACKEND_URL;
			const response = await axios.get(`${backendAddress}/users/my`, {
				headers: {
					Authorization: `Bearer ${credits.accessToken}`
				}
			});
			localStorage.removeItem('accessToken');
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				return rejectWithValue({
					message: error.response?.data?.message || error.message
				});

			return (error as Error).message;
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		ADD_USERINFO_FROM_LOCALSTORAGE(state, action: {payload: AuthResponseUser}) {
			state.userInfo = action.payload;
		},
		REMOVE_USERINFO(state) {
			state.userInfo = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// login user cases
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: AuthResponse) => {
				state.status = action.payload.message || 'succeeded';
				state.userInfo = action.payload.data || null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = (action as AuthResponse).payload.message;
			})
			// register user cases
			.addCase(registerUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = action.payload.message || 'succeeded';
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = (action as AuthResponse).payload.message;
			})
			// get userinfo by access token
			.addCase(getUserInfoByAccessToken.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getUserInfoByAccessToken.fulfilled, (state, action) => {
				state.status = action.payload.message || 'succeeded';
			})
			.addCase(getUserInfoByAccessToken.rejected, (state, action) => {
				state.status = 'failed';
				state.error = (action as AuthResponse).payload.message;
			})
			// logout user
			.addCase(logoutUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.status = action.payload.message || 'succeeded';
				state.userInfo = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = (action as AuthResponse).payload.message;
			});
	}
});

export const {ADD_USERINFO_FROM_LOCALSTORAGE, REMOVE_USERINFO} = userSlice.actions;
export default userSlice.reducer;