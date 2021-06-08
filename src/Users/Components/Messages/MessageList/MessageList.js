import styles from './MessageList.module.css'
import {fetchListOfMessages, fetchMessageById, returnNewMessageToIdle, selectAllMessages} from '../../../../Store/MessagesSlice'
import {withRouter, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {
    MESSAGES_TYPE_RECEIVED, 
    MESSAGES_TYPE_SENT, 
    MESSAGES_COMPONENT_TYPE_MESSAGES,
    MESSAGES_COMPONENT_TYPE_COMPLAITNS, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED,
    LINK_RECEIVED,
    LINK_SENT,
    LINK_VIEW, 
    MESSAGES_COMPONENT_VIEWING_TYPE_LIST, 
    MESSAGES_COMPONENT_VIEWING_TYPE_ITEM,
    LIMIT
} from '../../../../Constants'
import MessageListItem from '../MessageListItem/MessageListItem';


// messagesSendingType = MESSAGES_TYPE_RECEIVED | MESSAGES_TYPE_SENT
// messagesType = MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS
const MessageList = withRouter(({messagesType, messagesSendingType, setViewingType, setCurrentViewedMessageId, match}) => {

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
                console.log("Fetch Required!!!");
        }

        if (fetchRequired) {
            fetchData(LIMIT, 0);
        }

        dispatch(returnNewMessageToIdle());
    }, [messagesType, messagesSendingType]);

    if (currentMessages.status === STATUS_SUCCEEDED) {
        /*console.log(currentMessages);
        console.log(currentMessages.items.length);*/
    }

    const loadMoreHandler = () => {
        fetchData(LIMIT, currentMessages.items.length);
    }

    /*const listItemClickHandler = (event) => {
        setViewingType(MESSAGES_COMPONENT_VIEWING_TYPE_ITEM)
    }*/

    return (
        <div className={styles.message_list}>
            {(currentMessages.status === STATUS_SUCCEEDED || 
                (currentMessages.items.length > 0)) &&
                currentMessages.items.map(item => {
                    //console.log(item);
                    /*let currentLink = match.url;
                    currentLink = currentLink.replace(LINK_RECEIVED, LINK_VIEW);
                    currentLink = currentLink.replace(LINK_SENT, LINK_VIEW);
                    currentLink = currentLink.concat('/' + item.message.id);*/
                    return (
                    //<Link className="no_text_decoration" to={currentLink} key={item.message.id}>
                        <div className="pointer" key={item.message.id}>
                            <MessageListItem 
                                messageId={item.message.id}
                                senderName={item.message.sender.name} 
                                subject={item.message.subject}
                                date={item.message.date}
                                content={item.message.content}
                                setViewingType={setViewingType}
                                setCurrentViewedMessageId={setCurrentViewedMessageId}
                            />
                        </div>
                    //</Link>
                )})             
            }

            {currentMessages.status === STATUS_SUCCEEDED && 
                <p className={`pointer font2 bold center_text`} onClick={loadMoreHandler}>
                    Load more
                </p>
            }

            {currentMessages.status === STATUS_LOADING && <p className='font2 bold'>Loading...</p>}

            {currentMessages.status === STATUS_SUCCEEDED &&
                currentMessages.items.length === 0 && 
                <p className='font2 bold center_text'>Empty</p>
            }
        </div>
    );
});
 
export default MessageList;