import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {BASE_URL, 
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED, 
    STATUS_FAILED, 
    METHOD_GET, 
    AUTHENTICATION_STATE_KEY,
    METHOD_POST
} from '../Constants'

//import {store} from './Store';

export const fetchAllCourses = createAsyncThunk(
    'courses/fetchAllCourses', 
    async () => {
        //console.log('fetchAllCourses thunk');

        //console.log(store.getState());

        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        }
        const data = await apiRequest(BASE_URL+'/api/v1/course/all', METHOD_GET, headers);
        //console.log("Courses data:", data);
        return data;
    }
)

export const enrollIntoCourse = createAsyncThunk(
    'courses/enrollIntoCourse', 
    // params = {courseKey:courseKey}
    async (params) => {
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        }
        const data = await apiRequest(BASE_URL+`/api/v1/course/${params.courseKey}/enroll`, METHOD_POST, headers);
        return data;
    }
);

export const createCourse = createAsyncThunk(
    'courses/createCourse', 
    // params = {name:String, image:الله أعلم دلوقتى}
    async (params) => {
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        };
        let body = {
            name: params.name, 
            image: params.image
        };
        const data = await apiRequest(BASE_URL+`/api/v1/course/me`, METHOD_POST, headers, JSON.stringify(body));
        return data;
    }
);

/*export const fetchCourseById = createAsyncThunk(
    'courses/fetchCourseById', 
    async () => {
        //console.log('fetchAllCourses thunk');
        const data = await apiRequest('api/v1/course/all', {Authorization: 'Bearer ' + 'token'});
        return data;
    }
)*/

const initialState = {
    courses: [], 
    status: STATUS_IDLE, 
    error: null, // string | null

    createEnroll: {
        item: {}, 
        status: STATUS_IDLE, 
        error: null
    }
};

export const coursesSlice = createSlice({
    name: 'courses', 
    initialState: initialState, 
    reducers: {
        /*fetchAllCourses: state => {
            
        }, 
        fetchCourseById: (state, id) => {
            
        }*/
        returnCreateEnrollToIdle: (state) => {
            state.createEnroll.status = STATUS_IDLE;

        },
        reset: (state) => {
            state.status = STATUS_IDLE;
            state.createEnroll.state = STATUS_IDLE;
        }
    }, 
    extraReducers: {
        [fetchAllCourses.fulfilled]: (state, action) => {
            state.status = STATUS_SUCCEEDED;
            //console.log(action);
            state.courses = action.payload.items;
        }, 
        [fetchAllCourses.pending]: (state) => {
            state.status = STATUS_LOADING
        }, 
        [fetchAllCourses.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
            //console.log(action.error);
        }, 


        [enrollIntoCourse.fulfilled]: (state, action) => {
            let receivedData = action.payload;
            state.createEnroll.status = STATUS_SUCCEEDED;
            state.createEnroll.item = receivedData;
            state.courses.push(receivedData);
            console.log(state.courses);
        }, 
        [enrollIntoCourse.pending]: (state, action) => {
            state.createEnroll.status = STATUS_LOADING;
        }, 
        [enrollIntoCourse.rejected]: (state, action) => {
            state.createEnroll.status = STATUS_FAILED;
            state.createEnroll.error = action.error;
        },
        
        [createCourse.fulfilled]: (state, action) => {
            let receivedData = action.payload;
            state.createEnroll.status = STATUS_SUCCEEDED;
            state.createEnroll.item = receivedData;
            state.courses.push(receivedData);
        }, 
        [createCourse.pending]: (state, action) => {
            state.createEnroll.status = STATUS_LOADING;
        }, 
        [createCourse.rejected]: (state, action) => {
            state.createEnroll.status = STATUS_FAILED;
            state.createEnroll.error = action.error;
        },
    }
});

//export const {fetchAllCourses, fetchCourseById} = coursesSlice.actions;
export const {returnCreateEnrollToIdle, reset} = coursesSlice.actions;

export const selectAllCourses = state => state.courses;
export const selectCourseById = (state, courseId) => state.courses.find(
                                    course => course.id === courseId
                                );

export default coursesSlice.reducer;

