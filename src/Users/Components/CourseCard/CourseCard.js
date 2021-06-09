import styles from './CourseCard.module.css'
import {Link} from 'react-router-dom'
import {LINK_COURSE_ANNOUNCEMENTS} from '../../../Constants'

const CourseCard = ({courseId, coverImgSrc, profImgSrc, courseTitle, professorName, userLink}) => {
    return (
        <Link className="course_card" to={`${userLink}${LINK_COURSE_ANNOUNCEMENTS}`.replace(':courseId', courseId)}>
            
            <img className={styles.course_cover} src={coverImgSrc} alt="Course image" />

            <div className={styles.card_content}>
                
                <img className={styles.prof_img} src={profImgSrc} alt="Professor image" />

                <div className={styles.text_content}>
                    <p className='font2'>{courseTitle}</p>
                    <div className={styles.text_content_spacer}/>
                    <p className='font2'>{professorName}</p>
                </div>

            </div>
        </Link>
    );
}
 
export default CourseCard;