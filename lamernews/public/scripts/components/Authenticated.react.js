'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';

export default class Authenticated extends React.Component {
    constructor (props) {
        super(props);
        this.shouldDrawChildrenWhenAuthorized = props.val;
        this.state = {
            prevLogIn: window.loggedUserId
        }
    }
    whoAmI () {
        request.get('/whoislogged').then(res => {
            window.loggedUserId = res.userId;
            window.loggedUsername = res.username;
            console.log('ly',window.loggedUsername)
            this.setState({
                prevLogIn: window.loggedUserId
            });
            this.forceUpdate();
        });
    }
    componentWillMount () {
        // window.counter = 0;
        this.whoAmI();
    }

    shouldComponentUpdate () {
        return this.prevLogIn !== window.loggedUserId;
    }

    componentDidUpdate (_, n) {
        // console.log('up', ei, n)
        // window.counter++;
        // if (window.counter < 100) {
        if (n.prevLogIn !== window.loggedUserId) {
            this.setState({
                prevLogIn: window.loggedUserId
            });
        }
            // }
    }
    render () {
        console.log(window.loggedUsername)
        // const { shouldDrawChildrenNow } = this.state;
        const shouldDrawChildrenNow = this.state.prevLogIn ? !this.shouldDrawChildrenWhenAuthorized : this.shouldDrawChildrenWhenAuthorized;
        // console.log('should', shouldDrawChildrenNow);
        return shouldDrawChildrenNow ? (<span>{this.props.children}</span>) : (<span></span>);
    }

}
