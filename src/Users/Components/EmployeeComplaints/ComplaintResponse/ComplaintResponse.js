import AnnouncementAvatar from '../../Announcement/AnnouncementAvatar/AnnouncementAvatar';
import styles from './ComplaintResponse.module.css';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';
import {respondToComplaint, selectAllMessages} from '../../../../Store/MessagesSlice';
import {
    STATUS_FAILED, 
    STATUS_SUCCEEDED
} from '../../../../Constants'

const ComplaintResponse = ({}) => {

    const messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    const match = useRouteMatch();

    const complaintId = match.params.messageId;

    const [receivedComplaint, setReceivedComplaint] = useState({
        waitingToChange: true, 
        item: {response:false}
    });

    const [responseTextareaContent, setResponseTextareaContent] = useState('');

    const responseContentChangeHandler = (event) => setResponseTextareaContent(event.target.value);
    const submitResponseHandler = (event) => {
        event.preventDefault();
        if (responseTextareaContent != '') {
            // Post to server
            let params = {
                complaintId: complaintId,
                content: responseTextareaContent
            };
            console.log("Should be waiting now bef");
            dispatch(respondToComplaint(params));
            console.log("Should be waiting now after", messages.newMessage.status);
            setReceivedComplaint({waitingToChange:true, item:receivedComplaint.item});
        }
    }

    useEffect(() => {
        let foundItem = messages.received.items.find(item => item.id === complaintId);
        if (foundItem) {
            setReceivedComplaint({waitingToChange:false, item:foundItem});
        } else {
            //dispatch();
        }
    }, []);
    
    if (receivedComplaint.waitingToChange) {
        console.log("HERE ", messages.newMessage.status);
        if (messages.newMessage.status === STATUS_SUCCEEDED) {
            setReceivedComplaint({waitingToChange:false, item:messages.newMessage.item});
        } else if (messages.newMessage.status === STATUS_FAILED) {
            setReceivedComplaint({waitingToChange:false, item:receivedComplaint.item});
        }
    }
    

    return (
        <div className={styles.complain_respone}>
            <p className={`${styles.response_title} font2 bold center_text`}>Response</p>
            
            {receivedComplaint.item.response &&
                <AnnouncementAvatar
                    imgSrc={receivedComplaint.item.receiver.imgUrl}
                    announcementOwner={receivedComplaint.item.receiver.name}
                    date={receivedComplaint.item.date_response}
                />
            }
            {receivedComplaint.item.response &&
                <p className={`textarea font2 no_margin`}>{receivedComplaint.item.content_response}</p>
            }

            
            {!receivedComplaint.item.response && 
                <form className={styles.form} onSubmit={submitResponseHandler}>
                    <textarea name="response" id="response" rows="7" className="font2 textarea remove_user_agent_stylesheet"
                                value={responseTextareaContent} onChange={responseContentChangeHandler}/>
                    <div className={styles.respond_button_parent_div}>
                        <p className='font2 bold red flex1'>{messages.newMessage.status === STATUS_FAILED && messages.newMessage.error.message}</p>
                        <button className="input_button" type="submit">Respond</button>
                    </div>
                </form>
            }

        </div>
    );
}
 
export default ComplaintResponse;