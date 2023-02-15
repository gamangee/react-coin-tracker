import { useState, useEffect } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useMatch,
} from 'react-router-dom';
import styled from 'styled-components';

// interface Params {
//   coinId: string;
// }

interface RouteState {
  state: { name: string };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const matchPriceTab = useMatch('/:coinId/price');
  const matchChartTab = useMatch('/:coinId/chart');

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  console.log(state);
  console.log(matchPriceTab);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
      </Header>
      {loading && <Loader>Loading...</Loader>}
      {!loading && (
        <>
          <div>
            <div>
              <span>Rank:{info?.rank}</span>
            </div>
            <div>
              <span>Symbol: ${info?.symbol}</span>
            </div>
            <div>
              <span>Open Source: {info?.open_source ? 'Yes' : 'No'}</span>
            </div>
            <div>{info?.description}</div>
          </div>
          <div>
            <div>
              <span>Total Suply: {priceInfo?.total_supply}</span>
            </div>
            <div>
              <span>Max Suply: {priceInfo?.max_supply}</span>
            </div>
          </div>
          <Tabs>
            <Tab isActive={matchChartTab !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={matchPriceTab !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
}

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

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
