import styles from './CourseAvatar.module.css';

const CourseAvatar = ({imgSrc, courseTitle, profName}) => {
    return (
        <div className={styles.course_avatar}>
            <img className={styles.avatar_img} src={imgSrc} alt="Course avatar" />
            <div className={styles.avatar_text_column}>
                <p className={`font2 ${styles.column_text}`}>{courseTitle}</p>
                <p className={`font2 ${styles.column_text}`}>{profName}</p>
            </div>
        </div>
    );
}
 
export default CourseAvatar;