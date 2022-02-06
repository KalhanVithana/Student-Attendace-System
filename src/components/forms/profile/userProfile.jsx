import React, { useEffect, useState } from "react";

import { Form, Input, Button, Card, Radio } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UpdateUser } from "../../Redux/action/signAction";

export default function userProfile() {
  const location = useLocation();
  const { role } = location.state;
  const [userId, setUserId] = useState("");
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(async () => {
    const token = localStorage.getItem("x-auth");

    console.log(token);

    const userRes = await axios.post(
      "http://localhost:4000/user/uid",
      { role },
      { headers: { "x-auth": token } }
    );

    setUserId(userRes.data);
    console.log("get", userRes.data);
    form.setFieldsValue({
      name: userRes.data.name,
      email: userRes.data.email,
      gender: userRes.data.gender,
     
    });
  }, []);

  const onFinish = (values) => {
    const value = {
      ...values,
      id: userId._id,
      name: values.name,
      email: values.email,
      gender: values.gender,
      role:role
      
    };

    dispatch(UpdateUser(value));
   
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
      <Card
        title=" User Proifle"
        style={{ width: 400, marginLeft: "30%", marginTop: "5rem" }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label=" User Name"
            name="name"
            rules={[
              { required: true, message: "Please input your user name!" },
            ]}
          >
            <Input style={{ marginLeft: 4 }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your  email!" }]}
          >
            <Input style={{ marginLeft: 4 }} />
          </Form.Item>
          <Form.Item
            label="gender"
            name="gender"
            rules={[{ required: true, message: "Please input your Gender!" }]}
          >
            <Radio.Group>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}> Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
