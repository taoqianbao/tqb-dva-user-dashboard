import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom'

var SayHi = React.createClass({
    getInitialState() {
        return {};
    },
    getDefaultProps() {
        return { from: 'pigcan' };
    },
    propTypes: {
        name: PropTypes.string.isRequired
    },
    render() {
        var name = this.props.name;
        return (<div>{from} says: hello {name} !</div>)
    }
});

ReactDOM.render(SayHi, document.getElementById('demo'))