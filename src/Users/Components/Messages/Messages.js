import styles from './Messages.module.css'
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchListOfMessages, fetchMessageById, selectAllMessages} from '../../../Store/MessagesSlice'
import {selectAllCourses} from '../../../Store/CoursesSlice'
import {Route, Switch, withRouter, useLocation} from 'react-router-dom';
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, BASE_URL, MESSAGES_TYPE_RECEIVED, MESSAGES_TYPE_SENT, MESSAGES_COMPONENT_TYPE_MESSAGES, LINK_COURSE_MESSAGES_SENT, LINK_COURSE_MESSAGES_RECEIVED} from '../../../Constants'
import Sidebar from '../Sidebar/Sidebar'
import MessageListItem from './MessageListItem/MessageListItem';
import MessageList from './MessageList/MessageList';
import MessageViewer from './MessageViewer/MessageViewer';
import {
    MESSAGES_COMPONENT_VIEWING_TYPE_LIST, 
    MESSAGES_COMPONENT_VIEWING_TYPE_ITEM,
} from '../../../Constants'



/*

*/

const Messages = withRouter(({userLink, type /*MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS*/,
                                receivedAltText, receivedRoutePath, receivedExactPath, receivedLink, 
                                sentAltText, sentRoutePath, sentExactPath, sentLink, 
                                sendAltText, sendRoutePath, sendExactPath, sendLink, 
                                match}) => {

    let messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    const courseId = match.params.courseId;
    const courses = useSelector(selectAllCourses);

    let location = useLocation();

    
    const [viewingType, setViewingType] = useState(MESSAGES_COMPONENT_VIEWING_TYPE_LIST);
    const [currentViewedMessageId, setCurrentViewedMessageId] = useState();
    
    useEffect(() => {
        //console.log(match);
        /*if (messages.status !== STATUS_SUCCEEDED) {
            let params = {courseId:courseId, type:MESSAGES_TYPE_RECEIVED, limit:20, offset:0};
            dispatch(fetchListOfMessages(params));
        }*/
        /*let params = {messageId:"message10", type:MESSAGES_TYPE_RECEIVED};
        dispatch(fetchMessageById(params));*/

    }, []);

    /*let message10 = messages.received.items.find(item => item.message.message_id === "message10");

    if (message10 && (message10.status === STATUS_SUCCEEDED)) {
        console.log("message10: ", message10);
    }*/



    const sidebarNavItems = [
        {text:receivedAltText, link:receivedLink, id:0}, 
        {text:sentAltText, link:sentLink, id:1}, 
        {text:sendAltText, link:sendLink, id:2}, 
    ];

    let messageViewerComponent;
    if (viewingType === MESSAGES_COMPONENT_VIEWING_TYPE_ITEM) {
        //console.log(match);
        let currentSendingTypeMessages = location.pathname.includes(MESSAGES_TYPE_RECEIVED) ? messages.received : messages.sent;
        //console.log(currentViewedMessageId);
        //console.log(messages);
        //console.log(currentSendingTypeMessages);
        //console.log(currentSendingTypeMessages.items);
        let messageItem = currentSendingTypeMessages.items.find(item => {
            //console.log(item);
            return item.message.message_id === currentViewedMessageId;
        }).message;

        let courseItem = courses.courses.find(item => item.Course_id === courseId);
        
        //console.log(messageItem);

        messageViewerComponent = <MessageViewer
                                    imgSenderSrc={messageItem.sender.imgUrl}
                                    messageSender={messageItem.sender.name}
                                    courseTitle={courseItem.Name}
                                    date={messageItem.date}
                                    messageSubject={messageItem.subject}
                                    messageContent={messageItem.content}
                                 />
    }
    

    return (
        <div className={styles.messages}>
            <div className={styles.messages_sidebar} onClick={() => setViewingType(MESSAGES_COMPONENT_VIEWING_TYPE_LIST)}>
                <Sidebar navItems={sidebarNavItems}/>
            </div>

            {viewingType === MESSAGES_COMPONENT_VIEWING_TYPE_LIST &&
                <div className={styles.message_list}>
                    
                    <Switch>
                        
                        <Route path={userLink+LINK_COURSE_MESSAGES_RECEIVED}>
                            <MessageList 
                                messagesType={MESSAGES_COMPONENT_TYPE_MESSAGES}
                                messagesSendingType={MESSAGES_TYPE_RECEIVED}
                                setViewingType={setViewingType}
                                setCurrentViewedMessageId={setCurrentViewedMessageId}
                            />
                        </Route>
                        <Route path={userLink+LINK_COURSE_MESSAGES_SENT}>
                            <MessageList 
                                messagesType={MESSAGES_COMPONENT_TYPE_MESSAGES}
                                messagesSendingType={MESSAGES_TYPE_SENT}
                                setViewingType={setViewingType}
                                setCurrentViewedMessageId={setCurrentViewedMessageId}
                            />
                        </Route>
                
                    </Switch>
                </div>
            }
            {viewingType === MESSAGES_COMPONENT_VIEWING_TYPE_ITEM &&
                //<div className={styles.message_viewer}>
                    <>{messageViewerComponent}</>
                    /*<MessageViewer
                        imgSenderSrc="https://picsum.photos/id/1005/100"
                        messageSender="Bahgat Saber"
                        courseTitle="Course Title"
                        date="April 23, 2021, 8:30PM"
                        messageSubject="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                        messageContent="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe ipsa optio suscipit reprehenderit, praesentium voluptas itaque quia ab assumenda quos atque illo iste odio exercitationem. Eaque enim non vero doloremque molestiae laboriosam placeat qui! Voluptates voluptatibus est magni culpa eius. Incidunt laudantium id voluptas modi rerum, recusandae atque sint odit amet rem earum aspernatur tenetur, delectus et, officia excepturi repellendus. Voluptates rem temporibus omnis! Quia voluptate doloribus quae dolorum aspernatur tempora, mollitia repudiandae voluptas nesciunt nam vitae eaque magni exercitationem adipisci, cumque quibusdam deserunt alias perspiciatis ipsa atque, consequatur assumenda eum. Excepturi incidunt maxime possimus voluptatibus inventore laudantium libero quis!"
                    />*/
                
                //</div>
            }
                
            
        </div>
    );
});
 
export default Messages;