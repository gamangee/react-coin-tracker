// import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

export default function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();
  //     setCoins(json.slice(0, 50));
  //     setLoading(false);
  //   })();
  // }, []);

  const { isLoading: loading, data: coins } = useQuery<CoinInterface[]>(
    ['allCoins'],
    fetchCoins
  );

  return (
    <Container>
      <Header>
        <Title>coin</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 50).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt='icon_img'
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

// const coins = [
//   {
//     id: 'btc-bitcoin',
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: 'coin',
//   },
//   {
//     id: 'eth-ethereum',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     rank: 2,
//     is_new: false,
//     is_active: true,
//     type: 'coin',
//   },
//   {
//     id: 'hex-hex',
//     name: 'HEX',
//     symbol: 'HEX',
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: 'token',
//   },
// ];

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: #ffffff;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  -webkit-box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
