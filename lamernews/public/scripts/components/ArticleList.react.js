'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import { Link } from 'react-router';
import '../../styles/article-list.css'
export default class ArticleList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            articles: []
        }
        this.isChanged = false;
    }
    componentWillReceiveProps (next) {
        // console.log('prev', prev, 'next', next);
        if (!this.isChanged) {
            this._getState();
            this.isChanged = true;
        } else {
            this.isChanged = false;
        }
    }
    _getState = () => {
        // debugger;
        console.log('query', this.props.location.query);
        request.get(`/articles/${ this.props.params.startIndex }/${ this.props.params.count }?sort=${ this.props.location.query.sort }`).then(res => {
            this.setState({
                articles: res
            });
        })
    }
    componentWillMount () {
        // console.log(this.props.query);
        this._getState();
    }
    render () {
        const { articles } = this.state;
        console.log('context', this.context);
        return (
            <div>
                {
                    articles.map((article, index) => {
                        return (
                            <section key={index}>
                                <h3><span className="big">{ article.title }</span><button className={ 'rating-up' }></button> <span className="gray-small">at <a href={ (article.link.slice(0,4) === 'http' ? '' : 'http://') + article.link } target="_blank">{ article.link }</a> </span> </h3>
                                <p>rating: { article.rateCount }, posted { article.creationDate }</p>
                            </section>
                        )
                    })
                }

            </div>
        );
    }
}
