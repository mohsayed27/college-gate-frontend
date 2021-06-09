import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED, 
    STATUS_FAILED, 
    BASE_URL, 
    MESSAGES_TYPE_RECEIVED, 
    MESSAGES_TYPE_SENT, 
    MESSAGES_COMPONENT_TYPE_MESSAGES,
    MESSAGES_COMPONENT_TYPE_COMPLAITNS,
    METHOD_GET, 
    AUTHENTICATION_STATE_KEY,
    METHOD_POST, 
    METHOD_PUT
} from '../Constants'


export const fetchListOfMessages = createAsyncThunk(
    'messages/fetchListOfMessages', 
    
    /* params = {courseId:id, type:MESSAGES_COMPONENT_TYPE_COMPLAITNS, sendingType:MESSAGES_TYPE_RECEIVED, limit:20, offset:0}; */
    async (params) => {
        let path;
        if (params.type === MESSAGES_COMPONENT_TYPE_MESSAGES)
            path = BASE_URL+`/api/v1/message/${params.sendingType}/course/${params.courseId}?offset=${params.offset}&limit=${params.limit}`;
        else
            path = BASE_URL+`/api/v1/complaintMessage/type/${params.sendingType}?limit=${params.limit}&offset=${params.offset}`;
        //console.log(path);
        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`

        }
        const data = await apiRequest(path, METHOD_GET, headers);
        //data.courseId = params.courseId;
        //data.sendingType = params.sendingType;
        //console.log("Data: ", data);
        return data;
    }
)

export const fetchMessageById = createAsyncThunk(
    'messages/fetchMessageById', 

    /* params = {messageId:id, type:MESSAGES_COMPONENT_TYPE_COMPLAITNS}; */
    async (params) => {
        let path;
        if (params.type === MESSAGES_COMPONENT_TYPE_MESSAGES)
            path = BASE_URL+`/api/v1/message/${params.messageId}`;
        else
            path = BASE_URL+`/api/v1/complaintMessage/${params.messageId}`;

        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`

        }
        //console.log(path);
        const data = await apiRequest(path, METHOD_GET, headers);
        //data.courseId = params.courseId;
        //data.sendingType = params.sendingType;
        //console.log("Data: ", data);
        return data;
    }
);

export const sendMessage = createAsyncThunk(
    'messages/sendMessage', 

    // params = {receiverId:id, courseId:id, type:MESSAGES_COMPONENT_TYPE_COMPLAITNS, subject:String, content:String}
    async (params) => {
        let path, body;
        if (params.type === MESSAGES_COMPONENT_TYPE_MESSAGES) {
            path = BASE_URL+`/api/v1/message/me/course/${params.courseId}`;
            body = {
                receiver_id: params.receiverId,
                subject: params.subject,
                content: params.content
            };
        } else {
            path = BASE_URL+'/api/v1/complaintMessage/me';
            body = {
                subject: params.subject,
                content: params.content
            };
        }

        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        }

        const data = await apiRequest(path, METHOD_POST, headers, JSON.stringify(body));
        return data;
    }
);

