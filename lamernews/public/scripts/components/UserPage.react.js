'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import '../../styles/user-page.css'
import MyForm from './MyForm.react.js';
// import

export default class UserPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                registrationDate: ''
            },
            isLoggedUser: false,
            isEditing: false
        }
    }

    shouldComponentUpdate () {
        return true;
    }
    componentWillMount () {
        // console.log('here?')
        // debugger
        Promise.all([
            request.get(`/users/${ this.props.params.username }`),
            request.get('/whoislogged')
        ]).then((msg) => {
            console.log('datas', msg)
            // debugger;
            // console.log(msg, msg.serverStatus);
            let state = {
                user: null,
                isLoggedUser: false
            };
            if (msg[0].message !== 'user not found') {
                state.user = msg[0];

                if (msg[0]._id === msg[1].userId) {
                    state.isLoggedUser = true;
                }
            } else {
                if (this.props.params.username === 'home') {
                    this.props.history.push('/');
                }
            }
            this.setState(state);

            // if (msg.serverStatus) {
            //     state.serverStatus = msg.serverStatus
            // } else {
            //     state = {
            //         username: msg.username,
            //         email: msg.email,
            //         registrationDate: msg.registrationDate,
            //         // isLoggedUsersPage: window.username === msg.username
            //     };
            // }

            // const serverStatus = msg['serverStatus'];
            // if (serverStatus !) {
            // console.log(<serverStatus></serverStatus>)
            // this.setState({
            //     serverStatus
            // });
            // }
        })
    }



    _onSubmit (e) {
        // debugger
        e.preventDefault();
        // console.log(this.state);
        const { newEmail, newPassword, newPasswordDupl } = this.state;
        return true;
        // this.props.history.push('/');
    }
    _onEditClick = (e) => {
        this.setState({
            isEditing : true
        });
    }
    render () {
        const {isEditing, isLoggedUser, user} = this.state;

         // console.log(JSON.stringify(this.props))
        console.log(isLoggedUser, user)
        // debugger
        // console.log(serverStatus)
        return (
            <div className="user-container">
                { user ?
                    (
                    <div>
                        <h2>{`${ user.username }\'s profile page`}</h2>
                        { !isEditing ?
                            (
                            <ul className="upperline">
                                <li>Registered: { user.registrationDate }</li>
                                <li>email: { user.email }</li>
                                <li>articles: coming soon!</li>
                                { isLoggedUser ?
                                (
                                    <li><button onClick={this._onEditClick}>Edit</button></li>
                                ) :
                                ('')
                                }
                            </ul>
                            )
                            :
                            (
                                <MyForm initState={{newEmail: '', newPassword: '', newPasswordDupl: ''}}
                                      submitHandler={ this._onSubmit }
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
