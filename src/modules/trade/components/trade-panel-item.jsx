import React from 'react';
import classnames from 'classnames';

import { Clickable } from '../../common/components/clickable';
import ValueDenomination from '../../common/components/value-denomination';
import Input from '../../common/components/input';

let TradePanelItem = React.createClass({
	propTypes: {
		className: React.PropTypes.string,
		name: React.PropTypes.string,

		numShares: React.PropTypes.number,
		limitPrice: React.PropTypes.number,

		lastPrice: React.PropTypes.object,
		topBid: React.PropTypes.object,
		topAsk: React.PropTypes.object,
		feeToPay: React.PropTypes.object,

		tradeSummary: React.PropTypes.object,

		sharesOwned: React.PropTypes.number,
		etherAvailable: React.PropTypes.number,

		updateTradeOrder: React.PropTypes.func
	},

	render: function() {
		var p = this.props;
		return (
			<div className={ classnames('trade-panel-item', p.className) }>

				<span className="outcome-name">{ p.name }</span>
				<ValueDenomination className="last-price" { ...p.lastPrice } />
				<Clickable onClick={() => { p.updateTradeOrder(p.id, undefined,  p.topBid.value) }}>
					<ValueDenomination className="top-bid" { ...p.topBid } />
				</Clickable>
				<Clickable onClick={() => { p.updateTradeOrder(p.id, undefined, p.topAsk.value) }}>
					<ValueDenomination className="top-ask" { ...p.topAsk } />
				</Clickable>

				<Input
					className="num-shares"
					type="text"
					value={ p.numShares }
					isClearable={ false }
					onChange={ (value) => p.updateTradeOrder(p.id, parseFloat(value) || 0, undefined) } />

				<Input
					className="limit-price"
					type="text"
					value={ p.limitPrice }
					isClearable={ false }
                    onChange={ (value) => p.updateTradeOrder(p.id, undefined, parseFloat(value) || 0) } />

                <ValueDenomination className="fee-to-pay" { ...p.feeToPay } />
                <ValueDenomination className="total-cost" { ...p.profitLoss } />
            </div>
        );
    }
});

module.exports = TradePanelItem;