"use client";
import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
// import "../../../styles/customer.scss"
import Profiles from "../../pages/profiles/page";
import Contacts from "../../pages/contacts/page";
import Notes from "../../pages/notes/page";
import Invoice from "../../pages/invoice/page";
import Payments from "../../pages/payments/page";
import Estimate from "../../pages/estimate/page";
import Expense from "../../pages/expense/page";
// import Payments from "./pages/payments/page"
import Contract from "../../pages/contract/page";
import { useParams } from "next/navigation";

import Projects from "../../pages/projects/page";

import Cookies from "js-cookie";
import Swal from "sweetalert2";
// import { API_BASE_URL } from "@/app/utils";
import axios from "axios";
import userContext from "../../../../../UseContext/UseContext";
import { API_BASE_URL } from "../../../../../utils";
// import userContext from "@/app/UseContext/UseContext";

export default function Customer() {
  const { slug } = useParams();
  const {setrefreshdata}=useContext(userContext)
  const {setSingledata}= useContext(userContext)
  console.log(slug, "slug");
  const subdomain = Cookies.get("subdomain");
  const [data, setData] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [animate, setAnimate] = useState(false);
  console.log(data,"id")
  useEffect(() => {
    
    setrefreshdata(fetchData)
    fetchData();
  }, [slug, subdomain, accessToken]);
  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      const response = await axios.get(
        `${API_BASE_URL}/customer/${subdomain}/${slug}`,
        { headers }
      );

    console.log(response,"response")
      const customerData = response.data.data.customer;
      setData(customerData);
      setSingledata(customerData)
    } catch (error) {
      console.error("Error fetching customer data:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error fetching customer data.",
      });
    }
  };
  const menus = [
    { name: "Profile", icon: "pi pi-user" },
    { name: "Contacts", icon: "pi pi-address-book" },
    { name: "Notes", icon: "pi pi-clipboard" },
    { name: "Projects", icon: "pi pi-folder" },
    { name: "Invoices", icon: "pi pi-receipt" },
    { name: "Expenses", icon: "pi pi-money-bill" },
    { name: "Estimates", icon: "pi pi-file" },
    { name: "Payments", icon: "pi pi-wallet" },
    { name: "Contracts", icon: "pi pi-file-text" },
  ];

  const renderComponent = () => {
    switch (selectedMenu) {
      case "Profile":
        return (
          <Profiles
            onContinue={() => setSelectedMenu("Contacts")}
            slug={slug}
            fetchData={fetchData}
          />
        );
      case "Contacts":
        return (
          <Contacts onContinue={() => setSelectedMenu("Notes")} slug={data} fetchData={fetchData}  />
        );
      case "Notes":
        return (
          <Notes onContinue={() => setSelectedMenu("Invoices")} slug={slug}  fetchData={fetchData} />
        );
      case "Invoices":
        return (
          <Invoice onContinue={() => setSelectedMenu("Payments")} slug={data} fetchData={fetchData} />
        );
      case "Payments":
      // return <Payments  onContinue={() => setSelectedMenu("Estimates")}  >;
      case "Estimates":
        return (
          <Estimate
            onContinue={() => setSelectedMenu("Expenses")}
            slug={slug}
            fetchData={fetchData}
           
          />
        );
      case "Expenses":
        return (
          <Expense
            onContinue={() => setSelectedMenu("Contracts")}
            slug={slug}

            fetchData={fetchData}
          />
        );
      case "Contracts":
        return (
          <Contract
            onContinue={() => setSelectedMenu("Projects")}
            slug={slug}
            fetchData={fetchData}
           
          />
        );
      case "Projects":
        return <Projects  slug={data}  fetchData={fetchData}  />
      default:
        return <Profiles />;
    }
  };

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [selectedMenu]);
// console.log(data.contacts,"contactdata")
  return (
    <div>
      <div className="page-header">
        <h5 className="page-title text-white  ">{data.Companyname}</h5>
      </div>
      <Row className="meun-left">
        <Col md={3} className="">
          <Card>
            <ul className="list-inline mt-2">
              {menus.map((menu) => (
                <li
                  key={menu.name}
                  className={`ms-2 p-1 active-li ${
                    selectedMenu === menu.name ? "active" : ""
                  }`}
                  onClick={() => setSelectedMenu(menu.name)}
                >
                  <div className="btn-items">
                  <i className={menu.icon}></i> {menu.name}
                  {/* <hr /> */}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
        <Col md={9}>
          <Card className={animate ? "slide-in" : ""}>{renderComponent()}</Card>
        </Col>
      </Row>
    </div>
  );
}
