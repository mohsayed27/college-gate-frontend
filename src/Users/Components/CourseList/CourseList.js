import CourseCard from '../CourseCard/CourseCard'
import CreateEnrollCourseCard from '../CourseCard/CreateEnrollCourseCard'
import styles from './CourseList.module.css'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllCourses, selectAllCourses} from '../../../Store/CoursesSlice'
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED} from '../../../Constants'

const CourseList = ({createEnrollText, userLink}) => {
    const courses = useSelector(selectAllCourses);

    const dispatch = useDispatch();

    useEffect(() => {
        //console.log("onMount");
        if (courses.status !== STATUS_SUCCEEDED) {
            dispatch(fetchAllCourses());
        }
    }, []);


    return (
        <div className={styles.course_list}>
            {courses.status === STATUS_LOADING && <p className='font2 bold'>Loading...</p>}
            {
                courses.status === STATUS_SUCCEEDED &&
                courses.courses.map(
                    course => (
                        <CourseCard
                            key={course.Course_id}
                            courseId={course.Course_id}
                            coverImgSrc={course.Image_url}
                            courseTitle={course.Name}
                            profImgSrc={course.Professor.ImgUrl}
                            professorName={course.Professor.Name}
                            userLink={userLink}
                        />
                    )
                )
            }

            <CreateEnrollCourseCard createEnrollText={createEnrollText}/>
        </div>
    );
}
 
export default CourseList;