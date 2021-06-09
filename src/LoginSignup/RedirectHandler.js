import {useSelector, useDispatch} from 'react-redux';
import {Redirect, useLocation} from 'react-router-dom';
import {selectAuthentication, loadAuthenticationStateCookie} from '../Store/AuthenticationSlice'
import {
    STATUS_SUCCEEDED, 
    AUTHENTICATION_STATE_KEY, 
    AUTHENTICATION_TYPE_LOGIN, 
    USER_TYPE_STUDENT, 
    USER_TYPE_PROFESSOR, 
    LINK_STUDENT, 
    LINK_PROFESSOR,
    BASE_URL, 
    LINK_EMPLOYEE
} from '../Constants'

const RedirectHandler = ({redirectToHome=true}) => {
    const authenticationState = useSelector(selectAuthentication);
    const dispatch = useDispatch();
    let location = useLocation();

    let redirect = false;
    let redirectLink = '';

    if (localStorage.getItem(AUTHENTICATION_STATE_KEY) !== null && 
        authenticationState.status !== STATUS_SUCCEEDED) {
        dispatch(loadAuthenticationStateCookie())
    }

    if (authenticationState.status === STATUS_SUCCEEDED) {

        if (authenticationState.authenticationType === AUTHENTICATION_TYPE_LOGIN) {
            switch (authenticationState.userType) {
                case USER_TYPE_STUDENT:
                    if (!location.pathname.includes(LINK_STUDENT)){
                        redirect = true;
                        redirectLink = LINK_STUDENT;
                    }
                    break;
                case USER_TYPE_PROFESSOR:
                    //console.log(location.pathname);
                    if (!location.pathname.includes(LINK_PROFESSOR)){
                        redirect = true;
                        redirectLink = LINK_PROFESSOR;
                    }
                    break;
                default: //USER_TYPE_EMPLOYEE
                    if (!location.pathname.includes(LINK_EMPLOYEE)){
                        redirect = true;
                        redirectLink = LINK_EMPLOYEE;
                    }
                    break;
            }
        }
    } else {
        if (redirectToHome) {
            redirect = true;
            redirectLink = '/';
        }
    }

    if (redirect)
        console.log("Redirecting: ", redirectLink);

    return (
        <div>
            {redirect && <Redirect to={redirectLink}/>}
        </div>
    );
}
 
export default RedirectHandler;