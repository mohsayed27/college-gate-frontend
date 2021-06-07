import {useEffect, useState} from 'react'
import styles from './AnnouncementList.module.css'
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, LINK_COURSE_ANNOUNCEMENTS, LINK_ANNOUNCEMENTS, LIMIT} from '../../../Constants'
import {useSelector, useDispatch} from 'react-redux';
import {fetchAnnouncements, postAnnouncement, returnNewAnnouncementToIdle, selectAnnouncements} from '../../../Store/AnncouncementsSlice'
import Announcement from '../Announcement/Announcement';
import {useLocation} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


// allCourses: false=individualCourse
const AnnouncementList = ({canPost, allCourses, courseId}) => {
    const announcements = useSelector(selectAnnouncements);
    const dispatch = useDispatch();



    useEffect(() => {
        let fetchAnn = false;
        if (announcements.allCourses !== allCourses)            
            fetchAnn = true;
        else if (!allCourses) {
            if (announcements.courseId != courseId)
                fetchAnn = true;
            else if (announcements.status !== STATUS_SUCCEEDED)
                fetchAnn = true;
        } else if (allCourses) {
            if (announcements.status !== STATUS_SUCCEEDED)
                fetchAnn = true;
        }
        
        


        if (fetchAnn) {
            let params = {allCourses: allCourses, courseId:courseId, limit:LIMIT, offset:0};
            dispatch(fetchAnnouncements(params));
        }


        
        //setTimeout(() => setNewAnnouncementContent('He5o'), 200);
    }, []);

    const loadMoreHandler = () => {
        let params = {allCourses: allCourses, courseId:courseId, limit:LIMIT, offset:announcements.items.length};
        dispatch(fetchAnnouncements(params));
    }

    
    const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
    const newAnnouncementContentChangeHandler = (event) => {
        //console.log(event.target.value);
        if (announcements.newAnnouncement.status === STATUS_SUCCEEDED)
            dispatch(returnNewAnnouncementToIdle());
        setNewAnnouncementContent(event.target.value);
    }

    const onPost = (event) => {
        event.preventDefault();
        //console.log("Submit");
        if (announcements.newAnnouncement.status !== STATUS_LOADING &&
            newAnnouncementContent !== '') {
            
            let params = {courseId:courseId, content:newAnnouncementContent};
            dispatch(postAnnouncement(params));
        }
        
    }

    if (announcements.newAnnouncement.status === STATUS_SUCCEEDED) {
        if (newAnnouncementContent !== '') {
            setNewAnnouncementContent('');
            //dispatch(returnNewAnnouncementToIdle());
        }
        //dispatch(returnNewAnnouncementToIdle());
    }

    //console.log(announcements.newAnnouncement.status);

    let style = styles.announcement_list;
    if (allCourses)
        style = `${styles.announcement_list} ${styles.padding_added}`;
    
    return (
        <div className={style}>
            
            {canPost &&
                <form className={styles.post_announcement_form} onSubmit={onPost}>
                    <textarea className="textarea remove_user_agent_stylesheet font2" name="new_announcement_content" id="new_announcement_content" rows="6" 
                                value={newAnnouncementContent} onChange={newAnnouncementContentChangeHandler} required/>
                    <div className={styles.post_button_parent_div}>
                        <div className={styles.post_button_spacer}/>
                        <button className={`input_button ${styles.post_button}`} type="submit">Post</button>
                    </div>
                </form>
            }

            {/*<Form className={styles.form}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control className={`textarea font2`} as="textarea" rows={3}  />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>*/
            }

            {/*(announcements.status === STATUS_SUCCEEDED || 
                (announcements.items.length > 0)) &&
                announcements.items.map(item => (
                    <Announcement 
                        imgSrc={item.professor.imgUrl}
                        announcementOwner={item.professor.name}
                        courseTitle={item.course.name}
                        date={item.date}
                        content={item.content}
                        key={item.id}
                    />
                    
                ))*/
            }
            {<InfiniteScroll
                dataLength={announcements.items.length}
                next={loadMoreHandler}
                hasMore={true}
                loader={announcements.status === STATUS_LOADING && <p className='font2 bold center_text'>Loading...</p>}
            >
                {announcements.items.map(item => (
                    <Announcement 
                        imgSrc={item.professor.imgUrl}
                        announcementOwner={item.professor.name}
                        courseTitle={item.course.name}
                        date={item.date}
                        content={item.content}
                        key={item.id}
                    />
                ))}
                </InfiniteScroll>
            }
            {/*announcements.status === STATUS_LOADING && <p className='font2 bold center_text'>Loading...</p>*/}
            {/*announcements.status === STATUS_SUCCEEDED && 
                <p className={`${styles.load_more} font2 bold center_text`} onClick={loadMoreHandler}>
                    Load more
                </p>
            */}
            {announcements.status === STATUS_SUCCEEDED &&
                announcements.items.length === 0 && 
                <p className='font2 bold center_text'>Empty</p>
            }
        </div>
    );
};
 
export default AnnouncementList;