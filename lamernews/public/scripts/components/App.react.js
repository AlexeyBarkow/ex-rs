import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/global.css';
import Header from './Header.react.js';
import { Button } from 'react-bootstrap'

export default class App extends React.Component {
    constructor (props) {
        super(props);

        this.state ={
            inp: ''
        }
    }
    componentWillReceiveProps (nextProps) {
        console.log('next', nextProps.history);
    }
    _onChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            inp: e.target.value
        });
    }
    _click = (e) => {
        this.props.history.push(this.state.inp);
    }
    render() {
        const {inp} = this.state;
        // console.log(inp);
        return (
            <div>
                <Header/>
                <input type="text" value={ inp } onChange={this._onChange}/>
                <input type="button" value="goto" onClick={this._click}/>
                {this.props.children}
            </div>
        );
    };
}
