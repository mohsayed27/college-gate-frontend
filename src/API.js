import {BASE_URL} from './Constants'

export async function apiRequest(url, method, headers, bodyData) {
    let data;

    let config = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: bodyData // body data type must match "Content-Type" header
    };

    try {
        const response = await fetch(url, config);
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