import AccountMain from "./Components/AcountMain/AccountMain";
import DummyPlaceholder from "../DummyPlaceholder";
import CourseList from './Components/CourseList/CourseList'
import Course from './Components/Course/Course'
import {
    LINK_PROFESSOR, 
    LINK_MESSAGES_OVERVIEW, 
    LINK_COURSES, 
    LINK_COMPLAINTS, 
    LINK_COURSE,
    LINK_CREATE,
    CREATE,
    LINK_PROFESSOR_HOME,
    MESSAGES_COMPONENT_TYPE_COMPLAITNS,
    LINK_COMPLAINTS_SENT, 
    LINK_COMPLAINTS_RECEIVED,
    LINK_COMPLAINTS_SEND,
    LINK_COMPLAINTS_VIEW
} from '../Constants'
import {useLocation, Redirect} from 'react-router-dom'
import Messages from "./Components/Messages/Messages";

const Professor = () => {

    const complaintsComponent = <Messages
                                    userLink={LINK_PROFESSOR} type={MESSAGES_COMPONENT_TYPE_COMPLAITNS} sendMessageShowStudentList={false}
                                    subjectAltText="Subject"
                                    receivedAltText="Responses"     receivedRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_RECEIVED}   receivedExactPath={true}    receivedLink={LINK_PROFESSOR + LINK_COMPLAINTS_RECEIVED} 
                                    sentAltText="Sent"              sentRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_SENT}           sentExactPath={true}        sentLink={LINK_PROFESSOR + LINK_COMPLAINTS_SENT}
                                    sendAltText="Send a complaint"  sendRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_SEND}           sendExactPath={true}        sendLink={LINK_PROFESSOR + LINK_COMPLAINTS_SEND}
                                    messageViewerRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_VIEW} messmessageViewerExactPath={false}
                                    addPadding={true}
                                />;

    const navItemsAndComponents = [/*{text:'Messages Overview',   link:LINK_PROFESSOR + LINK_MESSAGES_OVERVIEW,  exactLink:true, component:<DummyPlaceholder text='messagesoverview'/>,  id:0}, */
                                    {text:'Courses',            link:LINK_PROFESSOR + LINK_COURSES,            exactLink:false, component:<CourseList createEnrollText={CREATE} userLink={LINK_PROFESSOR} /*createEnrollLink={LINK_CREATE}*//>,      id:1}, 
                                    {text:'Complaints',         link:LINK_PROFESSOR + LINK_COMPLAINTS,         exactLink:false, component:complaintsComponent,        id:2}];

    
    const additionalComponents = [
        {link:LINK_PROFESSOR + LINK_COURSE, exactLink:false, component:<Course canPost={true} userLink={LINK_PROFESSOR} sendMessageShowStudentList={true} showCourseKey={true}/>, id:3}, 
    ];

    let location = useLocation();

    if (location.pathname === LINK_PROFESSOR)
        return <Redirect to={LINK_PROFESSOR_HOME}/>;
    
    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={additionalComponents}/>
    );
}
 
export default Professor;