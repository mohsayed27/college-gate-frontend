import styles from './MessageList.module.css'
import {fetchListOfMessages, fetchMessageById, selectAllMessages} from '../../../../Store/MessagesSlice'
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {
    MESSAGES_TYPE_RECEIVED, 
    MESSAGES_TYPE_SENT, 
    MESSAGES_COMPONENT_TYPE_MESSAGES,
    MESSAGES_COMPONENT_TYPE_COMPLAITNS, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED
} from '../../../../Constants'
import MessageListItem from '../MessageListItem/MessageListItem';


// messagesSendingType = MESSAGES_TYPE_RECEIVED | MESSAGES_TYPE_SENT
// messagesType = MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS
const MessageList = withRouter(({messagesType, messagesSendingType, match}) => {

    const messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    const courseId = match.params.courseId;
    let currentMessages = (messagesSendingType === MESSAGES_TYPE_RECEIVED) ? messages.received : messages.sent;

    useEffect(() => {

        let fetchRequired = false;

        if (currentMessages.status !== STATUS_SUCCEEDED 
            || currentMessages.type !== messagesType
            || (currentMessages.courseId !== courseId && currentMessages.type === MESSAGES_COMPONENT_TYPE_MESSAGES)) 
        {
                fetchRequired = true;
        }

        if (fetchRequired) {
            let params = {courseId:courseId, type:messagesType, sendingType:MESSAGES_TYPE_RECEIVED, limit:20, offset:0};
            dispatch(fetchListOfMessages(params));
        }
    }, []);

    if (currentMessages.status === STATUS_SUCCEEDED) {
        console.log(currentMessages);
    }

    return (
        <div className={styles.message_list}>
            {currentMessages.status === STATUS_LOADING && <p className='font2 bold'>Loading...</p>}
            {currentMessages.status === STATUS_SUCCEEDED && 
                currentMessages.items.map(item => (
                    <MessageListItem 
                        senderName={item.message.sender.name} 
                        subject={item.message.subject}
                        date={item.message.date}
                        content={item.message.content}
                    />
                ))
            }
        </div>
    );
});
 
export default MessageList;