import styles from './MessageList.module.css'
import {fetchListOfMessages, fetchMessageById, selectAllMessages} from '../../../../Store/MessagesSlice'
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {
    MESSAGES_TYPE_RECEIVED, 
    MESSAGES_TYPE_SENT, 
    MESSAGES_COMPONENT_TYPE_MESSAGES,
    MESSAGES_COMPONENT_TYPE_COMPLAITNS, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED
} from '../../../../Constants'
import MessageListItem from '../MessageListItem/MessageListItem';

const LIMIT = 20;

// messagesSendingType = MESSAGES_TYPE_RECEIVED | MESSAGES_TYPE_SENT
// messagesType = MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS
const MessageList = withRouter(({messagesType, messagesSendingType, match}) => {

    const messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    const courseId = match.params.courseId;
    let currentMessages = (messagesSendingType === MESSAGES_TYPE_RECEIVED) ? messages.received : messages.sent;

    const fetchData = (limit, offset) => {
        let params = {courseId:courseId, type:messagesType, sendingType:messagesSendingType, limit:limit, offset:offset};
        dispatch(fetchListOfMessages(params));
    }

    useEffect(() => {
        console.log("mount");
        //console.log(currentMessages);
        let fetchRequired = false;

        if (currentMessages.status !== STATUS_SUCCEEDED 
            || currentMessages.type !== messagesType
            || (currentMessages.courseId !== courseId && currentMessages.type === MESSAGES_COMPONENT_TYPE_MESSAGES)) 
        {
                fetchRequired = true;
        }

        if (fetchRequired) {
            fetchData(LIMIT, currentMessages.items.length);
        }
    }, [messagesSendingType]);

    if (currentMessages.status === STATUS_SUCCEEDED) {
        /*console.log(currentMessages);
        console.log(currentMessages.items.length);*/
    }

    const loadMoreHandler = () => {
        fetchData(LIMIT, currentMessages.items.length);
    }

    return (
        <div className={styles.message_list}>
            {(currentMessages.status === STATUS_SUCCEEDED || 
                (currentMessages.items.length > 0)) &&
                currentMessages.items.map(item => (
                    <MessageListItem 
                        senderName={item.message.sender.name} 
                        subject={item.message.subject}
                        date={item.message.date}
                        content={item.message.content}
                        key={item.message.message_id}
                    />
                ))             
            }

            {currentMessages.status === STATUS_SUCCEEDED && 
                <p className={`${styles.load_more} font2 bold center_text`} onClick={loadMoreHandler}>
                    Load more
                </p>
            }

            {currentMessages.status === STATUS_LOADING && <p className='font2 bold'>Loading...</p>}
        </div>
    );
});
 
export default MessageList;