'use strict';
import '../index.html';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.react.js';
// import ReactStormpath, { Router, AuthenticatedRoute, LoginRoute } from 'react-stormpath';
import request from './request.js';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import LogIn from './components/Login.react.js';
import Register from './components/Register.react.js';
import UserPage from './components/UserPage.react.js';
import ArticleList from './components/ArticleList.react.js';
// let test = require('./scripts/test-script');
// console.log(UserPage);
// Test();
// console.log(SiteWrapper)
// console.log(ReactStormpath.init);
// ReactStormpath.init({
    // web: {
    //     register: {
    //         enabled: true,
    //         nextUri: '/',
    //         uri: '/register',
    //         form: {
    //             fields: {
    //                 givenName: {
    //                     enabled: false
    //                 },
    //                 surname: {
    //                     enabled: false
    //                 },
    //                 username: {
    //                     enabled: true,
    //                     label: 'Username',
    //                     name: 'username',
    //                     placeholder: 'Type your username here',
    //                     required: true,
    //                     type: 'text'
    //                 },
    //                 confrimPassword: {
    //                     enabled: true,
    //                     label: 'Confrim password',
    //                     name: 'confrimPassword',
    //                     placeholder: 'Repeat password',
    //                     required: true,
    //                     type: 'password'
    //                 }
    //             },
    //             fieldOrder: [ 'username', 'email', 'password', 'confrimPassword']
    //         }
    //     }
    // },
//     endpoints: {
//         login: '/login',
//         logout: '/logout',
//         register: '/register'
//     }
// });
window.authenticateId = '';

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <Route path="/login" component={ LogIn }></Route>
            <Route path="/register" component={ Register }></Route>
            <Route path="/users/:username" component={ UserPage }></Route>
            <Route path="/articles/:startIndex/:count" component={ ArticleList }></Route>
            <Route path="/articles/"></Route>
        </Route>
    </Router>
    ), document.getElementById('content-wrapper'));
// console.log(test());
// if (module.hot) {
//     module.hot.accept('./scripts/test-script.js', function(e) {
//         console.log("message", e);
//
//         test = require(e);
//     });

// }
if (module.hot) {
    module.hot.accept();
}
