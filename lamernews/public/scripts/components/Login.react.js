'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import '../../styles/login.css';

export default class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            usernameState: '',
            passwordState: '',
            disableState: '',
            inputUsername: '',
            inputPassword: ''
        }
    }
    _submitForm = (e) => {
        e.preventDefault();
        const username = this.state.inputUsername;
        const password = this.state.inputPassword;
        this.setState({
            usernameState: username ?
                            '' : 'username field is empty',
            passwordState: password ?
                            '' : 'password field is empty'
        });
        if (username && password) {
            request.post('/login', {
                username,
                password
            }).then((res) => {
                const message = res.message;
                if (message === 'incorrect username') {
                    this.setState({
                        usernameState: 'username is incorrect'
                    });
                } else if (message === 'Incorrect password') {
                    this.setState({
                        passwordState: 'password is incorrect'
                    });
                } else {
                    this.context.router.push('/');
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
        const {inputUsername, inputPassword, usernameState, passwordState, disableState } = this.state;
        return (
            <div>
                <form onSubmit={this._submitForm} className="my-form">
                    <ul>
                        <li>
                            <label htmlFor="username">Username</label>
                        </li>
                        <li>
                            <input type="text" name="username" onChange={ this._onChangeValue('inputUsername') } value={ inputUsername }/>
                            {usernameState?
                                (<span className="error">{ usernameState }</span>)
                                :
                                ('')
                            }
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                        </li>
                        <li>
                            <input type="password" name="password" onChange={ this._onChangeValue('inputPassword') } value={ inputPassword }/>
                            {passwordState?
                                (<span className="error">{ passwordState }</span>)
                                :
                                ('')
                            }
                        </li>
                        <li>
                            <input id="subm" type="submit" value="Login" className="button"/>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

Login.contextTypes = {
    location: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
}
