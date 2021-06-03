import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, BASE_URL, MESSAGES_TYPE_RECEIVED, MESSAGES_TYPE_SENT} from '../Constants'

/*
state: {
    received: {
        courseId: String, 
        items: [
            {message:Object, status: STATUS_SUCCEEDED, error: null},
            ...
        ], 
        status: STATUS_IDLE,
        error: null
    }, 
    sent: {
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
    
    /* params = {courseId:id, type:MESSAGES_TYPE_RECEIVED, limit:20, offset:0}; */
    async (params) => {
        let path = BASE_URL+`api/v1/me/messages/${params.type}/course/${params.courseId}?limit=${params.limit}&offset=${params.offset}`;
        //console.log(path);
        const data = await apiRequest(path, {Authorization: 'Bearer ' + 'token'});
        //data.courseId = params.courseId;
        //data.type = params.type;
        //console.log("Data: ", data);
        return data;
    }
)

export const fetchMessageById = createAsyncThunk(
    'messages/fetchMessageById', 

    /* params = {messageId:id, type:MESSAGES_TYPE_RECEIVED}; */
    async (params) => {
        let path = BASE_URL+`api/v1/me/message/${params.messageId}`;
        //console.log(path);
        const data = await apiRequest(path, {Authorization: 'Bearer ' + 'token'});
        //data.courseId = params.courseId;
        //data.type = params.type;
        console.log("Data: ", data);
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
            let currentType = (action.meta.arg.type === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            /*console.log("currentType:", currentType);
            console.log("received:", state.received);
            console.log("sent:", state.sent);*/
            
            currentType.status = STATUS_SUCCEEDED;
            currentType.courseId = action.meta.arg.courseId;

            //console.log("State: ", state);
            //console.log("Fulfilled action: ", action);
            if (receivedData.offset === '0')
                currentType.items = [] // clear

            receivedData.items.map(item => {
                currentType.items.push({
                    message:item, 
                    status:STATUS_SUCCEEDED, 
                    error:null
                });
            });
        }, 
        [fetchListOfMessages.pending]: (state, action) => {
            //console.log("Pending action:", action);
            let currentType = (action.meta.arg.type === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;

            currentType.status = STATUS_LOADING;
        }, 
        [fetchListOfMessages.rejected]: (state, action) => {
            let currentType = (action.meta.arg.type === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;

            currentType.status = STATUS_FAILED;
            currentType.error = action.error;

        }, 


        [fetchMessageById.fulfilled]: (state, action) => {
            const receivedData = action.payload;
            let currentType = (action.meta.arg.type === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;

            let currentMessage = currentType.items.find(item => item.message.message_id === action.meta.arg.messageId);
            currentMessage.message = receivedData;
            currentMessage.status = STATUS_SUCCEEDED;
            currentMessage.error = null;

        }, 
        [fetchMessageById.pending]: (state, action) => {
            let currentType = (action.meta.arg.type === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            
            currentType.items.push({
                message:{message_id:action.meta.arg.messageId},
                status:STATUS_LOADING, 
                error:null
            });
        }, 
        [fetchMessageById.rejected]: (state, action) => {
            let currentType = (action.meta.arg.type === MESSAGES_TYPE_RECEIVED) ? state.received : state.sent;
            
            let currentMessage = currentType.items.find(item => item.message.message_id === action.meta.arg.messageId);
            currentMessage.status = STATUS_FAILED;
            currentMessage.error = action.error;
        }
    }
});

export const selectAllMessages = state => state.messages;

export default messagesSlice.reducer;
