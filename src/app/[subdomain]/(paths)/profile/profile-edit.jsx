"use client"
import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../../../utils";
import Cookies from "js-cookie";

export default function ProfileEdit({ data }) {
  // console.log(data);

  // const address = data.admin.company
  // const address = data.company.admin.adresss
  const [firstName, setFirstName] = useState(data.firstname);
  const [lastName, setLastName] = useState(data.lastname);
  const [companyName, setCompanyName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [mobile, setMobileNumber] = useState(data.mobile);

  // Address fields
  const [street, setStreet] = useState(data.street);
  const [city, setCity] = useState(data.city);
  const [state, setState] = useState(data.state);
  const [zipCode, setZipCode] = useState(data.zipCode);
  const [country, setCountry] = useState(data.country);

  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const subdomain = Cookies.get("subdomain");
  const accessToken = Cookies.get("accessToken");

  const uploadHandler = (event) => {
    const file = event.files[0];
    if (file) {
      setProfile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !country
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Failed",
        text: "Please fill in all fields.",
      });
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    // formData.append("companyName", companyName); // Uncomment if needed
    formData.append("email", email);
    formData.append("mobile", mobile);

    // Append address as a nested object
    formData.append("address[street]", street);
    formData.append("address[city]", city);
    formData.append("address[state]", state);
    formData.append("address[zipCode]", zipCode);
    formData.append("address[country]", country);

    if (profile) formData.append("Profile", profile);

    try {
      await axios.patch(`${API_BASE_URL}/user/${subdomain}/me`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });

      setShowEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Col>
        <div className="card">
          <div className="d-flex" style={{ borderBottom: "1px solid" }}>
            <h4 className="ms-5 mt-3 mb-4">Profile Edit</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-3">
              <Row>
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Col>
                {/* <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </Col> */}
              </Row>
              <Row className="mt-2">
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} lg={4} className="mt-2">
                  <InputMask
                    placeholder="Mobile Number"
                    mask="+91 9999999999"
                    value={mobile}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={12} lg={4} className="mt-2">
                  <InputText
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} lg={4} className="mt-2">
                  <Button type="submit" disabled={uploading} className="btn1">
                    {uploading ? "Updating..." : "Update"}
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="card">
              <FileUpload
              className="btn1"
                name="profile"
                customUpload
                uploadHandler={uploadHandler}
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
                }
              />
            </div>
          </form>
        </div>
      </Col>
    </div>
  );
}
