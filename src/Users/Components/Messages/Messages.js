import styles from './Messages.module.css'
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchListOfMessages, fetchMessageById, selectAllMessages} from '../../../Store/MessagesSlice'
import {Route, Switch, withRouter} from 'react-router-dom';
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, BASE_URL, MESSAGES_TYPE_RECEIVED, MESSAGES_TYPE_SENT, MESSAGES_COMPONENT_TYPE_MESSAGES, LINK_COURSE_MESSAGES_SENT, LINK_COURSE_MESSAGES_RECEIVED} from '../../../Constants'
import Sidebar from '../Sidebar/Sidebar'
import MessageListItem from './MessageListItem/MessageListItem';
import MessageList from './MessageList/MessageList';



/*

*/

const Messages = withRouter(({userLink, type /*MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS*/,
                                receivedAltText, receivedRoutePath, receivedExactPath, receivedLink, 
                                sentAltText, sentRoutePath, sentExactPath, sentLink, 
                                sendAltText, sendRoutePath, sendExactPath, sendLink, 
                                match}) => {

    const messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    const courseId = match.params.courseId;
    
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

    return (
        <div className={styles.messages}>
            <div className={styles.messages_sidebar}>
                <Sidebar navItems={sidebarNavItems}/>
            </div>

            <div className={styles.message_list}>
                <Switch>
                    
                    <Route path={userLink+LINK_COURSE_MESSAGES_RECEIVED}>
                        <MessageList 
                            messagesType={MESSAGES_COMPONENT_TYPE_MESSAGES}
                            messagesSendingType={MESSAGES_TYPE_RECEIVED}
                        />
                    </Route>
                    <Route path={userLink+LINK_COURSE_MESSAGES_SENT}>
                        <MessageList 
                            messagesType={MESSAGES_COMPONENT_TYPE_MESSAGES}
                            messagesSendingType={MESSAGES_TYPE_SENT}
                        />
                    </Route>
            
                </Switch>
            </div>
        </div>
    );
});
 
export default Messages;