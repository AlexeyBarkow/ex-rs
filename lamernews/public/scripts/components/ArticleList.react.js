'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import { Link } from 'react-router';
import ArticleItem from './ArticleItem.react.js';

export default class ArticleList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            articles: [],
            totalLength: 0,
            notifications: []
        }
    }

    componentWillReceiveProps(newProps, nextContext) {
        this._getState(nextContext);
    }
    shouldComponentUpdate (nextProps, newState) {
        if (newState !== this.state) {
            return true;
        }
        if (JSON.stringify(this.state.articles) === JSON.stringify(newState.articles)) {
            return false;
        }
        return true;
    }

    _getState = (nextContext) => {
        let currentState =  currentState || this.state;
        nextContext = nextContext || this.context;
        let newPath = `/articles/${ nextContext.params.startIndex }/${ nextContext.params.count }${ nextContext.location.search }`;
        request.get(newPath).then(res => {
            this.setState({
                articles: res.articles,
                totalLength: res.totalLength,
            });
        });


    }
    componentWillMount () {
        this._getState();
    }



    render () {
        const { articles, totalLength } = this.state;
        const { startIndex, count } = this.context.params;
        const search = this.context.location.search;
        const prevStart = Math.max(0, startIndex - count - 1);
        const nextStart = + startIndex + (+ count) + 1;
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
                <div className="article-links">
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
