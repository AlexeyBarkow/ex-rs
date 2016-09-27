import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
import MyForm from './MyForm.react.js';

export default class SubmitArticle extends React.Component {
    constructor (props) {
        super (props);
    }
    _submitHander () {
        let context = this.context;
        return function (e) {
            e.preventDefault();
            const title = this.state.title;
            const link = this.state.link
            if (!title){
                this.setState({
                    errorMsg: 'title should not be empty'
                });
            } else if (!link) {
                this.setState({
                    errorMsg: 'article link should not be empty'
                });
            } else {
                request.post('/articles/', {
                    title,
                    link
                }).then(msg => {
                    if (msg.message === 'success') {
                        this.setState({
                            errorMsg: ''
                        });
                        context.router.push('/');
                    } else {
                        this.setState({
                            errorMsg: 'unhandled error'
                        });
                    }
                })
            }
        }

    }
    render(){
        return (
            <div>
                <MyForm
                    initState={{title: '', link: ''}}
                    inputNames={['title', 'link']}
                    inputLabels={['Article title', 'Article link']}
                    inputTypes={['text', 'text']}
                    submitValue="Create new article"
                    submitHandler={this._submitHander()}>
                </MyForm>
            </div>
        );
    }
}

SubmitArticle.contextTypes = {
    router: React.PropTypes.object.isRequired
}
