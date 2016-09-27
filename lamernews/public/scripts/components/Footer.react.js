import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/footer.css';
export default class Footer extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <footer className="sticky-footer">
                <div className="float-right author">
                    <a href="https://github.com/rolling-scopes-school/AlexeyBarkow-front-end-course/tree/lamernews">
                        Author: Barkou Aliaksei
                    </a>
                </div>
            </footer>
        )
    }
}
