import React, { useEffect, useState } from "react";

import { Form, Input, Button, Card, Radio, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UpdateUser } from "../../Redux/action/signAction";
import '../../../assets/styles/loginRegistrationStyles.css'

export default function UserProfile(props) {


  const location = useLocation();
  const { role } = "location.state";
  const [userId, setUserId] = useState("");
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(async () => {
    const token = localStorage.getItem("x-auth");

    const userRes = await axios.post(
      "http://localhost:4000/user/uid",
      { role },
      { headers: { "x-auth": token } }
    );

    setUserId(userRes.data);
    console.log(userRes.data)

    form.setFieldsValue({
      name: userRes.data.name,
      email: userRes.data.email,
      gender: userRes.data.gender,
      instructorId: userRes.data.instructorId,
    });
  }, []);

  const onFinish = (values) => {
    const value = {
      ...values,
      id: userId._id,
      name: values.name,
      email: values.email,
      gender: values.gender,
      role: role,
    };

    dispatch(UpdateUser(value));
  };

  return (
    <div  style={{ textAlign: "center", alignItems: "center", justifyContent:'center'  }}>
     <Row className="userprofile">
      <Col  xs={24} sm={24} md={24} lg={20} xl={20}>
        <div className="profile">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >

      {role === 'lecture' ? 
           <Form.Item
           label="Instructor Id"
           name="instructorId"
           rules={[
             { required: true, message: "Please input your user instructor ID!" },
           ]}
         >
           <Input style={{ marginLeft: 4 }}  disabled/>
         </Form.Item> :role === 'admin' ? 
           <Form.Item
           label="Instructor Id"
           name="instructorId"
           rules={[
             { required: true, message: "Please input your user instructor ID!" },
           ]}
         >
           <Input style={{ marginLeft: 4 }}  disabled/>
         </Form.Item> :
         
         <Form.Item
         className="label-user"
         label="Admin Id"
         name="instructorId"
         rules={[
           { required: true, message: "Please input your user instructor ID!" },
         ]}
       >
         <Input style={{ marginLeft: 4 }}  disabled/>
       </Form.Item>}

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
            <Input style={{ marginLeft: 4 }}  />
          </Form.Item>
          <Form.Item
            label="Gender"
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
        </div>
        </Col>
        </Row>
     
    </div>
  );
}
