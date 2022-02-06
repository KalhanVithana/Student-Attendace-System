import React, { useEffect, useState } from "react";

import { Form, Input, Button, Card, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { enrollCourseList } from "../../Redux/action/courseAction";
import axios from "axios";

const { Option } = Select;

export default function EnrollCourse() {
  const [dataArr, setDataArr] = useState([]);

  const dispatch = useDispatch();

  useEffect(async () => {
    const token = localStorage.getItem("x-auth");
    const Resdata = await axios.get("http://localhost:4000/user/get/all", {
      headers: { "x-auth": token },
    });

    console.log(Resdata);
    setDataArr(Resdata.data);
  }, []);

  dataArr.map((res) => {
    console.log(res);
  });

  const OptionArray = (
    <>
      {dataArr.map((res) => {
        return <Option value={res.classId}>{res.classId}</Option>;
      })}
    </>
  );

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(enrollCourseList(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
     
      <Card
        title="Enroll Course"
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
            label="course"
            name="classId"
            rules={[{ required: true, message: "Please input your course!" }]}
          >
            <Select
              defaultValue="1"
              style={{ width: 120 }}
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {OptionArray}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Enroll
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
