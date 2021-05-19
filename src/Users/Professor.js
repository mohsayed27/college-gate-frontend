import AccountMain from "./AcountMain/AccountMain";
import Placeholder from "../Placeholder";

const Professor = () => {

    const navItemsAndComponents = [{text:'Messages Overview', link:'/professor/messagesoverview', component:<Placeholder text='messagesoverview'/>, id:0}, 
                                    {text:'Courses', link:'/professor/courses', component:<Placeholder text='courses'/>, id:1}, 
                                    {text:'Complaints', link:'/professor/complaints', component:<Placeholder text='complaints'/>, id:2}];

    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents}/>
    );
}
 
export default Professor;