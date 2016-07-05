'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/global.css';
import Header from './Header.react.js';
import ArticleList from './ArticleList.react.js';
// import { Button } from 'react-bootstrap'
import ReactNotify from 'react-notify';
export default class App extends React.Component {
    constructor (props) {
        super(props);
        // console.log (context)
        // this.context.loggedUserId = '';
        // console.log(this.context,Object.keys(this.context));
        // this._loggedUserId = '';
        this.state = {
            notificator: null
        }
    }
    getChildContext () {
        // debugger;
        return {
            notificator: this.state.notificator,
            location: this.props.location,
            params: this.props.params
        }
    }
    componentDidMount () {
        this.setState({
            notificator: this._notificator
        })
    }
    // shouldComponentUpdate () {
    //     debugger;
    //     return true;
    // }
    // getChildContext () {
    //     return {
    //         loggedUserId: this._loggedUserId
    //     }
    // }
    // componentWillReceiveProps (nextProps) {
    //     console.log('next', nextProps.history);
    // }
    // static contextTypes = {
    //     loggedUserId: React.PropTypes.string
    // }
    render() {
        // const {inp} = this.state;
        // console.log(inp);
        // console.log(this.context);
        return (
            <div class="top-container">
                <Header/>
                { this.props.children }
                <div className="notify-container">
                    <ReactNotify ref={ (param) => { this._notificator = param; }}></ReactNotify>
                </div>
            </div>
        );
    };
}

App.childContextTypes = {
    notificator: React.PropTypes.object,
    location: React.PropTypes.object,
    params: React.PropTypes.object
}
// <input type="text" value={ inp } onChange={this._onChange}/>
// <input type="button" value="goto" onClick={this._click}/>
