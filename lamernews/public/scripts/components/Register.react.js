'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import request from '../request.js';
import { isEmail, isCorrectUsername } from '../validator.js';
import '../../styles/login.css';

//move to the another package later


export default class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            usernameState: '',
            emailState: '',
            passwordState: '',
            inputUsername: '',
            inputEmail: '',
            inputPassword: '',
            inputPasswordConfrim: '',
            acceptMessage: ''
        };
    }
    _submitForm = (e) => {
        e.preventDefault();
        let { inputUsername, inputEmail, inputPassword, inputPasswordConfrim } = this.state;
        let state = {
            usernameState: '',
            emailState: '',
            passwordState: ''
        };
        if (!inputUsername) {
            state.usernameState = 'username field should be not empty';
            this.setState(state);
        } else if (!isCorrectUsername(inputUsername)) {
            state.usernameState = 'username is incorrect';
            this.setState(state);
        } else if (!inputEmail) {
            state.emailState = 'email should be not empty';
            this.setState(state);
        } else if (!isEmail(inputEmail)) {
            state.emailState = 'wrong email';
            this.setState(state);
        } else if (inputPassword !== inputPasswordConfrim) {
            state.passwordState = 'passwords does not match';
            this.setState(state);
        } else {
            let self = this;
            request.post('/register', {
                username: inputUsername,
                password: inputPassword,
                email: inputEmail
            }).then((msg) => {
                let message = msg.message;
                if (message === 'login or email is already used') {
                    if (/index:\susername/.test(msg.error)) {
                        state.usernameState = 'username is already used';
                        this.setState(state);
                    } else if (/index:\semail/.test(msg.error)) {
                        state.emailState = 'email is already used';
                        this.setState(state);
                    } else {
                        state
                        state.usernameState = 'unknown error';
                        this.setState(state);
                    }
                } else {
                    this.setState({
                        acceptMessage: 'User has been successfully created. Redirecting to login page...'
                    });
                    setTimeout(() => {
                        this.context.router.push('/login');
                    }, 2000);

                }
            });
        }
    }

    _onChangeValue ( propertyName ) {
        return (e) => {
            let obj = {};
            obj[propertyName] = e.target.value
            this.setState(obj);
        }
    }
    render () {
        const { acceptMessage, inputUsername, inputEmail, inputPassword, inputPasswordConfrim, usernameState, emailState, passwordState } = this.state;

        return (
            <form  onSubmit={ this._submitForm } className="my-form">
                <ul>
                    <li>
                        <label htmlFor="username">Username</label>
                    </li>
                    <li>
                        <input type="text"
                               id="username"
                               value={ inputUsername }
                               onChange={ this._onChangeValue('inputUsername') }/>
                        {usernameState ?
                            (<span className="error">{ usernameState }</span>)
                            :
                            ('')
                        }
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                    </li>
                    <li>
                        <input type="text"
                               id="email"
                               value={ inputEmail }
                               onChange={ this._onChangeValue('inputEmail') }/>
                        {emailState ?
                            (<span className="error">{ emailState }</span>)
                            :
                            ('')
                        }
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                    </li>
                    <li>
                        <input type="password"
                               id="password"
                               value={ inputPassword }
                               onChange={ this._onChangeValue('inputPassword') }/>
                        {passwordState ?
                            (<span className="error">{ passwordState }</span>)
                            :
                            ('')
                        }
                    </li>
                    <li>
                        <label htmlFor="password-repeat">Repeat password</label>
                    </li>
                    <li>
                        <input type="password"
                               id="password-repeat"
                               value={ inputPasswordConfrim }
                               onChange={ this._onChangeValue('inputPasswordConfrim') }/>
                    </li>
                    <li>
                        <input type="submit" value="Register" className="button"/>
                        {acceptMessage ?
                            (<span className="success">{ acceptMessage }</span>)
                            :
                            ('')
                        }
                    </li>

                </ul>
            </form>
        );
    }
}

Register.contextTypes = {
    router: React.PropTypes.object.isRequired
}
