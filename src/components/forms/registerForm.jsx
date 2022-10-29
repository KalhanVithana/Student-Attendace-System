import React, { useState } from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Select,
  Radio,
  Typography,
  Row,
  Col
} from "antd";
import { signUpUser } from "../Redux/action/signAction";
import { useDispatch } from "react-redux";
import login from "../../assets/images/signup.png";
import '../../assets/styles/loginRegistrationStyles.css'
import '../../assets/styles/loginRegistrationStyles.css'

const { Option } = Select;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(signUpUser(values));
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
     <Row>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      <div><h1 className="headingContainer" ><span className="heading">IHM Hotel School</span><span className="spanhead"> CourseWork</span></h1></div>
      <div
                className="leftSection"
                style={{
                  backgroundImage: `url(${login})`,
                }}
              ></div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      <div className="rightSection">
      <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please input your Full Name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=" User Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input your Gender!" }]}
          >
            <Radio.Group>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="btnblue">
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
        </div>
      </Col>
      
        </Row>
    </div>
  );
}
