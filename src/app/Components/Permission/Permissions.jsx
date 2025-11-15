"use client";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";
import { API_BASE_URL } from "../../utils";

const initialPermissions = {
    Dashboard: { canRead: true },
    subscriptions: { canCreate: true, canRead: true, canUpdate: false, canDelete: false },
    Sales: { canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    RolesPermissions: { canCreate: true, canRead: true, canUpdate: true, canDelete: false },
    User: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Leads: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Order: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Customer: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Project: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Contact: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Invoice: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Estimates: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Payments: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Proposals: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Expenses: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Task: { canCreate: "true", canRead: true, canUpdate: true, canDelete: true },
    Setup: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Utilities: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Profile: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Report: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    Contracts: { canCreate: true, canRead: true, canUpdate: true, canDelete: true },
};

export default function Permissions({ show, onClose, onSaved, editingRole }) {
    const isEdit = !!editingRole;

    const [userRole, setRole] = useState(isEdit ? editingRole.roleName : "");
    const [permissions, setPermissions] = useState(isEdit ? editingRole.permissions : initialPermissions);

    const accessToken = Cookies.get("crmaccess");
    const subdomain = Cookies.get("subdomain");
    const toast = useRef(null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) onClose();
        };
        if (show) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [show, onClose]);

    const handleCheckboxChange = (section, permission) => {
        setPermissions((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [permission]: !prev[section][permission],
            },
        }));
    };

    const handleSelectAllChange = (section) => {
        const allOn = Object.values(permissions[section]).every(Boolean);
        setPermissions((prev) => ({
            ...prev,
            [section]: Object.keys(prev[section]).reduce((acc, k) => {
                acc[k] = !allOn;
                return acc;
            }, {}),
        }));
    };

    const handleSubmit = async () => {
        if (!userRole.trim()) {
            toast.current.show({ severity: "warn", summary: "Required", detail: "Role name is required" });
            return;
        }
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const payload = { userRole, permissions };

            if (isEdit) {
                await axios.put(`${API_BASE_URL}/roleandpermission/${subdomain}/${editingRole?.id}`, payload, { headers });
                toast.current.show({ severity: "success", summary: "Updated", detail: "Role updated successfully" });
            } else {
                await axios.post(`${API_BASE_URL}/roleandpermission/${subdomain}`, payload, { headers });
                toast.current.show({ severity: "success", summary: "Created", detail: "Role created successfully" });
            }

            onSaved();
        } catch (err) {
            console.error(err);
            toast.current.show({ severity: "error", summary: "Error", detail: "Operation failed" });
        }
    };

    const getPermissionLabel = (p) => (p.startsWith("can") ? p.slice(3) : p);

    return (
        <>
            <Toast ref={toast} />
            {show && (
                <div
                    ref={sidebarRef}
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        height: "100vh",
                        width: "420px",
                        backgroundColor: "#fff",
                        boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                        overflowY: "auto",
                        padding: "24px",
                    }}
                >
                    <Card style={{ border: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                            <h5 style={{ margin: 0, fontWeight: 600 }}>
                                {isEdit ? "Edit Role" : "Add Role & Permissions"}
                            </h5>
                            <i
                                className="pi pi-times"
                                style={{ marginLeft: "auto", cursor: "pointer", fontSize: "18px" }}
                                onClick={onClose}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                                Role Name :
                            </label>
                            <InputText
                                value={userRole}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ width: "100%" }}
                                placeholder="e.g. Admin, Manager"
                            />
                        </div>
                        {Object.keys(permissions).map((section) => (
                            <div
                                key={section}
                                style={{
                                    marginBottom: "20px",
                                    padding: "15px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                    <h6 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{section}</h6>
                                    <InputSwitch
                                        style={{ marginLeft: "auto" }}
                                        checked={Object.values(permissions[section]).every(Boolean)}
                                        onChange={() => handleSelectAllChange(section)}
                                    />
                                </div>

                                <Row style={{ margin: "0 -8px" }}>
                                    {Object.keys(permissions[section]).map((perm) => (
                                        <Col key={perm} xs={6} style={{ padding: "0 8px", marginBottom: "8px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <InputSwitch
                                                    checked={permissions[section][perm]}
                                                    onChange={() => handleCheckboxChange(section, perm)}
                                                />
                                                <label style={{ fontSize: "13px", cursor: "pointer" }}>
                                                    {getPermissionLabel(perm)}
                                                </label>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                        <div style={{ textAlign: "right", marginTop: "24px" }}>
                            <Button
                                label={isEdit ? "Update" : "Save"}
                                onClick={handleSubmit}
                                style={{
                                    backgroundColor: "#3B82F6",
                                    border: "none",
                                    padding: "8px 18px",
                                    fontSize: "14px",
                                }}
                            />
                            <Button
                                label="Cancel"
                                onClick={onClose}
                                style={{
                                    backgroundColor: "#6B7280",
                                    border: "none",
                                    marginLeft: "8px",
                                    padding: "8px 18px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}