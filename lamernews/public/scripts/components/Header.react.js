import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/header.css';
import { Link } from 'react-router';
import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';
// console.log(LogoutLink);
export default class Header extends React.Component {
    constructor (props) {
        super(props);
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
                                    <a href="/" className="nav-button">
                                        top
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="nav-button">
                                        latest
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="nav-button">
                                        random
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="nav-button">
                                        submit
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="log-in">
                            <NotAuthenticated>
                                <LoginLink className="nav-button">
                                        login
                                </LoginLink>
                                <Link to="/register" className="nav-button">
                                        register
                                </Link>
                            </NotAuthenticated>
                            <Authenticated>
                                <LogoutLink className="nav-button">
                                    logout
                                </LogoutLink>
                            </Authenticated>
                        </div>
                    </div>
                </section>
                <section></section>
            </header>
        )
    }
}
