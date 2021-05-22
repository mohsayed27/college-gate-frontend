import {configureStore} from '@reduxjs/toolkit'
import coursesReducer from './CoursesSlice'

export default configureStore({
    reducer: {
        courses: coursesReducer
    }
});