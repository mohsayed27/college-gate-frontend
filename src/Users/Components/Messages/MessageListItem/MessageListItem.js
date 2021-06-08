import styles from './MessageListItem.module.css'
import {
    MESSAGES_COMPONENT_VIEWING_TYPE_ITEM
} from '../../../../Constants'
import {Link, useHistory, useLocation} from 'react-router-dom'

const MessageListItem = ({link, senderName, subject, date, content}) => {

    let location = useLocation();
    let history = useHistory();

    return (
        <Link className={`${styles.message_list_item} no_text_decoration`} to={link}>
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
        </Link>
    );
}

export default MessageListItem;