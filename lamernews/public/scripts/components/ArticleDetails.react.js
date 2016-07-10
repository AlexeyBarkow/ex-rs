'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ArticleItem from './ArticleItem.react.js';
import Authenticated from './Authenticated.react.js';
import request from '../request.js';
import { Link } from 'react-router';
import MyForm from './MyForm.react.js';
export default class ArticleDetails extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            article: null,
            isEditing: false,
            editMessage: 'edit'
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
        // console.log(2, newProps.id);
        // console.log(`/articles/${ this.props.id }`);
        request.get(`/articles/${ newProps.id }`).then(res => {
            // console.log(res);
            // debugger;
            // console.log(JSON.stringify(self.state.article) , JSON.stringify(res))
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
        this._setStandartEditingStatus();
        this._getArticle(newProps);
    }

    componentWillMount () {
        this._getArticle();
    }

    _setStandartEditingStatus = () => {
        this.setState({
            isEditing: false,
            editMessage: 'edit'
        });
    }
    _startEdit = (e) => {
        e.preventDefault();
        if (this.state.isEditing) {
            this._setStandartEditingStatus();
        } else {
            this.setState({
                isEditing: true,
                editMessage: 'back'
            })
        }
    }
    _onSubmit (e) {
        let self = this;
        return function (e) {
            e.preventDefault();
            // debugger;
            const { newTitle, newLink } = this.state;
            if (newTitle && newLink) {
                request.put(`/articles/${ this.props.articleId }`, {
                    title: newTitle,
                    link: newLink
                }).then(status => {
                    console.log(status);
                    // debugger;
                    if (status.message === 'success') {
                        // debugger;
                        self._setStandartEditingStatus();
                        self._getArticle();
                    } else {
                        this.setState({
                            errorMsg: status.message
                        })
                    }
                })
            } else {
                this.setState({
                    errorMsg: 'both fields should not be empty'
                })
            }
        }

    }

    _deleteHandler () {
        const { context } = this;
        const { _id } = this.state.article
        return function (e) {
            e.preventDefault();
            // debugger;
            // context.notificator.error('error', 'something wicked this way comes' + _id, 2000)
            request.delete(`/articles/${ _id }`).then(res => {
                console.log(res);
                if (res.ok === 1) {
                    context.notificator.success('Success', 'Article has been successfully deleted', 2000);
                    context.router.push('/');
                } else {
                    context.notificator.error('Error', res.message, 2000);
                }
            })
        }
    }
    render () {
        // debugger;
        const { article, isEditing, editMessage } = this.state;
        const { whoIsLogged } = Authenticated;
        // debugger;
        return this.state.article ?
        (
            <div className="article-details">
                 {
                    (article.author && whoIsLogged.userId === article.author._id) ?
                    (<Link to="" className="edit-button" onClick={this._startEdit}>{ editMessage }</Link>)
                    :
                    ('')
                }
                { isEditing ?
                  <MyForm initState={{ newTitle: article.title, newLink: article.link }}
                        submitHandler={ this._onSubmit() }
                        inputNames={['newTitle', 'newLink']}
                        inputLabels={['New title', 'New link']}
                        inputTypes={['text', 'text']}
                        submitValue="Save"
                        articleId={article._id}>
                        <span>
                            <input id="pseudo-button-article" type="checkbox"/>
                            <label htmlFor="pseudo-button-article" className="button">Delete article</label>
                            <span className="toggle">
                                Do you really want to delete this article?
                                <input type="button" className="button yesno" value="&#10003;" onClick={ this._deleteHandler() }/>
                                <label htmlFor="pseudo-button-article" className="button yesno">&#10007;</label>
                            </span>
                        </span>
                    </MyForm>
                    :
                  <ArticleItem article={ article }/>
                }
            </div>
        )
        :
        (<div></div>);
    }
}

ArticleDetails.contextTypes = {
    router: React.PropTypes.object.isRequired,
    notificator: React.PropTypes.object
}
