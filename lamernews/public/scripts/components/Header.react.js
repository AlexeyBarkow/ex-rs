'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/header.css';
import { Link } from 'react-router';
import Authenticated from './Authenticated.react.js';
import request from '../request.js';
export default class Header extends React.Component {
    constructor (props) {
        super(props);
    }
    shouldComponentUpdate() {
        return true;
    }

    _logout (e) {
        e.preventDefault();
        let self = this;
        request.post('/logout').then(res => {
            self.forceUpdate();
        });
    }
    render () {
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
                                    <Link to={{ query: { sort: 'top' } }} className="nav-button">
                                        top
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{ query: { sort: 'latest' } }} className="nav-button">
                                        latest
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{ query: { id: 'random' } }} className="nav-button">
                                        random
                                    </Link>
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
                                <form onSubmit={ this._logout.bind(this) }>
                                    <input type="submit" value="logout" className="nav-button"/>
                                </form>
                                <Link to="/users/home" className="nav-button">
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
