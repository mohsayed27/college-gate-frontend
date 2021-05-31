import {useLocation, Link} from 'react-router-dom'
import styles from './Tab.module.css'

const Tab = ({iconImgSrc, text, link}) => {
    
    let style = styles.tab;
    if (useLocation().pathname.includes(link)) {
        style = `${styles.tab} ${styles.tab_selected}`;
    } else {
        style = styles.tab;
    }

    return (
        <Link className={style} to={link}>
            <img className={styles.tab_img} src={iconImgSrc} alt="Tab icon" />
            <p className="font2">{text}</p>
        </Link>
    );
}
 
export default Tab;