import React from 'react';
import ReactDOM from 'react-dom';
import ArticleList from './ArticleList.react.js';
import ArticleDetails from './ArticleDetails.react.js';
import ArticleItem from './ArticleItem.react.js';
export default class ArticleView extends React.Component {
    constructor (props) {
        super(props);
    }


    render () {
        const startIndex = this.props.params.startIndex;
        const count = this.props.params.count;
            console.log(this.props);
        const sort = this.props.location.query.sort;
        const selectedNews = this.props.location.query.id;
        // console.log('qwe',startIndex, count, sort);
            // debugger;
        console.log(1, selectedNews)

        return (
            <div className="article-view">
                <ArticleList startIndex={ startIndex }
                             count={ count }
                             sort={ sort } />
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

//
