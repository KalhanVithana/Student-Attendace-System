import {
  VideoCameraOutlined,
  DeleteOutlined,
  EditOutlined,
  PieChartTwoTone,
  CheckOutlined,
  CloseOutlined,
  PicCenterOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import {
  Input,
  Modal,
  Table,
  DatePicker,
  TimePicker,
  Typography,
  List,
  Switch,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSessionList, updateSession } from "../Redux/action/courseAction";
import moment from "moment";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
const { RangePicker } = DatePicker;
import { Spin } from "antd";

export default function TableUser() {
  const TableData = useSelector(
    (state) => state.getSessionReducers.sessionData
  );
  const sessionData = useSelector((state) => state.getSessionReducers);
  const [EditModel, setEditModel] = useState(false);
  const [attendaceChart, setAttendanceChart] = useState(false);
  const [editSession, setEditSession] = useState(null);
  const [dataArr, setDataArr] = useState([]);
  const [getAttendance, setAttendance] = useState(null);
  const [sessionUpdate, setSessionUpdate] = useState(
    sessionData ? sessionData.loading : null
  );
  const [viewModel, setViewModel] = useState(false);
  const [idClass, setIdClass] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();
  const { role } = location.state;

  const dateFormat = "YYYY/MM/DD";
  const timeFormat = "HH:mm:ss";
  const token = localStorage.getItem("x-auth");

  const columns = [
    {
      title: "Class ID",
      dataIndex: "classId",
      key: "classId",
      fixed: "left",
      sorter: (a, b) => a.classId - b.classId,
    },
    {
      title: "Course ID",
      dataIndex:"courseName",
      key: "courseName",
    },
    {
      title: "Lecture Date",
      dataIndex: "lecDate",
      key: "lecDate",
      render: (text, row) => (
        <DatePicker
          value={moment(text[1])}
          format={dateFormat}
          disabled
        />
      ),
    },
    {
      title: "Lecture Time",
      dataIndex: "lecTime",
      key: "lecTime",
      render: (text, row) => (
        <TimePicker.RangePicker
          value={[moment(text[0]), moment(text[1])]}
          format={timeFormat}
          disabled
        />
      ),
    },

    {
      title: role === "lecture" ? "Session" : null,
      fixed: "right",
      key: "session",
      render:
        role === "lecture"
          ? (record) => {
              return (
                <div>
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onClick={(e) => {
                      enableCourse(record, e);
                    }}
                    defaultChecked={record.enableCourse}
                  />
                </div>
              );
            }
          : null,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (record) => {
        return (
          <div style={{ display: "flex" }}>
            {role === "lecture" ? (
              <>
                <PieChartTwoTone
                  style={{ color: "", marginRight: 12 }}
                  onClick={() => {
                    onAttendaceChart(record);
                  }}
                />
                <EditOutlined
                  onClick={() => {
                    onEdit(record);
                  }}
                />

                <DeleteOutlined
                  style={{ color: "red", marginLeft: 12 }}
                  onClick={() => {
                    ondelete(record);
                  }}
                />
              </>
            ) : record.enableCourse ? (
              <>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    AttendCourse(record);
                  }}
                > Join</Button>
              </>
            ) : (
              <Button  diabled>
                Not started yet
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getSessionList(role));
  }, [dispatch]);

  useEffect(() => {}, [dataArr]);

  const enableCourse = async (obj, value) => {
    const id = obj.classId;

    const Course = {
      id,
      value,
    };

    await axios.put("http://localhost:4000/user/en", Course, {
      headers: { "x-auth": token },
    });
  };


  const onEdit = (obj) => {
    setEditModel(true);

    console.log("objex",obj)
    setEditSession({ ...obj });
  };

  const AttendCourse = async (obj) => {
    setViewModel(true)
    const classId = obj.classId;
    await axios.put(
      "http://localhost:4000/user/at",
      { classId },
      {
        headers: { "x-auth": token },
      }
    );
  };

  function onChangeDate(date, dateString) {
 

    setEditSession((pre) => {
      return { ...pre, lecDate: date };
    });
  }
  function onChangeTime(time, timeString) {
  
    setEditSession((pre) => {
      return { ...pre, lecTime: time };
    });
  }

  const editData = (data) => {
    dispatch(updateSession(data));
    dispatch(getSessionList(role));

    setEditModel(false);
  };

  const onAttendaceChart = (obj) => {
    setIdClass(obj.classId);
    setAttendanceChart(true);
    setAttendance({ ...obj });
  };

  const ondelete = async (record) => {

    Modal.confirm({
      title: `are you sure,do you want to delete `,
      okText: "yes",
      okType: "danger",
      onOk: async () => {
        const id = record._id;

        await axios
          .delete("http://localhost:4000/user/get/delete", id, {
            headers: { "x-auth": token },
          })
          .then((res) => {
            console.log(res.data);
          });

          dispatch(getSessionList(role));
      },
    });
  };

  const generatePDF = (obj) => {
    const unit = "pt";

    const size = "A3";

    const orientation = "landscape";

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    const title = "Student Attendance  ";

    const headers = [["Student Name", "email", "Attendance"]];

    const PDF = obj.map((obj) => [
      obj.name,
      obj.email,
      moment(obj.time, timeFormat).toString().replace(" GMT+0530", ""),
    ]);

    let content = {
      startY: 50,

      head: headers,

      body: PDF,
    };

    doc.setFontSize(20);

    doc.text(title, marginLeft, 40);

    doc.autoTable(content);

    doc.save("Attentdance.pdf");
  };

  return (
    <div>
      {!sessionUpdate ? (
        <>
          <Table columns={columns} dataSource={TableData} />
          <Modal
            title="Edit session"
            okText="Update"
            visible={EditModel}
            onCancel={() => {
              setEditModel(false);
            }}
            onOk={() => {
              const data = {
                id:editSession?._id,
                classId: editSession?.classId,
                lecDate: editSession?.lecDate,
                lecTime: editSession?.lecTime,
                courseName: editSession?.courseName,
              };
              editData(data);
            }}
          >
            <div style={{ display: "grid" }}>
              <Typography.Text style={{ fontWeight: "bold" }}>
                Class Id
              </Typography.Text>
              <Input
                value={editSession?.classId}
                style={{ marginTop: 10 }}
                disabled
                
              />
              <Typography.Text style={{ fontWeight: "bold", marginTop: 10 }}>
                {" "}
                courseName
              </Typography.Text>

              <Input
                value={editSession?.courseName}
                style={{ marginTop: 10 }}
                onChange={(e) => {
                  setEditSession((pre) => {
                    return { ...pre, courseName: e.target.value };
                  });
                }}
            
              />
              <Typography.Text style={{ fontWeight: "bold", marginTop: 10 }}>
                {" "}
                session Date
              </Typography.Text>
              <DatePicker
                value={
                  moment(editSession?.lecDate[0])
                 
                 
                }
                format={dateFormat}
                style={{ marginTop: 10 }}
                onChange={onChangeDate}
              />

              <Typography.Text style={{ fontWeight: "bold", marginTop: 10 }}>
                Session time
              </Typography.Text>
              <TimePicker.RangePicker
                value={[
                  moment(editSession?.lecTime[0]),
                  moment(editSession?.lecTime[1]),
                ]}
                format={timeFormat}
                style={{ margin: 10, marginLeft: 0 }}
                onChange={onChangeTime}
              />
            </div>
          </Modal>
        </>
      ) : (
        <Spin />
      )}

      <Modal
        title="Student Attendace"
        visible={attendaceChart}
        onOk={""}
        onCancel={() => {
          setAttendanceChart(false);
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={[getAttendance]}
          renderItem={(item) => {
            return (
              <div>
                <div style={{ marginLeft: "25rem" }}>
                  <FilePdfOutlined
                    style={{ color: "blue", fontSize: "xx-large" }}
                    diabled
                    onClick={() => {
                      let obj = item.attendance.flat().map((res) => res);
                      generatePDF(obj);
                    }}
                  />
                  <a
                    onClick={() => {
                      let obj = item.attendance.flat().map((res) => res);
                      generatePDF(obj);
                    }}
                  >
                    Download
                  </a>
                </div>

                {item.attendance.flat().map((res) => {
                  let m = moment(res.time, timeFormat).toString();
                  let attendance = m.replace(" GMT+0530", "");

                  return (
                    <>
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <div>
                              <a>{item.classId}</a>
                            </div>
                          }
                          description={
                            <div>
                              <li>{res.name}</li>
                              <li>{res.email}</li>
                              <li>{attendance}</li>
                            </div>
                          }
                        />
                      </List.Item>
                    </>
                  );
                })}
              </div>
            );
          }}
        />
      </Modal>


      <Modal
        title="Lecture Room"
        visible={viewModel}
        onOk={""}
        onCancel={() => {
          setViewModel(false);
        }}
      >
       
      
       <h5>Waiting Host will be add you soon ....</h5>
       <Spin size="large" style={{marginLeft:'14rem'}} /> 
    
       
      </Modal>
    </div>
  );
}
