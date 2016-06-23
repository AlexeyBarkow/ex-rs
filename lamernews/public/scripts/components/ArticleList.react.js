'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
// import { State } from 'react-router';
import { Link } from 'react-router';
import '../../styles/article-list.css';
import ReactNotify from 'react-notify';

export default class ArticleList extends React.Component {
    constructor (props) {
        super(props);
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
    componentWillReceiveProps (newProps, prevState) {
        console.log('props');
        this._getState(prevState, newProps.location.pathname +
            newProps.location.search);
    }

    componentWillUpdate (newProps, prevState) {
        console.log('upd');
        this._getState(prevState, newProps.location.pathname +
            newProps.location.search);
    }
    _getState = (prev, newPath) => {
        // debugger;
        // // console.log('query', this.props.location.query);
        // console.log('state', this.state);
        // const prev = this.state.articles;
        prev = prev || {articles: []};
        newPath = newPath || `/articles/${ this.props.params.startIndex }/${ this.props.params.count }?sort=${ this.props.location.query.sort }`;
        // debugger;
        let self = this;
        request.get(newPath)
            .then(res => {
                let state = this.state;
                console.log('equal', res.articles, prev.articles);
                if (JSON.stringify(res.articles) !== JSON.stringify(prev.articles)) {
                    this.setState({
                        articles: res.articles,
                        totalLength: res.totalLength
                    });
                }
            });
    }
    componentWillMount () {
        // console.log(this.props.query);
        this._getState();
    }


    _liker (index) {
        let self = this;
        let i = index;
        return function (e) {
            const articleId = self.state.articles[i]._id;
            console.log('fuck',i, articleId);
            request.post(`/like/${ articleId }`).then(msg => {
                console.log('msg',msg);
                // self.forceUpdate();
                // debugger;
                // console.log(ReactNotify.succes
                // console.log(self);
                if (msg.message === 'not authenticated') {
                    self.refs.notificator.error('Error', 'You should be logged in to perform this action', 4000);
                } else {
                    self._getState();
                }

            })
        }
    }
    render () {
        const { articles, totalLength, notifications } = this.state;
        const currStart = this.props.params.startIndex;
        const count = this.props.params.count;
        const search = this.props.location.search;

        const prevStart = Math.max(0, currStart - count);
        const nextStart = + currStart + (+ count);
        console.log('next', nextStart,'prev', prevStart)
        return (
            <div>
                {
                    articles.map((article, index) => {
                        return (
                            <section key={index}>
                                <h3>
                                    <span className="big">
                                        { article.title }
                                    </span>
                                    <button className={
                                            article
                                            .rating
                                            .indexOf(window.loggedUserId) === -1 ?
                                            'rating-up'
                                            :
                                            'rating-down'
                                         }
                                           onClick={this._liker(index)}></button> <span className="gray-small">at <a href={ (article.link.slice(0,4) === 'http' ? '' : 'http://') + article.link } target="_blank">{ article.link }</a> </span> </h3>
                                       <p>rating: { article.rateCount }, posted by { article.author } { article.creationDate }</p>
                            </section>
                        )
                    })
                }
                <section>
                    <Link to={`/articles/${ prevStart }/${ count }${ search }`}
                          className={prevStart < currStart ? "" : "non-active"}>Prev page</Link>
                    <Link to={`/articles/${ nextStart }/${ count }${ search }`}
                          className={nextStart < totalLength ? "" : "non-active"}>Next page</Link>
                </section>
                <div className="notify-container">
                    <ReactNotify ref="notificator"></ReactNotify>
                </div>
            </div>
        );
    }
}
