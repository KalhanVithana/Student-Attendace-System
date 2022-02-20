import axios from "axios";
import {
  ERROR_SESSION,
  ERROR_SESSION_DATA,
  ERROR_SESSION_DATA_UPDATE,
  LOAD_SESSION,
  LOAD_SESSION_DATA,
  LOAD_SESSION_DATA_UPDATE,
  REQUERST_SESSION,
  REQUERST_SESSION_DATA,
  REQUERST_SESSION_DATA_UPDATE,
  SUCCESS_SESSION,
  SUCCESS_SESSION_DATA,
  SUCCESS_SESSION_DATA_UPDATE,
} from "./constants";
import { responseMiddleware } from "../../../middleware/notification";

export const AddSessionList = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("x-auth");
    dispatch({ type: REQUERST_SESSION });
    dispatch({ type: LOAD_SESSION });

    const resData = await axios.post("http://localhost:4000/user/add", data, {
      headers: { "x-auth": token },
    });
    dispatch({ type: SUCCESS_SESSION, payload: resData });
    responseMiddleware("addsession");
  } catch (e) {
    dispatch({ type: ERROR_SESSION, payload: e });
    responseMiddleware("", e.response.data.msg);
  }
};

export const enrollCourseList = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("x-auth");
    dispatch({ type: REQUERST_SESSION });

    dispatch({ type: LOAD_SESSION });

    const resData = await axios.put("http://localhost:4000/user/up", data, {
      headers: { "x-auth": token },
    });

    dispatch({ type: SUCCESS_SESSION, payload: resData });
    responseMiddleware("enroll");
  } catch (e) {
    dispatch({ type: ERROR_SESSION, payload: e });
    responseMiddleware("", e.response.data.msg);
  }
};

export const getSessionList = (role) => async (dispatch) => {
  try {
    const token = localStorage.getItem("x-auth");

    if (role === "lecture") {
      dispatch({ type: REQUERST_SESSION_DATA });

      dispatch({ type: LOAD_SESSION_DATA });

      const resData = await axios.get(
        "http://localhost:4000/user/get/session",
        {
          headers: { "x-auth": token },
        }
      );

      dispatch({ type: SUCCESS_SESSION_DATA, payload: resData.data });
    } else if (role === "student") {
      dispatch({ type: REQUERST_SESSION_DATA });

      dispatch({ type: LOAD_SESSION_DATA });

      const resData = await axios.get("http://localhost:4000/user/get/std", {
        headers: { "x-auth": token },
      });

      dispatch({ type: SUCCESS_SESSION_DATA, payload: resData.data });
    }
  } catch (e) {
    dispatch({ type: ERROR_SESSION_DATA, payload: e });
  }
};

export const updateSession = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("x-auth");
    dispatch({ type: REQUERST_SESSION_DATA_UPDATE });

    dispatch({ type: LOAD_SESSION_DATA_UPDATE });

    const resData = await axios.put(
      "http://localhost:4000/user/session/up",
      data,
      {
        headers: { "x-auth": token },
      }
    );
    

    dispatch({ type: SUCCESS_SESSION_DATA_UPDATE, payload: resData.data });
    
   

    responseMiddleware("sessionUpdate");
  } catch (e) {
    dispatch({ type: ERROR_SESSION_DATA_UPDATE, payload: e });
  }
};
