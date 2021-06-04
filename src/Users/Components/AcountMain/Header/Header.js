import { Redirect } from 'react-router';
import styles from './Header.module.css';
import {selectAuthentication, logout} from '../../../../Store/AuthenticationSlice';
import {useSelector, useDispatch} from 'react-redux';
import {
    STATUS_SUCCEEDED, 
    LINK_LOGIN
} from '../../../../Constants' 



const Header = ({hamburgerClickHandler}) => {
    const authenticationState = useSelector(selectAuthentication);
    const dispatch = useDispatch();

    const logoutHandler = (event) => {
        dispatch(logout());
    };

    return (
        <header className={styles.main_header}>

            {authenticationState.status !== STATUS_SUCCEEDED &&
                <Redirect to={LINK_LOGIN}/>
            }

            <div className={styles.main_header_content}>
                <img className={styles.hamburger} onClick={hamburgerClickHandler} src="/images/hamburger.svg" alt="sidebar" />
                <div className={styles.spacer_hamburger_logo}></div>
                <h1 className='font0 bold'>College Gate</h1>
                <div className={styles.spacer_logo_logout} onClick={logoutHandler}></div>
                <a href='/'><img src="/images/log-out.svg" alt="log out" /></a>
            </div>
        </header>
    );
}
 
export default Header;