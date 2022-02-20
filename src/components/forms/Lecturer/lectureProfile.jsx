import React from "react";

import { Form, Input, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function LectureProfile() {
  const location = useLocation();
  const { role } = location.state;

  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
     
      <Card
        title=" User Proifle"
        style={{ width: 300, marginLeft: "30%", marginTop: "5rem" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={"onFinish"}
          onFinishFailed={"onFinishFailed"}
          autoComplete="off"
        >
          <Form.Item
            label=" User Name"
            name="name"
            rules={[
              { required: true, message: "Please input your user name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your  email!" }]}
          >
            <Input />
          </Form.Item>

          {role === "lecture" ? (
            <Form.Item
              label="department"
              name="department"
              rules={[
                { required: true, message: "Please input your  department!" },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
