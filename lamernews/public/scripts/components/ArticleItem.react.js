import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import request from '../request.js';

export default class ArticleItem extends React.Component {
    constructor (props) {
        super(props);
        console.log('art',props.article);
        this.state = {
            article: props.article,
            reference: props.reference,
            whoIsLogged: props.whoIsLogged
        }
    }

    componentWillReceiveProps (newProps) {
        if (JSON.stringify(newProps.article) !== JSON.stringify(this.props.article)) {
            this.setState({
                article: newProps.article,
                reference: newProps.reference
            });
        }
    }
    // _getState () {
    //
    // }
    _liker = () => {
        // debugger;
        // console.log(this.state);
        let article = this.state.article;
        request.post(`/like/${ article._id }`).then(msg => {
            console.log('msg',msg);
            if (msg.message === 'not authenticated') {
                this.refs.notificator.error('Error', 'You should be logged in to perform this action', 4000);
            } else {
                console.log('old', article)
                const itemIndex = article.rating.indexOf(this.state.whoIsLogged.userId);
                if (itemIndex === -1) {
                    article.rating.push(this.state.whoIsLogged.userId);
                } else {
                    article.rating.splice(itemIndex, 1);
                }
                this.setState({
                    article: article
                })
                console.log('new', article)
                // this._getState();
            }
        });
    }

    render () {
        const { reference, article, whoIsLogged } = this.state;
        console.log('logged as', whoIsLogged)
        return (
            <div>
                <h3>
                    <Link to={ reference } className="big">
                        { article.title }
                    </Link>
                    <button className={
                            article.rating
                            .indexOf(whoIsLogged.userId) === -1 ?
                            'rating-up'
                            :
                            'rating-down'
                         }
                           onClick={ this._liker }></button>
                    <span   className="gray-small">
                        at <a href={
                        (article.link.slice(0,4) === 'http' ?
                            ''
                            :
                            'http://')
                            + article.link }
                            target="_blank">{ article.link }</a>
                    </span>
                </h3>
                <p>rating: { article.rateCount }, posted by <Link to={ `/users/${ article.username }` }>
                    { article.username }
                </Link> { article.creationDate }</p>
            </div>
        );
    }
}
