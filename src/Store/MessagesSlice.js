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
    METHOD_GET
} from '../Constants'
//import store from './Store';

/*
state: {
    received: {
        type: MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS, 
        courseId: String, 
        items: [
            {message:Object, status: STATUS_SUCCEEDED, error: null},
            ...
        ], 
        status: STATUS_IDLE,
        error: null
    }, 
    sent: {
        type: MESSAGES_COMPONENT_TYPE_MESSAGES | MESSAGES_COMPONENT_TYPE_COMPLAITNS, 
        courseId: String, 
        items:  [
            {message:Object, status: STATUS_SUCCEEDED, error: null},
            ...
        ], 
        status: STATUS_IDLE,
        error: null
    }
}
*/

export const fetchListOfMessages = createAsyncThunk(
    'messages/fetchListOfMessages', 
    
    /* params = {courseId:id, type:MESSAGES_COMPONENT_TYPE_COMPLAITNS, sendingType:MESSAGES_TYPE_RECEIVED, limit:20, offset:0}; */
    async (params) => {
        let path;
        if (params.type === MESSAGES_COMPONENT_TYPE_MESSAGES)
            path = BASE_URL+`api/v1/me/messages/${params.sendingType}/course/${params.courseId}?limit=${params.limit}&offset=${params.offset}`;
        else
            path = BASE_URL+`api/v1/me/complaintMessages/${params.sendingType}?limit=${params.limit}&offset=${params.offset}`;
        //console.log(path);
        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': 'Bearer '

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

    /* params = {messageId:id, type:MESSAGES_COMPONENT_TYPE_COMPLAITNS, sendingType:MESSAGES_TYPE_RECEIVED}; */
    async (params) => {
        let path;
        if (params.type === MESSAGES_COMPONENT_TYPE_MESSAGES)
            path = BASE_URL+`api/v1/me/message/${params.messageId}`;
        else
            path = BASE_URL+`api/v1/me/complaintMessage/${params.messageId}`;

        const headers = {
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${store.getState().authenticationState.userInfo.token}`
            'Authorization': 'Bearer '

        }
        //console.log(path);
        const data = await apiRequest(path, METHOD_GET, headers);
        //data.courseId = params.courseId;
        //data.sendingType = params.sendingType;
        //console.log("Data: ", data);
        return data;
    }
)



export const messagesSlice = createSlice({
    name: 'messages', 
    initialState: {
        received: {
            courseId: "", 
            items: [], 
            status: STATUS_IDLE,
            error: null
        }, 
        sent: {
            courseId: "", 
            items: [], 
            status: STATUS_IDLE,
            error: null
        }
    }, 
    reducers: {

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
                currentSendingType.items.push({
                    message:item, 
                    status:STATUS_SUCCEEDED, 
                    error:null
                });
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
            const receivedData = action.payload;
            let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;

            let currentMessage = currentSendingType.items.find(item => item.message.message_id === action.meta.arg.messageId);
            currentMessage.message = receivedData;
            currentMessage.status = STATUS_SUCCEEDED;
            currentMessage.error = null;

        }, 
        [fetchMessageById.pending]: (state, action) => {
            let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            
            currentSendingType.items.push({
                message:{message_id:action.meta.arg.messageId},
                status:STATUS_LOADING, 
                error:null
            });
        }, 
        [fetchMessageById.rejected]: (state, action) => {
            let currentSendingType = (action.meta.arg.sendingType === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            
            let currentMessage = currentSendingType.items.find(item => item.message.message_id === action.meta.arg.messageId);
            currentMessage.status = STATUS_FAILED;
            currentMessage.error = action.error;
        }
    }
});

export const selectAllMessages = state => state.messages;

export default messagesSlice.reducer;
