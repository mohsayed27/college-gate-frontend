import CoverTabsContent from "../CoverTabsContent/CoverTabsContent";
import styles from './Course.module.css'
import DummyPlaceholder from "../../../DummyPlaceholder";
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllCourses, selectAllCourses} from '../../../Store/CoursesSlice';
import {withRouter} from 'react-router-dom'
import {
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED, 
    STATUS_FAILED, 
    LINK_COURSE_ANNOUNCEMENTS, 
    LINK_COURSE_GRADES, 
    LINK_COURSE_MESSAGES_RECEIVED
} from '../../../Constants'

const Course = withRouter(({userLink, match}) => {
    
    const courses = useSelector(selectAllCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log("onMount");
        if (courses.status !== 'succeeded') {
            dispatch(fetchAllCourses());
        }
    }, []);

    const courseId = match.params.id;

    return (
        <div className={styles.course}>
            
            {courses.status === STATUS_LOADING && <p className="font2 bold">Loading...</p>}

            {
                courses.status === STATUS_SUCCEEDED &&
                <CoverTabsContent 
                    coverImgSrc={courses.courses.find(course => course.Course_id === courseId).Image_url} 
                    tabsAndComponents={[
                        {iconImgSrc:'/logo192.png', text:'Announcements', link:userLink+LINK_COURSE_ANNOUNCEMENTS.replace(':id', courseId),     exactLink:false, component:<DummyPlaceholder text='announcements'/>, id:0},
                        {iconImgSrc:'/logo192.png', text:'Grades',        link:userLink+LINK_COURSE_GRADES.replace(':id', courseId),            exactLink:false, component:<DummyPlaceholder text='grades'/>, id:1},
                        {iconImgSrc:'/logo192.png', text:'Messages',      link:userLink+LINK_COURSE_MESSAGES_RECEIVED.replace(':id', courseId), exactLink:false, component:<DummyPlaceholder text='messagesreceived'/>, id:2},
                    ]}
                    additionalComponents={[]}
                />
            }
            
        </div>    
    );
});
 
export default Course;