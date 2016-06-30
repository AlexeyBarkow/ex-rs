'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/form-style.css'
export default class MyForm extends React.Component {
    constructor (props) {
        super(props);
        // debugger;
        console.log('props',props);
        let self = this;
        this.state = props.initState;
        this.state.errorMsg = '';
        if (props.submitHandler) {
            this._onSubmitHandler = props.submitHandler.bind(this);
        } else {
            this._onSubmitHandler = function() {
                console.log(self.state);
                return true;
            }
        }
        this.inputNames = props.inputNames;
        this.inputLabels = props.inputLabels || props.inputNames;
        this.inputTypes = props.inputTypes;
        this.submitValue = props.submitValue;
    }

    _onChangeValue ( propertyName ) {
        return (e) => {
            let obj = {};
            obj[propertyName] = e.target.value
            this.setState(obj);
        }
    }
    render () {
        const state = this.state;
        // debugger
        return (
            <div>
                <form onSubmit={ this._onSubmitHandler }>
                    <ul>
                    {
                        this.inputNames.map((name, index) => {
                            return (
                                <li>
                                    <label>{ this.inputLabels[index] }</label>
                                    <input type={this.inputTypes[index]}
                                           key={ name }
                                           name={ name }
                                           value={ state[name] }
                                           onChange={ this._onChangeValue(name) }
                                           />
                                </li>
                            );
                        })
                    }
                        <li>
                            { this.props.children }
                            <span className="error">{ this.state.errorMsg }</span>
                        </li>
                        <li>
                            <input type="submit" value={ this.submitValue }/>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}
MyForm.contextTypes = {
    router: React.PropTypes.func.isRequired
}
