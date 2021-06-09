import CoverTabsContent from "../CoverTabsContent/CoverTabsContent";
import styles from './Course.module.css'
import DummyPlaceholder from "../../../DummyPlaceholder";
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
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
    LINK_COURSE_MESSAGES, 
    LINK_COURSE_MESSAGES_RECEIVED, 
    LINK_COURSE_MESSAGES_SENT, 
    LINK_COURSE_MESSAGES_SEND,
    MESSAGES_COMPONENT_TYPE_MESSAGES, 
    LINK_COURSE_MESSAGES_VIEW
} from '../../../Constants'
import AnnouncementList from '../AnnouncementList/AnnouncementList';

const Course = ({canPost, userLink, sendMessageShowStudentList, match, showCourseKey}) => {
    
    const courses = useSelector(selectAllCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log("onMount");
        //console.log(match);
        if (courses.status !== STATUS_SUCCEEDED) {
            dispatch(fetchAllCourses());
        }
    }, []);

    let pathParams = useParams();

    const courseId = pathParams.courseId;
    let course;
    let professor;
    if (courses.status === STATUS_SUCCEEDED) {
        course = courses.courses.find(course => course.id === courseId);
        //console.log(courses);
        professor = course.professor;
    }

    const messagesComponent = <Messages 
                                userLink={userLink} type={MESSAGES_COMPONENT_TYPE_MESSAGES} sendMessageShowStudentList={sendMessageShowStudentList}
                                subjectAltText="Subject"
                                receivedAltText="Received"      receivedRoutePath={userLink+LINK_COURSE_MESSAGES_RECEIVED}  receivedExactPath={true}   receivedLink={userLink+LINK_COURSE_MESSAGES_RECEIVED.replace(':courseId', courseId)}
                                sentAltText="Sent"              sentRoutePath={userLink+LINK_COURSE_MESSAGES_SENT}          sentExactPath={true}       sentLink={userLink+LINK_COURSE_MESSAGES_SENT.replace(':courseId', courseId)}
                                sendAltText="Send a message"    sendRoutePath={userLink+LINK_COURSE_MESSAGES_SEND}          sendExactPath={true}       sendLink={userLink+LINK_COURSE_MESSAGES_SEND.replace(':courseId', courseId)}
                                messageViewerRoutePath={userLink+LINK_COURSE_MESSAGES_VIEW} messmessageViewerExactPath={false}
                              />;

    const announcementListComponent = <AnnouncementList 
                                        canPost={canPost}
                                        allCourses={false} 
                                        courseId={courseId}
                                      />

    console.log("showCourseKey: ", showCourseKey ? courseId : undefined);

    return (
        <div className={styles.course}>
            
            {courses.status === STATUS_LOADING && <p className="font2 bold">Loading...</p>}

            {
                courses.status === STATUS_SUCCEEDED &&
                <CoverTabsContent 
                    coverImgSrc={course.imgUrl} 
                    avatarComponent={<CourseAvatar imgSrc={professor.imgUrl} courseTitle={course.name} profName={professor.name} courseKey={showCourseKey ? course.key : undefined}/>}
                    tabsAndComponents={[
                        {iconImgSrc:'/logo192.png', text:'Announcements', routePath:userLink+LINK_COURSE_ANNOUNCEMENTS,      exactPath:false, link:userLink+LINK_COURSE_ANNOUNCEMENTS.replace(':courseId', courseId),   component:announcementListComponent, id:0},
                        /*{iconImgSrc:'/logo192.png', text:'Grades',        routePath:userLink+LINK_COURSE_GRADES,             exactPath:false, link:userLink+LINK_COURSE_GRADES.replace(':courseId', courseId),          component:<DummyPlaceholder text='grades'/>, id:1}*/,
                        {iconImgSrc:'/logo192.png', text:'Messages',      routePath:userLink+LINK_COURSE_MESSAGES,           exactPath:false, link:userLink+LINK_COURSE_MESSAGES.replace(':courseId', courseId), component:messagesComponent, id:2},
                    ]}
                    additionalComponents={[]}
                />
            }
            
        </div>    
    );
};
 
export default Course;