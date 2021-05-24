import CourseCard from '../CourseCard/CourseCard'
import CreateEnrollCourseCard from '../CourseCard/CreateEnrollCourseCard'
import styles from './CourseList.module.css'

const CourseList = ({createEnrollText}) => {
    return (
        <div className={styles.course_list}>
            <CourseCard 
                coverImgSrc='/logo512.png' 
                courseTitle='Course Title' 
                profImgSrc='/logo512.png'
                professorName='Professor Name'
            />

            <CreateEnrollCourseCard createEnrollText={createEnrollText}/>
        </div>
    );
}
 
export default CourseList;