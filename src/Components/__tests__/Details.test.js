import React from 'react'
import {render} from '@testing-library/react'
import Details from '../Details'

describe('Details', () => {
let component;
const props = {
    match: {
        params: {id: 'bitcoin'}
    }
}

const setup = () => {
    component = render(<Details {...props} />);
};


beforeEach(() => {
    setup();
});

it('should take a snapshot', () => {

    expect(component.asFragment()).toMatchSnapshot()
})
});
