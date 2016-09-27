import React from 'react';
import ReactDOM from 'react-dom';
import CommentItem from './CommentItem.React.js';
import request from '../request.js';
export default class CommentView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            articleId: props.articleId,
            comments: props.comments,
            onCommentPost: props.onCommentPost,
            inputText: ''
        }
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            articleId: newProps.articleId,
            onCommentPost: newProps.onCommentPost,
            comments: newProps.comments
        });
    }
    _postComment = (e) => {
        e.preventDefault();
        const { context } = this;
        const { articleId, inputText, onCommentPost } = this.state;
        request.post(`/comment/${ articleId }`, {
            text: inputText
        }).then(onCommentPost);
    }

    _onTextType = (e) => {
        e.preventDefault();
        const newValue = e.target.value;
        this.setState({
            inputText: newValue
        })
    }

    render () {
        // debugger;
        const { comments, inputText, onCommentPost } = this.state;
        console.log(comments);
        return (
            <div className="comments-container">
            {
                comments.map((comment, ind) => {
                    return (
                        <CommentItem key={ind} comment={comment} onCommentDelete={ onCommentPost }></CommentItem>
                    )
                })
            }
                <form className="my-form comment-input" onSubmit={ this._postComment }>
                    <textarea placeholder="type your comment here" onChange={this._onTextType} value={ inputText }></textarea>
                    <input type="submit" className="button" value="Send"/>
                </form>
            </div>
        )
    }
}
