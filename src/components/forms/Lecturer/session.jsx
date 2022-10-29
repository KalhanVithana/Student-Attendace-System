import React from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Select,
  Radio,
  DatePicker,
  TimePicker,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import { AddSessionList } from "../../Redux/action/courseAction";
import moment from "moment";
import { useLocation } from "react-router-dom";
import '../../../assets/styles/loginRegistrationStyles.css'


const { Option } = Select;
const { RangePicker } = DatePicker;

export default function AddSession() {
  const location = useLocation();
  const { role } = location.state;

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(AddSessionList(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(time, timeString) {
    console.log(time, timeString);
  }
  return (
    <div className=" session">
      
    <Row className=" session">
     
      <Col  xs={24} sm={24} md={24} lg={20} xl={24}>
      <h1 style={{textAlign:"center", fontSize:"30px", fontWeight:700, marginBottom:"50px"}}>Add Session</h1>
        <div className="">
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
          className="inputfeild"
            label="Class ID"
            name="classId"
            rules={[
              { required: true, message: "Please input your session ID!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Course ID"
            name="courseName"
            rules={[
              { required: true, message: "Please input your courseName !" },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Date "
            name="lecDate"
            rules={[
              { required: true, message: "Please input your  session date!" },
            ]}
          >
            <DatePicker style={{right:7}} />
          </Form.Item>

        
          <Form.Item
            label="Time "
            name="lecTime"
            rules={[{ required: true, message: "Please input your Time !" }]}
          >
            <TimePicker.RangePicker format="h:mm:ss A" onChange={onChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
        </Col>
        </Row>
    </div>
  );
}
