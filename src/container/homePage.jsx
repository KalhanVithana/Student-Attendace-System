import React from 'react';
import '../assets/home.css'
import img from '../assets/images/webpurp.png'
import NavBar from '../components/Nav';
import {useState} from 'react'
import '../container/home.css'
import { Layout, Menu, Breadcrumb,Row,Col } from 'antd';
import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/login';
import RegisterForm from '../components/forms/registerForm';
const { Header, Content, Footer } = Layout;




export default function HomePage() {
  const [key,setkey] = useState('1');

  
  return <>
      <div className="">
      <Layout className="layout" style={{height:'100%',width:'100%'}}>
    <Header style={{width:'100%'}}>
      <div className="logo" />
      <div  style={{marginLeft:'70%'}}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" onClick={(e)=>{
          console.log("cick",e.key)
          setkey(e.key)
        }}> Login
      </Menu.Item>
        <Menu.Item key="2"  onClick={(e)=>{
          console.log("cick",e.key)
          setkey(e.key)
        }}> 
        Register
        </Menu.Item>
       
      </Menu>

      
      
      </div>
    </Header>
    <Content style={{ padding: '0 50px' ,width:'100%'}}>
     
      <div className="site-layout-content"  style={{ margin: '16px 0' }}>

        {key === '1' ?  <LoginForm/> : key === '2' ? <RegisterForm/> :null}
      </div>
       
   
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>,
        </div>
  </>;
}
