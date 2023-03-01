import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../auth/AuthService';

interface IUserData {
    email: string;
    password: string;
}

const initialState = {
    email: '',
    token: '',
    id: '',
    status: '',
    error: ''
};

export const loginUser = createAsyncThunk('user/login', async function (userData: IUserData, { rejectWithValue }) {
    try {
        const response = await AuthService.login(userData.email, userData.password);

        const statusText = response.statusText;
        if (statusText !== 'OK') {
            throw new Error('Server Error!');
        }

        localStorage.setItem('token', response.data.accessToken);
        const data = response.data;
        console.log(response);

        return data;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
    }
});

export const signupUser = createAsyncThunk('user/signup', async function (userData: IUserData, { rejectWithValue }) {
    try {
        const response = await AuthService.registration(userData.email, userData.password);

        const statusText = response.statusText;
        if (statusText !== 'OK') {
            throw new Error('Server Error!');
        }

        localStorage.setItem('token', response.data.accessToken);
        const data = response.data;
        console.log(response);

        return data;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
    }
});

export const logoutUser = createAsyncThunk('user/logout', async function (_, { rejectWithValue, dispatch }) {
    try {
        const response = await AuthService.logout();
        // const statusText = response.statusText;   // error while getting status text (console.log(response) to show that response exist)
        // if (statusText !== 'OK') {
        //     throw new Error('Server Error!');
        // }
        console.log(response);
        localStorage.removeItem('token');
        dispatch(removeUser());
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // setUser(state, action) {
        //     state.email = action.payload.email;
        //     state.token = action.payload.token;
        //     state.id = action.payload.id;
        // }, // not used anymore \\ (add to export {} to use )
        removeUser(state) {
            state.email = '';
            state.token = '';
            state.id = '';
        }
    },
    extraReducers: (builder) => {
        // log in cases
        builder.addCase(loginUser.pending, (state) => {
            // status change
            state.status = 'pending';
            state.error = '';
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            //status cahnge
            state.status = 'resolved';

            //passing data to state
            if (action.payload) {
                const user = action.payload.user;
                state.email = user.email;
                state.id = user.id;
                state.token = action.payload.accessToken;
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            // if (action.error.message) {
            //     state.error = action.error.message;
            // } else {
            //     state.error = 'unexpected error';
            // }
            //status cahnge
            state.status = 'rejected';
            state.error = action.payload as string;
        });
        // sign up cases
        builder.addCase(signupUser.pending, (state) => {
            // status change
            state.status = 'pending';
            state.error = '';
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            //status cahnge
            state.status = 'resolved';

            //passing data to state
            if (action.payload) {
                const user = action.payload.user;
                state.email = user.email;
                state.id = user.id;
                state.token = action.payload.accessToken;
            }
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            // if (action.error.message) {
            //     state.error = action.error.message;
            // } else {
            //     state.error = 'unexpected error';
            // }
            //status cahnge
            state.status = 'rejected';
            state.error = action.payload as string;
        });
    }
});

export const { removeUser } = userSlice.actions; // add setUser into {}

export default userSlice.reducer;
