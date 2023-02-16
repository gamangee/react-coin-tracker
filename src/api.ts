const BASE_URL = 'https://api.coinpaprika.com/v1';
// const NICO_URL = 'https://ohlcv-api.nomadcoders.workers.dev?';

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 23 * 7 * 1;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=btc-bitcoin`
  ).then((response) => response.json());
}
