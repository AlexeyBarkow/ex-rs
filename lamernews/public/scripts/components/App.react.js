import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/global.css';
import Header from './Header.react.js';
import { Button } from 'react-bootstrap'

export default class App extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header></Header>
                {this.props.children}
            </div>
        );
    };
}
