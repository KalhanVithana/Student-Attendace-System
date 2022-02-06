import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../../forms/login";
import {
  ERROR_LOGIN,
  ERROR_SIGNUP,
  ERROR_USER_UPDATE_DATA,
  LOAD_LOGIN,
  LOAD_SIGNUP,
  LOAD_USER_UPDATE,
  REQUERST_LOGIN,
  REQUERST_SIGNUP,
  REQUERST_USER_UPDATE,
  SUCCESS_LOGIN,
  SUCCESS_SIGNUP,
  SUCCESS_USER_UPDATE,
  SUCCESS_USER_UPDATE_DATA,
} from "./constants";
import { notification } from "antd";
const openNotificationWithIcon = (type) => {
  if (type === "update") {
    notification["success"]({
      message: "update sucesfully",
    });
  } else if (type === "signIn") {
    {
      notification["success"]({
        message: "  sign In sucessfully",
      });
    }
  } else if (type === "signUP") {
    {
      notification["success"]({
        message: "  sign Up sucessfully",
      });
    }
  }
};

export const signUpUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: REQUERST_SIGNUP });

    dispatch({ type: LOAD_SIGNUP });

    const resData = await axios.post(
      "http://localhost:4000/user/register",
      data
    );

    console.log(data);

    dispatch({ type: SUCCESS_SIGNUP, payload: resData });
    openNotificationWithIcon("signUP");
  } catch (e) {
    console.log("error", e);
    dispatch({ type: ERROR_SIGNUP, payload: e });
  }
};

export const LoginUser = (data) => async (dispatch) => {
  try {
    console.log("data users", data);

    dispatch({ type: REQUERST_LOGIN });

    dispatch({ type: LOAD_LOGIN });

    const resData = await axios.post("http://localhost:4000/user/login", data);

    console.log(resData);
    localStorage.setItem("x-auth", resData.data.token);

    dispatch({ type: SUCCESS_LOGIN, payload: resData });
    openNotificationWithIcon("signIn");
  } catch (e) {
    console.log("error", e);
    dispatch({ type: ERROR_LOGIN, payload: e });
  }
};

export const UpdateUser = (data) => async (dispatch) => {
  const token = localStorage.getItem("x-auth");
  try {
    dispatch({ type: REQUERST_USER_UPDATE });

    dispatch({ type: LOAD_USER_UPDATE });

    const resData = await axios.put(
      "http://localhost:4000/user/get/update",
      data,
      {
        headers: { "x-auth": token },
      }
    );

    console.log(resData);

    dispatch({ type: SUCCESS_USER_UPDATE_DATA, payload: resData });
    openNotificationWithIcon("update");
  } catch (e) {
    console.log("error", e);
    dispatch({ type: ERROR_USER_UPDATE_DATA, payload: e });
  }
};
