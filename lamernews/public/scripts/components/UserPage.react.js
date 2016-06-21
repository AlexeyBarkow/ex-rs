import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import '../../styles/user-page.css'

export default class UserPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            registrationDate: '',
            serverStatus: 200
        }
    }
    componentWillMount () {
        // console.log('here?')
        request.get(`/users/${ this.props.params.username }`)
            .then(msg => {
                // console.log(msg, msg.serverStatus);
                let state = {};

                if (msg.serverStatus) {
                    state.serverStatus = msg.serverStatus
                } else {
                    state = msg;
                }
                console.log(state);
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
    render () {
        const {serverStatus, username, email, registrationDate} = this.state;
        console.log(JSON.stringify(this.props))
        // console.log(serverStatus)
        return (
            <div className="user-container">
                { serverStatus === 200 ?
                    (
                        <div>
                            <h2>{`${ username }\'s profile page`}</h2>
                            <ul className="upperline">
                                <li>Registered: { registrationDate }</li>
                                <li>email: { email }</li>
                                <li>articles: coming soon!</li>
                            </ul>
                        </div>
                    )
                    :
                    ( <h1>{ serverStatus }</h1> )
                }
            </div>
        );
    }
}
