import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Import createAsyncThunk
import { setAuthToken,removeAuthToken } from '../utils/auth'; // Import the utility to set the token
import api from '../utils/api';
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";

// export const login = (credentials) => async (dispatch) => {
//   const { socket } = await import('../utils/socket'); // Dynamically import the socket instance
//   socket.emit('login', credentials); // Emit login event
//   socket.on('loginResponse', (response) => {
//     if (response.success) {
//       setAuthToken(response.token); // Set the token in local storage
//       dispatch(setUser(response.user)); // Dispatch action to set user
//     } else {
//       console.error(response.message); // Handle login failure
//     }
//   });
// };

// export const register = createAsyncThunk('auth/register', async (userData) => { 
//   const response = await api.post('/auth/register', userData);
//   return response.data;
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setUser(state, action) {
//       state.user = action.payload; // Set user in state
//     },
//     logout(state) {
//       state.user = null;
//       removeAuthToken();
//     },
//   },
// });

// export const { logout, setUser } = authSlice.actions; // Export setUser action
// export default authSlice.reducer;




export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    console.log('credentials in login slice',credentials)
    console.log('login in authsllice called')
    try {
      // const navigate = useNavigate();
      //you cannot use useNavigate() inside an async thunk because React hooks must be used inside functional components.
      // The login issue arises because useNavigate is incorrectly used inside the login async thunk (React hooks cannot be used outside components), and navigation occurs prematurely in the component.
      // const response = await axios.post('http://localhost:4000/api/auth/login', credentials);
      const response = await axios.post('http://localhost:4000/api/auth/login', credentials, {
        withCredentials: true, // Send cookies with request
      });
      // Cookies.set("authToken", response.data.token, { expires: 7 });
      console.log('response object inside login slice',response);
        console.log('token form response in login slice',response.data.token);
      // localStorage.setItem('token', response.data.token);
      // setAuthToken(response.data.token)
      console.log('logged in sucesful')
      alert('logged in succesfully!')
      window.location.reload();

      // Navigate('/')  this is not workign 
      return response.data;
    } catch (error) {
      console.log('error in login slice')
      console.log('error in login slice object',error.response.data)
      console.error('Login Error: messaage', error.response.data.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      alert('Registration succesful , Proceed to login');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token:null,
    loading: false,
    error: null
  },
   reducers: {
        setUser(state, action) {
          state.user = action.payload; // Set user in state
        },
        // setToken(state,action){
        //   state.token = action.payload;
        // },
        logout(state) {
          console.log('inside logout of slice')
          state.user = null;
          state.token= null;
          // removeAuthToken();
          console.log('logged out sucesful')
          alert('logged out succesfully!')
          window.location.reload();
    
          console.log('user and token in slice of logout reducer inside authSlice',state.user,state.token)
        },},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        console.log('tonken and user in slice',state.token,state.user)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('in login rejected slice add case')
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout ,setToken} = authSlice.actions;
export default authSlice.reducer;