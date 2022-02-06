import React, { useState, useEffect } from "react";
import "../container/nav.css"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
export default function NavBarContainer() {
  const state = useSelector((state) => state.AuthReducer.AuthUser);
  const dispatch = useDispatch();
  useEffect(async () => {}, [state]);

  return (
    <div className="navbar">
      <div className="leftside">
        <FaIcons.FaFingerprint
          style={{ fontSize: "30px", marginLeft: "2rem", color: "white" }}
        />
        <a href="/" style={{ color: "white", fontFamily: "monospace" }}>
          Hello
        </a>
      </div>

      <div className="rightside">
        <div className="links">
          {state > 0 ? (
            <>
              <a href="/auth/admin" style={{ fontFamily: "-moz-initial" }}>
                Account
              </a>

              <a
                href="#"
                style={{ fontFamily: "-moz-initial" }}
                onClick={() => {
                  localStorage.setItem("Authorization", "");

                  window.location = "/";
                }}
              >
                Log out
              </a>
            </>
          ) : (
            <>
              <a href="login" style={{ fontFamily: "-moz-initial" }}>
                Log In
              </a>
            </>
          )}

          <a href="Register" style={{ fontFamily: "-moz-initial" }}>
            Signup
          </a>
          {/* <a href="auth/admin"  style={{fontFamily:'-moz-initial'}}>Account</a> */}
        </div>
      </div>
    </div>
  );
}
