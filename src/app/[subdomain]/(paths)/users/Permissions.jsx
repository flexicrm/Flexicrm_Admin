// "use client";
// import { Button } from "primereact/button";
// import { Checkbox } from "primereact/checkbox";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import Cookies from "js-cookie";
// import React, { useEffect, useRef, useState } from "react";
// import "../../../styles/users.scss";
// import axios from "axios";
// import { API_BASE_URL } from "../../../utils";
// import { Col, Row } from "react-bootstrap";
// import Swal from "sweetalert2";
// import { InputSwitch } from "primereact/inputswitch";

// const initialPermissions = {
//   Dashboard: { canRead: true },
//   subscriptions: {
//     canCreate: true,
//     canRead: true,
//     canUpdate: false,
//     canDelete: false,
//   },
//   Sales: {
//     canCreate: false,
//     canRead: true,
//     canUpdate: false,
//     canDelete: false,
//   },
//   RolesPermissions: {
//     canCreate: true,
//     canRead: true,
//     canUpdate: true,
//     canDelete: false,
//   },
//   User: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
//   Leads: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
//   Order: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
//   Customer: {
//     canCreate: true,
//     canRead: true,
//     canUpdate: true,
//     canDelete: true,
//   },
//   Expenses: {
//     canCreate: true,
//     canRead: true,
//     canUpdate: true,
//     canDelete: true,
//   },
//   Task: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
//   Setup: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
//   Utilities: {
//     canCreate: true,
//     canRead: true,
//     canUpdate: true,
//     canDelete: true,
//   },
//   Profile: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
//   Report: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
// };

// export default function Permissions({ permissionsShow, permissionsShows }) {
//   const [userRole, setRole] = useState("");
//   const [permissions, setPermissions] = useState(initialPermissions);
//   const accessToken = Cookies.get("accessToken");
//   const subdomain = Cookies.get("subdomain");
//   const permissionsRef = useRef(null);

//   const handleCheckboxChange = (section, permission) => {
//     setPermissions((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [permission]: !prev[section][permission],
//       },
//     }));
//   };

//   const handleSelectAllChange = (section) => {
//     const allSelected = Object.values(permissions[section]).every(Boolean);
//     setPermissions((prev) => ({
//       ...prev,
//       [section]: Object.keys(prev[section]).reduce((acc, key) => {
//         acc[key] = !allSelected;
//         return acc;
//       }, {}),
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };
//       const response = await axios.post(
//         `${API_BASE_URL}/roleandpermission/${subdomain}`,
//         { userRole, permissions },
//         { headers }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "User Role Updated",
//         text: "Your User Role has been updated successfully.",
//       });
//     } catch (error) {
//       // Handle error appropriately
//       console.error("Error updating permissions:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text: "There was an error updating the permissions.",
//       });
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (
//       permissionsRef.current &&
//       !permissionsRef.current.contains(event.target)
//     ) {
//       permissionsShows(""); // Close the permissions modal
//     }
//   };

//   return (
//     <>
//       {permissionsShow && (
//         <div className="permision-slider">
//           <Card
//             ref={permissionsRef}
//             style={{ width: "400px", margin: "0 auto" }}
//           >
//             <div className="d-flex">
//               <h5 className="">Role and Permissions</h5>
//               <p className="ms-auto" onClick={permissionsShows}>
//                 <i className="pi pi-times"></i>
//               </p>
//             </div>
//             <div className="p-field">
//               <label htmlFor="role">Role Name :</label>
//               <br />
//               <InputText
//                 id="role"
//                 value={userRole}
//                 onChange={(e) => setRole(e.target.value)}
//               />
//             </div>

//             {Object.keys(permissions).map((section) => (
//               <div key={section} className="p-mb-3 mt-2">
//                 <div className="d-flex">
//                   <h6>{section}</h6>
//                   <InputSwitch
//                     className="ms-auto"
//                     inputId={`select-all-${section}`}
//                     checked={Object.values(permissions[section]).every(Boolean)}
//                     onChange={() => handleSelectAllChange(section)}
//                     style={{width:"40px" ,height:"20px"}}
//                   />
//                   {/* <label htmlFor={`select-all-${section}`}>Select All</label> */}
//                 </div>
//                 <div className="p-d-flex p-flex-wrap">
//                   <Row>
//                     {Object.keys(permissions[section]).map((permission) => (
//                       <Col key={permission}>
//                         <div className="p-field-checkbox p-mr-3">
//                           <Checkbox
//                             inputId={`${section}-${permission}`}
//                             checked={permissions[section][permission]}
//                             onChange={() =>
//                               handleCheckboxChange(section, permission)
//                             }
//                           />
//                           <label htmlFor={`${section}-${permission}`}>
//                             {permission}
//                           </label>
//                         </div>
//                       </Col>
//                     ))}
//                   </Row>
//                 </div>
//               </div>
//             ))}
//             <div className="text-end mt-4">
//               <Button label="Save" onClick={handleSubmit} />
//               <Button
//                 label="Close"
//                 className="ms-2"
//                 onClick={permissionsShows}
//               />
//             </div>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// }

"use client";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Card } from "primereact/card";
import "./../../../globals.css"
import { InputText } from "primereact/inputtext";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import "../../../styles/users.scss";
import axios from "axios";
import { API_BASE_URL } from "../../../utils";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";

