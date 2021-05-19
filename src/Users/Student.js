import AccountMain from "./AcountMain/AccountMain";
import Placeholder from "../Placeholder";

const Student = () => {

    const navItemsAndComponents = [{text:'Home', link:'/student/home', component:<Placeholder text='home'/>, id:0}, 
                                    {text:'Courses', link:'/student/courses', component:<Placeholder text='courses'/>, id:1}, 
                                    {text:'Warnings', link:'/student/warnings', component:<Placeholder text='warnings'/>, id:2},
                                    {text:'Complaints', link:'/student/complaints', component:<Placeholder text='complaints'/>, id:3}];

    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents}/>
    );
}
 
export default Student;