import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiRequest} from '../API';
import {
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_FAILED, 
    STATUS_SUCCEEDED,
    BASE_URL, 
    METHOD_GET
} from '../Constants';
//import {store} from './Store'


export const fetchAnnouncements = createAsyncThunk(
    'announcements/fetchAnnouncements', 

    // params = {allCourses: bool, courseId:courseId, limit:Number, offset:Number}
    async (params) => {
        let path;
        if (params.allCourses)
            path = BASE_URL + `/api/v1/announcement/?offset=${params.offset}&limit=${params.limit}`;
        else
            path = BASE_URL + `/api/v1/announcement/course/${params.courseId}?offset=${params.offset}&limit=${params.limit}`;

        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': 'Bearer '

        }
        const data = await apiRequest(path, METHOD_GET, headers);
        return data;
    }
);


const initialState = {
    items: [], 
    allCourses: true, // false=individualCourse
    courseId: '',
    status: STATUS_IDLE,
    error: null
}

export const announcementsSlice = createSlice({
    name: 'announcements', 
    initialState: initialState,
    reducers: {

    }, 
    extraReducers: {
        [fetchAnnouncements.fulfilled]: (state, action) => {
            const receivedData = action.payload;
            const params = action.meta.arg;

            state.status = STATUS_SUCCEEDED;
            state.allCourses = params.allCourses;
            state.courseId = params.courseId;

            receivedData.items.map(item => {
                state.items.push(item);
            });
        }, 
        [fetchAnnouncements.pending]: (state, action) => {
            state.status = STATUS_LOADING;
            if (action.meta.arg.offset === 0) {
                //console.log("Should clear");
                state.items = [] // clear
            }
        }, 
        [fetchAnnouncements.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }
    }
});

export const selectAnnouncements = state => state.announcements;

export default announcementsSlice.reducer;