import { Col, Divider, Row, Space, Statistic, Typography } from 'antd';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../api/CryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import Loading from './Loading';
import News from './News';

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return <Loading />;

  return (
    <>
      <Typography.Title level={2} className='heading'>Global Crypto Stats</Typography.Title>
      <Row>
        <Col span={12}>
            <Statistic title='Total Cryptocurrencies' value={millify(globalStats.total)} />
        </Col>

        <Col span={12}>
          <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} />
        </Col>

        <Col span={12}>
          <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} />
        </Col>

        <Col span={12}>
          <Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)} />
        </Col>

        <Col span={12}>
          <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} />
        </Col>
      </Row>

      <Divider style={{ border: "1px solid" }} />

      <Space direction='vertical'>
        <Typography.Title level={2}>
            Top 10 Cryptocurrencies in the World
        </Typography.Title>

        <Cryptocurrencies simplified={true} />

        <Typography.Title className='homepage-show-more' level={4}>
          <Link to="/cryptocurrencies">
            Show More
          </Link>
        </Typography.Title>
      </Space>
        
      <Divider style={{ border: "1px solid" }} />
      
      <Space direction='vertical' style={{ width: '100%'}}>
        <Typography.Title level={2}>
            Latest Crypto News
        </Typography.Title>

        <News simplified={true} />

        <Typography.Title className='homepage-show-more' level={4}>
          <Link to="/news">
            Show More
          </Link>
        </Typography.Title>
      </Space>
    </>
  )
}
export default Homepage