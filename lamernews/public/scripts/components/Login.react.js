'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/login.css';
import request from '../request.js';

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
        // console.log(e.data);
        // e.preventDefault();
        const username = this.state.inputUsername;
        const password = this.state.inputPassword;
        // const username = e.data.username;
        // const password = e.data.password;
        this.setState({
            usernameState: username ?
                            '' : 'username field is empty',
            passwordState: password ?
                            '' : 'password field is empty'
        });

        if (username && password) {
            // console.log(next)
            // console.log(smth);
            request.post('/login', {
                username,
                password
            }).then((res) => {
                console.log(res);
                var message = res.message;
                if (message === 'incorrect username') {
                    this.setState({
                        usernameState: 'username is incorrect'
                    });
                } else if (message === 'Incorrect password') {
                    this.setState({
                        passwordState: 'password is incorrect'
                    });
                } else {
                    // console.log(success);
                    // // next();
                    // window.loggedUserId = res.id;
                    // window.loggedUsername = res.username;
                    console.log(res);
                    // Authenticated.whoAmI();
                    this.props.history.push('/');
                    // console.log(res);

                }

                //duct tape
                // setTimeout(() => {
                //     console.log('here')
                //     document.getElementById('subm').removeAttribute('disabled')
                // }, 100);
            });
        }
        // next(new Error('error'));

    }
    // _onChangeLoginValue = (e) => {
    //     this.setState({
    //         editingLoginValue: e.target.value
    //     });
    // }
    // _onChangePasswordValue = (e) => {
    //     this.setState({
    //         editingPasswordValue: e.target.value
    //     })
    // }

    _onChangeValue ( propertyName ) {
        return (e) => {
            let obj = {};
            obj[propertyName] = e.target.value
            this.setState(obj);
        }
    }
    render () {
        // const { editingLoginValue, editingPasswordValue } = this.state;
        const {inputUsername, inputPassword, usernameState, passwordState, disableState } = this.state;
        return (
            <div>
                <form onSubmit={this._submitForm}>
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
                            <input id="subm" type="submit" value="Login"/>
                        </li>
                    </ul>
                </form>
            </div>


        );
    }
}

//

// <form action={this._submitForm}>
//     <ul>
//         <li>
//
//             <label htmlFor=""></label>
//             <input value={ editingLoginValue }
//                    type="text"
//                    onChange={this._onChangeLoginValue}/>
//             <input type="submit"
//                    value="Log In"/>
//         </li>
//         <li>
//         </li>
//     </ul>
// </form>
