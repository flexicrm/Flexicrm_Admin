"use client"
import React, { useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown"; // Importing Dropdown from PrimeReact

export default function LeadsUserTable({ leads }) {
  const [view, setView] = useState("table");
  // const [selectedassignto, setSelectedAssignto] = useState(null);
  const userData = useMemo(() => leads || [], [leads]);

  const exportToExcel = () => {
    if (userData.length === 0) {
      alert("No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      userData.map(({ formData, LeadId, source, status }) => ({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        LeadId,
        source,
        status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserData.xlsx");
  };

  const exportToPDF = () => {
    if (userData.length === 0) {
      alert("No data to export!");
      return;
    }

    const doc = new jsPDF();
    doc.text("User Data", 20, 20);
    const tableColumn = [
      "Name",
      "Email",
      "Mobile",
      "Lead ID",
      "Source",
      "Status",
    ];
    const tableRows = userData.map(({ formData, LeadId, source, status }) => [
      formData.name,
      formData.email,
      formData.mobile,
      LeadId,
      source,
      status,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("UserData.pdf");
  };

  const renderTableView = () => (
    <DataTable value={userData} paginator rows={10} responsiveLayout="scroll">
      <Column
        header="Name"
        body={(rowData) => rowData.formData.name}
        sortable
      />
      <Column header="Email" body={(rowData) => rowData.formData.email} />
      <Column header="Mobile" body={(rowData) => rowData.formData.mobile} />
      <Column field="LeadId" header="Lead ID" sortable />
      <Column field="source" header="Source" sortable />
      <Column field="status" header="Status" sortable />
      <Column
        header="Assign To"
        body={(rowData) => (
          <>
            <Dropdown
              optionLabel="firstname"
              older="Select user"
              aria-label="Assign user"
              value={rowData.assignTo || null}
              options={rowData.assignToOptions || []}
              onChange={(e) => {
                // console.log(`Assigned ${rowData.formData.name} to:`, e.value);
                <div className="d-flex align-items-center">
                  {/* {console.log(option, "options")} */}
                  <img
                    src={rowData.assignTo.Profile || "default-profile.png"}
                    alt={rowData.assignTo.firstname}
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%", marginRight: "5px" }}
                  />
                  <span>{rowData.assignTo.firstname}</span>
                </div>;
              }}
            />
            {/* <Dropdown
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.value)}
              options={countries}
              optionLabel="name"
              placeholder="Select a Country"
              filter
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className="w-full md:w-14rem"
            /> */}
          </>
        )}
      />

      <Column
        field="createdAt"
        header="Created At"
        body={(rowData) => new Date(rowData.createdAt).toLocaleString()}
      />
      <Column
        field="updatedAt"
        header="Updated At"
        body={(rowData) => new Date(rowData.updatedAt).toLocaleString()}
      />
    </DataTable>
  );

  const renderGridView = () => (
    <Row>
      {userData.map(
        ({
          LeadId,
          formData,
          userRole,
          source,
          status,
          createdAt,
          updatedAt,
          assignToOptions,
        }) => (
          <Col md={3} key={LeadId}>
            <div className="grid-item card">
              <h5>{formData.name}</h5>
              <p>{userRole}</p>
              <ul>
                <li>Email: {formData.email}</li>
                <li>Mobile: {formData.mobile}</li>
                <li>Lead ID: {LeadId}</li>
                <li>Source: {source}</li>
                <li>Status: {status}</li>
                <li>Created At: {new Date(createdAt).toLocaleString()}</li>
                <li>Updated At: {new Date(updatedAt).toLocaleString()}</li>
              </ul>

              <Dropdown
                value={formData.assignTo}
                options={assignToOptions || []}
                onChange={(e) => {
                  // console.log(`Assigned ${formData.name} to:`, e.value);
                }}
                optionLabel="firstname"
                itemTemplate={(option) => (
                  <div className="d-flex align-items-center">
                    <img
                      src={option.assignTo.Profile}
                      alt={option.assignTo.firstname}
                      width={20}
                      height={20}
                      style={{ borderRadius: "50%", marginRight: "5px" }}
                    />
                    <span>{option.assignTo.firstname}</span>
                  </div>
                )}
              />
            </div>
          </Col>
        )
      )}
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
      {userData.length ? (
        view === "table" ? (
          renderTableView()
        ) : (
          renderGridView()
        )
      ) : (
        <h2>No data available</h2>
      )}
    </div>
  );
}
