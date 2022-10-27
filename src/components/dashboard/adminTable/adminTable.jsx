import { Input, Modal, Table, DatePicker, TimePicker, Typography ,Radio, Button} from "antd";
import React, { useEffect, useState } from "react";
import { VideoCameraOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "jspdf-autotable";
import jsPDF from "jspdf";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const timeFormat = "HH:mm:ss";
export default function AdminTable() {

  const [usersData,setUsersData] = useState([]);
  const [type,setType] = useState();
    const location = useLocation();
    const { role } = "location.state"
    const columns = [
        {
          title: "name",
          dataIndex: "name",
          key: "name",
          fixed: "left",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          fixed: "left",
        },
        {
          title: "gender",
          dataIndex: "gender",
          key: "gender",
         
        },
        // {
        //   title: "lecTime",
        //   dataIndex: "lecTime",
        //   key: "lecTime",
         
        // },
        // {
        //   title: "department",
        //   dataIndex: "department",
        //   key: "department",
         
        // },
    
        {
          title: "Action",
          key: "operation",
          fixed: "right",
          width: 50,
          render: (record) => {
            return (
              <div style={{ display: "flex" }}>
                {role  === 'admin'? <>
                
                

                <DeleteOutlined
                  style={{ color: "red", marginLeft: 12 }}
                  onClick={() => {
                    "ondelete(record);";
                  }}
                />
                </>: <VideoCameraOutlined
                  
                />}
               
              </div>
            );
          },
        },
      ];
    

       useEffect(async()=>{
        const userRes =  await axios.get(
          `http://localhost:4000/user/get/users?role=${type}`,
          
        );
        setUsersData(userRes.data)
        console.log("userRes",userRes.data);
       },[type])

       const generatePDF = (obj) => {
        const unit = "pt";
    
        const size = "A3";
    
        const orientation = "landscape";
    
        const marginLeft = 40;
    
        const doc = new jsPDF(orientation, unit, size);
    
        const title = "Users Report  ";
    
        const headers = [["Name", "email", "gender"]];
    
        const PDF = obj.map((obj) => [
          obj.name,
          obj.email,
          obj.gender
        ]);
    
        let content = {
          startY: 50,
    
          head: headers,
    
          body: PDF,
        };
    
        doc.setFontSize(20);
    
        doc.text(title, marginLeft, 40);
    
        doc.autoTable(content);
    
        doc.save("userReport.pdf");
      };
 
      

  return (
    <div>
          <Radio.Group onChange={(e)=> setType(e.target.value)}>
              <Radio value={"student"}>Student</Radio>
              <Radio value={"lecture"}> Lecture</Radio>
            </Radio.Group>
<Button onClick={(e)=>generatePDF(usersData)  }>download report</Button>
      <Table columns={columns} dataSource={usersData} />
    </div>
  );
}
