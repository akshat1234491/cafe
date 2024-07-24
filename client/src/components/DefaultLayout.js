//pre defined layout used here fron antdesign layouts
import React,{useState,useEffect} from "react";
import { Layout, Menu } from "antd";
import Spinner from "./Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined 
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
const { Header, Sider, Content } = Layout;



const DefaultLayout=({children}) => {
  const navigate = useNavigate()
  const {cartItems,loading} = useSelector(state => state.rootReducer)
  const [collapsed,setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(
      !collapsed
    );
  };
//to get local storage data
  useEffect(() =>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  },[cartItems]);
//icon is used to add symbol in menu section from ant design
  
    return (
      <Layout>
        {loading && <Spinner />}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h1 className="text-center text-light font-wight-bold mt-4">Nav Bharat Khadi Store</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers">Cutomers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}
            onClick={()=>{
              localStorage.removeItem('auth');
              navigate('/login');
            }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div className="cart-item">
              <p>{cartItems.length}</p>
            </div>
            <div className="cart-item-logo" 
            onClick={() => navigate('/cart')}>
            <ShoppingCartOutlined />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }

export default DefaultLayout;