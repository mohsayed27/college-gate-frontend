import styles from './CourseCard.module.css'
import {Link} from 'react-router-dom'

const CreateEnrollCourseCard = ({createEnrollText, link, createEnrollCardClickHandler}) => {
    return (
        //<Link to={link} className={`no_text_decoration ${styles.course_card} ${styles.create_enroll_course_card}`}>
        <div className={`pointer no_text_decoration ${styles.course_card} ${styles.create_enroll_course_card}`} onClick={createEnrollCardClickHandler}>
        
            <div className={styles.create_enroll_course_card_spacer}/>

            <img className={styles.plus} src='/images/plus.svg' alt='Plus'/>
            <p className={`font2 center_text ${styles.create_enroll_course_card_text}`}>{createEnrollText}</p>
            
            <div className={styles.create_enroll_course_card_spacer}/>
        </div>
        //</Link>
    );
}
 
export default CreateEnrollCourseCard;