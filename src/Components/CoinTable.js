import { useEffect, useState } from "react";
import { getMarkets } from '../services/service';
import CoinMarketDetails from './CoinMarketDetails';

const CoinTable = () => {
    const [markets, setMarkets] = useState([]);
    useEffect(() => {
        const fetchMarkets = async () => {
            const result = await getMarkets();

            setMarkets(result);
        };
        if (!markets.length) {
            fetchMarkets();
        }
    });

    return <>
        {markets && <CoinMarketDetails key={markets.id} details={markets}/>}
    </>;
};

export default CoinTable;