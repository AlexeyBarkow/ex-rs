'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import '../../styles/user-page.css'
import MyForm from './MyForm.react.js';

export default class UserPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            registrationDate: '',
            serverStatus: 200,
            //isLoggedUsersPage: false,//change to false later
            isEditing: false
        }
    }


    componentWillMount () {
        // console.log('here?')
        // debugger
        request.get(`/users/${ this.props.params.username }`)
            .then(msg => {
                // debugger;
                // console.log(msg, msg.serverStatus);
                let state = {};

                if (msg.serverStatus) {
                    state.serverStatus = msg.serverStatus
                } else {
                    state = {
                        username: msg.username,
                        email: msg.email,
                        registrationDate: msg.registrationDate,
                        // isLoggedUsersPage: window.username === msg.username
                    };
                }
                console.log('state',state, window.username);
                this.setState(state);
                // const serverStatus = msg['serverStatus'];
                // if (serverStatus !) {
                // console.log(<serverStatus></serverStatus>)
                // this.setState({
                //     serverStatus
                // });
                // }
            });
    }



    _onSubmit (e) {
        // debugger
        console.log(this.state);
        return false;
        // this.props.history.push('/');
    }
    _onEditClick = (e) => {
        this.setState({
            isEditing : true
        });
    }
    render () {
        const {isEditing, serverStatus, username, email, registrationDate} = this.state;
        // console.log(JSON.stringify(this.props))
        console.log(isEditing)
        // debugger
        // console.log(serverStatus)
        return (
            <div className="user-container">
                { serverStatus === 200 ?
                    (
                    <div>
                        <h2>{`${ username }\'s profile page`}</h2>
                        { !isEditing ?
                            (
                            <ul className="upperline">
                                <li>Registered: { registrationDate }</li>
                                <li>email: { email }</li>
                                <li>articles: coming soon!</li>
                                { window.loggedUsername === username ?
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
                    ( <h1>{ serverStatus }</h1> )
                }
            </div>
        );
    }
}
