import { notification } from "antd";

export const responseMiddleware = (type, message) => {
  console.log("call");
  if (type === "update") {
    notification["success"]({
      message: "Update Sucesfully",
    });
  } else if (type === "signIn") {
    {
      notification["success"]({
        message: "Sign In Sucessfully",
      });
    }
  } else if (type === "signUP") {
    {
      notification["success"]({
        message: "Sign Up Sucessfully",
      });
    }
  } else if (type === "sessionUpdate") {
    notification["success"]({
      message: "Update Sucessfully",
    });
  } else if (type === "enroll") {
    {
      notification["success"]({
        message: "Enroll Sucessfully",
      });
    }
  } else if (type === "addsession") {
    {
      notification["success"]({
        message: "Add Session Sucessfully",
      });
    }
  } else {
    console.log("message", message);
    notification["error"]({
      message: `${message}`,
    });
  }
};
