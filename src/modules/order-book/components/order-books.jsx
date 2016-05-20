import React from 'react';

import OrderBook from '../../order-book/components/order-book';

const OrderBooks = React.createClass({
    propTypes: {
        market: React.PropTypes.object
    },

    render: function() {
        var p = this.props;
        return (
            <div className="order-books">
                {
                    p.market.outcomes.map(outcome => {
                        return (
                            <OrderBook
                                key={`order-book-${outcome.id}`}
                                outcome={ outcome }
                                updateTradeOrder={ outcome.trade.updateTradeOrder }
                                bids={ outcome.orderBook.bids }
                                asks={ outcome.orderBook.asks }
                            />
                        )
                    })
                }
            </div>
        );
    }
});

module.exports = OrderBooks;