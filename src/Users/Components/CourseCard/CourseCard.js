import styles from './CourseCard.module.css'

const CourseCard = ({coverImgSrc, profImgSrc, courseTitle, professorName}) => {
    return (
        <div className={styles.course_card}>
            
            <img className={styles.course_cover} src={coverImgSrc} alt="Course image" />

            <div className={styles.card_content}>
                
                <img className={styles.prof_img} src={profImgSrc} alt="Professor image" />

                <div className={styles.text_content}>
                    <p className='font2'>{courseTitle}</p>
                    <div className={styles.text_content_spacer}/>
                    <p className='font2'>{professorName}</p>
                </div>

            </div>
        </div>
    );
}
 
export default CourseCard;