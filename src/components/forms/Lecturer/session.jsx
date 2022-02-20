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
} from "antd";
import { useDispatch } from "react-redux";
import { AddSessionList } from "../../Redux/action/courseAction";
import moment from "moment";
import { useLocation } from "react-router-dom";

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
    <div style={{ textAlign: "center", alignItems: "center" }}>
      <Card
        title="Add Session"
        style={{ width: 300, marginLeft: "30%", marginTop: "5rem" }}
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
      </Card>
    </div>
  );
}
