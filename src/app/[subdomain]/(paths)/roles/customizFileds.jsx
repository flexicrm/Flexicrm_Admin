"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import axios from "axios";
// import { API_BASE_URL } from "@/app/utils";
import Cookies from "js-cookie";
import { Col, Row } from "react-bootstrap";
// import userContext from "@/app/UseContext/UseContext";
import { API_BASE_URL } from "../../../utils";
import userContext from "../../../UseContext/UseContext";

const fieldTypes = [
  { name: "Text", code: "text" },
  { name: "Calendar", code: "calendar" },
  { name: "Number", code: "number" },
  { name: "Telephone", code: "telephone" },
  { name: "Password", code: "password" },
];

const CustomizedleadPage = (format) => {
    // console.log(format.format
    // )
    const content =format.format
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState(null);
  const [required, setRequired] = useState(false);
  const [fields, setFields] = useState({});
  const [data, setData] = useState([]);
  const toast = useRef(null);
  const { setValues } = useContext(userContext);
  const subdomain = Cookies.get("subdomain");
  const accessToken = Cookies.get("accessToken");

  const handleSubmit = async () => {
    if (!fieldName || !fieldType) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Field Name and Type are required!",
        life: 3000,
      });
      return;
    }

    const newField = {
      fieldName,
      fieldType: fieldType.code,
      required,
      value: "",
    };

    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: newField,
    }));

    // Submit the new field to the API
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      await axios.post(
        `${API_BASE_URL}/customefield/${subdomain}`,
        {
          fieldName: newField.fieldName,
          fieldType: newField.fieldType,
          required: newField.required,
          schemaName: content,
        },
        { headers }
      );

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Field added successfully!",
        life: 3000,
      });
      fetchData(); // Refresh the fields list
    } catch (error) {
      console.error("Submission error:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add field!",
        life: 3000,
      });
    }

    // Reset form
    setFieldName("");
    setFieldType(null);
    setRequired(false);
    setDialogVisible(false);
  };

  const handleFieldChange = (fieldName, value) => {
    // console.log(fieldName, value);
    // setValues((prevValues) => ({
    //   ...prevValues,
    //   [fieldName]: {
    //     label: fieldName, // Set the label
    //     value: value, // Set the value
    //   },
    // }));
    setValues((prevValues) => {
      // Check if the field already exists in the values array
      const existingFieldIndex = prevValues.findIndex(
        (item) => item.label === fieldName
      );

      if (existingFieldIndex >= 0) {
        // If it exists, update its value
        const updatedValues = [...prevValues];
        updatedValues[existingFieldIndex].value = value;
        return updatedValues;
      } else {
        // If it doesn't exist, add a new entry
        return [...prevValues, { label: fieldName, value: value }];
      }
    });
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: {
        ...prevFields[fieldName],
        value,
      },
    }));
  };

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      const response = await axios.get(
        `${API_BASE_URL}/customefield/${subdomain}/${content}`,
        { headers }
      );
      setData(response.data.data.custmefields);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch data!",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Button label="Add Custom Field" onClick={() => setDialogVisible(true)} />
      <Dialog
        header="Add Custom Field"
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
      >
        <div>
          <div>
            <label htmlFor="newFieldName">Field Name</label> <br />
            <InputText
              id="newFieldName"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newFieldType">Field Type</label> <br />
            <Dropdown
              id="newFieldType"
              className="w-100"
              value={fieldType}
              options={fieldTypes}
              onChange={(e) => setFieldType(e.value)}
              optionLabel="name"
              placeholder="Select a Type"
            />
          </div>

          <div style={{ margin: "10px 0" }}>
            <Checkbox
              checked={required}
              onChange={(e) => setRequired(e.checked)}
              inputId="requiredCheckbox"
            />
            <label htmlFor="requiredCheckbox" style={{ marginLeft: "8px" }}>
              Required
            </label>
          </div>
          <div className="d-flex">
            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </Dialog>

      <Row>
        {data.map((field, index) => (
          <Col key={index} md={6}>
            <label htmlFor={`field_${index}`} className="fw-bold">
              {field.fieldName}
            </label>{" "}
            <br />
            <InputText
              type={field.fieldType}
              id={`field_${index}`}
              name={field.fieldName}
              value={fields[field.fieldName]?.value || ""}
              onChange={(e) =>
                handleFieldChange(field.fieldName, e.target.value)
              }
              required={field.required}
            />
            {field.required && (
              <span style={{ color: "red" }}> (Required)</span>
            )}
          </Col>
        ))}
      </Row>

      <Toast ref={toast} />
    </div>
  );
};

export default CustomizedleadPage;
