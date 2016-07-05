'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';

let whoIsLogged = {};

export default class Authenticated extends React.Component {
    constructor (props) {
        super(props);
        this.shouldDrawChildrenWhenAuthorized = props.val;
        this.state = {
            isLogged: false
        }
    }
    static get whoIsLogged () {
        return whoIsLogged;
    }
    whoAmI () {
        let self = this;
        request.get('/whoislogged').then(res => {
            // console.log('ly',window.loggedUsername)
            // console.log('am i logged', self.state.isLogged,!!res.username);
            if (self.state.isLogged !== !!res.username) {
                // console.log('receive new state');
                self.setState({
                    // prevLogIn: window.loggedUserId
                    isLogged: !!res.username
                });
                whoIsLogged = res.username ? res : null;
                // console.log('now logged user is ', whoIsLogged);
                self.forceUpdate();
            }

        });
    }
    componentWillMount () {
        // window.counter = 0;
        this.whoAmI();
    }

    shouldComponentUpdate (nextProps, newState) {
        // return this.prevLogIn !== window.loggedUserId;
        // console.log('new props', newState.isLogged !== this.state.isLogged);
        this.whoAmI();
        // return this.state.isLogged === ;
        return newState.isLogged !== this.state.isLogged;
    }

    // componentDidUpdate (_, n) {
    //     // console.log('up', ei, n)
    //     // window.counter++;
    //     // if (window.counter < 100) {
    //     if (n.prevLogIn !== window.loggedUserId) {
    //         this.setState({
    //             prevLogIn: window.loggedUserId
    //         });
    //     }
    //         // }
    // }
    render () {
        // console.log('render auth', this.state.isLogged)
        // const { shouldDrawChildrenNow } = this.state;
        const shouldDrawChildrenNow = this.state.isLogged ? !this.shouldDrawChildrenWhenAuthorized : this.shouldDrawChildrenWhenAuthorized;
        // console.log('should', shouldDrawChildrenNow);
        return shouldDrawChildrenNow ? (<div>{this.props.children}</div>) : (<div></div>);
    }
}
