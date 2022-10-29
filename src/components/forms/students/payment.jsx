import React, { useEffect, useState } from "react"; 
import { Button, Row, Col, Input, Select} from 'antd';
import {
   IconProvider
  } from "@ant-design/icons";
import axios from "axios";
import { responseMiddleware } from "../../../middleware/notification";
import Text from "antd/lib/typography/Text";
import payments from "../../../assets/images/paymnt.png";
import '../../../assets/styles/loginRegistrationStyles.css'
export default function Payment() {
    const [form, setForm] = useState({
        AreaOffice: "",
        accountNo: "",
        mobileNo: "",
        images: "",
        courseId:""
      });
      const [imges, setimges] = useState();
    
      const Submit = async(e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("images", imges);
        formData.append("AreaOffice", form.AreaOffice);
        formData.append("accountNo", form.accountNo);
        formData.append("mobileNo", form.mobileNo);
        formData.append("courseId", form.courseId);

        const token = localStorage.getItem("x-auth");
        const Resdata = await axios.post("http://localhost:4000/user/account", formData,{
            headers: { "x-auth": token },
          });
          responseMiddleware("success");
    
      };
    
      const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleSelectChange = (name, value) => {
        if (name == "area")
          setForm((prev) => {
            return { ...prev, AreaOffice: value };
          });
      };
    
      return (
        <div className="registerBillConatiner">
          <div className="registersPageConatiner">
            <div>
              <Row
                className="registerMiddleSection"
                justify="center"
                gutter={[0, 0]}
              >
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <div
                    className="leftSection paymntcontainer"
                    style={{
                      backgroundImage: `url(${payments})`,
                    }}
                  ></div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <div className="rightSection">
                  <Text strong>Payment</Text>
                    <p className="alreadyText">Fill the form with your details.</p>
                    <div className="formSection">
                      <form onSubmit={Submit} encType="multipart/form-data">
                        <Row gutter={[20, 0]}>
                          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <p className="label">Select Branc Area</p>
                            <Select
                              placeholder="Select Branch"
                              className="select"
                              onChange={(value) => {
                                handleSelectChange("area", value);
                              }}
                            >
                              <Option value="Negambo">Negambo</Option>
                              <Option value="Gampha">Gampha</Option>
                              <Option value="Colombo">Colombo</Option>
                              <Option value="Kaluthara">Kaluthara</Option>
                            </Select>
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={24} xl={12} >
                            <p className="label">course Id</p>
                            <Input
                              placeholder="Course Id"
                              className="inputFeild accountNumber"
                              name="courseId"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{marginTop:"1rem"}}>
                            <p className="label">Bank Account Number</p>
                            <Input
                              placeholder="Account Number"
                              className="inputFeild accountNumber"
                              name="accountNo"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{marginTop:"1rem"}}>
                            <p className="label">Mobile Number</p>
                            <Input
                              placeholder="Mobile Number"
                              className="inputFeild"
                              name="mobileNo"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{marginTop:"1rem"}}>
                            <p className="label">Upload Payment Receipt </p>
                            <Input
                              type={"file"}
                              placeholder="image upload"
                              className="inputFeild"
                              name="images"
                              onChange={(e) => setimges(e.target.files[0])}
                            />
                          </Col>
                        </Row>
    
                        <div className="registerBillSection" style={{marginTop:"1rem"}}>
                          <Button type="primary" className="registerBillBtn btnblue" htmlType="submit">
                            submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      );
    }