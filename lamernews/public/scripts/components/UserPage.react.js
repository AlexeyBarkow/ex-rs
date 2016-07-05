'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import '../../styles/user-page.css'
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
                                <li>articles:
                                    <ul>
                                        { user.articles.map((article, index) => {
                                            return (
                                                <li key={ index }>
                                                    <ArticleItem article={ article }/>
                                                </li>
                                            )
                                        }) }
                                    </ul>
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
                                      <input type="button" value="Delete user account"/>
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
    router: React.PropTypes.object.isRequired
}
