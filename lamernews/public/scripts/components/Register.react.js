import React from 'react';
import ReactDOM from 'react-dom';
import { RegistrationForm } from 'react-stormpath';
import '../../styles/login.css';
import request from '../request.js';

function isEmail(string) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
}

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
            inputPasswordConfrim: ''
        };
    }
    _submitForm = (e) => {
        // debugger;
        e.preventDefault();
        console.log('eve', e.data);

        let { inputUsername, inputEmail, inputPassword, inputPasswordConfrim } = this.state;
        let state = {
            usernameState: '',
            emailState: '',
            passwordState: ''
        };
        if (!inputUsername) {
            state.usernameState = 'username field should be not empty';
            this.setState(state);
            // next('error');
        } else if (!inputEmail) {
            state.emailState = 'email should be not empty';
            this.setState(state);
            // next('error');
        } else if (!isEmail(inputEmail)) {
            state.emailState = 'wrong email';
            this.setState(state);
            // next('error');
        } else if (inputPassword !== inputPasswordConfrim) {
            state.passwordState = 'passwords does not match';
            this.setState(state);
            // next('error');
        } else {
            request.post('/register', {
                username: inputUsername,
                password: inputPassword,
                email: inputEmail
            }).then((msg) => {
                console.log(msg);
                //todo add some error handling here
            });
            // console.log(next(null, {
            //     username: inputUsername,
            //     password: inputPassword,
            //     email: inputEmail
            // }))

        }
        // console.log(state);
    }

    _onChangeValue ( propertyName ) {
        return (e) => {
            let obj = {};
            obj[propertyName] = e.target.value
            this.setState(obj);
        }
    }
    render () {
        const { inputUsername, inputEmail, inputPassword, inputPasswordConfrim, usernameState, emailState, passwordState } = this.state;

        return (
            <form  onSubmit={ this._submitForm }>
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
                        <input type="submit" value="Register"/>
                    </li>
                </ul>
            </form>
        );
    }
}
