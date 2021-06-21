import React from 'react'
import {render} from '@testing-library/react'
import CoinMarketDetails from '../CoinMarketDetails'
import {
    BrowserRouter as Router,
} from "react-router-dom";

describe('CoinMarketDetails', () => {
let component;
const details = [{
    id: 'bitcoin',
    name: 'bitcoin',
    image: 'bitcoin.png',
    symbol: 'btc',
    current_price: 20,
    high_24h: 20,
    low_24h: 10,
    market_cap_rank:1,
}];

const setup = () => {
    component = render(<Router><CoinMarketDetails details={details} /></Router>);
};


beforeEach(() => {
    setup();
});

it('should take a snapshot', () => {

    expect(component.asFragment()).toMatchSnapshot()
})
});
