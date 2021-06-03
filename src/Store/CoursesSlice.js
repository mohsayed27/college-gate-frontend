import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {BASE_URL, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED} from '../Constants'

export const fetchAllCourses = createAsyncThunk(
    'courses/fetchAllCourses', 
    async () => {
        //console.log('fetchAllCourses thunk');
        const data = await apiRequest(BASE_URL+'api/v1/course/all', {Authorization: 'Bearer ' + 'token'});
        //console.log("Courses data:", data);
        return data;
    }
)

/*export const fetchCourseById = createAsyncThunk(
    'courses/fetchCourseById', 
    async () => {
        //console.log('fetchAllCourses thunk');
        const data = await apiRequest('api/v1/course/all', {Authorization: 'Bearer ' + 'token'});
        return data;
    }
)*/

export const coursesSlice = createSlice({
    name: 'courses', 
    initialState: {
        courses: [], 
        status: STATUS_IDLE, 
        error: null // string | null
    }, 
    reducers: {
        /*fetchAllCourses: state => {
            
        }, 
        fetchCourseById: (state, id) => {
            
        }*/
    }, 
    extraReducers: {
        [fetchAllCourses.fulfilled]: (state, action) => {
            state.status = STATUS_SUCCEEDED;
            //console.log(action);
            state.courses = action.payload.courses;
        }, 
        [fetchAllCourses.pending]: (state) => {
            state.status = STATUS_LOADING
        }, 
        [fetchAllCourses.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
            //console.log(action.error);
        }
    }
});

//export const {fetchAllCourses, fetchCourseById} = coursesSlice.actions;

export const selectAllCourses = state => state.courses;
export const selectCourseById = (state, courseId) => state.courses.find(
                                    course => course.id === courseId
                                );

export default coursesSlice.reducer;

