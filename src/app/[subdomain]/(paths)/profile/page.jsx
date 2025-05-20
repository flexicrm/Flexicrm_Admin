"use client";


import axios from "axios";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import ProfileEdit from "./profile-edit";
// import { API_BASE_URL } from "@/app/utils";
import { cookies } from "js-cookie";
import userContext from "../../../UseContext/UseContext"
import { API_BASE_URL } from "../../../utils";

export default function Page() {
  const {data, setData} = useContext(userContext);
  // console.log(data,"data")
  const [showEdit, setShowEdit] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState(null);

  const accessToken = Cookies.get("accessToken");
  const subdomain = Cookies.get("subdomain");

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const {
            data: { data: userData },
          } = await axios.get(`${API_BASE_URL}/user/${subdomain}/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setData(userData);
          // setCompanyName(userData.companyName || "");
          // setEmail(userData.email || "");
          // setMobileNumber(userData.mobileNumber || "");
          // setAddress(userData.address || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [accessToken]);

  const handleEdit = () => setShowEdit((prev) => !prev);

  return (
    <div>
      <Row>
        <Col md={4}>
          <div className="card">
            <div className="d-flex" style={{ borderBottom: "1px solid" }}>
              <h4 className="ms-5 mt-3">Profile</h4>
              <p className="ms-auto mt-3">
                <i
                  className="pi pi-user-edit fs-2 me-4"
                  onClick={handleEdit}
                ></i>
              </p>
            </div>
            <div className="d-flex p-2">
              <div className="m-auto">
                {/* {console.log(data)} */}
                <img
                  src={
                    data.profile ||
                    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                  }
                  alt="Profile"
                  width={"100px"}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="m-auto">
                <ul className="list-inline mt-3">
                  <li>
                    <i className="pi pi-fw pi-user"></i>

                    {`${data?.firstname} ${data?.lastname}` || "null"}
                  </li>
                  <li>
                    <i className="pi pi-fw pi-building"></i>
                    {data?.company?.companyName || "null"}
                  </li>
                  <li>
                    <i className="pi pi-fw pi-envelope"></i>
                    {data.email || "null"}
                  </li>
                  <li>
                    <i className="pi pi-fw pi-phone"></i>
                    {data.mobile || "null"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          {showEdit && (
            <>
              <ProfileEdit data={data} />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
