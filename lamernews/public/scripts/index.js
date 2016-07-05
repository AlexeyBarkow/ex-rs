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
import ArticleView from './components/ArticleView.react.js';
import SubmitArticle from './components/SubmitArticle.react.js';
import NoMatch from './components/NoMatch.react.js'
window.authenticateId = '';

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRedirect to="/articles/0/10"></IndexRedirect>
            <Route name="mypage" path="/home">
                <IndexRedirect to="/users/home"></IndexRedirect>
            </Route>
            <Route name="login" path="/login" component={ LogIn }></Route>
            <Route name="register" path="/register" component={ Register }></Route>
            <Route name="user" path="/users/:username" component={ UserPage }></Route>
            <Route name="articles" path="/articles/:startIndex/:count" component={ ArticleView }></Route>
            // <Route path="/articles/" ></Route>
            <Route name="write" path="/submit" component={ SubmitArticle }></Route>
            <Route path="*" component={ NoMatch }></Route>
        </Route>
    </Router>
    ), document.getElementById('content-wrapper'));

if (module.hot) {
    module.hot.accept();
}
