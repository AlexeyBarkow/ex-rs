import React from 'react';
import ReactDOM from 'react-dom';
import ArticleList from './ArticleList.react.js';
import ArticleDetails from './ArticleDetails.react.js';
import ArticleItem from './ArticleItem.react.js';
import ReactNotify from 'react-notify';

import '../../styles/article-list.css';
export default class ArticleView extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const startIndex = this.props.params.startIndex;
        const count = this.props.params.count;
        const sort = this.props.location.query.sort;
        const selectedNews = this.props.location.query.id;

        return (
            <div className="article-view">
                <ArticleList />
                {
                    selectedNews ?
                    (
                        <ArticleDetails id={ selectedNews }/>
                    )
                    :
                    ('')
                }

            </div>
        )
    }
}

// ArticleView.childContextTypes = {
//     startIndex: React.PropTypes.string,
//     count: React.PropTypes.string,
//     sort: React.PropTypes.string
// }

//
