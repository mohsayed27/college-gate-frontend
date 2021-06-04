import {configureStore} from '@reduxjs/toolkit'
import coursesReducer from './CoursesSlice'
import messagesReducer from './MessagesSlice'
import authenticationReducer from './AuthenticationSlice'

export default configureStore({
    reducer: {
        courses: coursesReducer, 
        messages: messagesReducer, 
        authentication: authenticationReducer
    }
});