'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
// import { State } from 'react-router';
import { Link } from 'react-router';
import '../../styles/article-list.css';
import ArticleItem from './ArticleItem.react.js';
import ReactNotify from 'react-notify';

export default class ArticleList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            articles: [],
            totalLength: 0,
            notifications: [],
            whoIsLogged: null
        }
    }
    // componentWillReceiveProps (next, prev) {
    //     console.log('NEW');
    //     this._getState();
    //     // if (!this.isChanged) {
    //     //     this._getState();
    //     //     this.isChanged = true;
    //     // } else {
    //     //     this.isChanged = false;
    //     // }
    //
    // }
    // componentWillReceiveProps (newProps, prevState) {
    //     // console.log('props');
    //     this._getState(prevState, newProps.location.pathname +
    //         newProps.location.search);
    // }
    //
    // componentWillUpdate (newProps, prevState) {
    //     // console.log('upd');
    //     this._getState(prevState, newProps.location.pathname +
    //         newProps.location.search);
    // }
    componentWillReceiveProps(newProps) {
        // debugger;
        this._getState(newProps);
    }
    shouldComponentUpdate (nextProps, newState) {
        // debugger;
        if (JSON.stringify(this.state.articles) === JSON.stringify(newState.articles)) {
            return false;
        }
        return true;
    }

    _getState = (nextProps) => {
        // debugger;
        // // console.log('query', this.props.location.query);
        // console.log('state', this.state);
        // const prev = this.state.articles;
        // debugger;
        let currentState =  currentState || this.state;
        nextProps = nextProps || this.props;
        let newPath = `/articles/${ nextProps.startIndex }/${ nextProps.count }?sort=${ nextProps.sort }`;
        // debugger;
        // let self = this;
        Promise.all([
            request.get(newPath),
            request.get('/whoislogged')
        ]).then(res => {
            console.log(this.state.articles, res[0].articles);
            // debugger;

            // let state = this.state;
            // console.log('equal', res.articles, currentState.articles);
            // if (JSON.stringify(res.articles) !== JSON.stringify(currentState.articles)) {
            this.setState({
                articles: res[0].articles,
                totalLength: res[0].totalLength,
                whoIsLogged: res[1]
            });
        });


    }
    componentWillMount () {
        // console.log(this.props.query);
        this._getState();
    }



    render () {
        const { articles, totalLength, notifications, whoIsLogged } = this.state;
        const currStart = this.props.startIndex;
        const count = this.props.count;
        const search = '?sort=' + this.props.sort;
        // debugger;
        const prevStart = Math.max(0, currStart - count - 1);
        const nextStart = + currStart + (+ count) + 1;
        console.log('total',totalLength)
        return (
            <nav className="articles-nav">
                <ul>
                {
                    articles.map((article, index) => {
                        return (
                            <li key={index}>
                                <ArticleItem article={ article }
                                             reference={ `/articles/${ currStart }/${ count }/${ search }&id=${ article._id }` }
                                             whoIsLogged={ whoIsLogged } />
                            </li>
                        )
                    })
                }
                </ul>
                <div>
                    <Link to={`/articles/${ prevStart }/${ count }${ search }`}
                          className={prevStart < currStart ? "" : "non-active"}>Prev page</Link>
                    <Link to={`/articles/${ nextStart }/${ count }${ search }`}
                          className={nextStart < totalLength ? "" : "non-active"}>Next page</Link>
                  </div>
                <div className="notify-container">
                    <ReactNotify ref="notificator"></ReactNotify>
                </div>
            </nav>
        );
    }
}
