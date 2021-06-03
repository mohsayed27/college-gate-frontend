import {BASE_URL} from './Constants'

export async function apiRequest(url, config) {
    let data;
    try {
        const response = await fetch(url, config /*{Authorization: 'Bearer ' + 'token'}*/);
        //console.log("Fetched response: ", response);
        data = await response.json();
        //console.log("Data: ", data);

        if (response.ok) {
            return data;
        }
        throw new Error(response.statusText)
    } catch(err) {
        console.log('err');
        console.log(err);
        return Promise.reject(err.message ? err.message : data)
    }
}