const initialPermissions = {
  Dashboard: { canRead: true },
  subscriptions: {
    canCreate: true,
    canRead: true,
    canUpdate: false,
    canDelete: false,
  },
  Sales: {
    canCreate: false,
    canRead: true,
    canUpdate: false,
    canDelete: false,
  },
  RolesPermissions: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: false,
  },
  User: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  Leads: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  Order: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  Customer: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Project: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Contact: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Invoice: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Estimates: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Payments: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Proposals: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },

  Expenses: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Task: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  Setup: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  Utilities: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  },
  Profile: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  Report: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  Contracts: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
};

export default function Permissions({ permissionsShow, permissionsShows,fetchRoles }) {
  const [userRole, setRole] = useState("");
  const [permissions, setPermissions] = useState(initialPermissions);
  const accessToken = Cookies.get("crmaccess");
  const subdomain = Cookies.get("subdomain");
  const permissionsRef = useRef(null);
  const toast = useRef(null);
  const handleCheckboxChange = (section, permission,) => {
    setPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [permission]: !prev[section][permission],
      },
    }));
  };

  const handleSelectAllChange = (section) => {
    const allSelected = Object.values(permissions[section]).every(Boolean);
    setPermissions((prev) => ({
      ...prev,
      [section]: Object.keys(prev[section]).reduce((acc, key) => {
        acc[key] = !allSelected;
        return acc;
      }, {}),
    }));
  };

  const handleSubmit = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(
        `${API_BASE_URL}/roleandpermission/${subdomain}`,
        { userRole, permissions },
        { headers }
      );
      toast.current.show({
        severity: "success",
        summary: "User Role Updated",
        detail: "Your User Role has been updated successfully.",
      });
      // Show success message and close the modal
      // Swal.fire({
      //   icon: "success",
      //   title: "User Role Updated",
      //   text: "Your User Role has been updated successfully.",
      //   position: "top-end",
      //   showConfirmButton: false,
      //   timer: 2000, // Auto close after 2 seconds
      // });
      permissionsShows(""); // Close the permissions modal
      fetchRoles()
    } catch (error) {
      console.error("Error updating permissions:", error);
      toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }
  };

  const handleClickOutside = (event) => {
    if (
      permissionsRef.current &&
      !permissionsRef.current.contains(event.target)
    ) {
      permissionsShows(""); // Close the permissions modal
    }
  };

  return (
    <>
      <Toast ref={toast} />
      {permissionsShow && (
        <div className="permision-slider">
          <Card
            ref={permissionsRef}
            style={{ width: "100%" }}
          >
            <div className="d-flex">
              <h5 className="">Role and Permissions</h5>
              <p className="ms-auto" onClick={permissionsShows}>
                <i className="pi pi-times"></i>
              </p>
            </div>
            <div className="p-field">
              <label htmlFor="role">Role Name :</label>
              <br />
              <InputText
                id="role"
                value={userRole}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            {Object.keys(permissions).map((section) => (
              <div key={section} className="p-mb-3 mt-2">
                <div className="d-flex">
                  <h6>{section}</h6>
                  <InputSwitch
                    className="ms-auto custom-switch"
                    inputId={`select-all-${section}`}
                    checked={Object.values(permissions[section]).every(Boolean)}
                    onChange={() => handleSelectAllChange(section)}
                    style={{ width: "40px", height: "20px" }}
                  />
                </div>
                <div className="p-d-flex p-flex-wrap">
                  <Row>
                    {Object.keys(permissions[section]).map((permission) => (
                      <Col key={permission}>
                        <div className="p-field-checkbox p-mr-3">
                          <Checkbox
                            inputId={`${section}-${permission}`}
                            checked={permissions[section][permission]}
                            onChange={() =>
                              handleCheckboxChange(section, permission)
                            }
                          />
                          <label htmlFor={`${section}-${permission}`}>
                            {permission}
                          </label>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            ))}
            <div className="text-end mt-4">
              <Button label="Save" onClick={handleSubmit} className="btn-all "/>
              <Button
                label="Close"
                className="ms-2 btn-all-cln"
                onClick={permissionsShows}
              />
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
