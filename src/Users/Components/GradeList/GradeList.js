import styles from './GradeList.module.css'
import PlusCard from '../PlusCard/PlusCard'
import GradeCard from '../GradeCard/GradeCard'
import Overlay from '../Overlay/Overlay';
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AnnounceGrades from './AnnounceGrades/AnnounceGrades';
import {fetchGradeList, returnNewlyAnnouncedGradesToIdle, selectGrades} from '../../../Store/GradesSlice';
import {useRouteMatch} from 'react-router-dom';
import {
    STATUS_SUCCEEDED, 
    STATUS_LOADING
} from '../../../Constants';

const GradeList = ({canAnnounce}) => {

    const grades = useSelector(selectGrades);
    const dispatch = useDispatch();

    const match = useRouteMatch();
    const courseId = match.params.courseId;
    
    const [isAnnouncing, setIsAnnouncing] = useState(false);
    const overlayClickHandler = (event) => setIsAnnouncing(false);
    const announceCardClickHandler = (event) => setIsAnnouncing(true);

    useEffect(() => {
        if (grades.status !== STATUS_SUCCEEDED ||
            grades.courseId !== courseId) {

                let params = {courseId: courseId};
                dispatch(fetchGradeList(params));
        }

        dispatch(returnNewlyAnnouncedGradesToIdle());
    }, []);


    const closeAnnounceGrades = (event) => setIsAnnouncing(false);

    return (
        <div className={styles.grade_list}>
            {grades.status === STATUS_LOADING && <p className='font2 bold'>Loading...</p>}

            {grades.status === STATUS_SUCCEEDED &&
                grades.items.map((item, index) => {

                    let mark = 0;
                    if (item.student && item.student.grade)
                        mark = item.student.grade;
                        

                    return <GradeCard key={index} examName={item.name} 
                                items={[
                                    <p key={0} className='font3 center_text dim no_margin'>Mark {<b>{item.student && mark+"/"}</b>}<b>{item.full_mark}</b></p>, 
                                    <p key={1} className='font3 center_text dim no_margin'>Max <b>{item.max}</b></p>,
                                    <p key={2} className='font3 center_text dim no_margin'>Avg <b>{item.avg}</b></p>
                                ]}
                            />;
                })
            }
            {canAnnounce && 
                <div className="grade_card" onClick={announceCardClickHandler}>
                    <PlusCard text="Announce Grade"/>
                </div>
            }

            {isAnnouncing && 
                <Overlay component={<AnnounceGrades/>} overlayClickHandler={overlayClickHandler}/>
            }
        </div>
    );
}
 
export default GradeList;