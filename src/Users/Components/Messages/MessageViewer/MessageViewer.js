import AnnouncementAvatar from '../../Announcement/AnnouncementAvatar/AnnouncementAvatar'
import styles from './MessageViewer.module.css'
import {useParams, withRouter, useRouteMatch} from 'react-router-dom'
import {fetchMessageById, selectAllMessages} from '../../../../Store/MessagesSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {
    MESSAGES_TYPE_RECEIVED, 
    STATUS_SUCCEEDED, 
    MESSAGES_COMPONENT_TYPE_MESSAGES,
    MESSAGES_COMPONENT_TYPE_COMPLAITNS
} from '../../../../Constants'


const MessageViewer = ({messagesType, subjectAltText="Subject"}) => {

    const messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    let match = useRouteMatch();
    //console.log(match.path);

    let pathParams = useParams();

    let messagesSendingType = pathParams.sendingType;
    let messageId = pathParams.messageId;
    let courseId = pathParams.courseId;

    const [messageItem, setMessageItem] = useState();

    useEffect(() => {
        //console.log("Mounted!!!!!!");

        let currentMessages = (messagesSendingType === MESSAGES_TYPE_RECEIVED) ? messages.received : messages.sent;

        let itemFoundAmoungAllMessages = false;
        let itemFoundIndividually = false;

        if (currentMessages.status === STATUS_SUCCEEDED && 
            currentMessages.type === messagesType) {


            
            if ((currentMessages.courseId === courseId && currentMessages.type === MESSAGES_COMPONENT_TYPE_MESSAGES) ||
                currentMessages.type === MESSAGES_COMPONENT_TYPE_COMPLAITNS) {
            
                    //console.log("HERE");
                
                setMessageItem(currentMessages.items.find(item => item.id === messageId));
                console.log(messageItem);
                if (messageItem)
                    itemFoundAmoungAllMessages = true;
            }            
        }

        if (!itemFoundAmoungAllMessages) {

            console.log("HERE");


            if (messages.individuallyFetchedMessage.status === STATUS_SUCCEEDED &&
                messages.individuallyFetchedMessage.type === messagesType) {


                if ((messages.individuallyFetchedMessage.courseId === courseId && messages.individuallyFetchedMessage.type === MESSAGES_COMPONENT_TYPE_MESSAGES) ||
                    messages.individuallyFetchedMessage.type === MESSAGES_COMPONENT_TYPE_COMPLAITNS) {
                    
                    if (messages.individuallyFetchedMessage.item.id === messageId) {
                        setMessageItem(messages.individuallyFetchedMessage.item);
                        itemFoundIndividually = true;
                    }
                }
            }
        }



        if (!itemFoundAmoungAllMessages && !itemFoundIndividually) {
            let params;
            params = {
                messageId: messageId, 
                type: messagesType
            };
            dispatch(fetchMessageById(params));
        }

    }, []);

    if (messages.individuallyFetchedMessage.status === STATUS_SUCCEEDED && !messageItem) 
        setMessageItem(messages.individuallyFetchedMessage.item);



    return (
        <div className={styles.message_viewer}>
            <AnnouncementAvatar
                imgSrc={messageItem && messageItem.sender.imgUrl}
                announcementOwner={messageItem && messageItem.sender.name}
                //courseTitle={courseTitle}
                date={messageItem && messageItem.date}
            />

            <div className={`${styles.subject_div} font2 bold`}>
                <div className={styles.subject_ui}>{subjectAltText}:</div>
                <div className={styles.actual_message_subject}>{messageItem && messageItem.subject}</div>
            </div>

            <div className={`${styles.message_content} font2`}>{messageItem && messageItem.content}</div>}
        </div>
    );
};
 
export default MessageViewer;