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
            if (self.state.isLogged !== !!res.username) {
                self.setState({
                    isLogged: !!res.username
                });
                whoIsLogged = res.username ? res : {};
                self.forceUpdate();
            }

        });
    }
    componentWillMount () {
        this.whoAmI();
    }

    shouldComponentUpdate (nextProps, newState) {
        this.whoAmI();
        return newState.isLogged !== this.state.isLogged;
    }

    render () {
        const shouldDrawChildrenNow = this.state.isLogged ?
            !this.shouldDrawChildrenWhenAuthorized : this.shouldDrawChildrenWhenAuthorized;
        return shouldDrawChildrenNow ? (<div>{this.props.children}</div>) : (<div></div>);
    }
}
