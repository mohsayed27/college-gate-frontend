import {combineReducers, configureStore} from '@reduxjs/toolkit'
import coursesReducer from './CoursesSlice'
import messagesReducer from './MessagesSlice'
import authenticationReducer from './AuthenticationSlice'
import announcementsReducer from './AnncouncementsSlice'
import studentListReducer from './StudentListSlice'
import gradesReducer from './GradesSlice'

export const appReducer = combineReducers({
    courses: coursesReducer, 
    messages: messagesReducer, 
    authentication: authenticationReducer, 
    announcements: announcementsReducer, 
    studentList: studentListReducer, 
    grades: gradesReducer
});

const store = configureStore({
    reducer: appReducer
    /*(state, action) => {
        //console.log(action);
        if (action.type === "authentication/logout") {
            //console.log("HERE!!");
            return appReducer(undefined, action);
        }
        return appReducer(state, action);
    }*/
});

//console.log(store);

export default store;