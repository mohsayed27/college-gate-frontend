import {configureStore} from '@reduxjs/toolkit'
import coursesReducer from './CoursesSlice'
import messagesReducer from './MessagesSlice'

export default configureStore({
    reducer: {
        courses: coursesReducer, 
        messages: messagesReducer
    }
});