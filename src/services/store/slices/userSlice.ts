import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../auth/AuthService';
import axios from 'axios';

interface IUserData {
    email: string;
    password: string;
}

const initialState = {
    email: '',
    id: '',
    status: '',
    error: ''
};

export const loginUser = createAsyncThunk('auth/login', async function (userData: IUserData, { rejectWithValue }) {
    try {
        const response = await AuthService.login(userData.email, userData.password);
        const data = response.data;
        console.log(response);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            const message = error.response.data.message;
            if (!message) {
                const messageArr = error.response.data;
                if (Array.isArray(messageArr)) {
                    return rejectWithValue(messageArr[0]);
                } else {
                    return rejectWithValue('Unexpected error occured');
                }
            }
            return rejectWithValue(message);
        } else {
            const message = String(error);
            return rejectWithValue(message);
        }
    }
});

export const signupUser = createAsyncThunk('auth/signup', async function (userData: IUserData, { rejectWithValue }) {
    try {
        const response = await AuthService.registration(userData.email, userData.password);
        const data = response.data;
        console.log(response);
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            const message = error.response.data.message;
            console.log(message);
            if (!message) {
                const messageArr = error.response.data;
                if (Array.isArray(messageArr)) {
                    return rejectWithValue(messageArr[0]);
                } else {
                    return rejectWithValue('Unexpected error occured');
                }
            }
            return rejectWithValue(message);
        } else {
            const message = String(error);
            return rejectWithValue(message);
        }
    }
});

export const checkAuth = createAsyncThunk('auth/check', async function (token: string, { rejectWithValue }) {
    try {
        const response = await AuthService.check(token);
        console.log('CHECK AUTH RESPONSE: ', response);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            const message = error.response.data.message;
            console.log(message);
            if (!message) {
                const messageArr = error.response.data;
                if (Array.isArray(messageArr)) {
                } else {
                    return rejectWithValue('Unexpected error occured');
                }
            }
            return rejectWithValue(message);
        } else {
            const message = String(error);
            return rejectWithValue(message);
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUser(state) {
            state.email = '';
            state.id = '';
            state.status = '';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        // log in cases
        builder.addCase(loginUser.pending, (state) => {
            // status change
            state.status = 'pending';
            // clear error data if status changed
            state.error = '';
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            //status cahnge
            state.status = 'resolved';

            //passing data to state
            if (action.payload) {
                localStorage.setItem('token', action.payload.token);
                const user = action.payload.user;
                state.email = user.email;
                state.id = user.id.toString();
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            //status cahnge
            state.status = 'rejected';
            state.error = action.payload as string;
        });
        // sign up cases
        builder.addCase(signupUser.pending, (state) => {
            // status change
            state.status = 'pending';
            // clear error data if status changed
            state.error = '';
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            //status cahnge
            state.status = 'resolved';

            //passing data to state
            if (action.payload) {
                localStorage.setItem('token', action.payload.token);
                const user = action.payload.user;
                state.email = user.email;
                state.id = user.id.toString();
            }
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            //status cahnge
            state.status = 'rejected';
            state.error = action.payload as string;
        });

        //check cases
        builder.addCase(checkAuth.pending, (state) => {
            // status change
            state.status = 'pending';
            // clear error data if status changed
            state.error = '';
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            //status cahnge
            state.status = 'resolved';

            //passing data to state
            if (action.payload) {
                const user = action.payload;
                state.email = user.email;
                state.id = user.id.toString();
            }
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            //status cahnge
            state.status = '';
            localStorage.removeItem('token');
            // state.error = action.payload as string;
        });
    }
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
