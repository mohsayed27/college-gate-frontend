import AccountMain from "./Components/AcountMain/AccountMain";
import DummyPlaceholder from "../DummyPlaceholder";
import {
    LINK_STUDENT, 
    LINK_HOME, 
    LINK_COURSES,
    LINK_COURSE,  
    LINK_COMPLAINTS, 
    LINK_WARNINGS, 
    LINK_ANNOUNCEMENTS,
    ENROLL,
    LINK_STUDENT_HOME, 
    MESSAGES_COMPONENT_TYPE_COMPLAITNS,
    LINK_COMPLAINTS_SENT, 
    LINK_COMPLAINTS_RECEIVED,
    LINK_COMPLAINTS_SEND,
    LINK_COMPLAINTS_VIEW
} from '../Constants'
import AnnouncementList from './Components/AnnouncementList/AnnouncementList'
import CourseList from './Components/CourseList/CourseList'
import Course from './Components/Course/Course'
import {useLocation, Redirect} from 'react-router-dom'
import Messages from "./Components/Messages/Messages";


const Student = () => {

    const announcementListComponent = <AnnouncementList 
                                        allCourses={true}
                                        canPost={false}
                                      />

    const complaintsComponent = <Messages
                                    userLink={LINK_STUDENT} type={MESSAGES_COMPONENT_TYPE_COMPLAITNS} sendMessageShowStudentList={false}
                                    subjectAltText="Subject"
                                    receivedAltText="Responses"     receivedRoutePath={LINK_STUDENT + LINK_COMPLAINTS_RECEIVED}   receivedExactPath={true}    receivedLink={LINK_STUDENT + LINK_COMPLAINTS_RECEIVED} 
                                    sentAltText="Sent"              sentRoutePath={LINK_STUDENT + LINK_COMPLAINTS_SENT}           sentExactPath={true}        sentLink={LINK_STUDENT + LINK_COMPLAINTS_SENT}
                                    sendAltText="Send a complaint"  sendRoutePath={LINK_STUDENT + LINK_COMPLAINTS_SEND}           sendExactPath={true}        sendLink={LINK_STUDENT + LINK_COMPLAINTS_SEND}
                                    messageViewerRoutePath={LINK_STUDENT + LINK_COMPLAINTS_VIEW} messmessageViewerExactPath={false}
                                    addPadding={true}
                                />;

    const navItemsAndComponents = [{text:'Announcements',link:LINK_STUDENT + LINK_ANNOUNCEMENTS,    exactLink:true, component:announcementListComponent, id:0}, 
                                    {text:'Courses',     link:LINK_STUDENT + LINK_COURSES,          exactLink:true, component:<CourseList createEnrollText={ENROLL} userLink={LINK_STUDENT} /*createEnrollLink={LINK_CREATE}*//>, id:1}, 
                                    /*{text:'Warnings',    link:LINK_STUDENT + LINK_WARNINGS,         exactLink:true, component:<DummyPlaceholder text='warnings'/>, id:2}*/,
                                    {text:'Complaints',         link:LINK_STUDENT + LINK_COMPLAINTS,         exactLink:false, component:complaintsComponent,        id:2}];

    const additionalComponents = [
        {link:LINK_STUDENT + LINK_COURSE, exactLink:false, component:<Course canPost={false} userLink={LINK_STUDENT} sendMessageShowStudentList={false} showCourseKey={false}/>, id:3}
    ]

    let location = useLocation();

    if (location.pathname === LINK_STUDENT)
        return <Redirect to={LINK_STUDENT_HOME}/>;


    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={additionalComponents}/>
    );
}
 
export default Student;