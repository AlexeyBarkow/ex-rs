import '../index.html';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import SiteWrapper from './components/site-wrapper.js';

// let test = require('./scripts/test-script');

// Test();
// console.log(SiteWrapper)
ReactDOM.render((
        <Router history={ browserHistory }>
            <Route path="/" component={ SiteWrapper }></Route>
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
