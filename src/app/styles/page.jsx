"use client";
// import "../[accsskey]/login.scss";
import "./login.scss";
import { Button, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import Link from "next/link";
import axios from "axios";
import { API_BASE_URL} from "../utils";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  // const router2 = usePathname()
  // const path = router2;
  // console.log(router2 || "null");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login `, {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data.data;

      Cookies.set("crmaccess", accessToken,{
        secure: true,
        sameSite: "Strict",
        expires: 7, 
      });
      // localStorage.setItem("refreshToken", refreshToken);   
      Cookies.set("refreshToken", refreshToken,{
        secure: true,
        sameSite: "Strict",
        expires: 7, 
      });

      setSuccess("Login successful!");
      setError("");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  const isTokenExpired = (expiry) => {
    return Date.now() > expiry;
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshTokenExpiry = parseInt(
      localStorage.getItem("refreshTokenExpiry")
    );

    if (!refreshToken || isTokenExpired(refreshTokenExpiry)) {
      logout();
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/refresh-token`, {
        refreshToken,
      });

      const { accessToken } = response.data.data;
      const accessTokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("accessTokenExpiry", accessTokenExpiry);
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("crmaccess");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpiry");
    localStorage.removeItem("refreshTokenExpiry");
    router.push("/login");
  };

  

  return (
    <div className="login-container">
      <div className="d-flex login-layout">
        <div
          className="login-layout-container"
          style={{
            boxShadow:
              "0 4px 10px rgba(0, 0, 0, .03), 0 0 2px rgba(0, 0, 0, .06), 0 2px 6px rgba(0, 0, 0, .12)",
          }}
        >
          <div>
            <h5 className="text-center">Welcome to Login</h5>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <div className=" mt-4">
                  <label className="form-label">Email</label>
                  <br />
                  <div className="cards">
                    <InputText
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                      required
                    />
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-2">
                  <label className="form-label">Password</label>{" "}
                  <span className="ms-2 fs-6">
                    <Link href="#">Forgot?</Link>
                  </span>
                  <br />
                  <div className="cards">
                    <Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      toggleMask
                      className="w-100"
                      required
                    />
                  </div>
                </div>
              </Col>
            </Row>

            {/* <div className="mt-2 d-flex ">
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          />
          <label className="ms-2 fs-6">
            Remember me
          </label>
         
        </div> */}
            <div className="mt-3">
              <Button className="w-100" type="submit" variant="danger">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
