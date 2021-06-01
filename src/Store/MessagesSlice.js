import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, BASE_URL} from '../Constants'

/*
state: {
    messages: [
        {message:Object, status:STATUS_IDLE, error:null}
    ], 
    status: STATUS_IDLE, 
    error: null // string | null
}
*/

export const fetchListOfMessages = createAsyncThunk(
    'messages/fetchListOfMessages', 
    async (params) => {
        let path = BASE_URL+`api/v1/me/messages/course/${params.courseId}?limit=${params.limit}&offset=${params.offset}`;
        //console.log(path);
        const data = await apiRequest(path, {Authorization: 'Bearer ' + 'token'});
        return data;
    }
)

export const messagesSlice = createSlice({
    name: 'messages', 
    initialState: {
        messages: [], 
        status: STATUS_IDLE, 
        error: null // string | null
    }, 
    reducers: {

    }, 
    extraReducers: {
        [fetchListOfMessages.fulfilled]: (state, action) => {
            state.status = STATUS_SUCCEEDED;
            
            const receivedData = action.payload;
            receivedData.items.map(item => {
                state.messages.push({
                    message:item, 
                    status:STATUS_SUCCEEDED, 
                    error:null
                });
            });
        }, 
        [fetchListOfMessages.pending]: state => {
            state.status = STATUS_LOADING
        }, 
        [fetchListOfMessages.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;

        }
    }
});

export const selectAllMessages = state => state.messages;

export default messagesSlice.reducer;
