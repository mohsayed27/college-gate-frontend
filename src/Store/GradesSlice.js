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

export const fetchGradeList = createAsyncThunk(
    'grades/fetchGradeList', 
    // params = {courseId:id}
    async (params) => {
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        }
        const data = await apiRequest(BASE_URL+`/api/v1/quiz/all/course/${params.courseId}`, METHOD_GET, headers);
        return data;
    }
);

export const announceGrades = createAsyncThunk(
    'grades/announceGrades', 
    // params = {courseId:courseId, name: String, full_mark: Number, students: [id0, id1, ...], grades: [grade0, grade1, ...]}
    async (params) => {
        let path = BASE_URL + `/api/v1/quiz/course/${params.courseId}`;
        let body = {
            name:       params.name,
            full_mark:  params.full_mark,
            students:   params.students,
            grades:     params.grades
        };
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        }
        const data = await apiRequest(path, METHOD_POST, headers, JSON.stringify(body));
        return data;
    }
);

const initialState = {
    items: [],
    courseId: '',  
    status: STATUS_IDLE, 
    error: null, 

    newlyAnnouncedGrades: {
        item:{}, 
        courseId: '',  
        status: STATUS_IDLE, 
        error: null
    }
};

export const gradesSlice = createSlice({
    name: 'grades', 
    initialState: initialState, 
    reducers: {
        reset: (state) => {
            state.status = STATUS_IDLE;
            state.newlyAnnouncedGrades.status = STATUS_IDLE;
        }, 
        returnNewlyAnnouncedGradesToIdle: (state) => {
            state.newlyAnnouncedGrades.status = STATUS_IDLE;
        }
    }, 
    extraReducers: {
        [fetchGradeList.fulfilled]: (state, action) => {
            let params = action.meta.arg;
            let receievdData = action.payload;

            state.courseId = params.courseId;
            state.status = STATUS_SUCCEEDED;
            state.items = receievdData.items;

        }, 
        [fetchGradeList.pending]: (state, action) => {
            state.status = STATUS_LOADING;
        }, 
        [fetchGradeList.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }, 


        [announceGrades.fulfilled]: (state, action) => {
            let params = action.meta.arg;
            let receievdData = action.payload;

            state.newlyAnnouncedGrades.courseId = params.courseId;
            state.newlyAnnouncedGrades.status = STATUS_SUCCEEDED;
            state.newlyAnnouncedGrades.item = receievdData;

            if (state.courseId === params.courseId)
                state.items.push(receievdData);
            
        }, 
        [announceGrades.pending]: (state, action) => {
            state.newlyAnnouncedGrades.status = STATUS_LOADING;
        }, 
        [announceGrades.rejected]: (state, action) => {
            state.newlyAnnouncedGrades.status = STATUS_FAILED;
            state.newlyAnnouncedGrades.error = action.error;
        }, 
    }
});

export const {reset, returnNewlyAnnouncedGradesToIdle} = gradesSlice.actions;

export const selectGrades = state => state.grades;

export default gradesSlice.reducer;
