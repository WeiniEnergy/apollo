import React from "react";

import WS from "store/websocket";

export default class Selector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            value: props.currentOption,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentOption !== this.props.currentOption) {
            this.setState({value: nextProps.currentOption});
        }
    }

    render() {
        const { name, options, currentOption, onChange } = this.props;

        this.entries = this.props.options.map(key => {
            return (
                <option value={key} key={key}>{key}</option>
            );
        });
        this.entries.unshift(
            <option key="none" value="none" disabled>
                {`-- ${this.state.name} --`}
            </option>
        );

        return (
            <div className="selector">
                <span className="arrow"></span>
                <select onChange={this.onChangeHandler} value={this.state.value}>
                    {this.entries}
                </select>
            </div>
        );
    }
}