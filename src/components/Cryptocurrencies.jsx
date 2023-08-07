import { Card, Col, Image, Input, Row, Space, Typography } from "antd"
import millify from "millify"
import { Link } from "react-router-dom"
import { useGetCryptosQuery } from "../services/CryptoApi"
import { useEffect, useState } from "react"

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //console.log("cryptos", cryptosList);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData);
  }, [cryptosList, searchTerm])

  return (
      <>
        {!simplified && (
          <div className="search-crypto" style={{
            width: "250px",
            margin: "15px 0"
          }}>
            <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        )}

        <Row gutter={[24, 24]} className="crypto-card-container">
          {cryptos?.map((crypto) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
              <Link to={`/crypto/${crypto.uuid}`}>
                <Card
                  loading={isFetching}
                  title={`${crypto.rank}. ${crypto.name}`} 
                  extra={
                    <Image width={35} src={crypto.iconUrl} alt="crypto icon" preview={false} />
                  }
                  headStyle={{
                    borderBottom: '1px solid #bfbfc7',
                    fontSize: "large"
                  }}
                  style={{ padding: '0 10px' }}
                  hoverable
                >
                  <Space style={{ fontWeight: "600" }} direction="vertical">
                    <Typography.Text>
                      Price: {millify(crypto.price)}
                    </Typography.Text>
                    
                    <Typography.Text>
                      Market Cap: {millify(crypto.marketCap)}
                    </Typography.Text>
                    
                    <Typography.Text>
                      Daily Change: {millify(crypto.change)}%
                    </Typography.Text>
                  </Space>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </>
  )
}
export default Cryptocurrencies