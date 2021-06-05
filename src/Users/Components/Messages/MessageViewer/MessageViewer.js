import AnnouncementAvatar from '../../Announcement/AnnouncementAvatar/AnnouncementAvatar'
import styles from './MessageViewer.module.css'


const MessageViewer = ({imgSenderSrc, 
                        messageSender, 
                        courseTitle, 
                        date, 
                        subjectAltText="Subject", 
                        messageSubject, 
                        messageContent}) => {
    return (
        <div className={styles.message_viewer}>
            <AnnouncementAvatar
                imgSrc={imgSenderSrc}
                announcementOwner={messageSender}
                courseTitle={courseTitle}
                date={date}
            />

            <div className={`${styles.subject_div} font2 bold`}>
                <div className={styles.subject_ui}>{subjectAltText}:</div>
                <div className={styles.actual_message_subject}>{messageSubject}</div>
            </div>

            <div className={`${styles.message_content} font2`}>{messageContent}</div>
        </div>
    );
}
 
export default MessageViewer;