// import request from 'superagent';
'use strict';
const HEADERS = {
    'Content-Type': 'application/json'
};

function builder (method, url, body, headers=HEADERS) {
    headers = new Headers(headers);
    let promise;
    if (method === 'get') {
        if (body) {

            promise = fetch(url, {
                headers,
                body: JSON.stringify(body),
                credentials: 'include'
            });
        } else {
            promise = fetch(url, {
                headers,
                credentials: 'include'
            });
        }
    } else {
        let params = {
            method,
            headers,
            body: JSON.stringify(body),
            credentials: 'include'
        };
        promise = fetch(url, params)
    }
    return promise.then((res) => {
        let message = res.json();
        if (res.status !== 200) {
            message.serverStatus = res.status;
        }

        return message;
    }).then(data => {
        return data;
    }).catch((err) => {
        console.log(err);
    });
}

export default {
    get (apiMethod, params, credentails) {
        return builder('GET', apiMethod, params, credentails);
    },
    post (apiMethod, params, credentails) {
        return builder('POST', apiMethod, params, credentails);
    },
    put (apiMethod, params, credentails) {
        return builder('PUT', apiMethod, params, credentails);
    },
    delete (apiMethod, params, credentails) {
        return builder('DELETE', apiMethod, params, credentails);
    }
};
