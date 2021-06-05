import {useEffect, useState} from 'react'
import styles from './AnnouncementList.module.css'
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, LINK_COURSE_ANNOUNCEMENTS, LINK_ANNOUNCEMENTS} from '../../../Constants'
import {useSelector, useDispatch} from 'react-redux';
import {fetchAnnouncements, selectAnnouncements} from '../../../Store/AnncouncementsSlice'
import Announcement from '../Announcement/Announcement';
import {useLocation} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


// allCourses: false=individualCourse
const AnnouncementList = ({allCourses, courseId}) => {
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
            let params = {allCourses: allCourses, courseId:courseId, limit:20, offset:0};
            dispatch(fetchAnnouncements(params));
        }
    }, []);

    const loadMoreHandler = () => {
        let params = {allCourses: allCourses, courseId:courseId, limit:20, offset:announcements.items.length};
        dispatch(fetchAnnouncements(params));
    }
    
    return (
        <div className={styles.announcement_list}>
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