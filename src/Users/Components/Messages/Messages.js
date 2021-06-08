import styles from './Messages.module.css'
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchListOfMessages, fetchMessageById, returnNewMessageToIdle, selectAllMessages} from '../../../Store/MessagesSlice'
import {selectAllCourses} from '../../../Store/CoursesSlice'
import {Route, Switch, withRouter, useLocation, useHistory, useParams, useRouteMatch, Redirect} from 'react-router-dom';
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, BASE_URL, MESSAGES_TYPE_RECEIVED, MESSAGES_TYPE_SENT, MESSAGES_COMPONENT_TYPE_MESSAGES, LINK_COURSE_MESSAGES_SENT, LINK_COURSE_MESSAGES_RECEIVED, LINK_RECEIVED, LINK_SENT, LINK_SEND, LINK_COURSE_MESSAGES} from '../../../Constants'
import Sidebar from '../Sidebar/Sidebar'
import MessageListItem from './MessageListItem/MessageListItem';
import MessageList from './MessageList/MessageList';
import MessageViewer from './MessageViewer/MessageViewer';
import {

} from '../../../Constants'
import SendMessage from '../SendMessage/SendMessage';



/*

*/

const Messages = ({userLink, type /*MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS*/,
                                sendMessageShowStudentList, subjectAltText, 
                                receivedAltText, receivedRoutePath, receivedExactPath, receivedLink, 
                                sentAltText, sentRoutePath, sentExactPath, sentLink, 
                                sendAltText, sendRoutePath, sendExactPath, sendLink, 
                                messageViewerRoutePath, messageViewerExactPath, 
                                addPadding=false}) => {

    let messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();
    
    let pathParams = useParams();
    //console.log(pathParams);

    const courseId = pathParams.courseId;
    const courses = useSelector(selectAllCourses);

    let location = useLocation();
    let history = useHistory();
    let match = useRouteMatch();

    //console.log(match.path);
    
    useEffect(() => {
        //console.log(match);
        /*if (messages.status !== STATUS_SUCCEEDED) {
            let params = {courseId:courseId, type:MESSAGES_TYPE_RECEIVED, limit:20, offset:0};
            dispatch(fetchListOfMessages(params));
        }*/
        /*let params = {messageId:"message10", type:MESSAGES_TYPE_RECEIVED};
        dispatch(fetchMessageById(params));*/
    }, []);

    /*let message10 = messages.received.items.find(item => item.id === "message10");

    if (message10 && (message10.status === STATUS_SUCCEEDED)) {
        console.log("message10: ", message10);
    }*/



    const sidebarNavItems = [
        {text:receivedAltText, link:receivedLink, id:0}, 
        {text:sentAltText, link:sentLink, id:1}, 
        {text:sendAltText, link:sendLink, id:2}, 
    ];
    
    //console.log(match)
    //console.log(messageViewerRoutePath);

    //professor/course/course0/messages/received/view/message0
    //professor/course/course0/messages/received/view/message0

    /*console.log(userL+match.path);
    console.log(LINK_COURSE_MESSAGES);*/
    /*if ()
        return <Redirect to={location.pathname+LINK_COURSE_MESSAGES_RECEIVED}/>;*/

    let style = styles.messages;
    if (addPadding)
        style = `${styles.messages} add_padding`

    return (
        <div className={style}>
            <div className={styles.messages_sidebar}>
                <Sidebar navItems={sidebarNavItems}/>
            </div>

            <div className={styles.messages_content}>
                
                <Switch>
                    
                    <Route path={receivedRoutePath} exact={receivedExactPath}>
                        <MessageList 
                            messagesType={type}
                            messagesSendingType={MESSAGES_TYPE_RECEIVED}
                            messageViewerRoutePath={messageViewerRoutePath}
                        />
                    </Route>
                    <Route path={sentRoutePath} exact={sentExactPath}>
                        <MessageList 
                            messagesType={type}
                            messagesSendingType={MESSAGES_TYPE_SENT}
                            messageViewerRoutePath={messageViewerRoutePath}
                        />
                    </Route>

                    <Route path={sendRoutePath} exact={sendExactPath}>
                        <SendMessage
                            messageComponentType={type}
                            showStudentList={sendMessageShowStudentList}
                            courseId={courseId}
                            sentMessagesLink={sentLink}
                        />
                    </Route>

                    <Route path={messageViewerRoutePath} exact={messageViewerExactPath}>
                        <MessageViewer
                            messagesType={type}
                            subjectAltText={subjectAltText}
                        />
                    </Route>
            
                </Switch>
            </div>

        </div>
    );
};
 
export default Messages;