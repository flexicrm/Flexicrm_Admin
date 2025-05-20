
"use client"

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Col, Row, Modal } from "react-bootstrap"; 
import Swal from "sweetalert2";
import axios from "axios";
// import { API_BASE_URL } from "@/app/utils";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../../utils";

const EditableUsers = ({ users, accessToken, subdomain, userRoles }) => {
  const [userData, setUserData] = useState(users);
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUserData(users);
  }, [users]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map(({ firstname, lastname, email, mobile, userRole }) => ({
        name: `${firstname} ${lastname}`,
        email,
        mobile,
        userRole,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserData.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("User Data", 20, 20);
    const tableColumn = ["Name", "Email", "Mobile", "User Role"];
    const tableRows = userData.map(({ firstname, lastname, email, mobile, userRole }) => [
      `${firstname} ${lastname}`,
      email,
      mobile,
      userRole,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("UserData.pdf");
  };

  const fetchPermissions = async (role) => {
    const cookieSubdomain2 = Cookies.get("subdomain");
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(
        `${API_BASE_URL}/roleandpermission/${cookieSubdomain2}/getpermission?role=${role}`,
        { headers }
      );

      if (response.data.data) {
        setPermissions(response.data.data);
      } else {
        setPermissions({});
      }
    } catch (error) {
      console.error("Error fetching permissions:", error.message);
      Swal.fire("Error!", "Failed to fetch permissions.", "error");
    }
  };

  const handleRoleChange = async (newRole, index) => {
    await fetchPermissions(newRole);
    setUserData(prev =>
      prev.map((user, i) => (i === index ? { ...user, userRole: newRole } : user))
    );
  };

  const handleRowEditComplete = async ({ newData, index }) => {
    setLoading(true);
    const userId = userData[index]._id;

    try { 
      await axios.put(
        `${API_BASE_URL}/user/${subdomain}/me`,
        { ...newData, id: userId, permissions },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      Swal.fire("Success!", "User updated successfully.", "success");
      setUserData(prev => prev.map((user, i) => (i === index ? newData : user)));
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Failed to update user.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/user/${subdomain}/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        setUserData(prev => prev.filter(user => user._id !== userId));
      } catch (error) {
        Swal.fire("Error!", error.message || "There was a problem deleting the user.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const textEditor = (options) => (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
    />
  );

  const mobileEditor = (options) => (
    <InputMask
      mask="+91-9999999999"
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
    />
  );

  const roleEditor = (options) => (
    <Dropdown
      value={options.value}
      options={userRoles}
      onChange={(e) => {
        options.editorCallback(e.value);
        handleRoleChange(e.value, options.rowIndex);
      }}
      optionLabel="name"
    />
  );

  const handleEdit = (userId, userDetails) => {
    setEditUser(userDetails);
    setShowModal(true);
  };

  const handleModalSave = async () => {
    if (!editUser) return;

    setLoading(true);
    const userId = editUser._id;

    try {
      await axios.put(
        `${API_BASE_URL}/user/${subdomain}/me`,
        { ...editUser, id: userId, permissions },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      Swal.fire("Success!", "User updated successfully.", "success");
      setUserData(prev => prev.map(user => (user._id === userId ? editUser : user)));
      setShowModal(false);
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Failed to update user.", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderTableView = () => (
    <DataTable
      value={userData}
      paginator
      rows={10}
      responsiveLayout="scroll"
      editMode="row"
      onRowEditComplete={handleRowEditComplete}
    >
      <Column
        field="firstname"
        header="First Name"
        editor={textEditor}
        body={(option) => (
          <div className="d-flex">
            <img
              src={option?.Profile}
              alt=""
              width={"40px"}
              style={{ borderRadius: "50%" }}
            />
            <p className="m-2">{option.firstname}</p>
          </div>
        )}
      />
      <Column field="lastname" header="Last Name" editor={textEditor} />
      <Column field="email" header="Email" editor={textEditor} />
      <Column field="mobile" header="Mobile" editor={mobileEditor} />
      <Column field="userRole" header="User Role" editor={roleEditor} />
      <Column rowEditor headerStyle={{ width: "10%", minWidth: "8rem" }} bodyStyle={{ textAlign: "center" }} />
      <Column body={(rowData) => (
        <Button icon="pi pi-trash" className="ml-2" onClick={() => handleDelete(rowData._id)} />
      )} />
    </DataTable>
  );

  const renderGridView = () => (
    <Row>
      {userData.map(({ _id, firstname, lastname, userRole, email, mobile, Profile }) => (
        <Col md={3} key={_id}>
          <div className="grid-item card">
            <div className="d-flex">
              <img src={Profile} alt="" width={"200px"} style={{ borderRadius: "50%" }} className="" />
              <div className="hovertable">
                <Button icon="pi pi-pencil" onClick={() => handleEdit(_id, { _id, firstname, lastname, email, mobile, userRole })} style={{ borderRadius: "50%" }} />
                <Button icon="pi pi-trash" className="mt-2" onClick={() => handleDelete(_id)} style={{ borderRadius: "50%" }} />
              </div>
            </div>
            <h5>{`${firstname} ${lastname}`}</h5>
            <p>{userRole}</p>
            <ul className="list-inline">
              <li>{email}</li>
              <li>{mobile}</li>
            </ul>
          </div>
        </Col>
      ))}
    </Row>
  );

  return (
    <div>
      <div className="view-buttons">
        <Button label="Table View" onClick={() => setView("table")} />
        <Button label="Grid View" onClick={() => setView("grid")} />
        <Button label="Export to Excel" onClick={exportToExcel} />
        <Button label="Export to PDF" onClick={exportToPDF} />
      </div>
      {loading ? <h2>Loading...</h2> : userData.length ? (view === "table" ? renderTableView() : renderGridView()) : <h2>No data available</h2>}

      {/* Modal for editing user details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputText
            value={editUser?.firstname}
            onChange={(e) => setEditUser({ ...editUser, firstname: e.target.value })}
            placeholder="First Name"
          />
          <InputText
            value={editUser?.lastname}
            onChange={(e) => setEditUser({ ...editUser, lastname: e.target.value })}
            placeholder="Last Name"
          />
          <InputText
            value={editUser?.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            placeholder="Email"
          />
          <InputMask
            mask="+91-9999999999"
            value={editUser?.mobile}
            onChange={(e) => setEditUser({ ...editUser, mobile: e.target.value })}
            placeholder="Mobile"
          />
          <Dropdown
            value={editUser?.userRole}
            options={userRoles}
            onChange={(e) => setEditUser({ ...editUser, userRole: e.value })}
            optionLabel="name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditableUsers;
