import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import AdminDashboard from '../components/dashboard/adminDashboard';
import AdminTable from '../components/dashboard/adminTable/adminTable';
import PaymentTable from '../components/dashboard/adminTable/paymentTable';
import UserTable from '../components/dashboard/Table';
import LectureProfile from '../components/forms/Lecturer/lectureProfile';
import LectureTable from '../components/forms/Lecturer/LectureTable';
import AddSession from '../components/forms/Lecturer/session';
import LoginForm from '../components/forms/login';
import UserProfile from '../components/forms/profile/userProfile';
import RegisterForm from '../components/forms/registerForm';
import EnrollCourse from '../components/forms/students/enrollCourse';
import Payment from '../components/forms/students/payment';
import HomePage from '../container/homePage';

export default function route() {

  return (
    <BrowserRouter>

    <Routes>
    <Route path="/" element={< HomePage/>}></Route>
     
      <Route path="/login" element={< LoginForm/>}/>  
      <Route path="/session" element={< AddSession/>}/>  
      <Route path="enroll" element={< EnrollCourse/>}/> 
      <Route path="/register" element={< RegisterForm/>}/>  
  
     
      <Route exact path="/auth" element={<AdminDashboard />}>
          <Route path="tdata" element={< UserTable/>}/>  
          <Route path="enroll" element={< EnrollCourse/>}/> 
          <Route path="session" element={< AddSession/>}/> 
          <Route path="user" element={< UserProfile/>}/>  
          <Route path="admin" element={< AdminTable/>}/>  
          <Route path="payment" element={< Payment/>}/> 
          <Route path="paytable" element={< PaymentTable/>}/> 
          <Route path="lecTable" element={< LectureTable/>}/> 
         
        
        </Route>
     
    </Routes>
  </BrowserRouter>
  )
}
