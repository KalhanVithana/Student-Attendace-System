import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Table,
  Tag,
  Space,
  Modal,
  notification,
  Input,
} from "antd";
import axios from "axios";
import { FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PaymentTable() {
  const [apiData, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");

  const data = [{ acc: "25369854" }];
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    GetApi();
  }, []);

  const removeUser = async (id) => {
    // NotificationHelper.getInstance().success("remove success")
    await axios
      .delete(`http://localhost:4000/user/delete/${id}`)
      .then((res) => {
        console.log(res.data);
      });
  };

  const columns = [
    {
      title: "Account Number",
      dataIndex: "accountNo",
      key: "accountNo",
      filteredValue: [search],
      onFilter: (value, record) => {
        return record.accountNo.toLowerCase().includes(value.toLowerCase());
      },

      render: (text) => {
        {
          let item = data.some((res) => res.acc === text);
          return <a style={{ color: item ? "red" : null }}>{text}</a>;
        }
      },
    },
    {
      title: "Branch",
      dataIndex: "AreaOffice",
      key: "AreaOffice",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "mobile No",
      dataIndex: "mobileNo",
      key: "mobileNo",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Course Id",
      dataIndex: "courseId",
      key: "customerEmail",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Invoice",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <>
          <img src={text} alt="new" width={40} height={40} />
          <Button
            className="view-dash"
            onClick={() => {
              showModal();
              setImage(text);
            }}
          >
            View
          </Button>
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="delete-dash"
            onClick={() => {
              removeUser(record._id);
            }}
          >
            remove
          </Button>
        </Space>
      ),
    },
  ];

  const generatePDF = (obj) => {
    console.log(obj);
    const unit = "pt";

    const size = "A3";

    const orientation = "landscape";

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    const title = "Users Report  ";

    const headers = [["Name", "Branch", "Student Email"]];

    const PDF = obj.map((obj) => [
      obj.accountNo,
      obj.AreaOffice,
      obj.customerEmail,
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

  const GetApi = async () => {
    let token = localStorage.getItem("x-auth");

    const resData = await axios.get("http://localhost:4000/user/payacc", {
      headers: { "x-auth": token },
    });

    setData(resData.data);

    console.log(resData);
  };

  return (
    <div className="dashboardMainConatiner">
      <Modal
        wrapClassName="dashboardModal"
        title="Bill View"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="billContainer">
          <p className="billText">Bill View</p>
          <img src={image} alt="new" className="dashBoard-img" />
        </div>
      </Modal>
      <div className="middleContainer">
        <div className="dashbord-links">
      

          <div style={{ display: "flex" }}>
            <Input.Search
              placeholder=" Search Account number"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <FilePdfOutlined
              style={{ color: "blue", fontSize: "xx-large" }}
              diabled
              onClick={() => {
                generatePDF(apiData);
              }}
            />
            <a
              onClick={() => {
                generatePDF(apiData);
              }}
            >
              Download
            </a>
          </div>
        </div>

        <Row gutter={[60, 20]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div
              className="cardSection"
              style={{
                backgroundImage: `url(${"dash1"})`,
              }}
            ></div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div
              className="cardSection"
              style={{
                backgroundImage: `url(${"dash3"})`,
              }}
            ></div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div
              className="cardSection"
              style={{
                backgroundImage: `url(${"dashnew2"})`,
              }}
            ></div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={24}>
            <div className="table">
              <Table columns={columns} dataSource={apiData} searchable />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