export const respondToComplaint = createAsyncThunk(
    'messages/respondToComplaint', 
    // params = {complaint_id: id,content: String}
    async (params) => {
        let path = BASE_URL+`/api/v1/complaintMessage/${params.complaintId}/me/response`;
        let body = {
            content: params.content
        };
        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY)).userInfo.token}`
        }

        const data = await apiRequest(path, METHOD_PUT, headers, JSON.stringify(body));
        return data;
    }
);


const initialState = {
    received: {
        type: '', 
        courseId: "", 
        items: [], 
        status: STATUS_IDLE,
        error: null
    }, 
    sent: {
        type: '', 
        courseId: "", 
        items: [], 
        status: STATUS_IDLE,
        error: null
    }, 
    individuallyFetchedMessage: {
        type: '', 
        courseId: '', 
        item: {}, 
        status: STATUS_IDLE,
        error: null
    }, 
    newMessage: {
        item: {}, 
        status: STATUS_IDLE,
        error: null
    }
}


export const messagesSlice = createSlice({
    name: 'messages', 
    initialState: initialState, 
    reducers: {
        returnNewMessageToIdle: (state) => {
            state.newMessage.status = STATUS_IDLE;
        }, 
        reset: (state) => {
            state.received.status = STATUS_IDLE;
            state.sent.status = STATUS_IDLE;
            state.newMessage.status = STATUS_IDLE;
            state.individuallyFetchedMessage.status = STATUS_IDLE;
        }
    }, 
    extraReducers: {
        [fetchListOfMessages.fulfilled]: (state, action) => {
            const receivedData = action.payload;
            let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            /*console.log("currentSendingType:", currentSendingType);
            console.log("received:", state.received);
            console.log("sent:", state.sent);*/
            
            currentSendingType.status = STATUS_SUCCEEDED;
            currentSendingType.courseId = action.meta.arg.courseId;
            currentSendingType.type = action.meta.arg.type; // MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS

            //console.log("State: ", state);
            //console.log("Fulfilled action: ", action);
            /*if (receivedData.offset === '0')
                currentSendingType.items = [] // clear*/

            receivedData.items.map(item => {
                currentSendingType.items.push(item);
            });
        }, 
        [fetchListOfMessages.pending]: (state, action) => {
            //console.log("Pending action:", action);
            let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            
            if (action.meta.arg.offset === 0) {
                console.log("Should clear");
                currentSendingType.items = [] // clear
            }

            currentSendingType.status = STATUS_LOADING;
        }, 
        [fetchListOfMessages.rejected]: (state, action) => {
            let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;

            currentSendingType.status = STATUS_FAILED;
            currentSendingType.error = action.error;

        }, 


        
        [fetchMessageById.fulfilled]: (state, action) => {
            const params = action.meta.arg;
            const receivedData = action.payload;
            //let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;

            //let currentMessage = currentSendingType.items.find(item => item.message.id === action.meta.arg.messageId);
            state.individuallyFetchedMessage.type = params.type;
            state.individuallyFetchedMessage.courseId = params.courseId;
            state.individuallyFetchedMessage.item = receivedData;
            state.individuallyFetchedMessage.status = STATUS_SUCCEEDED;
            state.individuallyFetchedMessage.error = null;

        }, 
        [fetchMessageById.pending]: (state, action) => {
            //let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            state.individuallyFetchedMessage.status = STATUS_LOADING;

            /*currentSendingType.items.push({
                message:{id:action.meta.arg.messageId},
                status:STATUS_LOADING, 
                error:null
            });*/
        }, 
        [fetchMessageById.rejected]: (state, action) => {
            /*let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            
            let currentMessage = currentSendingType.items.find(item => item.id === action.meta.arg.messageId);
            currentMessage.status = STATUS_FAILED;
            currentMessage.error = action.error;*/

            state.individuallyFetchedMessage.status = STATUS_FAILED;
            state.individuallyFetchedMessage.error = action.error;
        }, 



        [sendMessage.fulfilled]: (state, action) => {
            const params = action.meta.arg;
            const receivedData = action.payload;

            state.newMessage.status = STATUS_SUCCEEDED;
            state.newMessage.item = receivedData;
            if (params.type === state.sent.type &&
                ((params.type === MESSAGES_COMPONENT_TYPE_MESSAGES && params.courseId === state.sent.courseId) ||
                params.type === MESSAGES_COMPONENT_TYPE_COMPLAITNS))

                state.sent.items.unshift(receivedData);
        }, 
        [sendMessage.pending]: (state, action) => {
            state.newMessage.status = STATUS_LOADING;
        }, 
        [sendMessage.rejected]: (state, action) => {
            state.newMessage.status = STATUS_FAILED;
            state.newMessage.error = action.error;
        }, 
        

        
        [respondToComplaint.fulfilled]: (state, action) => {
            const params = action.meta.arg;
            const receivedData = action.payload;
            
            state.newMessage.status = STATUS_SUCCEEDED;
            state.newMessage.item = receivedData;
            if (state.received.type === MESSAGES_COMPONENT_TYPE_COMPLAITNS) {
                state.received.items.find(item => {
                    if (item.id === params.complaintId) {
                        item = receivedData; // replace if found
                        return true;
                    }
                    return false;
                });
                /*if (alreadyExistingItem) {
                    let i = state.received.items.indexOf(alreadyExistingItem);
                    state.received.items[i] = receivedData;
                }*/
                    
            }
        }, 
        [respondToComplaint.pending]: (state, action) => {
            state.newMessage.status = STATUS_LOADING;
        }, 
        [respondToComplaint.rejected]: (state, action) => {
            state.newMessage.status = STATUS_FAILED;
            state.newMessage.error = action.error;
        }, 
    }
});

export const {returnNewMessageToIdle, reset} = messagesSlice.actions;

export const selectAllMessages = state => state.messages;
//export const selectMessageById = (state, sendingType, messageId) => {state.messages};

export default messagesSlice.reducer;
