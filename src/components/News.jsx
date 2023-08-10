import { Avatar, Image, List, Select, Space, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useGetCryptosQuery } from '../api/CryptoApi';
import { useGetCryptoNewsQuery } from '../api/CryptoNewsApi';
import Loading from './Loading';

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews, isFetching: isFetchingNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified? 8 : 20 });
  const { data: cryptosList, isFetching: isFetchingCryptos } = useGetCryptosQuery(100);

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

      <List
        itemLayout='vertical'
        size='large'
        dataSource={cryptoNews.value}
        renderItem={(news, index) => (
          <List.Item
            style={{ margin: "20px 0"}}
            key={index}
            actions={[
              <Space>
              <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                <Typography.Text>{news.provider[0]?.name}</Typography.Text>
              </Space>,
              <Typography.Text>
                {moment(news.datePublished).startOf('ss').fromNow()}
              </Typography.Text>
            ]}
          >
            <a href={news.url} target='_blank' rel='noreferrer'>
              <List.Item.Meta 
                avatar={<Image preview={false} width={100} src={news.image?.thumbnail?.contentUrl || demoImage} alt='news-thumbnail' />}
                title={news.name}
                description={news.description}
              />
            </a>
          </List.Item>
        )}
      />
    </>
  )
}
export default News