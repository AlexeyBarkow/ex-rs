import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';

export default class ArticleDetails extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            article: null,
            isCreatedByLoggedUser: false
        }
    }

    _getArticle () {
        Promise.all([
            request.get(`/articles/${ this.props.id }`),
            request.get(`/whoislogged`)
        ]).then(res => {
            // console.log(res);
            if (JSON.stringify(this.state.articles) !== JSON.stringify(res[0])){
                this.setState({
                    article: res[0],
                    isCreatedByLoggedUser: res[0].author === res[1]._id
                });
            }
        });

    }

    componentWillReceiveProps () {
        this._getArticle();
    }

    componentWillMount () {
        this._getArticle();
    }

    render () {
        // debugger;
        const { article } = this.state;
        return this.state.article ?
        (
            <div>

            </div>
        )
        :
        (<div></div>);
    }
}
