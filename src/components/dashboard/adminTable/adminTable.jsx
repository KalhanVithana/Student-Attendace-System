import { Input, Modal, Table, DatePicker, TimePicker, Typography } from "antd";
import React from "react";
import { VideoCameraOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useLocation } from "react-router-dom";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const timeFormat = "HH:mm:ss";
export default function AdminTable() {

    const location = useLocation();
    const { role } = location.state
    const columns = [
        {
          title: "classId",
          dataIndex: "classId",
          key: "classId",
          fixed: "left",
        },
        {
          title: "lecDate",
          dataIndex: "lecDate",
          key: "lecDate",
         
        },
        {
          title: "lecTime",
          dataIndex: "lecTime",
          key: "lecTime",
         
        },
        {
          title: "department",
          dataIndex: "department",
          key: "department",
         
        },
    
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
    

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
