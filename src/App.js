import { BulbOutlined, FundOutlined } from '@ant-design/icons';
import { Avatar, Divider, Layout, Menu, Space, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { CryptoDetails } from './components/CryptoDetails';
import Cryptocurrencies from './components/Cryptocurrencies';
import Homepage from './components/Homepage';
import News from './components/News';
import icon from "./images/logo.png";

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
    getItem(<Link to="/cryptocurrencies">Cryptocurrencies</Link>, 'cryptocurrencies', <FundOutlined />),
    getItem(<Link to="/news">News</Link>, 'news', <BulbOutlined />)
]

function App() {
  return (

    <Layout>
      <Header style={{ 
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 12,
      }}>
        <Space block direction='horizontal'>
          <Link to='/' style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
          }}>
            <Avatar src={icon} size={40} shape="square" style={{padding: "2px"}}/>
            <Typography.Text
              className='logo-text'
              strong
              style={{
                fontSize: "24px",
                color: "white",
                textAlign: "center"
              }}
            >
              CryptoTrackr
            </Typography.Text>
          </Link>
        </Space>

        <Divider type='vertical' style={{ marginLeft: "14px", height: "70%", border: "1px solid #a3a3a3" }}/>

        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          selectable={false}
        />
      </Header>

      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: '12px 8px 0 24px', minHeight: 360 }}>
          <Routes>
            <Route exact path='/' element={<Homepage />} />

            <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />} />

            <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
          
            <Route exact path='/news' element={<News />} />
          </Routes>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>CryptoSight ©2023 </Footer>
    </Layout>
  );
}

export default App;