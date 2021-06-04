import AccountMain from "./Components/AcountMain/AccountMain";
import DummyPlaceholder from "../DummyPlaceholder";
import {
    LINK_STUDENT, 
    LINK_HOME, 
    LINK_COURSES, 
    LINK_COMPLAINTS, 
    LINK_WARNINGS
} from '../Constants'

const Student = () => {

    const navItemsAndComponents = [{text:'Home',        link:LINK_STUDENT + LINK_HOME,       exactLink:true, component:<DummyPlaceholder text='home'/>, id:0}, 
                                    {text:'Courses',    link:LINK_STUDENT + LINK_COURSES,    exactLink:true, component:<DummyPlaceholder text='courses'/>, id:1}, 
                                    {text:'Warnings',   link:LINK_STUDENT + LINK_WARNINGS,   exactLink:true, component:<DummyPlaceholder text='warnings'/>, id:2},
                                    {text:'Complaints', link:LINK_STUDENT + LINK_COMPLAINTS, exactLink:true, component:<DummyPlaceholder text='complaints'/>, id:3}];

    const additionalComponents = [/*{link:LINK_STUDENT + LINK_COURSE, exactLink:false, component:<CoverTabsContent/>, id:4}*/]


    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={additionalComponents}/>
    );
}
 
export default Student;