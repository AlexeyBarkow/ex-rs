import React from 'react';
import ReactDOM from 'react-dom';
import request from '../request.js';
// import Router from 'react-router';
let Router = require('react-router');
import MyForm from './MyForm.react.js';

// console.log('router', Router)
export default class SubmitArticle extends React.Component {
    constructor (props) {
        super (props);
    }
    _submitHander () {
        // let self = this;
        let context = this.context;
        return function (e) {
            e.preventDefault();
            // this.context.router.transitionTo('../');
            // console.log(this.state);
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
                //for debug
                // console.log(this.context.router)
                // debugger;
                // if (this.context.router)
                request.post('/articles/', {
                    title,
                    link
                }).then(msg => {
                    if (msg.message === 'success') {
                        // console.log(this, self);
                        this.setState({
                            errorMsg: ''
                        });
                        // console.log(self);
                        // self.props.history.push('/');
                        // window.location.replace('/');
                        context.router.push('/');
                    } else {
                        // console.log(msg);
                        this.setState({
                            errorMsg: 'unhandled error'
                        });
                    }
                })
            }
        }

    }
    render(){
        // debugger;
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


// console.log('qw',SubmitArticle.contextTypes);
