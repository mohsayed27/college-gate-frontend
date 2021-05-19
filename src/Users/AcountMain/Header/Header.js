import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.main_header}>
            <h1>College Gate</h1>
            <button>Log out</button>
        </header>
    );
}
 
export default Header;