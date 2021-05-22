import {createSlice} from '@reduxjs/toolkit'

export const coursesSlice = createSlice({
    name: 'courses', 
    initialState: {
        courses: [], 
        status: 'idle', 
        error: null
    }, 
    reducers: {
        fetchAllCourses: state => {
            
        }, 
        fetchCourseById: (state, action) => {
            
        }
    }
});

export const {fetchAllCourses, fetchCourseById} = coursesSlice.actions;

export const selectAllCourses = state => state.courses;
export const selectCourseById = (state, courseId) => state.courses.find(
                                    course => course.id === courseId
                                );

export default coursesSlice.reducer;

