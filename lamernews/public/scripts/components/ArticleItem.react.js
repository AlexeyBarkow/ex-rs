import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Authenticated from './Authenticated.react.js';
import request from '../request.js';
import dateFormat from 'dateformat';
// let x = Authenticated.Authenticated.whoIsLogged || {};


export default class ArticleItem extends React.Component {
    constructor (props) {
        // debugger;
        super(props);
        // console.log('art',props.article);
        this.state = {
            article: props.article
        }
    }

    componentWillReceiveProps (newProps) {
        // debugger;
        if (JSON.stringify(newProps.article) !== JSON.stringify(this.props.article)) {
            this.setState({
                article: newProps.article
            });
        }
    }
    // _getState () {
    //
    // }
    _liker = (e) => {
        e.preventDefault();
        // debugger;
        // console.log(this.state);
        let article = this.state.article;
        let self = this;
        request.post(`/like/${ article._id }`).then(msg => {
            // console.log('msg',msg);
            if (msg.message === 'not authenticated') {
                self.context.notificator.error('Error', 'You should be logged in to perform this action', 4000);
            } else {
                // console.log('old', article)
                const itemIndex = article.rating.indexOf(Authenticated.whoIsLogged.userId);
                if (itemIndex === -1) {
                    article.rating.push(Authenticated.whoIsLogged.userId);
                } else {
                    article.rating.splice(itemIndex, 1);
                }
                this.setState({
                    article: article
                })
                // console.log('new', article)
                // this._getState();
            }
        });
    }

    render () {
        const { article } = this.state;
            // console.log('logged as', Authenticated.whoIsLogged)
        const { whoIsLogged } = Authenticated;
        // const
        // debugger;
        const { pathname } = this.context.location;
        let query = {};
        // debugger;
        for (let i in this.context.location.query) {
            query[i] = this.context.location.query[i];
        }
        query.id = article._id;
        // debugger;
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
                //         posted by <Link to={
                //         article.author ?
                //         `/users/${ article.author.username }`
                //         : ''
                //     } className={ article.author ? '' :  }>
                //     {  article.author ? article.author.username : '[deleted]'}
                // </Link>
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
