'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import MyForm from './MyForm.react.js';
import Authenticated from './Authenticated.react.js';
import { Link } from 'react-router';
import { isEmail } from '../validator.js';
import ArticleItem from './ArticleItem.react.js';
export default class UserPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                registrationDate: '',
                articles: []
            },
            editMessage: 'edit',
            isLoggedUser: false,
            isEditing: false
        }
    }

    shouldComponentUpdate () {
        // debugger;
        this._getState();
        return true;
    }

    _getState() {
        request.get(`/users/${ this.props.params.username }`).then((msg) => {
            // console.log('datas', msg)
            // debugger;
            // console.log(msg, msg.serverStatus);
            let state = {
                user: null,
                isLoggedUser: false
            };
            if (msg.message !== 'user not found') {
                state.user = msg;
                // debugger;
                if (msg._id === Authenticated.whoIsLogged.userId) {
                    state.isLoggedUser = true;
                }
            } else {
                if (this.props.params.username === 'home') {
                    // this.props.history.push('/');
                    this.context.router.push('/');
                }
            }
            this.setState(state);
        });
    }

    componentWillMount () {
        // console.log('here?')
        // debugger
        this._getState();

    }


    _onSubmit () {
        // debugger
        let self = this;
        const { whoIsLogged } = Authenticated;
        return function (e) {
            e.preventDefault();
            // console.log(this.state);
            const { newEmail, newPassword, newPasswordDupl } = this.state;
            let msg = {},
            errorState = {
                errorMsg: ''
            };
            if (newEmail) {

                if (!isEmail(newEmail)) {
                    errorState = {
                        errorMsg: 'Wrong email'
                    };
                } else {
                    msg.email = newEmail;
                }
            }
            if (newPassword) {
                if (newPassword !== newPasswordDupl) {
                    errorState = {
                        errorMsg: 'Passwords should match'
                    };
                } else {
                    msg.password = newPassword;
                }
            }
            if (Object.keys(msg).length > 0) {
                console.log('wil', whoIsLogged)
                request.put(`/users/${ whoIsLogged.username }`, msg).then(status => {
                    if (status.ok === 1) {
                        self.setState({
                            isEditing: false,
                            editMessage: 'edit'
                        });
                        self._getState();
                    } else {
                        this.setState({
                            errorMsg: 'Email is already used'
                        });
                    }
                });
            } else {
                if (errorState.errorMsg) {
                    this.setState(errorState);
                } else {
                    this.setState({
                        errorMsg: 'Email or password fields should not be empty'
                    });
                }
            }

        }
        // return true;
        // this.props.history.push('/');
    }

    _deleteHandler = () => {
        const { context } = this;
        const { whoIsLogged } = Authenticated;
        // debugger;
        return function(e) {
            // debugger;
            e.preventDefault();
            // context.notificator.success('Success', 'err', 2000);
            request.delete(`/users/${ whoIsLogged.username }`)
                .then(res => {
                    // console.log(res);
                    if (res.message) {
                        context.notificator.error('Error', res.message);
                    } else {
                        context.notificator.success('Success', 'Account deleted. Redirecting to main page...');
                        setTimeout(() => {
                            context.router.push('/');
                        }, 2000);
                    }
                });
        }
    }
    _onEditClick = (e) => {
        e.preventDefault();
        this.setState({
            isEditing: !this.state.isEditing,
            editMessage: this.state.isEditing ? 'edit' : 'back'
        });
    }
    render () {
        const {isEditing, isLoggedUser, user, editMessage } = this.state;

         // console.log(JSON.stringify(this.props))
        // console.log(isLoggedUser, user)
        // debugger
        // console.log(serverStatus)
        return (
            <div className="user-container">
                { user ?
                    (
                    <div>
                        <h2>{`${ user.username }\'s profile page`}
                            { isLoggedUser ?
                            (
                                <Link to="" className="edit-button" onClick={this._onEditClick}>{ editMessage }</Link>
                            ) :
                            ('')
                            }
                        </h2>
                        { !isEditing ?
                            (
                            <ul className="upperline">

                                <li>Registered: { user.registrationDate }</li>
                                <li>email: { user.email }</li>
                                <li>{
                                        user.articles.length > 0 ?
                                        (
                                        <div>
                                            <h3>user's articles:</h3>
                                            <ul>
                                                { user.articles.map((article, index) => {
                                                    return (
                                                        <li key={ index }>
                                                            <ArticleItem article={ article }/>
                                                        </li>
                                                    )
                                                }) }
                                            </ul>
                                        </div>)
                                        : (<h3>this user hasn't published any articles yet</h3>)
                                    }
                                </li>
                            </ul>
                            )
                            :
                            (
                                <MyForm initState={{newEmail: '', newPassword: '', newPasswordDupl: ''}}
                                      submitHandler={ this._onSubmit() }
                                      inputNames={['newEmail', 'newPassword', 'newPasswordDupl']}
                                      inputLabels={['New email', 'New password', 'Confrim your password']}
                                      inputTypes={['text', 'password', 'password']}
                                      submitValue="Update"
                                      >
                                      <span>
                                          <input id="pseudo-button" type="checkbox"/>
                                          <label htmlFor="pseudo-button" className="button">Delete user account</label>
                                          <span className="toggle">
                                              Do you really want to delete your account?
                                              <input type="button" className="button yesno" value="&#10003;" onClick={ this._deleteHandler() }/>
                                              <label htmlFor="pseudo-button" className="button yesno">&#10007;</label>
                                          </span>
                                      </span>
                                </MyForm>
                            )
                        }
                    </div>
                    )
                    :
                    ( <h1> 404 :{'('} </h1> )
                }
            </div>
        );
    }
}

UserPage.contextTypes = {
    router: React.PropTypes.object.isRequired,
    notificator: React.PropTypes.object
}
