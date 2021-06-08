import styles from './SendMessage.module.css'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetchStudentList, selectStudentList} from '../../../Store/StudentListSlice'
import {sendMessage, returnNewMessageToIdle, selectAllMessages} from '../../../Store/MessagesSlice'
import {
    MESSAGES_COMPONENT_TYPE_MESSAGES,
    STATUS_FAILED,
    STATUS_SUCCEEDED
} from '../../../Constants';
import { Redirect } from 'react-router';

const SELECT_A_STUDENT = "-- Select a student --";

const SendMessage = ({messageComponentType, showStudentList=true, courseId, sentMessagesLink}) => {

    const studentList = useSelector(selectStudentList);
    const messages = useSelector(selectAllMessages);
    const dispach = useDispatch();

    const [selectedStudent, setSelectedStudent] = useState('-- Select a student --');
    const [subjectInput, setSubjectInput] = useState('');
    const [messageContent, setMessageContent] = useState();


    useEffect(() => {
        if (showStudentList && 
            (studentList.status !== STATUS_SUCCEEDED || studentList.courseId !== courseId))
            dispach(fetchStudentList({courseId:courseId}));
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        if (showStudentList && selectedStudent === SELECT_A_STUDENT) {
            alert("Select a student first!!");
            return;
        }
        let params;
        //if (messageComponentType === MESSAGES_COMPONENT_TYPE_MESSAGES)
            params = {
                receiverId: showStudentList ? selectedStudent : undefined,
                courseId: courseId, 
                type: messageComponentType, 
                subject: subjectInput, 
                content: messageContent
            };
        dispach(sendMessage(params));
        //console.log(selectedStudent);
    };

    const selectedStudentChangeHandler = (event) => {
        setSelectedStudent(event.target.value);
    };
    
    const subjectChangeHandler = (event) => {
        setSubjectInput(event.target.value);
    };

    const messageContentChangeHandler = (event) => {
        setMessageContent(event.target.value);
    };


    if (messages.newMessage.status === STATUS_SUCCEEDED) {

        return (
            <div>
                <Redirect to={sentMessagesLink}/>
                {/*dispach(returnNewMessageToIdle())*/}
            </div>
        );
    }


    return (
        <form className={styles.form} onSubmit={submitHandler}>
            {showStudentList && 
            studentList.status === STATUS_SUCCEEDED && 
            studentList.courseId === courseId &&

                <div className={styles.label_input}>
                    <label htmlFor="selected_student" className="font2 bold">To</label>
                    <select name="selected_student" id="selected_student" 
                            value={selectedStudent} onChange={selectedStudentChangeHandler} 
                            className={`${styles.select} remove_user_agent_stylesheet font2`} required>
                        {
                            <option disabled defaultValue>{SELECT_A_STUDENT}</option>
                        }
                        {
                            studentList.items.map(item => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
            }

            <div className={styles.label_input}>
                <label htmlFor="subject" className="font2 bold">Subject</label>
                <input type="text" name="subject" id="subject" 
                    value={subjectInput} onChange={subjectChangeHandler}
                    className={`${styles.subject_input} remove_user_agent_stylesheet font2`} required/>
            </div>

            <textarea className="textarea remove_user_agent_stylesheet font2" name="message_content" id="message_content" rows="10" 
                                value={messageContent} onChange={messageContentChangeHandler} required/>

            <div className={styles.send_button_parent_div}>
                <p className='font2 bold red flex1'>{messages.newMessage.status === STATUS_FAILED && messages.newMessage.error.message}</p>
                <button className={`input_button ${styles.send_button}`} type="submit">Send</button>
            </div>
        </form>
    );
}
 
export default SendMessage;