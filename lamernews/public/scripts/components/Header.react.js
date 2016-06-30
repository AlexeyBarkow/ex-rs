'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/header.css';
import { Link } from 'react-router';
import Authenticated from './Authenticated.react.js';
import request from '../request.js';
// import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';
// console.log(LogoutLink);
export default class Header extends React.Component {
    constructor (props) {
        super(props);
    }
    shouldComponentUpdate() {
        console.log('update header');
        return true;
    }
    render () {
        console.log('loggedUsername', window.loggedUsername, window.loggedUserId);
        return (
            <header>
                <section>
                    <div className="container">
                        <div>
                            <Link to="/">
                                <img src={ require("../../images/logo.png") }></img>
                            </Link>
                        </div>
                        <nav>
                            <ul className="nav-bar">
                                <li>
                                    <Link to="/articles/0/10?sort=top" className="nav-button">
                                        top
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/articles/0/10?sort=latest" className="nav-button">
                                        latest
                                    </Link>
                                </li>
                                <li>
                                    <a href="/" className="nav-button">
                                        random
                                    </a>
                                </li>
                                <li>
                                    <Authenticated val={ false }>
                                        <Link to="/submit" className="nav-button">
                                            submit
                                        </Link>
                                    </Authenticated>
                                </li>
                            </ul>
                        </nav>
                        <div className="log-in">
                            <Authenticated val={ true }>
                                <Link to="/login" className="nav-button">
                                    login
                                </Link>
                                <Link to="/register" className="nav-button">
                                    register
                                </Link>
                            </Authenticated>
                            <Authenticated val={ false }>
                                <form action="/logout" method="post" className="nav-button">
                                    <input type="submit" value="logout"/>
                                </form>
                                <Link to="/myprofile" className="nav-button">
                                    profile
                                </Link>
                            </Authenticated>
                        </div>
                    </div>
                </section>
            </header>
        )
    }
}

//
// <Link to="/logout" className="nav-button">
//     logout
// </Link>
