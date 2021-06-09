import styles from './PlusCard.module.css'
import {Link} from 'react-router-dom'

const PlusCard = ({text, clickHandler}) => {
    return (
        //<Link to={link} className={`no_text_decoration ${styles.course_card} ${styles.create_enroll_course_card}`}>
        <div className={`pointer no_text_decoration ${styles.plus_card} ${styles.clickHandler}`} onClick={clickHandler}>

            <img className={styles.plus} src='/images/plus.svg' alt='Plus'/>
            <p className={`font2 bold center_text no_margin`}>{text}</p>
            
        </div>
        //</Link>
    );
}
 
export default PlusCard;