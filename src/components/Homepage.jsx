import { Col, Divider, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/CryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loading from './Loading';

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  // console.log("data", data);

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

      <div className='home-heading-container'>
        <Typography.Title level={2} style={{ margin: "0" }}>
          Top 10 Cryptocurrencies in the World
        </Typography.Title>
        
        <Typography.Title level={3} style={{ margin: "4px 0 4px 0"}}>
          <Link to="/cryptocurrencies">
            Show More
          </Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified={true} />

      <Divider style={{ border: "1px solid" }} />
      
      <div className='home-heading-container'>
        <Typography.Title level={2} style={{ margin: "0" }}>
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3} style={{ margin: "4px 0 4px 0"}}>
          <Link to="/news">
            Show More
          </Link>
        </Typography.Title>
      </div>
      <News simplified={true} />
    </>
  )
}
export default Homepage