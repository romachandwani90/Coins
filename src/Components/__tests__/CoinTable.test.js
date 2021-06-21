import React from 'react'
import {render} from '@testing-library/react'
import CoinTable from '../CoinTable'
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<CoinTable />)
    
    expect(asFragment(<CoinTable />)).toMatchSnapshot()
   })
