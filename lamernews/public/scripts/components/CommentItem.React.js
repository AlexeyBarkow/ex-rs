import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import Authenticated from './Authenticated.react.js';
import request from '../request.js';

export default class CommentItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            commentId: props.comment._id,
            commentText: props.comment.text,
            commentAuthor: props.comment.author,
            commentDate: props.comment.creationDate,
            onCommentDelete: props.onCommentDelete
        }
    }

    componentWillReceiveProps(newProps) {
        this.state = {
            commentId: newProps.comment._id,
            commentText: newProps.comment.text,
            commentAuthor: newProps.comment.author,
            commentDate: newProps.comment.creationDate,
            onCommentDelete: newProps.onCommentDelete
        }
    }

    _deleteComment = (e) => {
        e.preventDefault();
        const { commentId, onCommentDelete } = this.state;
        console.log(`/comment/${ commentId }`);
        request.delete(`/comment/${ commentId }`).then(onCommentDelete);
    }

    render () {
        const { commentText, commentAuthor, commentDate } = this.state;
        const { whoIsLogged } = Authenticated;
        return (
            <div className="comment">
                <h5>
                {
                    commentAuthor ?
                    <span>
                        <Link to={ `/users/${ commentAuthor.username }` }>
                            { commentAuthor.username }
                        </Link>
                    </span>
                    :
                    <span>Deleted user</span>
                } commented on { `${ dateFormat(commentDate, 'dd-mm-yyyy') } at ${ dateFormat(commentDate, 'hh:mm TT') }` }
                { whoIsLogged.userId === commentAuthor._id ? <button onClick={this._deleteComment} className="cross"></button> : <div></div> }
                </h5>
                <p>{ commentText }</p>
            </div>
        )
    }
}
