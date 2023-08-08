import {Avatar, Card, Col, Row, Select, Space, Typography} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../api/CryptoNewsApi';
import { useState } from 'react';
import { useGetCryptosQuery } from '../api/CryptoApi';
import Loading from './Loading';

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews, isFetching: isFetchingNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified? 6 : 12 });
  const { data: cryptosList, isFetching: isFetchingCryptos } = useGetCryptosQuery(100);
  
  //console.log("cryptonews", cryptoNews);

  if (isFetchingNews || isFetchingCryptos) return <Loading />;

  return (
    <>
      {!simplified && (
        <div style={{
          width: "250px",
          margin: "15px 0",
        }}>
          <Select
            allowClear
            showSearch 
            className='select-new' 
            placeholder='Select a Crypto' 
            optionFilterProp='children' 
            onChange={(value) => setNewsCategory(value)} 
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option value="Cryptocurrency">All Cryptos</Select.Option>
            {cryptosList?.data?.coins.map((coin) => 
              <Select.Option value={coin.name}>
                {coin.name}
              </Select.Option>
            )}
          </Select>
        </div>
      )}

      <Row gutter={[24,24]}>
        {cryptoNews?.value.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card 
              loading={isFetchingNews}
              hoverable 
              className='news-card'
            >
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Typography.Title level={4} className='news-title'>
                    {news.name}
                  </Typography.Title>

                  <img style={{maxWidth: '100px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                </div>

                <p style={{ margin: "10px 0"}}>
                  {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}
                </p>

                <Space direction='vertical'>
                  <Space>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                    <Typography.Text className='provider-name' style={{

                    }}>{news.provider[0]?.name}</Typography.Text>
                  </Space>
                  <Typography.Text>
                      {moment(news.datePublished).startOf('ss').fromNow()}
                  </Typography.Text>
                </Space>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
export default News