import styles from './Messages.module.css'
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchListOfMessages, selectAllMessages} from '../../../Store/MessagesSlice'
import {withRouter} from 'react-router-dom';
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, BASE_URL} from '../../../Constants'


const Messages = withRouter(({match}) => {
    const messages = useSelector(selectAllMessages);
    const dispatch = useDispatch();

    const courseId = match.params.id;
    
    useEffect(() => {
        //console.log(match);
        if (messages.status !== STATUS_SUCCEEDED) {
            let params = {courseId:courseId, limit:20, offset:0};
            dispatch(fetchListOfMessages(params));
        }  
    }, []);

    return (
        <div className={styles.messages}>
            Messages Component !!
        </div>
    );
});
 
export default Messages;