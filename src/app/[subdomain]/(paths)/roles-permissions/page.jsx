"use client";
import React, { useState, useEffect, useRef } from "react";
import Permissions from "../../../Components/Permission/Permissions";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../../../utils";
import { MyButton } from "../../../ui-components/Buttons/Buttons";
import { Toast } from "primereact/toast";

export default function Page() {
    const [show, setShow] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [subdomain, setSubdomain] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        const sub = Cookies.get("subdomain");
        const token = Cookies.get("crmaccess");
        setSubdomain(sub);
        setAccessToken(token);
    }, []);

    useEffect(() => {
        if (subdomain && accessToken) fetchRoles();
    }, [subdomain, accessToken]);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const res = await axios.get(
                `${API_BASE_URL}/roleandpermission/${subdomain}/all-roles-permissions`,
                { headers }
            );

            const roleData = res.data?.data || [];
            const formatted = roleData.map((role) => ({
                id: role._id,
                roleName: role.userRole,
                permissions: role.permissions,
            }));
            setRoles(formatted);
        } catch (err) {
            console.error("Error fetching roles:", err);
        } finally {
            setLoading(false);
        }
    };

    const permissionsBodyTemplate = (rowData) => {
        const permissions = rowData.permissions || {};
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {Object.entries(permissions).map(([moduleName, perms]) => (
                    <div
                        key={moduleName}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            borderBottom: "1px solid #f0f0f0",
                            paddingBottom: "4px",
                        }}
                    >
                        <strong
                            style={{
                                width: "120px",
                                color: "#1f2937",
                                textTransform: "capitalize",
                            }}
                        >
                            {moduleName}
                        </strong>

                        {["canCreate", "canRead", "canUpdate", "canDelete"].map((permKey) => (
                            <label
                                key={permKey}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "12px",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!perms[permKey]}
                                    readOnly
                                    style={{ accentColor: "#3B82F6" }}
                                />
                                {permKey.replace("can", "")}
                            </label>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const actionsBodyTemplate = (rowData) => (
        <div style={{ display: "flex", gap: "8px" }}>
            <MyButton
                color="primary"
                size="small"
                style={{ fontSize: "12px" }}
                onClick={() => handleEdit(rowData)}
            >
                Edit
            </MyButton>
            <MyButton
                variant="contained"
                color="error"
                size="small"
                style={{ fontSize: "12px" }}
                onClick={() => handleDelete(rowData?.id)}
            >
                Delete
            </MyButton>
        </div>
    );

    const handleEdit = (role) => {
        setEditingRole({
            id: role.id,
            roleName: role.roleName,
            permissions: role.permissions,
        });
        setShow(true);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this role?");
        if (!confirmed) return;

        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.delete(`${API_BASE_URL}/roleandpermission/${subdomain}/${id}`, { headers });

            toast.current.show({
                severity: "success",
                summary: "Deleted",
                detail: "Role deleted successfully",
            });
            fetchRoles();
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete role",
            });
        }
    };

    const handleClose = () => {
        setShow(false);
        setEditingRole(null);
    };

    const handleSaved = () => {
        fetchRoles();
        handleClose();
    };

    const indexBodyTemplate = (rowData, options) => options.rowIndex + 1;

    return (
        <>
            <Toast ref={toast} />
            <Card style={{ padding: "20px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
                        Roles & Permissions
                    </h2>
                    <MyButton variant="contained" color="primary" onClick={() => setShow(true)}>
                        Add Role
                    </MyButton>
                </div>

                <DataTable
                    value={roles}
                    loading={loading}
                    showGridlines
                    stripedRows
                    size="small"
                    emptyMessage={loading ? "Loading roles..." : "No roles found."}
                >
                    <Column
                        header="#"
                        body={indexBodyTemplate}
                        style={{ width: "50px", textAlign: "center" }}
                    />
                    <Column field="roleName" header="Role Name" style={{ width: "150px" }} />
                    <Column
                        header="Permissions"
                        body={permissionsBodyTemplate}
                        style={{ minWidth: "500px" }}
                    />
                    <Column body={actionsBodyTemplate} header="Actions" style={{ width: "180px" }} />
                </DataTable>
            </Card>
            {show && (
                <Permissions
                    show={show}
                    onClose={handleClose}
                    onSaved={handleSaved}
                    editingRole={editingRole}
                />
            )}
        </>
    );
}
