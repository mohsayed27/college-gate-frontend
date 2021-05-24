import AccountMain from "./Components/AcountMain/AccountMain";
import DummyPlaceholder from "../DummyPlaceholder";

const Professor = () => {

    const navItemsAndComponents = [{text:'Messages Overview', link:'/professor/messagesoverview', component:<DummyPlaceholder text='messagesoverview'/>, id:0}, 
                                    {text:'Courses', link:'/professor/courses', component:<DummyPlaceholder text='courses'/>, id:1}, 
                                    {text:'Complaints', link:'/professor/complaints', component:<DummyPlaceholder text='complaints'/>, id:2}];

    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents}/>
    );
}
 
export default Professor;