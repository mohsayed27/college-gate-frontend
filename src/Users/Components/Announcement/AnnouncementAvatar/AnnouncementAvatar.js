import styles from './AnnouncementAvatar.module.css'

const AnnouncementAvatar = ({imgSrc, announcementOwner, courseTitle, date}) => {
    return (
        <div className={styles.announcement_avatar}>
            <img src={imgSrc} alt="Announcement owner" />
            <div className={styles.data}>
                <p className="font3">{announcementOwner}</p>
                <p className="font3">{courseTitle}</p>
                <p className="font4 dim">{date}</p>
            </div>
        </div>
    );
}
 
export default AnnouncementAvatar;