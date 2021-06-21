/* Fetch the list of Coin Markets*/
export const getMarkets = () => {
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&page=1&sparkline=false')
    .then((response) => {
      return response.json();
    })
    .then((jsonObject) => {
        return jsonObject;
    })
    .catch((error) => {
      document.write(error);
    });
};

/* Fetch the market details based on id */
export const getDetails = (id) => {
    return fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((jsonObject) => {
        return jsonObject;
    })
    .catch((error) => {
      document.write(error);
    });
};

