import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';

interface IUserState {
	userInfo: LoginResponseUser | null,
	status: 'idle' | 'loading' | 'succeeded' | 'failed',
	error: null | string;
}

const initialState: IUserState = {
	userInfo: null,
	status: 'idle',
	error: null
};

export interface LoginCredits {
	email: string;
	password: string;
}

export interface LoginResponse {
	payload: {
		success: boolean;
		data?: LoginResponseUser| null;
		message: string;
	}
}

export interface LoginResponseUser {
	_id?: string;
	email?: string;
	username?: string;
	dates?: any[],
	avatar?: string;
	isSuperAdmin?: boolean;
	country?: string;
	accessToken?: string | null;
	recoveryToken?: string | null;
	emailVerified?: boolean;
	fullname?: string;
	lastGeneratedEmailConfirmation?: string;
}

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
				return rejectWithValue(error.response?.data);
			return error;
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: LoginResponse) => {
				state.status = 'succeeded';
				state.userInfo = action.payload.data || null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = (action as LoginResponse).payload.message;
			});
	}
});

export default userSlice.reducer;