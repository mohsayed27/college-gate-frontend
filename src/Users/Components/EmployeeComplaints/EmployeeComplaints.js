import styles from './EmployeeComplaints.module.css'
import {Switch, Route} from 'react-router-dom'
import MessageList from '../Messages/MessageList/MessageList'
import MessageViewer from '../Messages/MessageViewer/MessageViewer'
import { 
    MESSAGES_COMPONENT_TYPE_COMPLAITNS, 
    MESSAGES_TYPE_RECEIVED , 
    LINK_EMPLOYEE,
    LINK_COMPLAINTS,
    LINK_COMPLAINTS_VIEW,
    LINK_COMPLAINTS_RECEIVED,
    LINK_EMPLOYEE_HOME
} from '../../../Constants';
import ComplaintResponse from './ComplaintResponse/ComplaintResponse';
import {useState, useEffect} from 'react';

const EmployeeComplaints = ({userLink=LINK_EMPLOYEE}) => {

    /*const test = {
        content_response: "hwa el 3bd kda lazm ykon t3ban",
        date_response: "Wednesday,June 9,2021 9:16:34 am",
        response: true,
        _id: "60c060783704fc282baa4502",
        sender: {
            imgUrl: "https://picsum.photos/200",
            type: "Student",
            _id: "60be4351a89cc86a49681b6c",
            name: "mohamed",
            id: "60be4351a89cc86a49681b6c"
        },
        receiver: {
            imgUrl: "https://picsum.photos/200",
            type: "Department",
            _id: "60bd499d105d8e10b4ef0eed",
            name: "youssef",
            id: "60bd499d105d8e10b4ef0eed"
        },
        subject: "problem in my account",
        content: "Are you okay because i am not",
        date: "Wednesday,June 9,2021 8:32:24 am",
        __v: 0,
        id: "60c060783704fc282baa4502"
    };*/

    const [currentReceivedComplaint, setCurrentReceivedComplaint] = useState({response:false});

    return (
        <div className={`${styles.employee_complaints} add_padding`}>
            <Switch>
                <Route path={LINK_EMPLOYEE_HOME} exact={true}>
                    <div style={{backgroundColor:'black'}}>
                        <MessageList
                            messagesType={MESSAGES_COMPONENT_TYPE_COMPLAITNS}
                            messagesSendingType={MESSAGES_TYPE_RECEIVED}
                            messageViewerRoutePath={userLink+LINK_COMPLAINTS_VIEW}
                        />
                    </div>
                </Route>
                <Route path={userLink+LINK_COMPLAINTS_VIEW} exact={false}>
                    <MessageViewer 
                        messagesType={MESSAGES_COMPONENT_TYPE_COMPLAITNS}
                        messagesSendingType={MESSAGES_TYPE_RECEIVED}
                        messageSetterForTheOutsideWorld={setCurrentReceivedComplaint}
                    />
                    <br />
                    <ComplaintResponse
                        receivedComplaint={currentReceivedComplaint}
                        receivedComplaintSetter={setCurrentReceivedComplaint}
                    />
                </Route>
            </Switch>
        </div>
    );
}
 
export default EmployeeComplaints;