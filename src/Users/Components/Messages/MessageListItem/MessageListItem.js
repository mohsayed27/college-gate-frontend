import styles from './MessageListItem.module.css'

const MessageListItem = ({senderName, subject, date, content}) => {
    return (
        <div className={styles.message_list_item}>
            <div className={styles.top_section}>
                <p className='font2 bold'>{senderName}</p>
                <p className='font2 bold'>|</p>
                <p className='font2'>{subject}</p>
                <div className={styles.top_section_spacer}></div>
                <p className={`${styles.date} font3 dim`}>{date}</p>
            </div>

            <p className={`${styles.message_content} font2`}>
                {content}
            </p>
        </div>
    );
}

export default MessageListItem;