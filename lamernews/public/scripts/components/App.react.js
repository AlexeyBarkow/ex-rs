'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/global.css';
import Header from './Header.react.js';
// import { Button } from 'react-bootstrap'

export default class App extends React.Component {
    constructor (props) {
        super(props);
        // console.log (context)
        // this.context.loggedUserId = '';
        // console.log(this.context,Object.keys(this.context));
        // this._loggedUserId = '';
    }
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
            <div>
                <Header/>

                { this.props.children }
            </div>
        );
    };
}
// <input type="text" value={ inp } onChange={this._onChange}/>
// <input type="button" value="goto" onClick={this._click}/>
