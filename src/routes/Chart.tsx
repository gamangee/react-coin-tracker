import React from 'react';
// import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical>(
    ['ohlcv', coinId],
    () => fetchoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
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

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'Price',
              data: Array.isArray(data)
                ? data?.map((price) => price.close) ?? []
                : [],
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString().slice(0, 10)
              ),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
