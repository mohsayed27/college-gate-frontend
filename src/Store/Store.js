import {configureStore} from '@reduxjs/toolkit'
import coursesReducer from './CoursesSlice'
import messagesReducer from './MessagesSlice'
import authenticationReducer from './AuthenticationSlice'
import announcementsReducer from './AnncouncementsSlice'

export default configureStore({
    reducer: {
        courses: coursesReducer, 
        messages: messagesReducer, 
        authentication: authenticationReducer, 
        announcements: announcementsReducer
    }
});