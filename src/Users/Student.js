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
    LINK_STUDENT_HOME
} from '../Constants'
import AnnouncementList from './Components/AnnouncementList/AnnouncementList'
import CourseList from './Components/CourseList/CourseList'
import Course from './Components/Course/Course'
import {useLocation, Redirect} from 'react-router-dom'


const Student = () => {

    const announcementListComponent = <AnnouncementList 
                                        allCourses={true}
                                        canPost={false}
                                      />

    const navItemsAndComponents = [{text:'Announcements',link:LINK_STUDENT + LINK_ANNOUNCEMENTS,    exactLink:true, component:announcementListComponent, id:0}, 
                                    {text:'Courses',     link:LINK_STUDENT + LINK_COURSES,          exactLink:true, component:<CourseList createEnrollText={ENROLL} userLink={LINK_STUDENT} /*createEnrollLink={LINK_CREATE}*//>, id:1}, 
                                    /*{text:'Warnings',    link:LINK_STUDENT + LINK_WARNINGS,         exactLink:true, component:<DummyPlaceholder text='warnings'/>, id:2},
                                      {text:'Complaints',  link:LINK_STUDENT + LINK_COMPLAINTS,       exactLink:true, component:<DummyPlaceholder text='complaints'/>, id:3}*/];

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