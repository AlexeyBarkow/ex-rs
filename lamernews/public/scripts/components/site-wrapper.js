import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/test-style.css';
import { Button } from 'react-bootstrap'

export default class SiteWrapper extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Button>Button</Button>
                {this.props.children}
            </div>
        );
    };
}

// module.exports = test;
