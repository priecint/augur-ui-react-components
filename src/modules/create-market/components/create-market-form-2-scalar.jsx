import React from 'react';

import Input from '../../common/components/input';

module.exports = React.createClass({
	propTypes: {
		scalarSmallNum: React.PropTypes.string,
		scalarBigNum: React.PropTypes.string,

		onValuesUpdated: React.PropTypes.func
	},

	render: function() {
		var p = this.props;

		return (
			<div className="scalar">
				<h4>What are the minimum and maximum values allowed when answering?</h4>
				<p>
					The answer to your question must be a number that falls between the minimum and maximum
					values you're about to set.
				</p>

				<div className="scalar-num min">
					<label>Minimum</label>
					<Input
						type="text"
						value={ p.scalarSmallNum }
						placeholder="Minimum answer"
						maxLength={ 6 }
						onChange={ (value) => p.onValuesUpdated({ scalarSmallNum: value }) } />

					{ p.errors.scalarSmallNum &&
						<span className="error-message">{ p.errors.scalarSmallNum }</span>
					}
				</div>

				<div className="scalar-num min">
					<label>Maximum</label>
					<Input
						type="text"
						value={ p.scalarBigNum }
						placeholder="Maximum answer"
						maxLength={ 6 }
						onChange={ (value) => p.onValuesUpdated({ scalarBigNum: value }) } />

					{ p.errors.scalarBigNum &&
						<span className="error-message">{ p.errors.scalarBigNum }</span>
					}
				</div>
			</div>
		);
	},
});