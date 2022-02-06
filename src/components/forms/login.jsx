import React, { useEffect } from "react";

import { Form, Input, Button, Checkbox, Card, Select, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Redux/action/signAction";
import { Navigate, useNavigate } from "react-router-dom";

const { Option } = Select;

export default function LoginForm(props) {
  const userLogin = useSelector((state) => state.loginReducer);

  const { auth } = userLogin;

  console.log("auth", auth);
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
    console.log("Success:", values);
    dispatch(LoginUser(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
      <Card
        title="Sign In"
        style={{ width: "25%", marginTop: "5rem", marginLeft: "30rem" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="email"
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
            <Button type="primary" htmlType="submit">
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
