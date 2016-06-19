import '../index.html';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.react.js';
import ReactStormpath, { Router, AuthenticatedRoute, LoginRoute } from 'react-stormpath';

import { Route, Link, browserHistory, IndexRedirect } from 'react-router';
import LogIn from './components/Login.react.js';
import Register from './components/Register.react.js';
// let test = require('./scripts/test-script');

// Test();
// console.log(SiteWrapper)
// console.log(ReactStormpath.init);
ReactStormpath.init({
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
    endpoints: {
        login: '/login',
        logout: '/logout',
        register: '/register'
    }
});
ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <LoginRoute path="/login" component={ LogIn }></LoginRoute>
            <Route path="/register" component={ Register }></Route>
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
