import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED, 
    STATUS_FAILED, 
    BASE_URL,
    USER_TYPE_STUDENT, 
    USER_TYPE_PROFESSOR, 
    USER_TYPE_EMPLOYEE, 
    API_DEPARTMENT, 
    METHOD_POST, 
    AUTHENTICATION_STATE_KEY,
    AUTHENTICATION_TYPE_LOGIN
} from '../Constants';

export const loginSignupRequest = createAsyncThunk(
    'authentication/loginSignup', 
    /*
    params = {
        userType: USER_TYPE_STUDENT | USER_TYPE_PROFESSOR | USER_TYPE_EMPLOYEE, 
        authenticationType: AUTHENTICATION_TYPE_LOGIN | AUTHENTICATION_TYPE_SIGNUP,
        body: {}
    }
    */
    async (params) => {
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + 'token'
        }
        let userType = (params.userType === USER_TYPE_EMPLOYEE) ? API_DEPARTMENT : params.userType;
        const data = await apiRequest(BASE_URL+`api/v1/user/${userType}/${params.authenticationType}`, METHOD_POST, headers, JSON.stringify(params.body));
        return data;
    }
);



/*
state: {
    userType: USER_TYPE_STUDENT | USER_TYPE_PROFESSOR | USER_TYPE_EMPLOYEE
    userInfo: {}
    status: STATUS_IDLE, 
    error: // string | null
}
*/

const initialState = {
    userType: '',
    userInfo: {},
    status: STATUS_IDLE, 
    error: null // string | null
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        loadAuthenticationStateCookie: state => {
            state = localStorage.getItem(AUTHENTICATION_STATE_KEY);
        }, 
        logout: state => {
            localStorage.removeItem(AUTHENTICATION_STATE_KEY);
            state = initialState;
        }
    }, 
    extraReducers: {
        [loginSignupRequest.fulfilled]: (state, action) => {
            const params = action.meta.arg;
            const receivedData = action.payload;
            
            state.userType = params.userType;
            state.userInfo = receivedData;
            state.status = STATUS_SUCCEEDED;
            if (params.authenticationType === AUTHENTICATION_TYPE_LOGIN)
                localStorage.setItem(AUTHENTICATION_STATE_KEY, JSON.stringify(state));
        }, 
        [loginSignupRequest.pending]: (state, action) => {
            state.status = STATUS_LOADING;
        }, 
        [loginSignupRequest.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }
    }
});

export const selectAuthentication = state => state.authentication;
export const {loadAuthenticationStateCookie, logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
