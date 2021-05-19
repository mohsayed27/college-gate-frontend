import styles from './Header.module.css'

const Header = ({hamburgerClickHandler}) => {


    return (
        <header className={styles.main_header}>
            <div className={styles.main_header_content}>
                <img className={styles.hamburger} onClick={hamburgerClickHandler} src="/images/hamburger.svg" alt="sidebar" />
                <div className={styles.spacer_hamburger_logo}></div>
                <h1>College Gate</h1>
                <div className={styles.spacer_logo_logout}></div>
                <a href='/'><img src="/images/log-out.svg" alt="log out" /></a>
            </div>
        </header>
    );
}
 
export default Header;