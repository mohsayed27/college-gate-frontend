import AccountMain from "./Components/AcountMain/AccountMain";
import DummyPlaceholder from "../DummyPlaceholder";
import {
    LINK_STUDENT, 
    LINK_HOME, 
    LINK_COURSES, 
    LINK_COMPLAINTS, 
    LINK_WARNINGS, 
    LINK_ANNOUNCEMENTS
} from '../Constants'
import AnnouncementList from './Components/AnnouncementList/AnnouncementList'

const Student = () => {

    const announcementListComponent = <AnnouncementList 
                                        allCourses={true}
                                      />

    const navItemsAndComponents = [{text:'Announcements',link:LINK_STUDENT + LINK_ANNOUNCEMENTS,    exactLink:true, component:announcementListComponent, id:0}, 
                                    {text:'Courses',     link:LINK_STUDENT + LINK_COURSES,          exactLink:true, component:<DummyPlaceholder text='courses'/>, id:1}, 
                                    {text:'Warnings',    link:LINK_STUDENT + LINK_WARNINGS,         exactLink:true, component:<DummyPlaceholder text='warnings'/>, id:2},
                                    {text:'Complaints',  link:LINK_STUDENT + LINK_COMPLAINTS,       exactLink:true, component:<DummyPlaceholder text='complaints'/>, id:3}];

    const additionalComponents = [/*{link:LINK_STUDENT + LINK_COURSE, exactLink:false, component:<CoverTabsContent/>, id:4}*/]


    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={additionalComponents}/>
    );
}
 
export default Student;