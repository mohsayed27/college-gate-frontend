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
    CREATE
} from '../Constants'

const Professor = () => {

    const navItemsAndComponents = [/*{text:'Messages Overview',   link:LINK_PROFESSOR + LINK_MESSAGES_OVERVIEW,  exactLink:true, component:<DummyPlaceholder text='messagesoverview'/>,  id:0}, */
                                    {text:'Courses',            link:LINK_PROFESSOR + LINK_COURSES,            exactLink:false, component:<CourseList createEnrollText={CREATE} userLink={LINK_PROFESSOR} /*createEnrollLink={LINK_CREATE}*//>,      id:1}, 
                                    /*{text:'Complaints',         link:LINK_PROFESSOR + LINK_COMPLAINTS,         exactLink:true, component:<DummyPlaceholder text='complaints'/>,        id:2}*/];

    
    const additionalComponents = [
        {link:LINK_PROFESSOR + LINK_COURSE, exactLink:false, component:<Course userLink={LINK_PROFESSOR} sendMessageShowStudentList={true} showCourseKey={true}/>, id:3}, 
    ];
    
    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={additionalComponents}/>
    );
}
 
export default Professor;