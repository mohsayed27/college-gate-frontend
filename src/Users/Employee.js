import {
    LINK_COMPLAINTS,
    LINK_COMPLAINTS_RECEIVED,
    LINK_EMPLOYEE, 
    LINK_EMPLOYEE_HOME
} from '../Constants'
import {useLocation, Redirect} from 'react-router-dom'
import DummyPlaceholder from '../DummyPlaceholder';
import AccountMain from "./Components/AcountMain/AccountMain";
import EmployeeComplaints from './Components/EmployeeComplaints/EmployeeComplaints';

const Employee = () => {

    let location = useLocation();

    const navItemsAndComponents = [
        {text:'Complaints', link:LINK_EMPLOYEE_HOME, exactLink:false, component:<EmployeeComplaints/>, id:0}
    ];

    if (location.pathname === LINK_EMPLOYEE)
        return <Redirect to={LINK_EMPLOYEE_HOME}/>;

    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={[]}/>
    );
}
 
export default Employee;