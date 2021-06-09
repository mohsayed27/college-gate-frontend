import styles from './MessageList.module.css'
import {fetchListOfMessages, fetchMessageById, returnNewMessageToIdle, selectAllMessages} from '../../../../Store/MessagesSlice'
import {withRouter, Link, useParams, useRouteMatch} from 'react-router-dom';
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
    LIMIT,
    LINK_MESSAGE_ID,
    MESSAGES_SENDING_TYPE,
    LINK_COURSE_ID
} from '../../../../Constants'
import MessageListItem from '../MessageListItem/MessageListItem';


// messagesType = MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS
// messagesSendingType = MESSAGES_TYPE_RECEIVED | MESSAGES_TYPE_SENT
const MessageList = ({messagesType, messagesSendingType, messageViewerRoutePath}) => {

    const messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    let pathParams = useParams();
    let match = useRouteMatch();
    //console.log(match.path);

    const courseId = pathParams.courseId;
    let currentMessages = (messagesSendingType === MESSAGES_TYPE_RECEIVED) ? messages.received : messages.sent;

    const fetchData = (limit, offset) => {
        let params = {courseId:courseId, type:messagesType, sendingType:messagesSendingType, limit:limit, offset:offset};
        dispatch(fetchListOfMessages(params));
    }

    useEffect(() => {
        //console.log("mount");
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

    //console.log(messageViewerRoutePath)
    

    return (
        <div className={styles.message_list}>
            {(currentMessages.status === STATUS_SUCCEEDED || 
                (currentMessages.items.length > 0)) &&
                currentMessages.items.map(item => {
                    //console.log(item);
                    /*let currentLink = match.url;
                    currentLink = currentLink.replace(LINK_RECEIVED, LINK_VIEW);
                    currentLink = currentLink.replace(LINK_SENT, LINK_VIEW);
                    currentLink = currentLink.concat('/' + item.id);*/
                    /*console.log(messageViewerRoutePath.replace(LINK_COURSE_ID, '/'+courseId)
                                                        .replace(MESSAGES_SENDING_TYPE, '/'+messagesSendingType)
                                                        .replace(LINK_MESSAGE_ID, '/'+item.id));*/
                    return (
                    //<Link className="no_text_decoration" to={currentLink} key={item.id}>
                        <div className="pointer" key={item.id}>
                            <MessageListItem 
                                link={messageViewerRoutePath.replace(LINK_COURSE_ID, '/'+courseId)
                                                            .replace(MESSAGES_SENDING_TYPE, '/'+messagesSendingType)
                                                            .replace(LINK_MESSAGE_ID, '/'+item.id)}
                                senderName={item.sender.name} 
                                subject={item.subject}
                                date={item.date ? item.date : item.date_response}
                                content={item.content ? item.content : item.content_response}
                            />
                        </div>
                    //</Link>
                )})             
            }

            {currentMessages.status === STATUS_SUCCEEDED && 
                currentMessages.items.length === 0 &&   
                <p className={`pointer font2 bold center_text`}>
                    Empty
                </p>
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
};
 
export default MessageList;