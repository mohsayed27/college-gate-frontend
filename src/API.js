import {BASE_URL} from './Constants'

export async function apiRequest(endpoint, config) {
    let data;
    try {
        const response = await fetch(BASE_URL+endpoint, config /*{Authorization: 'Bearer ' + 'token'}*/);
        data = await response.json();
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