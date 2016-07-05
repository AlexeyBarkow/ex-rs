'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
// import { State } from 'react-router';
import { Link } from 'react-router';
import '../../styles/article-list.css';
import ArticleItem from './ArticleItem.react.js';

export default class ArticleList extends React.Component {
    constructor (props) {
        super(props);
        console.log(this.props)
        this.state = {
            articles: [],
            totalLength: 0,
            notifications: []
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
    componentWillReceiveProps(newProps, nextContext) {
        // debugger;
        this._getState(nextContext);
    }
    shouldComponentUpdate (nextProps, newState) {
        // debugger;
        if (newState !== this.state) {
            return true;
        }
        if (JSON.stringify(this.state.articles) === JSON.stringify(newState.articles)) {
            return false;
        }
        return true;
    }

    _getState = (nextContext) => {
        // debugger;
        // // console.log('query', this.props.location.query);
        // console.log('state', this.state);
        // const prev = this.state.articles;
        // debugger;
        let currentState =  currentState || this.state;
        // nextProps = nextProps || this.props;
        nextContext = nextContext || this.context;
        let newPath = `/articles/${ nextContext.params.startIndex }/${ nextContext.params.count }${ nextContext.location.search }`;
        // debugger;
        // let self = this;
        request.get(newPath).then(res => {
            // console.log(this.state.articles, res.articles);
            // debugger;

            // let state = this.state;
            // console.log('equal', res.articles, currentState.articles);
            // if (JSON.stringify(res.articles) !== JSON.stringify(currentState.articles)) {
            this.setState({
                articles: res.articles,
                totalLength: res.totalLength,
            });
        });


    }
    componentWillMount () {
        // console.log(this.props.query);
        this._getState();
    }



    render () {
        // debugger;
        const { articles, totalLength } = this.state;
        const { startIndex, count } = this.context.params;
        const search = this.context.location.search;
        // const count = this.context.count;
        // const search = this.context.sort ? '?sort=' + this.context.sort : '';
        // debugger;
        const prevStart = Math.max(0, startIndex - count - 1);
        const nextStart = + startIndex + (+ count) + 1;
        // console.log('total',totalLength)
        return (
            <nav className="articles-nav">
                <ul>
                {
                    articles.map((article, index) => {
                        return (
                            <li key={index}>
                                <ArticleItem article={ article } />
                            </li>
                        )
                    })
                }
                </ul>
                <div>
                    <Link to={ `/articles/${ prevStart }/${ count }${ search }` }
                          className={prevStart < startIndex ? "" : "non-active"}>Prev page</Link>
                      <Link to={ `/articles/${ nextStart }/${ count }${ search }` }
                          className={nextStart < totalLength ? "" : "non-active"}>Next page</Link>
                  </div>

            </nav>
        );
    }
}
ArticleList.contextTypes = {
    params: React.PropTypes.object,
    location: React.PropTypes.object
}
