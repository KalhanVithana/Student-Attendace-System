import {
  VideoCameraOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Input, Modal, Table, DatePicker, TimePicker, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSessionList, updateSession } from "../Redux/action/courseAction";
import moment from "moment";
import { useLocation } from "react-router-dom";
import axios from "axios";
const { RangePicker } = DatePicker;
import { Spin } from "antd";

export default function TableUser() {
  const TableData = useSelector(
    (state) => state.getSessionReducers.sessionData
  );
  const sessionData = useSelector((state) => state.getSessionReducers);
  const [EditModel, setEditModel] = useState(false);
  const [editSession, setEditSession] = useState(null);
  const [sessionUpdate, setSessionUpdate] = useState(
    sessionData ? sessionData.loading : null
  );
  const dispatch = useDispatch();

  const location = useLocation();
  const { role } = location.state;

  console.log(TableData);
  const dateFormat = "YYYY/MM/DD";
  const timeFormat = "HH:mm:ss";

  const columns = [
    {
      title: "classId",
      dataIndex: "classId",
      key: "classId",
      fixed: "left",
      sorter: (a, b) => a.classId - b.classId,
    },
    {
      title: "department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "lecDate",
      dataIndex: "lecDate",
      key: "lecDate",
      render: (text, row) => (
        <RangePicker
          value={[moment(text[0]), moment(text[1])]}
          format={dateFormat}
          disabled
        />
      ),
    },
    {
      title: "lecTime",
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
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (record) => {
        return (
          <div style={{ display: "flex" }}>
            {role === "lecture" ? (
              <>
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
            ) : (
              <VideoCameraOutlined />
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getSessionList(role));
  }, [dispatch]);

  const onEdit = (obj) => {
    setEditModel(true);
    setEditSession({ ...obj });
  };

  function onChangeDate(date, dateString) {
    console.log(date, dateString);

    setEditSession((pre) => {
      return { ...pre, lecDate: date };
    });
  }
  function onChangeTime(time, timeString) {
    console.log(time, timeString);
    setEditSession((pre) => {
      return { ...pre, lecTime: time };
    });
  }

  const editData = (data) => {
    dispatch(updateSession(data));
    dispatch(getSessionList(role));

    setEditModel(false);
  };

  const ondelete = async (record) => {
    const token = await localStorage.getItem("x-auth");

    Modal.confirm({
      title: `are you sure,do you want to delete `,
      okText: "yes",
      okType: "danger",
      onOk: async () => {
        console.log("deleted", record._id);

        const id = record._id;

        await axios
          .delete("http://localhost:4000/user/get/delete", id, {
            headers: { "x-auth": token },
          })
          .then((res) => {
            console.log(res.data);
          });
      },
    });
  };

  console.log("new", editSession);

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
                classId: editSession?.classId,
                lecDate: editSession?.lecDate,
                lecTime: editSession?.lecTime,
                department:editSession?.department
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
                disabled
                style={{ marginTop: 10 }}
              />
              <Typography.Text style={{ fontWeight: "bold", marginTop: 10 }}>
                {" "}
                Department
              </Typography.Text>

              <Input
                value={editSession?.department}
                style={{ marginTop: 10 }}
                onChange={(e) => {
                  setEditSession((pre) => {
                    return { ...pre, department: e.target.value };
                  });
                }}
              />
              <Typography.Text style={{ fontWeight: "bold", marginTop: 10 }}>
                {" "}
                session Date
              </Typography.Text>
              <RangePicker
                value={[
                  moment(editSession?.lecDate[0]),
                  moment(editSession?.lecDate[1]),
                ]}
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
    </div>
  );
}
