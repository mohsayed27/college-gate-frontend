import styles from './Announcement.module.css'
import AnnouncementAvatar from './AnnouncementAvatar/AnnouncementAvatar'

const Announcement = ({imgSrc, announcementOwner, courseTitle, date, content}) => {
    return (
        <div className={styles.announcement}>
            <AnnouncementAvatar
                imgSrc={imgSrc}
                announcementOwner={announcementOwner}
                courseTitle={courseTitle}
                date={date}
            />
            <p className="font2">{content}</p>
        </div>
    );
}
 
export default Announcement;