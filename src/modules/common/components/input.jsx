import React from 'react';
import classnames from 'classnames';
import shouldComponentUpdatePure from '../../../utils/should-component-update-pure';

/**
 *
 * 
 * Uses state as a source value of input. This is so 
 * 
 * Uses state as source for input value so while user is typing the value is not overwritten by props change, but as soon
 * 
 * If the component renders, we don't want to clear the state (edited)
 * so it checks whether the new re-render is the same value we got previously: `nextProps.value !== this.props.value`
 * the text in the component itself, might be different
 * saved in state
 * only on the blur or timeout does it update the props
 */
var Input = React.createClass({
	propTypes: {
		className: React.PropTypes.string,
		value: React.PropTypes.any,
		isMultiline: React.PropTypes.bool,
		isClearable: React.PropTypes.bool,
		debounceMS: React.PropTypes.number,
		onChange: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			value: this.props.value || '',
			timeoutID: ''
		};
	},

	/**
	 * Only update 
	 * 
	 * @param nextProps
     */
	componentWillReceiveProps: function(nextProps) {
		// todo(priecint): test this some more
		if ((nextProps.value || nextProps.value === 0) && nextProps.value !== this.state.value && nextProps.value !== this.props.value) {
			this.setState({ value: nextProps.value });
		}
	},

	shouldComponentUpdate: shouldComponentUpdatePure,

	render() {
		var p = this.props,
			s = this.state;
		return (
			<div className={ classnames('input', { 'clearable': p.isClearable !== false }, this.props.className) }>
				{ !p.isMultiline &&
				<input { ...this.props }
					className="box"
					type="text"
					value={ s.value }
					onChange={ this.handleOnChange }
					onBlur={ this.handleOnBlur } />
				}

				{ p.isMultiline &&
				<textarea { ...this.props }
					className="box"
					type="text"
					value={ s.value }
					onChange={ this.handleOnChange }
					onBlur={ this.handleOnBlur } />
				}

				{ !p.isMultiline && p.isClearable !== false &&
				<button className="clear"
						onClick={ this.handleClear }>&#xf00d;</button>
				}
			</div>
		);
	},

	handleOnChange: function (e) {
		var newValue = e.target.value;
		if (this.props.debounceMS !== 0) {
			clearTimeout(this.state.timeoutID);
			this.setState({ timeoutID: setTimeout(() => this.sendValue(newValue), this.props.debounceMS || 750) });
        }
        else {
            this.sendValue(newValue);
        }
        this.setState({ value: newValue });
    },

    handleOnBlur: function() {
        if (this.props.debounceMS !== 0) {
            clearTimeout(this.state.timeoutID);
            this.sendValue(this.state.value);
        }
    },

    handleClear: function() {
        this.setState({ value: '' });
        this.sendValue('');
    },

    sendValue: function(value) {
        this.props.onChange(value);
    }
});

module.exports = Input;