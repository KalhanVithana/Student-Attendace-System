import React, { useEffect } from "react";

import { Form, Input, Button, Checkbox, Card, Select, Radio, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Redux/action/signAction";
import { Navigate, useNavigate } from "react-router-dom";
import login from "../../assets/images/login.png";
import '../../assets/styles/loginRegistrationStyles.css'
const { Option } = Select;

export default function LoginForm(props) {
  const userLogin = useSelector((state) => state.loginReducer);

  const { auth } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/auth");
    } else {
      navigate("/");
    }
  }, [auth]);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(LoginUser(values));
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
     <Row>
      <Col  xs={24} sm={24} md={24} lg={12} xl={12}>
        <div><h1 className="headingContainer" ><span className="heading">IHM Hotel School</span><span className="spanhead"> CourseWeb</span></h1></div>
      <div
                className="leftSection"
                style={{
                  backgroundImage: `url(${login})`,
                }}
              ></div>
      </Col>
      <Col  xs={24} sm={24} md={24} lg={12} xl={12}  >
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
            label="User Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="btnblue">
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
        </div>
      </Col>

      
        </Row>
    </div>
  );
}
