import React from 'react';
// import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchoinHistory } from '../api';

interface ChartProps {
  coinId: string;
}

export default function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(['ohlcv', coinId], () =>
    fetchoinHistory(coinId)
  );
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://ohlcv-api.nomadcoders.workers.dev');
  //     const json = await response.json();
  //     setData(json);
  //     setLoading(false);
  //     console.log(data);
  //   })();
  // }, [data]);

  return <div>{isLoading ? 'Loading' : 'chart'}123</div>;
}
