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
} from "antd";
import { signUpUser } from "../Redux/action/signAction";
import { useDispatch } from "react-redux";

const { Option } = Select;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(signUpUser(values));
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
      <Card
        title="Sign Up"
        style={{ width: 300, marginLeft: "30%", marginTop: "5rem" }}
      >
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
            label="Email"
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
            <Button type="primary" htmlType="submit">
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
