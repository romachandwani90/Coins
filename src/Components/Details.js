import React from 'react';
import { useEffect, useState } from "react";
import { getDetails } from '../services/service';
import styled from 'styled-components';

const Heading = styled.div`
    display: flex;
    align-items: center;
    margin: 25px 40px;

    span {
        padding: 0 0 0 10px
    }
`;

const Container = styled.div`
    margin: 10px 40px;
    background: #eee;
    padding: 15px 20px;
    border-radius: 6px;
`;

const Details = (props) => {
    const { id } = props.match.params;
    const [details, setDetails] = useState({});

    const isEmptyObject = (value) => {
        return Object.keys(value).length === 0 && value.constructor === Object;
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getDetails(id);
            setDetails(data)
        };
        if (isEmptyObject(details)) {
            fetchData();
        }
    });
    return <div>{
        !isEmptyObject(details) && <div>
            <Heading>
                <img src={details.image.small} alt={details.id} />
                <span>{details.name}</span>
            </Heading>
            <Container>
                <div><b>Symbol:</b> {details.symbol}</div>
                <div><b>Hashing algorithm:</b> {details.hashing_algorithm || 'Unknown'}</div>
                <div><b>Description:</b> <div dangerouslySetInnerHTML={{__html: details.description['en']}} /></div>
                <div><b>Market cap:</b> €{details.market_data.market_cap['eur']}</div>
                
                <div><b>Homepage:</b> {details.links.homepage.map(h => h) }</div>
                <div><b>Genesis Date:</b> {details.genesis_date}</div>
            </Container>
        </div>    
    }</div>
};

export default Details;