import { DollarCircleOutlined, ExclamationCircleOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Col, Image, List, Row, Space } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery } from '../api/CryptoApi';
import LineChart from './LineChart';
import Loading from './Loading';

export const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  if (isFetching) return <Loading />

  const cryptoDetails = data.data.coin;

  const stats = [
    { title: 'Rank',
      value: `#${cryptoDetails?.rank}`,
      icon: <NumberOutlined />
    },
    { title: '24H Volume',
      value: `$${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`,
      icon: <ThunderboltOutlined />
    },
    { title: 'Market Cap',
      value: `$${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />
    },
    { title: 'Circulating Supply',
    value: `${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`,
    icon: <ExclamationCircleOutlined />
    },
    { title: 'Max Supply',
      value: `${cryptoDetails?.supply?.max ? millify(cryptoDetails?.supply?.max) : "N/A"}`,
      icon: <ExclamationCircleOutlined />
    },
    { title: 'Total Supply',
      value: `${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />
    },
  ];

  return (
    <>
      <Col>
        <Space align='center' style={{ marginBottom: "24px" }}>
          <Image width={85} src={cryptoDetails.iconUrl} alt='coin-icon' preview={false} />

          <span style={{ fontSize: 'xxx-large', fontWeight: 'bold'}}>
            {cryptoDetails.name}
          </span>
        </Space>

        <LineChart coinDetails={data.data.coin}/>

        <Col style={{ marginTop: "24px", marginBottom: "24px" }}>
          <span style={{ fontSize: 'x-large', fontWeight: '600'}}>
            {cryptoDetails.name} Statistics
          </span>

          <Row gutter={[24,12]}>
            {stats.map(({icon, title, value}) => (
              <Col xs={12} sm={12} md={8} lg={4} key={title}>
                <Card title={title}>
                  <Card.Meta title={value} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Space direction='vertical' size={24}>
          <Space direction='vertical'>
            <span style={{ fontSize: 'x-large', fontWeight: '600'}}>
              What is {cryptoDetails.name}
            </span>
            
            <p>
              {HTMLReactParser(cryptoDetails.description)}
            </p>
          </Space>
          
          <Space direction='vertical'>
            <span style={{ fontSize: 'x-large', fontWeight: '600'}}>
              Related {cryptoDetails.name} Links
            </span>
          
            <List 
              dataSource={cryptoDetails.links}
              renderItem={(link) => (
                <List.Item>
                  <a href={link.url} target='_blank' rel='noreferrer'>
                    <List.Item.Meta title={link.type.toUpperCase()} />
                  </a>
                </List.Item>
              )}
            />
          </Space>
        </Space>
      </Col>
    </>
  )
}