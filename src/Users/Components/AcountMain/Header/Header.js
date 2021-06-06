import { Redirect } from 'react-router';
import styles from './Header.module.css';
import {selectAuthentication, logout} from '../../../../Store/AuthenticationSlice';
import {reset as resetAnncouncements} from '../../../../Store/AnncouncementsSlice';
import {reset as resetCourses} from '../../../../Store/CoursesSlice';
import {reset as resetMessages} from '../../../../Store/MessagesSlice';
import {reset as resetStudentList} from '../../../../Store/StudentListSlice';
//import {rootReducer} from '../../../../Store/Store';
import {useSelector, useDispatch} from 'react-redux';
import {
    STATUS_SUCCEEDED, 
    LINK_LOGIN
} from '../../../../Constants' 



const Header = ({hamburgerClickHandler}) => {
    //const authenticationState = useSelector(selectAuthentication);
    const dispatch = useDispatch();

    const logoutHandler = (event) => {
        dispatch(logout());
        dispatch(resetAnncouncements());
        dispatch(resetCourses());
        dispatch(resetMessages());
        dispatch(resetStudentList());
    };

    return (
        <header className={styles.main_header}>

            <div className={styles.main_header_content}>
                <img className={styles.hamburger} onClick={hamburgerClickHandler} src="/images/hamburger.svg" alt="sidebar" />
                <div className={styles.spacer_hamburger_logo}></div>
                <h1 className='font0 bold'>College Gate</h1>
                <div className={styles.spacer_logo_logout}></div>
                <img className={styles.logout} src="/images/log-out.svg" alt="log out" onClick={logoutHandler}/>
            </div>
        </header>
    );
}
 
export default Header;