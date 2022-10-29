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
import UserProfile from '../components/forms/profile/userProfile';
import AdminTable from '../components/dashboard/adminTable/adminTable';
import StudentProfile from '../components/forms/students/studentProfile';
import EnrollCourse from '../components/forms/students/enrollCourse';
import AdminDashboard from '../components/dashboard/adminDashboard';
const { Header, Content, Footer } = Layout;




export default function HomePage() {
  const [key,setkey] = useState('1');

  
  return <>
      <div style={{overflowY:"hidden", height:'100vh'}} >
      <Layout className="layout" style={{ backgroundColor:'lightGray', minHeight:'100vh',overflowY:"hidden", height:'100%'}}>
    <Header style={{width:'100%', minHeight:'5vh'}}>
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
    <Content style={{ padding: '10px 70px' ,width:'100%', minHeight:"95vh"}}>
     
      <div className="site-layout-content"  style={{ margin: '12px 0' }}>

        {key === '1' ?  <LoginForm/> : key === '2' ? <RegisterForm/> :null}
      </div>
       {/* <UserProfile/> */}
       {/* <EnrollCourse/> */}
       {/* <AdminTable/> */}
       {/* <StudentProfile/> */}
       {/* <AdminDashboard/> */}
       
   
    </Content>

  </Layout>,
        </div>
  </>;
}
