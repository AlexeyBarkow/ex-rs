'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/global.css';
import Header from './Header.react.js';
import ArticleList from './ArticleList.react.js';
import ReactNotify from 'react-notify';
import Footer from './Footer.react.js';

const DEFAULT_DELAY = 3000;


export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            notificator: null
        }
    }
    getChildContext () {
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

    render() {
        return (
            <div>
                <div className="top-container">
                    <Header />
                    { this.props.children }
                    <ReactNotify ref={ (param) => {
                        this._notificator = param;
                        if (this._notificator) {
                            this._notificator.DEFAULT_DELAY = DEFAULT_DELAY;
                        }
                    }}></ReactNotify>
                </div>
                <div className="notify-container" />
                <Footer />
            </div>
        );
    };
}

App.childContextTypes = {
    notificator: React.PropTypes.object,
    location: React.PropTypes.object,
    params: React.PropTypes.object
}
