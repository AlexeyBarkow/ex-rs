// import request from 'superagent';
'use strict';
var HEADERS = {
    'Content-Type': 'application/json',
    // 'Access-Control-Request-Headers': true
};

var builder = (method, url, body, headers=HEADERS) => {
    headers = new Headers(headers);
    // for (let i in headers) {
    //     headers2.append(i, headers[i]);
    // }
    // console.log(headers2);
    // let paramsTransport = httpMethod ==='get' ?
    //     'query':
    //     'send';
        // return new Promise((resolve, reject) => {
        //     request[httpMethod](apiMethod)
        //         .set(headers)
        //         [paramsTransport](params)
        //         .end((err, res) => {
        //             console.log(res);
        //             if (err || !res || !res.ok) {
        //                 reject(err);
        //             } else {
        //                 //here was res.body
        //                 resolve(res.text, res);
        //             }
        //         });
        // });
    let promise;
    // if (body) {
    //     body.credentials = 'include';
    // }
    console.log(body);
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
            // console.log('prom',promise);
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
        // console.log('response', res.headers);
        // console.log(document.cookie)
        // if (res.status !== 200) {
        //     return {'message' : 'error', 'serverStatus' : res.status}
        // }
        // return res.json();
        let message = res.json();
        if (res.status !== 200) {
            message.serverStatus = res.status;
        }

        return message;
    }).then(data => {
         console.log('data', data);
        return data;
    }).catch((err) => {
        console.log(err);
    });
}

// console.log(builder('get', '/articles/0/123?sort=latest'))
export default {
    // get (apiMethod, params) {
    //     return builder('get', apiMethod, params);
    // },
    // post (apiMethod, params) {
    //     return builder('post', apiMethod, params);
    // },
    // put (apiMethod, params) {
    //     return builder('put', apiMethod, params);
    // },
    // delete (apiMethod, params) {
    //     return builder('del', apiMethod, params);
    // }
    get (apiMethod, params, credentails) {
        return builder('get', apiMethod, params, credentails);
    },
    post (apiMethod, params, credentails) {
        return builder('post', apiMethod, params, credentails);
    },
    put (apiMethod, params, credentails) {
        return builder('put', apiMethod, params, credentails);
    },
    delete (apiMethod, params, credentails) {
        return builder('del', apiMethod, params, credentails);
    }
};
