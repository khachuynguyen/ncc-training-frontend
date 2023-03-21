import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Empty } from 'antd';
import {  Layout,Menu } from 'antd';

import React, { useState } from 'react';
import NavBar from './NavBar';
import Product from './Product/Product';
import ProductDetail from './Product/ProductDetail';
import Siders from './Siders';
import Management from './Management/Management';
import EditProduct from './Management/EditProduct';



const { Content, Sider } = Layout;
const user=null;
function MainContainer () {
    
    return (
    <Layout style={{width:'100vw'}}>
      <BrowserRouter>
      <NavBar user={user}/>
      <Layout style={{ width:'100vw' }}>
        <Sider style={{width:'20vw' ,backgroundColor:'white'}}  className="site-layout-background">
          <Siders />
        </Sider>
        <Layout
          style={{
            minHeight:'600px',
            padding: '0 24px 24px',
          }}
        >
          
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            
            <div>
              <Routes>
                <Route path="/" element={<Product/>}></Route>
                <Route path="/product" element={<Product/>}></Route>
                <Route path="/product-detail" element={<ProductDetail/>}></Route>
                <Route path="/management" element={<Management/>}></Route>
                <Route path="/edit" element={<EditProduct/>}></Route>
                <Route path="*" element={<Empty/>}></Route>
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
      </BrowserRouter>
    </Layout>
    );
  }
  
export default  MainContainer;