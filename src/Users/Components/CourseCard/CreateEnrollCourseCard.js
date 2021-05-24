import styles from './CourseCard.module.css'

const CreateEnrollCourseCard = ({createEnrollText}) => {
    return (
        <div className={`${styles.course_card} ${styles.create_enroll_course_card}`}>
            <div className={styles.create_enroll_course_card_spacer}/>

            <img className={styles.plus} src='/images/plus.svg' alt='Plus'/>
            <p className={`font2 center_text ${styles.create_enroll_course_card_text}`}>{createEnrollText}</p>
            
            <div className={styles.create_enroll_course_card_spacer}/>
        </div>
    );
}
 
export default CreateEnrollCourseCard;