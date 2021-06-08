import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {BASE_URL, 
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED, 
    STATUS_FAILED, 
    METHOD_GET, 
    AUTHENTICATION_STATE_KEY
} from '../Constants'

export const fetchStudentList = createAsyncThunk(
    'studentList/fetchStudentList', 
    // params = {courseId:id}
    async (params) => {
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        }
        const data = await apiRequest(BASE_URL+`/api/v1/course/${params.courseId}/students`, METHOD_GET, headers);
        return data;
    }
);

const initialState = {
    items: [],
    courseId: '',  
    status: STATUS_IDLE, 
    error: null // string | null
};

export const studentListSlice = createSlice({
    name: 'studentList',
    initialState: initialState, 
    reducers: {
        reset: (state) => {
            state.status = STATUS_IDLE;
        }
    }, 
    extraReducers: {
        [fetchStudentList.fulfilled]: (state, action) => {
            let params = action.meta.arg;
            state.status = STATUS_SUCCEEDED;
            state.items = action.payload.items;
            state.courseId = params.courseId;
        }, 
        [fetchStudentList.pending]: (state, action) => {
            state.status = STATUS_LOADING;
        }, 
        [fetchStudentList.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }, 
    }
});

export const {reset} = studentListSlice.actions;

export const selectStudentList = state => state.studentList;

export default studentListSlice.reducer;