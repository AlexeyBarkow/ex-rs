import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import Authenticated from './Authenticated.react.js';
import request from '../request.js';

export default class ArticleItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            article: props.article
        }
    }

    componentWillReceiveProps (newProps) {
        if (JSON.stringify(newProps.article) !== JSON.stringify(this.props.article)) {
            this.setState({
                article: newProps.article
            });
        }
    }

    _liker = (e) => {
        e.preventDefault();
        let article = this.state.article;
        let self = this;
        request.post(`/like/${ article._id }`)
            .then(msg => {
                if (msg.message === 'not authenticated') {
                    self.context.notificator.error('Error', 'You should be logged in to perform this action', 4000);
                } else {
                    const itemIndex = article.rating.indexOf(Authenticated.whoIsLogged.userId);
                    if (itemIndex === -1) {
                        article.rating.push(Authenticated.whoIsLogged.userId);
                    } else {
                        article.rating.splice(itemIndex, 1);
                    }
                    this.setState({
                        article: article
                    });
                }
            });
    }

    render () {
        const { article } = this.state;
        const { whoIsLogged } = Authenticated;
        const { pathname } = this.context.location;
        let query = {};
        for (let i in this.context.location.query) {
            query[i] = this.context.location.query[i];
        }
        query.id = article._id;
        return (
            <div>
                <h3>
                    <Link to={{ pathname, query }} className="big">
                        { article.title }
                    </Link>
                    <Link to="" className={
                            article.rating
                            .indexOf(whoIsLogged.userId) === -1 ?
                            'rating-up'
                            :
                            'rating-down'
                         }
                           onClick={ this._liker }></Link>
                    <span className="gray-small">
                        at <a href={
                        (article.link.slice(0,4) === 'http' ?
                            ''
                            :
                            'http://')
                            + article.link }
                            target="_blank">{ article.link }</a>
                    </span>
                </h3>
                <p>rating: { article.rating.length },
                    {
                        article.author ?
                            <span> posted by <Link to={ `users/${ article.author.username }` }>
                                          { article.author.username }
                                      </Link>
                            </span>
                            :
                            <span> author account deleted</span>
                    } { dateFormat(article.creationDate, 'yyyy-mm-dd, hh:mm TT') }</p>
            </div>
        );
    }
}

ArticleItem.contextTypes = {
    location: React.PropTypes.object,
    params: React.PropTypes.object,
    notificator: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
}
