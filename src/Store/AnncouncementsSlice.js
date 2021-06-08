import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiRequest} from '../API';
import {
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_FAILED, 
    STATUS_SUCCEEDED,
    BASE_URL, 
    METHOD_GET,
    METHOD_POST,
    AUTHENTICATION_STATE_KEY
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
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`

        }
        const data = await apiRequest(path, METHOD_GET, headers);
        return data;
    }
);

export const postAnnouncement = createAsyncThunk(
    'announcements/postAnnouncement', 
    // params = {courseId:courseId, content:String}
    async (params) => {
        let path = BASE_URL + `/api/v1/announcement/me/course/${params.courseId}`;

        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`

        }
        //console.log(JSON.stringify(params.content));
        const postData = {
            content:params.content
        };
        const data = await apiRequest(path, METHOD_POST, headers, JSON.stringify(postData));
        return data;
    }
);


const initialState = {
    items: [], 
    allCourses: true, // false=individualCourse
    courseId: '',
    status: STATUS_IDLE,
    error: null, 

    newAnnouncement: {
        item:{}, 
        status: STATUS_IDLE,
        error: null
    }
}

export const announcementsSlice = createSlice({
    name: 'announcements', 
    initialState: initialState,
    reducers: {
        returnNewAnnouncementToIdle: (state) => {
            state.newAnnouncement.status = STATUS_IDLE;
            //console.log(state.newAnnouncement.status);
        }, 
        reset: (state) => {
            state.status = STATUS_IDLE;
            state.newAnnouncement.status = STATUS_IDLE;
        }
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
        }, 


        [postAnnouncement.fulfilled]: (state, action) => {
            //const params = action.meta.arg;
            const receivedData = action.payload;

            state.newAnnouncement.status = STATUS_SUCCEEDED;
            state.newAnnouncement.item = receivedData;
            state.items.unshift(receivedData);

            //console.log("FULFILLED...");
            //console.log(state.items);
        }, 
        [postAnnouncement.pending]: (state, action) => {
            state.newAnnouncement.status = STATUS_LOADING;
            //console.log("LOADING...");

        }, 
        [postAnnouncement.rejected]: (state, action) => {
            state.newAnnouncement.status = STATUS_FAILED;
            state.newAnnouncement.error = action.error;
        }, 
    }
});

export const {returnNewAnnouncementToIdle, reset} = announcementsSlice.actions;

export const selectAnnouncements = state => state.announcements;

export default announcementsSlice.reducer;