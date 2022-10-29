import React, { useEffect, useState } from "react";

import { Form, Input, Button, Card, Select, DatePicker, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { enrollCourseList } from "../../Redux/action/courseAction";
import axios from "axios";
import '../../../assets/styles/loginRegistrationStyles.css'

const { Option } = Select;

export default function EnrollCourse() {
  const [dataArr, setDataArr] = useState([]);

  const dispatch = useDispatch();

  useEffect(async () => {
    const token = localStorage.getItem("x-auth");
    const Resdata = await axios.get("http://localhost:4000/user/get/all", {
      headers: { "x-auth": token },
    });

    setDataArr(Resdata.data);
  }, []);

  const OptionArray = (
    <>
      {dataArr.map((res) => {
        return <Option value={res.classId}>{res.classId} - {res.courseName}</Option>;
      })}
    </>
  );

  const onFinish = (values) => {
    console.log("calu",values)
    dispatch(enrollCourseList(values));
  };

  return (
    <div className="enrollContainer" style={{ alignItems: "center" ,justifyContent:'center', flexDirection:'column'}}>
      <Row >
        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
        <h1 style={{textAlign:"center", fontSize:"30px", fontWeight:700, marginBottom:"50px"}}>Enroll Courses</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
          className="classId"
            label="Class ID"
            name="classId"
            rules={[{ required: true, message: "Please input your course!" }]}
          >
            <Select
            className="dropdown"
              defaultValue="Select"
              style={{ width: 250 }}
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
            <Button type="primary" htmlType="submit" className="btnblue enrollbtn">
              Enroll
            </Button>
          </Form.Item>
        </Form>
        </Col>
        </Row>
    </div>
  );
}
