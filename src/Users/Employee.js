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
import {selectAuthentication} from '../Store/AuthenticationSlice';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const Employee = () => {

    const authenticationState = useSelector(selectAuthentication);

    let location = useLocation();

    const navItemsAndComponents = [
        {text:'Complaints', link:LINK_EMPLOYEE_HOME, exactLink:false, component:<EmployeeComplaints/>, id:0}
    ];

    const [keys, setKeys] = useState({student:'', professor:''});

    useEffect(() => {
        if (authenticationState.userInfo.user) {
            //console.log("HERE");
            setKeys({student:`${authenticationState.userInfo.user.studentKey}`, professor: `${authenticationState.userInfo.user.professorKey}`});
        }
    }, [authenticationState]);

    let keysComponent = <p className="font2">Student key: <b>{keys.student}</b> <br /> Professor key: <b>{keys.professor}</b> <br /></p>;

    if (location.pathname === LINK_EMPLOYEE)
        return <Redirect to={LINK_EMPLOYEE_HOME}/>;

    console.log(authenticationState);

    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={[]} 
                    additionalSidebarComponent={keysComponent}/>
    );
}
 
export default Employee;