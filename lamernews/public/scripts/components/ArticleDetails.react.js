'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ArticleItem from './ArticleItem.react.js';
import Authenticated from './Authenticated.react.js';
import request from '../request.js';

export default class ArticleDetails extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            article: null,
            isCreatedByLoggedUser: false
        }
    }


    // shouldComponentUpdate () {
    //     this._getArticle();
    //     return true;
    // }
    // componentWillReceiveProps () {
    //     debugger;
    //     console.log(2);
    // }

    _getArticle (newProps) {
        let self = this;
        newProps = newProps || this.props;
        // debugger;
        console.log(2, newProps.id);
        // console.log(`/articles/${ this.props.id }`);
        request.get(`/articles/${ newProps.id }`).then(res => {
            // console.log(res);
            // debugger;
            console.log(JSON.stringify(self.state.article) , JSON.stringify(res))
            if (JSON.stringify(self.state.article) !== JSON.stringify(res)){
                self.setState({
                    article: res,
                    isCreatedByLoggedUser: res.author === Authenticated.whoIsLogged._id
                });
                self.forceUpdate();
            }
        });

    }

    componentWillReceiveProps (newProps) {
        // debugger;
        this._getArticle(newProps);
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
                <ArticleItem article={ article }/>
            </div>
        )
        :
        (<div></div>);
    }
}
