import { Row, Select, Space, Typography } from 'antd';
import { CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { useGetCryptoHistoryQuery } from '../api/CryptoApi';
import { chartDays } from '../utils/days';
import { format } from '../utils/format';
import Loading from './Loading';

const LineChart = ({ coinDetails }) => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data: coinHistory, isFetching: isFetchingHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    console.log("crypto history", coinHistory);

    if (isFetchingHistory) return <Loading />

    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    )

    const data = {
        labels: coinHistory.data.history.map((single) => {
            let date = new Date(single["timestamp"] * 1000)
            let time = date.getHours() > 12
                ? `${date.getHours()-12}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes() + 10} PM`
                : `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes() + 10} AM`
            
            return timePeriod === '3h' || timePeriod === '24h' ? time : date.toLocaleDateString()
        }),
        datasets: [{
            data: coinHistory.data.history.map((single) => single["price"]),
            label: 'Price in USD',
            fill: {
                target: "origin",
                above: "rgba(93, 149, 179, 0.1)",
            }
        }],
    }

    const options = {
        elements: {
            point: {
              radius: "0",
            },
            line: {
              borderColor: "#5d95b3",
              borderWidth: 1.5,
            }
          },
          scales: {
            x: {
                grid: {
                    display: false,
                },
                reverse: true,
                ticks: {
                    maxTicksLimit: 20,
                }
            }
          },
          plugins: {
            legend: {
              onClick: null,
            },
            decimation: {
              enabled: true,
            }
          },
          spanGaps: true,
    }

  return (
    <>
        <Row justify='space-between' style={{ display: "flex", alignItems: "center" }}>
            <Space>
                <Typography.Title level={3} style={{ margin: 0, marginRight: '20px'}}>
                    Current Price: ${format(Number(coinDetails.price).toFixed(2))}
                </Typography.Title>

                <Typography.Title level={5} style={{ margin: 0 }}>
                    {coinHistory.data.change < 0 ? '' : '+'}{coinHistory.data.change}%
                </Typography.Title>
            </Space>

            <Select
                defaultValue={timePeriod}
                className='select-time-period' 
                placeholder='Select Time Period'
                onChange={(value) => setTimePeriod(value)}
                options={chartDays}
            />
        </Row>
        
        <Line data={data} options={options} />
    </>
  )
}
export default LineChart