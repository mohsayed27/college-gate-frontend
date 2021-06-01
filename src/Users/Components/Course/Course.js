import CoverTabsContent from "../CoverTabsContent/CoverTabsContent";
import styles from './Course.module.css'
import DummyPlaceholder from "../../../DummyPlaceholder";
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllCourses, selectAllCourses} from '../../../Store/CoursesSlice';
import CourseAvatar from "./Avatar/CourseAvatar";
import {withRouter} from 'react-router-dom';
import Messages from '../Messages/Messages'
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
        //console.log(match);
        if (courses.status !== STATUS_SUCCEEDED) {
            dispatch(fetchAllCourses());
        }
    }, []);

    const courseId = match.params.id;
    let course;
    let professor;
    if (courses.status === STATUS_SUCCEEDED) {
        course = courses.courses.find(course => course.Course_id === courseId);
        professor = course.Professor;
    }


    return (
        <div className={styles.course}>
            
            {courses.status === STATUS_LOADING && <p className="font2 bold">Loading...</p>}

            {
                courses.status === STATUS_SUCCEEDED &&
                <CoverTabsContent 
                    coverImgSrc={course.Image_url} 
                    avatarComponent={<CourseAvatar imgSrc={professor.ImgUrl} courseTitle={course.Name} profName={professor.Name}/>}
                    tabsAndComponents={[
                        {iconImgSrc:'/logo192.png', text:'Announcements', routePath:userLink+LINK_COURSE_ANNOUNCEMENTS,      exactPath:false, link:userLink+LINK_COURSE_ANNOUNCEMENTS.replace(':id', courseId),     component:<DummyPlaceholder text='announcements'/>, id:0},
                        {iconImgSrc:'/logo192.png', text:'Grades',        routePath:userLink+LINK_COURSE_GRADES,             exactPath:false, link:userLink+LINK_COURSE_GRADES.replace(':id', courseId),            component:<DummyPlaceholder text='grades'/>, id:1},
                        {iconImgSrc:'/logo192.png', text:'Messages',      routePath:userLink+LINK_COURSE_MESSAGES_RECEIVED,  exactPath:false, link:userLink+LINK_COURSE_MESSAGES_RECEIVED.replace(':id', courseId), component:<Messages/>, id:2},
                    ]}
                    additionalComponents={[]}
                />
            }
            
        </div>    
    );
});
 
export default Course;