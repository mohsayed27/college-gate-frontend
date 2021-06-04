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
    USER_STATE_KEY,
    AUTHENTICATION_TYPE_LOGIN
} from '../Constants';

export const loginSignup = createAsyncThunk(
    'authentication/login', 
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

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        userType: '',
        userInfo: {},
        status: STATUS_IDLE, 
        error: null // string | null
    },
    reducers: {

    }, 
    extraReducers: {
        [loginSignup.fulfilled]: (state, action) => {
            const params = action.meta.arg;
            const receivedData = action.payload;
            
            state.userType = params.userType;
            state.userInfo = receivedData;
            state.status = STATUS_SUCCEEDED;
            if (params.authenticationType === AUTHENTICATION_TYPE_LOGIN)
                localStorage.setItem(USER_STATE_KEY, JSON.stringify(state));
        }, 
        [loginSignup.pending]: (state, action) => {
            state.status = STATUS_LOADING;
        }, 
        [loginSignup.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }
    }
});

export const selectAuthentication = state => state.authentication;

export default authenticationSlice.reducer;
