import styles from './AnnounceGrades.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useRouteMatch} from 'react-router-dom';
import {announceGrades, selectGrades} from '../../../../Store/GradesSlice';
import {selectStudentList, fetchStudentList} from '../../../../Store/StudentListSlice'
import {useState, useEffect} from 'react'
import {BASE_URL, 
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED, 
    STATUS_FAILED, 
} from '../../../../Constants'


const AnnounceGrades = ({}) => {

    const studentList = useSelector(selectStudentList);
    const dispatch = useDispatch();

    const grades = useSelector(selectGrades);

    const match = useRouteMatch();
    const courseId = match.params.courseId;

    const [examName, setExamName] = useState('');
    const [markedOf, setMarkedOf] = useState(0);
    const [gradeList, setGradeList] = useState([]);
    const [idList, setIdList] = useState([]);

    useEffect(() => {
        if (studentList.state !== STATUS_SUCCEEDED ||
            studentList.courseId !== courseId) {
                let params = {
                    courseId: courseId
                };
                dispatch(fetchStudentList(params));
        }
    }, []);

    if (studentList.status === STATUS_SUCCEEDED && 
        studentList.courseId === courseId) {
            
            let ids = [];
            let gs = [];
            studentList.items.map(item => {
                ids.push(item.id);
                gs.push(0);
            });


            /*console.log(ids.every((id, index) => {
                console.log(id, idList[index]);
                return id !== idList[index]
            }));*/

            if (ids.length !== idList.length ||
                (ids.length > 0 && ids.every((id, index) => id !== idList[index]))) {

                setIdList(ids);
                setGradeList(gs);
            }
    }

    const markedOfInputChangeHandler = (event) => setMarkedOf(event.target.value);
    const examNameInputChangeHandler = (event) => setExamName(event.target.value);

    const gradeInputChangeHandler = (event) => {
        let current = [];
        gradeList.map(item => current.push(item));
        let index = Number(event.target.id);
        current[index] = event.target.value;
        console.log(current[index]);
        setGradeList(current);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let gradeNumbers = [];
        gradeList.map(item => gradeNumbers.push(Number(item)));
        let params = {
            courseId:   courseId, 
            name:       examName,
            full_mark:  markedOf,
            students:   idList,
            grades:     gradeNumbers
        };
        dispatch(announceGrades(params));
    };

    //console.log(idList);
    /*if (grades.newlyAnnouncedGrades.status === STATUS_SUCCEEDED) {
        onSuccededHandler();
    }*/


    return (
        <form className={styles.announce_grades} onSubmit={submitHandler}>

            {/*<p className={`font1 center_text bold `}>Announce Grades</p>*/}

            <div className="parent_flex_div">
                <p className="font2 bold no_margin">Exam name</p>
                <input type="text" name="marked_of_input" id="marked_of_input"
                                    className={`remove_user_agent_stylesheet flex1 font2 ${styles.input_field}`} value={examName} onChange={examNameInputChangeHandler} required/>
            </div>

            <div className="parent_flex_div">
                <p className="font2 bold no_margin">Marked out of</p>
                <input type="number" name="marked_of_input" id="marked_of_input"
                                    className={`remove_user_agent_stylesheet flex1 font2 ${styles.input_field}`} value={markedOf} onChange={markedOfInputChangeHandler} required/>
            </div>

            <br />
            {studentList.status === STATUS_SUCCEEDED &&
                <div className={styles.student_list}>
                    {studentList.items.map((item, index) => (
                        <div className="parent_flex_div" key={index}>
                            <p className="font2 flex1 no_margin">{item.name}</p>
                            <input type="number" name={`student_list_item_${index}`} id={index} 
                                    className={`remove_user_agent_stylesheet font2 ${styles.input_field}`} value={gradeList[index]} onChange={gradeInputChangeHandler}/>
                        </div>
                    ))}
                </div>
            }


            <div className="parent_flex_div">
                <div className="flex1"/>
                {grades.newlyAnnouncedGrades.status === STATUS_FAILED && <p className='font2 bold red flex1'>{grades.newlyAnnouncedGrades.message}</p>}
                {grades.newlyAnnouncedGrades.status === STATUS_SUCCEEDED && <p className='font2 bold green flex1'>Successful</p>}
                <button className="input_button" type="submit">Annnounce</button>
            </div>
        </form>
    );
}
 
export default AnnounceGrades;